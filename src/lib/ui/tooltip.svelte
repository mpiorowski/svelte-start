<script lang="ts">
	import { onMount } from 'svelte';
	import {
		arrow,
		autoPlacement,
		autoUpdate,
		computePosition,
		offset,
		shift,
	} from '@floating-ui/dom';

	export let name: string;
	export let content: string;
	export let auto = false;
	let referenceEl: HTMLElement;
	let floatingEl: HTMLElement;
	let arrowEl: HTMLElement;

	function portal(node: HTMLElement): { destroy: () => void } {
		// add event lsitener for esc to close tooltip
		document.addEventListener('keydown', (e) => {
			if (e.key === 'Escape') {
				floatingEl.classList.remove('peer-hover:opacity-100');
				floatingEl.classList.remove('peer-focus:opacity-100');
			}
		});
		node.addEventListener('mouseenter', () => {
			floatingEl.classList.add('peer-hover:opacity-100');
			floatingEl.classList.add('peer-focus:opacity-100');
		});
		node.addEventListener('mouseleave', () => {
			floatingEl.classList.remove('peer-hover:opacity-100');
			floatingEl.classList.remove('peer-focus:opacity-100');
		});
		node.addEventListener('focusin', () => {
			floatingEl.classList.add('peer-hover:opacity-100');
			floatingEl.classList.add('peer-focus:opacity-100');
		});
		return {
			destroy(): void {
				document.removeEventListener('keydown', (e) => {
					if (e.key === 'Escape') {
						floatingEl.classList.remove('peer-hover:opacity-100');
						floatingEl.classList.remove('peer-focus:opacity-100');
					}
				});
				node.addEventListener('mouseenter', () => {
					floatingEl.classList.add('peer-hover:opacity-100');
					floatingEl.classList.add('peer-focus:opacity-100');
				});
				node.addEventListener('mouseleave', () => {
					floatingEl.classList.remove('peer-hover:opacity-100');
					floatingEl.classList.remove('peer-focus:opacity-100');
				});
				node.addEventListener('focusin', () => {
					floatingEl.classList.add('peer-hover:opacity-100');
					floatingEl.classList.add('peer-focus:opacity-100');
				});
			},
		};
	}

	/**
	 * Update the position of the floating element
	 */
	function update(): void {
		computePosition(referenceEl, floatingEl, {
			placement: 'top',
			middleware: [offset(8), autoPlacement(), shift({ padding: 10 }), arrow({ element: arrowEl })],
		}).then(({ x, y, placement, middlewareData }) => {
			Object.assign(floatingEl.style, {
				left: `${x}px`,
				top: `${y}px`,
			});

			// Arrow
			if (!middlewareData.arrow) {
				return;
			}
			const arrowPlacement = placement.split('-')[0] ?? 'top';
			const { x: arrowX, y: arrowY } = middlewareData.arrow;
			const staticSide =
				{
					top: 'bottom',
					right: 'left',
					bottom: 'top',
					left: 'right',
				}[arrowPlacement] ?? 'bottom';

			Object.assign(arrowEl.style, {
				left: arrowX != null ? `${arrowX}px` : '',
				top: arrowY != null ? `${arrowY}px` : '',
				right: '',
				bottom: '',
				[staticSide]: '-4px',
			});
		});
	}

	onMount(() => {
		// for one time update
		if (!auto) {
			update();
			return (): void => {};
		}
		// for auto update
		else {
			const cleanup = autoUpdate(referenceEl, floatingEl, update);
			return (): void => cleanup();
		}
	});
</script>

<div use:portal bind:this={referenceEl} aria-describedby={name} class="group inline-flex">
	<slot />
	<div
		bind:this={floatingEl}
		id={name}
		role="tooltip"
		class="invisible absolute w-fit rounded bg-gray-800 px-4 py-2 font-normal text-white opacity-0 transition-opacity delay-200
        group-hover:visible group-hover:opacity-100 group-focus:visible group-focus:opacity-100"
	>
		{content}
		<div bind:this={arrowEl} class="absolute h-2 w-2 rotate-45 bg-gray-800" />
	</div>
</div>
