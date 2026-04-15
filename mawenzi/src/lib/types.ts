export type Screen = 'waiting-to-start' | 'in-game' | 'retry-level' | 'next-challenge';

export type ChallengeId =
	| 'wpm5'
	| 'wpm10'
	| 'wordSwap'
	| 'shortSighted'
	| 'specialChars'
	| 'timePenalty';

export interface Challenge {
	id: ChallengeId;
	name: string;
	description: string;
	odds: number;
}
