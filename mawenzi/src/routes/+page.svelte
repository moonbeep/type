<script lang="ts">
	import ChallengeScreen from '$lib/components/ChallengeScreen.svelte';
	import GameScreen from '$lib/components/GameScreen.svelte';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import { Game } from '$lib/utils/game.svelte';
	import { ThemeManager } from '$lib/components/Theme.svelte';
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';

	import { BANNER } from '$lib/constants';

	const game = new Game();

	onMount(() => {
		ThemeManager.apply();
		game.start();
		return () => game.destroy();
	});

	console.log(BANNER + '\nVersion:', __APP_VERSION__, '\nRelease date:', __BUILD_TIME__);
</script>

<main
	class="relative h-dvh w-full overflow-hidden bg-backdrop font-mono selection:bg-transparent light:bg-l-backdrop"
>
	{#if game.screen === 'next-challenge'}
		<div
			class="absolute inset-0 grid place-items-center p-6"
			in:fly={{ y: '100%', duration: 500 }}
			out:fly={{ y: '-100%', duration: 500 }}
		>
			<ChallengeScreen
				challenge={game.activeChallenge!}
				level={game.level + 1}
				nextLevel={() => game.nextLevel()}
			/>
		</div>
	{:else}
		<div
			class="absolute inset-0"
			in:fly={{ y: '100%', duration: 500 }}
			out:fly={{ y: '-100%', duration: 500 }}
		>
			<GameScreen {game} />
		</div>
	{/if}

	<!-- Always visible, floats over whichever screen is active -->
	<div class="absolute right-0 bottom-0 p-4">
		<ThemeToggle />
	</div>
</main>
