<script lang="ts">
	import { scale } from 'svelte/transition';

	/**
	 * We need to export the active state outside of the component
	 * to be able to control it via keyboard navigation and mouse events
	 * and corelate it with the content of the dropdown
	 */

	export let name: string;
	export let open: boolean;
	export let active: number;
	export let position: 'left' | 'right' = 'left';

	function portal(node: HTMLElement): { destroy(): void } {
		const previous = document.activeElement as HTMLElement;

		const focusableElements = node.querySelectorAll<HTMLElement>(
			'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select',
		);
		const first = focusableElements[0];
		const items = focusableElements.length;
		first?.focus({ preventScroll: true });

		function handleKeydown(event: KeyboardEvent): void {
			if (event.key === 'ArrowDown') {
				event.preventDefault();
				active = (active + 1) % items;
				focusableElements[active]?.focus({ preventScroll: true });
			}
			if (event.key === 'ArrowUp') {
				event.preventDefault();
				active = (active - 1 + items) % items;
				focusableElements[active]?.focus({ preventScroll: true });
			}
			if (event.key === 'Escape') {
				open = false;
				previous?.focus({ preventScroll: true });
			}
			if (event.key === 'Tab') {
				event.preventDefault();
			}
		}

		function handleClickOutside(event: MouseEvent): void {
			if (!(event.target instanceof Node)) {
				return;
			}
			if (!node.contains(event.target) && !previous?.contains(event.target)) {
				open = false;
			}
		}

		node.addEventListener('keydown', handleKeydown);
		document.addEventListener('mousedown', handleClickOutside);

		return {
			destroy() {
				node.removeEventListener('keydown', handleKeydown);
				document.removeEventListener('mousedown', handleClickOutside);
			},
		};
	}
</script>

<div class="relative inline-block w-fit text-left">
	<button
		on:click={() => (open = !open)}
		aria-haspopup="true"
		aria-controls={name}
		aria-expanded={open}
		id={name}
	>
		<slot name="button" />
	</button>
	{#if open}
		<div
			use:portal
			in:scale={{ duration: 100, start: 0.95, opacity: 0 }}
			out:scale={{ duration: 75, start: 0.95, opacity: 0 }}
			class="absolute z-10 mt-1 rounded bg-gray-800 shadow-lg
            {position === 'left' && 'right-0 origin-top-right'}
            {position === 'right' && 'left-0 origin-top-left'}"
			tabindex="-1"
			role="menu"
			aria-orientation="vertical"
			aria-labelledby={name}
		>
			<div class="py-1" role="none">
				<slot name="content" />
			</div>
		</div>
	{/if}
</div>
