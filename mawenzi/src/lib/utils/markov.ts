import { CORPUS } from '$lib/constants';

// Build the bigram chain once at module load time
const words = CORPUS.join(' ').toLowerCase().split(/\s+/);

const chain: Record<string, string[]> = {};
for (let i = 0; i < words.length - 1; i++) {
	if (!chain[words[i]]) chain[words[i]] = [];
	chain[words[i]].push(words[i + 1]);
}

const uniqueWords = [...new Set(words)];

// Pick a random element from an array
function pick<T>(arr: T[]): T {
	return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Generate a string of `count` words using the Markov chain.
 * Output is all lowercase.
 */
export function generateWords(count: number): string {
	if (count <= 0) return '';

	let current = pick(uniqueWords);
	const result: string[] = [current];

	for (let i = 1; i < count; i++) {
		const next = chain[current];
		if (next && next.length > 0) {
			current = pick(next);
		} else {
			current = pick(uniqueWords);
		}
		result.push(current);
	}

	return result.join(' ');
}

// Special character suffixes and decorations
const specialSuffixes = ['!', '@', '#', '%', '&', '*', '?', '+', '~', '^'];
const specialPrefixes = ['@', '#', '*', '~', '^'];
const numberSuffixes = [
	'1',
	'2',
	'3',
	'42',
	'99',
	'007',
	'123',
	'256',
	'404',
	'512',
	'0',
	'7',
	'13'
];

/**
 * Generate a string of `count` words using the Markov chain,
 * with some words decorated with numbers and special characters.
 * Output is all lowercase (except for special chars/numbers).
 */
export function generateWordsWithSpecialChars(count: number): string {
	if (count <= 0) return '';

	let current = pick(uniqueWords);
	const result: string[] = [];

	for (let i = 0; i < count; i++) {
		if (i > 0) {
			const next = chain[current];
			if (next && next.length > 0) {
				current = pick(next);
			} else {
				current = pick(uniqueWords);
			}
		}

		let word = current;
		const roll = Math.random();

		if (roll < 0.15) {
			word = word + pick(numberSuffixes);
		} else if (roll < 0.25) {
			word = word + pick(specialSuffixes);
		} else if (roll < 0.33) {
			word = word + pick(numberSuffixes) + pick(specialSuffixes);
		} else if (roll < 0.38) {
			word = pick(specialPrefixes) + word;
		} else if (roll < 0.42) {
			const other = pick(uniqueWords);
			word = word + '@' + other;
		}

		result.push(word);
	}

	return result.join(' ');
}
