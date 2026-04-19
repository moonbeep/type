<script lang="ts">
	import type { Snippet } from 'svelte';

	const {
		disabled = false,
		submit = false,
		onclick = undefined,
		label = 'Button',
		children
	} = $props<{
		disabled?: boolean;
		submit?: boolean;
		onclick?: () => void;
		label?: string;
		children: Snippet;
	}>();
</script>

<button
	aria-label={label}
	class="
		cursor-pointer
		rounded-md
		bg-accent px-4 py-2
		font-mono shadow-sm transition-all duration-150
		hover:bg-accent/80
		focus-visible:outline-none active:scale-[0.97]
	    disabled:cursor-not-allowed disabled:opacity-30 disabled:active:scale-100
		light:bg-l-accent light:hover:bg-l-accent/60
	"
	{disabled}
	type={submit ? 'submit' : 'button'}
	{onclick}
>
	<div class="grid grid-rows-2 gap-0 text-center">
		<span class="text-[0.65rem] tracking-widest text-content/60 uppercase light:text-l-content/60">
			{label}
		</span>
		<span class="text-sm font-semibold text-content light:text-l-content">
			{@render children?.()}
		</span>
	</div>
</button>
