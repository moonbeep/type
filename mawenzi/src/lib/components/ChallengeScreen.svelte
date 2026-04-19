<script lang="ts">
	import { slide } from 'svelte/transition';
	import { TRANSITION_DURATION } from '$lib/constants';

	let {
		challenge,
		level,
		proceed
	}: {
		challenge: { name: string; description: string };
		level: number;
		proceed: () => void;
	} = $props();
</script>

<div class="grid h-full w-full place-items-center">
	<div class="grid max-w-xl gap-3">
		<p
			class="font-bold text-warning light:text-l-warning"
			transition:slide={{ duration: TRANSITION_DURATION, delay: 0 }}
		>
			LEVEL {level} INCOMING...
		</p>

		<p
			class="text-subtext light:text-l-subtext"
			transition:slide={{ duration: TRANSITION_DURATION, delay: TRANSITION_DURATION }}
		>
			CHALLENGE SELECTED: <span class="font-bold text-content light:text-l-content"
				>{challenge.name}</span
			>
		</p>

		<p
			class="text-subtext light:text-l-subtext"
			transition:slide={{ duration: TRANSITION_DURATION, delay: TRANSITION_DURATION * 2 }}
		>
			{challenge.description}
		</p>

		<button
			class="animate-pulse cursor-pointer text-left text-subtext light:text-l-subtext"
			transition:slide={{ duration: TRANSITION_DURATION, delay: TRANSITION_DURATION * 3 }}
			onclick={proceed}
		>
			Press Space or click to continue
		</button>
	</div>
</div>
