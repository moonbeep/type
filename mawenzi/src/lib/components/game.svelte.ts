import { generateWords, generateWordsWithSpecialChars } from '$lib/utils/markov';
import { getCheckPoint, saveCheckPoint, clearCheckPoint } from '$lib/utils/checkpoint';
import { CHALLENGES, WPM_CHALLENGE, DIFFICULTY_BASE_WPM, DIFFICULTY_ORDER } from '$lib/constants';
import type { Screen, ChallengeId, Challenge, Difficulty } from '$lib/types';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function pickOddLevelChallenge(): Challenge {
	const challenges = CHALLENGES.filter((c) => c.odds > 0);
	const total = challenges.reduce((sum, c) => sum + c.odds, 0);
	let roll = Math.random() * total;
	for (const c of challenges) {
		roll -= c.odds;
		if (roll <= 0) return c;
	}
	return challenges[challenges.length - 1];
}

// ─── Game Class ───────────────────────────────────────────────────────────────

export class Game {
	// Level progression
	level = $state(1);
	difficulty = $state<Difficulty>('Beginner');

	activeChallenge = $state<Challenge | null>(null);

	// Round state
	screen = $state<Screen>('waiting-to-start');
	targetText = $state('');
	typedText = $state('');
	timeLeft = $state(30);
	swapsRemaining = $state(3);
	shiftsRemaining = $state(12);
	shiftX = $state(0);
	shiftY = $state(0);

	// Derived stats (reactive, used directly by the renderer)
	nextSpaceIndex = $derived(this.targetText.indexOf(' ', this.typedText.length));
	accuracy = $derived.by(() => {
		if (this.typedText.length === 0) return 100;
		const correct = [...this.typedText].reduce(
			(count, c, i) => (c === this.targetText[i] ? count + 1 : count),
			0
		);
		return Math.round((correct / this.typedText.length) * 100);
	});

	passed = $derived(this.accuracy >= 90 && this.typedText.length === this.targetText.length);

	baseWPM: number = $derived(DIFFICULTY_BASE_WPM[this.difficulty]);
	effectiveWPM = $derived(this.baseWPM + 5 * Math.floor(this.level / 2));

	currentWordIndex = $derived.by(() => [...this.typedText].filter((c) => c === ' ').length);
	typedWordCount = $derived.by(() => this.typedText.trim().split(/\s+/).filter(Boolean).length);

	// Private
	#timerId: number | undefined;
	#keydownHandler = (e: KeyboardEvent) => this.update(e);

	constructor() {
		// Get the current level from getCheckPoint and store the result in level and difficulty
		const checkpoint = getCheckPoint();

		this.level = checkpoint.level;
		this.difficulty = checkpoint.difficulty;
		this.activeChallenge = checkpoint.challenge;
	}

