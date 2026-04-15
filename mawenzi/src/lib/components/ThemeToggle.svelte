<script lang="ts">
	import { ThemeManager } from '$lib/components/Theme.svelte';
</script>

<button
	class="rounded-md bg-accent px-4 py-2 font-mono shadow-lg light:bg-l-accent"
	onclick={() => ThemeManager.toggle()}
>
	<div class="grid grid-rows-2 gap-0 text-center">
		<span class="text-[0.6rem] tracking-widest text-subtext uppercase light:text-l-subtext"
			>theme</span
		>
		<span class="text-sm font-semibold text-content light:text-l-content"
			>{ThemeManager.current}</span
		>
	</div>
</button>
