<script lang="ts">
	import LoadingIcon from '$lib/assets/icons/loading_icon.svelte';

	export let type: 'button' | 'submit' | 'reset' = 'submit';
	export let variant: 'primary' | 'secondary' = 'primary';
	export let form: string | undefined = undefined;
	export let formaction: string | undefined = undefined;
	export let href = '';
	export let loading = false;
	export let id = '';

	let className = '';
	export { className as class };
</script>

<svelte:element
	this={href ? 'a' : 'button'}
	role="button"
	tabindex="0"
	on:click
	{id}
	{href}
	{formaction}
	{form}
	{type}
	disabled={loading}
	class="group inline-flex items-center justify-center gap-x-4 rounded px-3 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
        {variant === 'primary' &&
		'bg-gray-600 text-white shadow-md hover:bg-gray-500 focus-visible:outline-gray-600'}
        {variant === 'secondary' &&
		'bg-white text-gray-900 shadow-md hover:bg-gray-300 focus-visible:outline-gray-300'}
        {className}
        "
>
	{#if loading}
		<LoadingIcon class="h-5 w-5" />
	{:else}
		<slot name="icon" />
	{/if}
	<slot />
</svelte:element>
