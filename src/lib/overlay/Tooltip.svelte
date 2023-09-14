<script>
    import { onMount } from "svelte";
    import { tooltip } from "$lib/overlay/tooltip";

    /** @type {string} */
    export let text;

    /** @type {HTMLElement} */
    let referenceEl;
    /** @type {HTMLElement} */
    let floatingEl;
    /** @type {HTMLElement} */
    let arrowEl;

    onMount(() => {
        const cleanup = tooltip(referenceEl, floatingEl, arrowEl);
        return () => cleanup();
    });
</script>

<div bind:this={referenceEl} class="group inline-flex">
    <slot />
    <div
        bind:this={floatingEl}
        id="tooltip"
        role="tooltip"
        class="absolute w-fit rounded bg-gray-800 p-2 text-white opacity-0 transition-opacity delay-200 group-hover:opacity-100 group-focus:opacity-100"
    >
        {text}
        <div
            bind:this={arrowEl}
            class="absolute h-2 w-2 rotate-45 bg-gray-800"
        />
    </div>
</div>
