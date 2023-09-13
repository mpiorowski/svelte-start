<script>
    import {
        arrow,
        autoUpdate,
        computePosition,
        flip,
        offset,
        shift,
    } from "@floating-ui/dom";
    import { onMount } from "svelte";

    /** @type {HTMLButtonElement} */
    let referenceEl;
    /** @type {HTMLDivElement} */
    let floatingEl;
    /** @type {HTMLDivElement} */
    let arrowEl;

    onMount(() => {
        function update() {
            computePosition(referenceEl, floatingEl, {
                placement: "top",
                middleware: [
                    offset(5),
                    flip(),
                    shift({ padding: 10 }),
                    arrow({ element: arrowEl }),
                ],
            }).then(({ x, y, placement, middlewareData }) => {
                Object.assign(floatingEl.style, {
                    left: `${x}px`,
                    top: `${y}px`,
                });

                // Arrow
                const { x: arrowX, y: arrowY } = middlewareData.arrow;
                const staticSide = {
                    top: "bottom",
                    right: "left",
                    bottom: "top",
                    left: "right",
                }[placement.split("-")[0]];

                Object.assign(arrowEl.style, {
                    left: arrowX != null ? `${arrowX}px` : "",
                    top: arrowY != null ? `${arrowY}px` : "",
                    right: "",
                    bottom: "",
                    [staticSide]: "-4px",
                });
            });
        }
        const cleanup = autoUpdate(referenceEl, floatingEl, update);
        return () => {
            cleanup();
        };
    });
</script>

<div
    class="relative m-auto mt-44 flex h-[400px] w-[400px] items-center justify-center overflow-x-scroll overflow-y-scroll rounded border"
>
    <button
        bind:this={referenceEl}
        class="inline-block whitespace-nowrap rounded border p-2"
        aria-describedby="tooltip"
    >
        My button
    </button>
    <div bind:this={floatingEl} id="tooltip" role="tooltip">
        My tooltip
        <div
            bind:this={arrowEl}
            class="absolute h-2 w-2 rotate-45 bg-gray-900"
        />
    </div>
    <div class="inline-block h-[1000px]" />
    <div class="absolute mt-40 inline-block w-[1000px] border border-white" />
</div>

<style>
    #tooltip {
        width: max-content;
        position: absolute;
        top: 0;
        left: 0;
        background: #222;
        color: white;
        font-weight: bold;
        padding: 5px;
        border-radius: 4px;
        font-size: 90%;
    }
</style>
