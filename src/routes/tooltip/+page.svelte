<script>
    import { onMount } from "svelte";
    import { tooltip } from "$lib/overlay/tooltip";
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

<div
    class="relative m-auto mt-44 flex h-[400px] w-[400px] items-center justify-center overflow-x-scroll overflow-y-scroll rounded border"
>
    <button
        bind:this={referenceEl}
        class="group rounded-md border px-3 py-2 text-sm font-medium focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
    >
        My button
        <div
            bind:this={floatingEl}
            id="tooltip"
            role="tooltip"
            class="absolute w-fit rounded bg-gray-800 p-2 text-white opacity-0 transition-opacity delay-200 group-hover:opacity-100 group-focus:opacity-100"
        >
            My tooltip
            <div
                bind:this={arrowEl}
                class="absolute h-2 w-2 rotate-45 bg-gray-800"
            />
        </div>
    </button>
    <div class="inline-block h-[1000px]" />
    <div class="absolute mt-40 inline-block w-[1000px] border border-white" />
</div>
