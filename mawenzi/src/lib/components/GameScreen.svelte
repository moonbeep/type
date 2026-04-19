<script lang="ts">
	import { onMount } from 'svelte';
	import Header from '$lib/components/Header.svelte';
	import { getLinesAndMapping, getCharLineIndex } from '$lib/utils/lines';
	import type { Game } from '$lib/components/game.svelte';

	let { game }: { game: Game } = $props();

	// Measurement refs
	let charMeasureRef: HTMLSpanElement | undefined = $state();
	let containerRef: HTMLDivElement | undefined = $state();
	let contentWrapperRef: HTMLDivElement | undefined = $state();

	// Measured dimensions
	let charWidth = $state(0);
	let charHeight = $state(0);
	let containerWidth = $state(0);
	let containerHeight = $state(0);

	// Calculate and update measurements of character size and container size.
	function updateMeasurements() {
		if (charMeasureRef) {
			const rect = charMeasureRef.getBoundingClientRect();
			charWidth = rect.width;
			charHeight = rect.height;
		}
		if (contentWrapperRef) {
			const rect = contentWrapperRef.getBoundingClientRect();
			containerWidth = rect.width;
			containerHeight = rect.height;
		}
	}

	// Whenever relevant game state changes (text), recalculate measurements.
	$effect(() => {
		void game.targetText;
		updateMeasurements();
	});

	// Set up ResizeObserver and window resize listener on component mount.
	onMount(() => {
		updateMeasurements();

		if (containerRef) {
			const resizeObserver = new ResizeObserver(() => {
				updateMeasurements();
			});
			resizeObserver.observe(containerRef);

			const handleWindowResize = () => updateMeasurements();
			window.addEventListener('resize', handleWindowResize);

			return () => {
				resizeObserver.disconnect();
				window.removeEventListener('resize', handleWindowResize);
			};
		}
	});

	// Calculate how many characters fit on a single line.
	const charsPerLine = $derived.by(() => {
		if (charWidth <= 0 || containerWidth <= 0) return 30; // fallback
		return Math.max(1, Math.floor(containerWidth / charWidth));
	});

	// Calculate how many lines can fit in the visible viewport.
	const maxVisibleLines = $derived.by(() => {
		if (charHeight <= 0) return 7; // fallback
		const padded = containerHeight - 24;
		return Math.max(1, Math.floor(padded / charHeight));
	});

	const windowCenterLine = $derived(Math.floor((maxVisibleLines - 1) / 2));

	// Split target text into lines with character-to-line mapping.
	const { lines: targetLines, charToLine } = $derived(
		getLinesAndMapping(game.targetText, charsPerLine)
	);

	// Determine which line the cursor is currently on.
	const cursorLineIndex = $derived(getCharLineIndex(game.typedText.length, charToLine));

	const windowStartLine = $derived.by(() => {
		const start = cursorLineIndex - windowCenterLine;
		return Math.max(0, start);
	});

	const windowEndLine = $derived(
		Math.min(targetLines.length - 1, windowStartLine + maxVisibleLines - 1)
	);

	// Calculate vertical scroll offset in pixels.
	const verticalShiftPx = $derived(windowStartLine * charHeight);

	// For the challenge Short Sighted
	function isCharVisible(i: number): boolean {
		if (!game.hasChallenge('shortSighted')) return true;
		return i < game.typedText.length + 10;
	}
</script>

