<script lang="ts">
	import XIcon from '$lib/assets/icons/x_icon.svelte';
	import { slide } from 'svelte/transition';

	export let name: string;
	export let label: string;
	export let files: File[] = [];
	export let description = '';
	export let accept = '*/*';
	export let error = '';
	export let helper = '';

	let fileList: FileList;

	function portal(node: HTMLElement): { destroy(): void } {
		// on dropdown upload file

		function handleDrop(event: DragEvent): void {
			event.preventDefault();
			node.classList.remove('ring-2', 'ring-gray-600', 'border-transparent');
			if (event.dataTransfer) {
				fileList = event.dataTransfer.files;
				files = [...files, ...Array.from(fileList)];
			}
		}

		node.addEventListener('dragover', (event) => {
			event.preventDefault();
			node.classList.add('ring-2', 'ring-gray-600', 'border-transparent');
		});
		node.addEventListener('dragleave', (event) => {
			event.preventDefault();
			node.classList.remove('ring-2', 'ring-gray-600', 'border-transparent');
		});
		node.addEventListener('drop', handleDrop);

		return {
			destroy() {
				node.removeEventListener('dragover', (event) => {
					event.preventDefault();
				});
				node.removeEventListener('dragleave', (event) => {
					event.preventDefault();
				});
				node.removeEventListener('drop', handleDrop);
			},
		};
	}
</script>

<div>
	<label for={name} class="mb-2 block text-sm font-medium">
		{label}
	</label>
	<label
		use:portal
		id={label}
		for={name}
		class="mt-2 flex cursor-pointer justify-center rounded-lg border border-dashed border-gray-600 bg-gray-800
        focus-within:border-transparent focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-600
        {error ? 'border-transparent ring-2 ring-red-600' : ''}"
	>
		<input
			bind:files={fileList}
			id={name}
			{accept}
			multiple
			on:change={(e) => {
				if (e.currentTarget.files) {
					files = [...files, ...Array.from(e.currentTarget.files)];
				}
			}}
			type="file"
			class="sr-only"
		/>
		<div class="flex flex-col justify-center py-10 text-center">
			<svg
				class="mx-auto h-8 w-8 text-gray-500"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 20 16"
			>
				<path
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
				/>
			</svg>
			<p class="mt-4 text-center text-sm font-medium">Drop files here or click to upload</p>
			<p class="mt-2 text-xs text-gray-400">
				{description}
			</p>
			{#if files.length > 0}
				<div class="mt-6 flex flex-col gap-2">
					{#each files as file}
						<div class="flex items-center justify-between gap-2">
							<p class="text-left text-xs text-gray-200">
								{file.name} - {(file.size / 1024).toFixed(2)} KB
							</p>
							<button
								class="-m-1 cursor-pointer p-1 text-red-600 hover:text-red-400"
								on:click={(e) => {
									e.preventDefault();
									e.stopPropagation();
									files = files.filter((f) => f !== file);
								}}
							>
								<XIcon class="h-4 w-4" />
							</button>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	</label>
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
