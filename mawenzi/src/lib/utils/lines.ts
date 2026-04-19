export interface LineMapping {
	lines: string[];
	charToLine: number[];
}

/**
 * Splits text into lines and creates a character-to-line index mapping.
 * This function:
 * 1. Wraps text into lines based on a maximum character width
 * 2. Respects word boundaries when possible
 * 3. Ignores long words that exceed line width
 * 4. Creates a mapping array where each character index points to its line number
 */
export const getLinesAndMapping = (text: string, charsPerLine: number): LineMapping => {
	// Handle edge cases
	if (charsPerLine <= 0 || !text) {
		const defaultLines = text ? [text] : [];
		const defaultMapping = text ? new Array(text.length).fill(0) : [];
		return { lines: defaultLines, charToLine: defaultMapping };
	}

	const lines: string[] = [];
	const charToLine: number[] = new Array(text.length);
	const words = text.split(' ');
	let currentLine = '';
	let charPos = 0;
	let lineIndex = 0;

	for (let wordIdx = 0; wordIdx < words.length; wordIdx++) {
		const word = words[wordIdx];
		const candidate = currentLine ? currentLine + ' ' + word : word;

		if (candidate.length <= charsPerLine) {
			// Word fits on current line
			if (currentLine) {
				// Add space separator before the word
				charToLine[charPos] = lineIndex;
				charPos++;
			}
			currentLine = candidate;

			// Map each character of the word to the current line
			for (let i = 0; i < word.length; i++) {
				charToLine[charPos] = lineIndex;
				charPos++;
			}
		} else {
			// Word doesn't fit on current line
			if (currentLine) {
				lines.push(currentLine);
				lineIndex++;
			}

			// If the word is too long, ignore it. We can't let annoyingly long words in this game
			currentLine = word.length > charsPerLine ? '' : word;

			for (let i = 0; i < currentLine.length; i++) {
				charToLine[charPos] = lineIndex;
				charPos++;
			}
		}
	}

	// Add the last line if it has content
	if (currentLine) {
		lines.push(currentLine);
	}

	// Fill any remaining positions with the last line index
	for (let i = charPos; i < charToLine.length; i++) {
		charToLine[i] = lineIndex;
	}

	return { lines, charToLine };
};

export const getCharLineIndex = (charIndex: number, charToLine: number[]): number => {
	return charIndex < charToLine.length ? charToLine[charIndex] : 0;
};
