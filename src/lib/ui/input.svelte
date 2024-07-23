<script lang="ts">
	import { slide } from 'svelte/transition';

	export let name: string;
	export let label: string;
	export let value: string | number;
	export let type:
		| 'text'
		| 'email'
		| 'password'
		| 'number'
		| 'date'
		| 'time'
		| 'datetime-local'
		| 'search'
		| 'tel'
		| 'url' = 'text';
	export let placeholder = '';
	export let autocomplete = 'off';
	export let rows = 0;
	export let error = '';
	export let helper = '';

	let className = '';
	export { className as class };

	function typeAction(node: HTMLInputElement): void {
		node.type = type;
	}
</script>

<div class="w-full">
	<label for={name} class="mb-2 block text-sm font-medium">
		{label}
	</label>
	{#if rows === 0}
		<input
			use:typeAction
			bind:value
			id={name}
			{name}
			{placeholder}
			{autocomplete}
			class="block w-full rounded border-0 bg-gray-800 px-3 py-2 text-sm shadow-md placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600
            {error ? 'outline outline-1 outline-red-600' : ''}
            {className}"
			aria-invalid={!!error}
			aria-describedby="{name}-description"
		/>
	{:else}
		<textarea
			bind:value
			id={name}
			{name}
			{placeholder}
			{rows}
			class="block w-full rounded border-0 bg-gray-800 px-3 py-2 text-sm shadow-md placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600
                {error ? 'outline outline-1 outline-red-600' : ''}"
			aria-invalid={!!error}
			aria-describedby="{name}-description"
		/>
	{/if}
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
