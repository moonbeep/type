<script lang="ts">
	import ChallengeScreen from '$lib/components/ChallengeScreen.svelte';
	import GameScreen from '$lib/components/GameScreen.svelte';
	import Button from '$lib/components/Button.svelte';
	import { Game } from '$lib/components/game.svelte';
	import { ThemeManager } from '$lib/components/Theme.svelte';
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';

	import { BANNER } from '$lib/constants';

	let game: Game | null = $state(null);

	onMount(() => {
		game = new Game();
		ThemeManager.apply();
		game.start();

		// Cleanup on unmount
		return () => {
			game?.destroy();
		};
	});

	function reset() {
		// Cleanup current game
		game?.resetCheckpoint();
		game?.destroy();

		// Create and start new game
		game = new Game();
		game.start();
	}

	console.log(BANNER + '\nVersion:', __APP_VERSION__, '\nRelease date:', __BUILD_TIME__);
</script>

<main
	class="relative h-dvh w-full overflow-hidden bg-backdrop font-mono selection:bg-transparent light:bg-l-backdrop"
>
	{#if game}
		{#if game!.screen === 'next-challenge'}
			<div
				class="absolute inset-0 grid place-items-center p-6"
				in:fly={{ y: '100%', duration: 500 }}
				out:fly={{ y: '-100%', duration: 500 }}
			>
				<ChallengeScreen
					challenge={game!.activeChallenge!}
					level={game!.level}
					proceed={() => game!.start()}
				/>
			</div>
		{:else}
			<div
				class="absolute inset-0"
				in:fly={{ y: '100%', duration: 500 }}
				out:fly={{ y: '-100%', duration: 500 }}
			>
				<GameScreen game={game!} />
			</div>
		{/if}

		<!-- Always visible, floats over whichever screen is active -->
		<div class="absolute right-0 bottom-0 p-4">
			<Button label="Game" onclick={reset}><div>Reset</div></Button>
			<!-- Only enabled when starting a game. Disabled afterwards -->
			<Button
				label="Difficulty"
				disabled={game!.screen !== 'waiting-to-start' || game!.level !== 1}
				onclick={() => game!.toggleDifficulty()}>{game!.difficulty}</Button
			>
			<Button onclick={() => ThemeManager.toggle()} label="Theme">{ThemeManager.current}</Button>
		</div>
	{/if}
</main>