	/**
	 * Begins a level: generates text, resets round state, registers keyboard listener.
	 * Call this on mount, after retry, and after advancing to the next level.
	 */
	start() {
		clearInterval(this.#timerId);
		this.#timerId = undefined;

		const count = Math.ceil(this.effectiveWPM / 2);
		this.targetText = this.hasChallenge('specialChars')
			? generateWordsWithSpecialChars(count)
			: generateWords(count);

		this.typedText = '';
		this.timeLeft = 30;
		this.swapsRemaining = 3;
		this.shiftsRemaining = 6;
		this.shiftX = 0;
		this.shiftY = 0;
		this.screen = 'waiting-to-start';

		// Re-register to avoid duplicate listeners on retry/level-up
		window.removeEventListener('keydown', this.#keydownHandler);
		window.addEventListener('keydown', this.#keydownHandler);
	}

	/**
	 * Main execution loop — runs once per key-press.
	 * Handles input, advances screen state, and applies challenge effects.
	 */
	update(e: KeyboardEvent) {
		if (e.key === ' ') e.preventDefault();

		// Challenge screen: Space advances to the next level
		if (this.screen === 'next-challenge') {
			if (e.key === ' ') this.start();
			return;
		}

		// Failed round: only Space to retry
		if (this.screen === 'retry-level') {
			if (e.key === ' ') this.retry();
			return;
		}

		// Filter noise
		if (e.ctrlKey || e.metaKey || e.altKey) return;
		if (e.key === 'Tab' || e.key === 'Escape') return;

		// Backspace needs to delete all spaces on the right of this.typedText
		// Backspace puts out e.key.length of 9 so it needs to be handled before we discard all non-characters
		if (e.key === 'Backspace') {
			if (this.typedText.slice(-1) == ' ') {
				this.typedText = this.typedText.trimEnd();
			} else {
				this.typedText = this.typedText.slice(0, -1);
			}
			return;
		}

		if (e.key.length !== 1) return;

		// First real character typed: start the countdown
		if (this.screen === 'waiting-to-start') {
			this.screen = 'in-game';
			this.#timerId = window.setInterval(() => this.tick(), 1000);
		}

		if (this.typedText.length >= this.targetText.length) return;

		// Capture character and add it to text
		if (e.key === ' ' && this.nextSpaceIndex !== -1 && this.typedText.slice(-1) !== ' ') {
			const spacesToAdd = this.nextSpaceIndex - this.typedText.length;
			// Append the required number of spaces
			this.typedText += ' '.repeat(spacesToAdd + 1);
		} else {
			this.typedText += e.key;
		}

		// Apply active challenge effects
		switch (this.activeChallenge?.id) {
			case 'wordSwap':
				// Swap the upcoming word when the player finishes the current one
				if (e.key === ' ') this.#tryWordSwap();
				break;
			case 'screenShift':
				// Shift the typing area when the player completes a word
				if (e.key === ' ') this.#tryScreenShift();
				break;
			// 'shortSighted'  → purely visual, handled by the renderer
			// 'specialChars'  → text generation, handled in start()
			// 'wpm5'          → applied per-level, no permanent accumulation
		}

		if (this.typedText.length === this.targetText.length) this.finish();
	}

	/**
	 * Runs once per second. Counts down the timer and ends the round at zero.
	 */
	tick() {
		this.timeLeft--;
		if (this.timeLeft <= 0) this.finish();
	}

	/**
	 * Called when all words are typed or the timer runs out.
	 * Decides pass or fail and transitions to the appropriate screen.
	 */
	finish() {
		clearInterval(this.#timerId);
		this.#timerId = undefined;

		if (this.passed) {
			// Even levels always get wpm5; odd levels get a random challenge (excluding wpm5)
			this.level++;
			const challenge = this.level % 2 === 0 ? WPM_CHALLENGE : pickOddLevelChallenge();
			this.activeChallenge = challenge;
			this.screen = 'next-challenge';
			saveCheckPoint(this.level, this.difficulty, this.activeChallenge.id);
		} else {
			this.screen = 'retry-level';
		}
	}

	retry() {
		this.start();
	}

	hasChallenge(id: ChallengeId): boolean {
		return this.activeChallenge?.id === id;
	}

	/** Clean up timer and keyboard listener (call from onMount cleanup). */
	destroy() {
		clearInterval(this.#timerId);
		window.removeEventListener('keydown', this.#keydownHandler);
	}

	toggleDifficulty() {
		const idx = DIFFICULTY_ORDER.indexOf(this.difficulty);
		this.difficulty = DIFFICULTY_ORDER[(idx + 1) % DIFFICULTY_ORDER.length];
		this.start();
	}

	resetCheckpoint() {
		clearCheckPoint();
	}

	#tryWordSwap() {
		if (this.swapsRemaining <= 0) return;

		const nextIdx = this.currentWordIndex + 1;
		const words = this.targetText.split(' ');
		if (nextIdx >= words.length) return;

		if (Math.random() < 0.4) {
			const pool = generateWords(10).split(' ');
			words[nextIdx] = pool[Math.floor(Math.random() * pool.length)];
			this.targetText = words.join(' ');
			this.swapsRemaining--;
		}
	}

	#tryScreenShift() {
		if (this.shiftsRemaining <= 0) return;

		if (Math.random() < 0.4) {
			this.shiftX = Math.random() * 240 - 120; // [-120, 120]
			this.shiftY = Math.random() * 160 - 80; // [-80, 80]
			this.shiftsRemaining--;
		}
	}
}
