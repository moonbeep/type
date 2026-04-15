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
	<span class="text-sm tracking-widest text-subtext uppercase light:text-l-subtext">{label}</span>
	<span class="text-sm font-semibold {valueClass}">{value}</span>
</div>