<div class="grid h-full place-items-center overflow-hidden p-4 sm:p-8">
	<div
		class="grid w-full max-w-2xl transform grid-rows-[auto_1fr_auto] gap-4 transition-transform duration-300 ease-in-out"
		style="transform: translate({game.shiftX}px, {game.shiftY}px);"
	>
		<!-- Header: displays level, WPM target, timer, accuracy, and current challenge -->
		<Header
			level={game.level}
			wpmTarget={game.effectiveWPM}
			timeLeft={game.timeLeft}
			accuracy={game.accuracy}
			activeChallenge={game.activeChallenge}
		/>

		<!-- Typing area: contains text rendering and measurement system -->
		<div bind:this={containerRef} class="relative h-85 overflow-hidden rounded-md p-3">
			<!-- Measurement wrapper: isolates the character measurement element -->
			<div
				bind:this={contentWrapperRef}
				class="pointer-events-none absolute inset-3 overflow-hidden"
			>
				<!-- Hidden character measurement: measures exact char width/height at render size -->
				<span
					bind:this={charMeasureRef}
					class="invisible font-mono text-xl leading-relaxed tracking-wide whitespace-pre sm:text-2xl md:text-3xl"
					aria-hidden="true">x</span
				>
			</div>

			<!-- Text container: wraps and translates all text -->
			<div class="pointer-events-none absolute inset-0">
				<div
					class="transform font-mono text-xl leading-relaxed tracking-wide transition-transform duration-300 ease-in-out sm:text-2xl md:text-3xl"
					style="transform: translateY(-{verticalShiftPx}px);"
				>
					<!-- Character loop: renders each character with dynamic styling -->
					{#each game.targetText.split('') as char, i (i)}
						{@const typed = i < game.typedText.length}
						{@const correct = game.typedText[i] === char}
						{@const cursor = i === game.typedText.length}
						{@const visible = isCharVisible(i)}
						{@const lineIndex = getCharLineIndex(i, charToLine)}
						{@const inWindow = lineIndex <= windowEndLine}
						<!-- Only hide words below --

						<!-- Character span: colored by correctness, hidden if out of view or out of window -->
						<span
							class="relative transition-colors duration-75
									{typed
								? correct
									? 'text-content light:text-l-content'
									: 'text-danger light:text-l-danger'
								: 'text-subtext light:text-l-subtext'}
									{!visible ? 'opacity-20' : ''}
									{!inWindow ? 'opacity-0' : ''}
									{cursor ? '-ml-0.5 animate-pulse border-l-2 border-cursor light:border-l-cursor' : ''}"
							>{visible ? char : char === ' ' ? ' ' : '_'}</span
						>
					{/each}
				</div>
			</div>
		</div>

		<!-- Status bar: displays game state, challenge info, and feedback -->
		<div
			class="grid h-20 place-items-center border-t-2 border-separator p-4 text-base light:border-l-separator"
		>
			{#if game.screen === 'retry-level'}
				<!-- Failure state: shows accuracy and retry prompt -->
				<div class="grid gap-2 text-center">
					<p class="text-danger light:text-l-danger">ROUND FAILED :(</p>
					<p class="text-sm text-subtext light:text-l-subtext">
						accuracy:
						<span
							class={game.accuracy < 90
								? 'text-danger light:text-l-danger'
								: 'text-content light:text-l-content'}>{game.accuracy}%</span
						>
						<span class="text-subtext light:text-l-subtext"> | </span>
						maintain 90% accuracy and complete all words
					</p>
					<button
						class="animate-pulse cursor-pointer text-subtext light:text-l-subtext"
						onclick={() => game.retry()}
					>
						Press Space or click to retry
					</button>
				</div>
			{:else if game.screen === 'waiting-to-start'}
				<!-- Waiting state: prompts user to start typing -->
				<span class="animate-pulse text-subtext light:text-l-subtext">Start typing to begin</span>
			{:else if game.screen === 'in-game'}
				<!-- In-game state: shows challenge-specific feedback (swaps, shifts remaining) -->
				<div
					class="grid grid-flow-col items-center gap-4 text-sm text-subtext light:text-l-subtext"
				>
					{#if game.hasChallenge('wordSwap')}
						<span>
							swaps left:
							<span class="text-warning light:text-l-warning">{game.swapsRemaining}</span>
						</span>
					{/if}
					{#if game.hasChallenge('screenShift')}
						<span>
							shifts left:
							<span class="text-warning light:text-l-warning">{game.shiftsRemaining}</span>
						</span>
					{/if}
				</div>
			{/if}
		</div>
	</div>
</div>
