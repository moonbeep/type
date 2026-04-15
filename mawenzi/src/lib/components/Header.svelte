<script lang="ts">
	import StatItem from '$lib/components/StatItem.svelte';

	let {
		level,
		wpmTarget,
		timeLeft,
		accuracy,
		activeChallenge
	}: {
		level: number;
		wpmTarget: number;
		timeLeft: number;
		accuracy: number;
		activeChallenge: { name: string } | null;
	} = $props();

	let timeClass = $derived(
		timeLeft < 10 ? 'text-warning light:text-l-warning' : 'text-content light:text-l-content'
	);

	let accClass = $derived(
		accuracy < 90 ? 'text-danger light:text-l-danger' : 'text-content light:text-l-content'
	);
</script>

<header
	class="w-full overflow-x-auto rounded-md bg-accent font-mono shadow-lg select-none light:bg-l-accent"
>
	<div
		class="grid min-w-max items-center gap-2 p-4"
		style="grid-template-columns: auto 1px auto 1px auto 1px auto 1px auto;"
	>
		<StatItem label="level" value={level} />

		<div class="h-6 w-px bg-separator light:bg-l-separator"></div>

		<StatItem label="target" value="{wpmTarget} wpm" />

		<div class="h-6 w-px bg-separator light:bg-l-separator"></div>

		<StatItem label="accuracy" value="{accuracy}%" valueClass={accClass} />

		<div class="h-6 w-px bg-separator light:bg-l-separator"></div>

		<StatItem label="time" value="{timeLeft}s" valueClass={timeClass} />

		<div class="h-6 w-px bg-separator light:bg-l-separator"></div>

		<StatItem
			label="challenge"
			value={activeChallenge ? activeChallenge.name : '-'}
			valueClass="text-cursor light:text-l-cursor"
		/>
	</div>
</header>
