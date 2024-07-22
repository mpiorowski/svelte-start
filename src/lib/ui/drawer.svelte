<script lang="ts">
	import { browser } from '$app/environment';
	import XIcon from '$lib/assets/icons/x-icon.svelte';
	import { cubicIn, cubicOut } from 'svelte/easing';
	import { fade, fly } from 'svelte/transition';

	export let name: string;
	export let open: boolean;
	export let position: 'right' | 'left' = 'right';

	let previous: HTMLElement | undefined = undefined;

	$: if (!open) {
		previous?.focus({ preventScroll: true });
	}

	$: if (browser) {
		if (open) {
			document.body.classList.add('no-scroll');
		} else {
			document.body.classList.remove('no-scroll');
		}
	}

	function portal(node: HTMLElement): { destroy(): void } {
		previous = document.activeElement as HTMLElement;

		const focusableElements = node.querySelectorAll<HTMLElement>(
			'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select',
		);
		const first = focusableElements[0];
		const last = focusableElements[focusableElements.length - 1];
		first?.focus({ preventScroll: true });

		function handleKeydown(event: KeyboardEvent): void {
			if (event.key === 'Escape') {
				open = false;
			}
			if (event.key === 'Tab') {
				if (event.shiftKey) {
					if (document.activeElement === first) {
						event.preventDefault();
						last?.focus({ preventScroll: true });
					}
				} else {
					if (document.activeElement === last) {
						event.preventDefault();
						first?.focus({ preventScroll: true });
					}
				}
			}
		}

		function handleClickOutside(event: MouseEvent): void {
			if (!(event.target instanceof Node)) {
				return;
			}
			if (previous?.contains(event.target)) {
				return;
			}
			if (!node.contains(event.target)) {
				open = false;
			}
		}
		document.addEventListener('keydown', handleKeydown);
		document.addEventListener('mousedown', handleClickOutside);

		return {
			destroy() {
				document.removeEventListener('keydown', handleKeydown);
				document.removeEventListener('mousedown', handleClickOutside);
			},
		};
	}
</script>

{#if open}
	<div class="relative z-40" role="dialog" aria-labelledby={name} aria-modal="true">
		<div
			in:fade={{ duration: 200, easing: cubicOut }}
			out:fade={{ duration: 200, easing: cubicIn }}
			class="fixed inset-0 bg-gray-900 bg-opacity-80 transition-opacity"
		/>

		<div class="fixed inset-0 overflow-hidden">
			<div class="absolute inset-0 overflow-hidden">
				<div
					class="pointer-events-none fixed inset-y-0 flex max-w-full
                {position === 'right' ? 'right-0 pl-10' : 'left-0 pr-10'}"
				>
					<div
						use:portal
						in:fly={{
							x: position === 'right' ? '100%' : '-100%',
							duration: 400,
							opacity: 100,
						}}
						out:fly={{
							x: position === 'right' ? '100%' : '-100%',
							duration: 400,
							opacity: 100,
						}}
						class="pointer-events-auto relative w-screen max-w-xl"
					>
						<div
							class="absolute top-0 flex pt-4
                            {position === 'left'
								? 'right-0 -mr-8 pl-2 sm:-mr-10 sm:pl-4'
								: 'left-0 -ml-8 pr-2 sm:-ml-10 sm:pr-4'}"
							transition:fade
						>
							<button
								type="button"
								class="relative rounded text-gray-300 hover:text-white focus:ring-2 focus:ring-white"
								on:click={() => (open = false)}
							>
								<span class="absolute -inset-2.5"></span>
								<span class="sr-only">Close drawer</span>
								<div class="h-6 w-6">
									<XIcon />
								</div>
							</button>
						</div>
						<div class="flex h-full flex-col overflow-y-scroll bg-gray-800 shadow-lg">
							<slot />
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
