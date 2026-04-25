import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	define: {
		__APP_VERSION__: JSON.stringify('0.3.0'),
		__BUILD_TIME__: JSON.stringify(new Date().toISOString())
	}
});
