export type Screen = 'waiting-to-start' | 'in-game' | 'retry-level' | 'next-challenge';

export type ChallengeId =
	| 'wpm5'
	| 'wordSwap'
	| 'shortSighted'
	| 'specialChars'
	| 'timePenalty'
	| 'screenShift';

export interface Challenge {
	id: ChallengeId;
	name: string;
	description: string;
	odds: number;
}

export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
