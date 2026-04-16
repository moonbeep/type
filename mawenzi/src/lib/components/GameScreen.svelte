<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import type { Game } from '$lib/components/game.svelte';

	let { game }: { game: Game } = $props();

	function isCharVisible(i: number): boolean {
		if (!game.hasChallenge('shortSighted')) return true;
		return i < game.typedText.length + 10;
	}
</script>

<div class="grid h-full place-items-center overflow-y-auto p-4 sm:p-8">
	<div class="grid w-full max-w-2xl grid-rows-[auto_1fr_auto] gap-4">
		<!-- Header -->
		<Header
			level={game.level}
			wpmTarget={game.effectiveWPM}
			timeLeft={game.timeLeft}
			accuracy={game.accuracy}
			activeChallenge={game.activeChallenge}
		/>

		<!-- Typing area -->
		<div
			class="wrap-break-words pointer-events-none text-xl leading-relaxed tracking-wide sm:text-2xl md:text-3xl"
		>
			{#each game.targetText.split('') as char, i (i)}
				{@const typed = i < game.typedText.length}
				{@const correct = game.typedText[i] === char}
				{@const cursor = i === game.typedText.length}
				{@const visible = isCharVisible(i)}

				<span
					class="relative transition-colors duration-75
						{typed
						? correct
							? 'text-content light:text-l-content'
							: 'text-danger light:text-l-danger'
						: 'text-subtext light:text-l-subtext'}
						{!visible ? 'opacity-20' : ''}
						{cursor ? '-ml-0.5 animate-pulse border-l-2 border-cursor light:border-l-cursor' : ''}"
					>{visible ? char : char === ' ' ? ' ' : '_'}</span
				>
			{/each}
		</div>

		<!-- Status bar -->
		<div
			class="grid h-20 place-items-center border-t-2 border-separator p-4 text-base light:border-l-separator"
		>
			{#if game.screen === 'retry-level'}
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
				<span class="animate-pulse text-subtext light:text-l-subtext">Start typing to begin</span>
			{:else if game.screen === 'in-game'}
				<div
					class="grid grid-flow-col items-center gap-4 text-sm text-subtext light:text-l-subtext"
				>
					<span>
						time:
						<span
							class={game.timeLeft < 10
								? 'text-warning light:text-l-warning'
								: 'text-content light:text-l-content'}>{game.timeLeft}s</span
						>
					</span>
					{#if game.hasChallenge('wordSwap')}
						<span class="text-subtext light:text-l-subtext">|</span>
						<span>
							swaps left:
							<span class="text-warning light:text-l-warning">{game.swapsRemaining}</span>
						</span>
					{/if}
				</div>
			{/if}
		</div>
	</div>
</div>
