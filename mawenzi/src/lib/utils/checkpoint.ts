import type { Difficulty, ChallengeId } from '$lib/types';
import { DIFFICULTY_ORDER, CHALLENGES, WPM_CHALLENGE } from '$lib/constants';

export const getCheckPoint = () => {
	const level = localStorage.getItem('mawenzi:level');
	const difficulty = localStorage.getItem('mawenzi:difficulty');
	const challenge = localStorage.getItem('mawenzi:challenge');

	// Check if level is a valid number, if not return 1
	// Check if difficulty is of type types.Difficulty, if not return 'Beginner'
	// Check if challenge is a valid ChallengeId and return the challenge, if not return WPM_CHALLENGE
	return {
		level: level && !isNaN(Number(level)) ? Number(level) : 1,
		difficulty: DIFFICULTY_ORDER.includes(difficulty as Difficulty)
			? (difficulty as Difficulty)
			: 'Beginner',
		challenge: CHALLENGES.find((c) => c.id === challenge) || WPM_CHALLENGE
	};
};

export const saveCheckPoint = (level: number, difficulty: Difficulty, challenge: ChallengeId) => {
	localStorage.setItem('mawenzi:level', level.toString());
	localStorage.setItem('mawenzi:difficulty', difficulty);
	localStorage.setItem('mawenzi:challenge', challenge);
};

export const clearCheckPoint = () => {
	localStorage.removeItem('mawenzi:level');
	localStorage.removeItem('mawenzi:difficulty');
	localStorage.removeItem('mawenzi:challenge');
};
