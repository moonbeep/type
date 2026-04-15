import { browser } from '$app/environment';

export type Theme = 'light' | 'dark';

const getSystemTheme = (): Theme => {
	if (browser && window.matchMedia('(prefers-color-scheme: light)').matches) {
		return 'light';
	}
	return 'dark'; // Default to dark for the terminal look
};

const getInitialTheme = (): Theme => {
	if (browser) {
		const saved = localStorage.getItem('theme') as Theme;
		// Only return saved if it exists, otherwise check system
		if (saved === 'light' || saved === 'dark') return saved;
	}
	return getSystemTheme();
};

let theme = $state<Theme>(getInitialTheme());

export const ThemeManager = {
	get current(): string {
		return theme.charAt(0).toUpperCase() + theme.slice(1);
	},

	toggle: (): void => {
		theme = theme === 'light' ? 'dark' : 'light';
		ThemeManager.apply();
	},

	apply: (): void => {
		if (!browser) return;

		const root = window.document.documentElement;
		root.classList.remove('light', 'dark');
		root.classList.add(theme);
		localStorage.setItem('theme', theme);
	}
};
