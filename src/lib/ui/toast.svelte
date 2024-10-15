<script lang="ts">
	import { cubicOut } from 'svelte/easing';
	import { fade, fly } from 'svelte/transition';
	import { toastStore, type Toast } from './toast.js';
	import XIcon from '$lib/assets/icons/x_icon.svelte';

	export let toast: Toast;
</script>

<div
	class="pointer-events-auto w-full max-w-sm overflow-hidden rounded bg-gray-800 shadow-lg ring-2
    {toast.type === 'success' ? 'ring-green-500' : ''}
    {toast.type === 'error' ? 'ring-red-500' : ''}
    {toast.type === 'warning' ? 'ring-yellow-500' : ''}
    {toast.type === 'info' ? 'ring-blue-500' : ''}"
	in:fly={{ duration: 300, easing: cubicOut, x: 10 }}
	out:fade={{ duration: 100 }}
	role="alert"
>
	<div class="p-4">
		<div class="flex items-start">
			<div class="ml-3 w-0 flex-1 pt-0.5">
				<p class="text-sm font-semibold text-gray-200">
					{toast.title}
				</p>
				{#if toast.description}
					<div class="mt-1 whitespace-pre-wrap text-sm text-gray-200">
						{toast.description}
					</div>
				{/if}
				{#if toast.action}
					<button
						class="mt-4 text-sm text-gray-600 hover:text-gray-500"
						aria-hidden="true"
						on:click={() => {
							toast.action?.onClick();
						}}
					>
						{toast.action?.label}
					</button>
				{/if}
			</div>
			<div class="ml-4 flex flex-shrink-0">
				<button
					type="button"
					class="relative rounded text-gray-300 hover:text-white focus:ring-2 focus:ring-white"
					on:click={() => {
						toastStore.update((toasts) => {
							return toasts.filter((t) => t.id !== toast.id);
						});
					}}
				>
					<span class="absolute -inset-2.5"></span>
					<span class="sr-only">Close modal</span>
					<div class="h-4 w-4">
						<XIcon />
					</div>
				</button>
			</div>
		</div>
	</div>
</div>
