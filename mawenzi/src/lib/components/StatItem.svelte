<script lang="ts">
	let {
		label,
		value,
		valueClass = 'text-content light:text-l-content'
	}: {
		label: string;
		value: string | number;
		valueClass?: string;
	} = $props();
</script>

<div class="grid grid-rows-2 gap-0 text-center">
	<span class="text-[0.7rem] tracking-widest text-content uppercase light:text-l-content"
		>{label}</span
	>
	<span class="text-sm font-semibold {valueClass}">{value}</span>
</div>
