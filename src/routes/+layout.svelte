<script lang="ts">
	import '../app.css';
	import Toast from '$lib/ui/toast.svelte';
	import { toastStore } from '$lib/ui/toast';
</script>

<div class="font-poppins h-full bg-gray-900 text-gray-50">
	<slot />
</div>

<div
	aria-live="assertive"
	class="pointer-events-none fixed inset-0 z-50 flex items-end px-4 py-6 sm:items-start sm:p-6"
>
	<div class="flex w-full flex-col items-center space-y-4 sm:items-end">
		{#each $toastStore as toast}
			<Toast {toast} />
		{/each}
	</div>
</div>
