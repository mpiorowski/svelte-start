<script lang="ts">
	import { slide } from 'svelte/transition';

	export let name: string;
	export let label: string;
	export let value: string | number;
	export let error = '';
	export let helper = '';

	let className = '';
	export { className as class };
</script>

<div>
	<label for={name} class="mb-2 block text-sm font-medium">
		{label}
	</label>
	<select
		bind:value
		id={name}
		{name}
		class="block w-full rounded border-0 bg-gray-800 px-3 py-2 text-sm shadow-md focus:ring-2 focus:ring-gray-600
        {error ? 'outline outline-1 outline-red-600' : ''}
        {className}"
		aria-invalid={!!error}
		aria-describedby="{name}-description"
	>
		<slot />
	</select>
	{#if helper}
		<p id="{name}-description" class="mt-2 block text-sm text-gray-400">
			{helper}
		</p>
	{/if}
	{#if error}
		<p transition:slide class="mt-2 block text-sm text-red-600">
			{error}
		</p>
	{/if}
</div>
