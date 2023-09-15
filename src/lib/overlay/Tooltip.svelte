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

    /** @param {HTMLElement} node */
    function portal(node) {
        // add event lsitener for esc to close tooltip
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                floatingEl.classList.remove("peer-hover:opacity-100");
                floatingEl.classList.remove("peer-focus:opacity-100");
            }
        });
        node.addEventListener("mouseenter", () => {
            floatingEl.classList.add("peer-hover:opacity-100");
            floatingEl.classList.add("peer-focus:opacity-100");
        });
        node.addEventListener("mouseleave", () => {
            floatingEl.classList.remove("peer-hover:opacity-100");
            floatingEl.classList.remove("peer-focus:opacity-100");
        });
        node.addEventListener("focusin", () => {
            floatingEl.classList.add("peer-hover:opacity-100");
            floatingEl.classList.add("peer-focus:opacity-100");
        });
        return {
            destroy() {
                document.removeEventListener("keydown", (e) => {
                    if (e.key === "Escape") {
                        floatingEl.classList.remove("peer-hover:opacity-100");
                        floatingEl.classList.remove("peer-focus:opacity-100");
                    }
                });
                node.addEventListener("mouseenter", () => {
                    floatingEl.classList.add("peer-hover:opacity-100");
                    floatingEl.classList.add("peer-focus:opacity-100");
                });
                node.addEventListener("mouseleave", () => {
                    floatingEl.classList.remove("peer-hover:opacity-100");
                    floatingEl.classList.remove("peer-focus:opacity-100");
                });
                node.addEventListener("focusin", () => {
                    floatingEl.classList.add("peer-hover:opacity-100");
                    floatingEl.classList.add("peer-focus:opacity-100");
                });
            },
        };
    }

    onMount(() => {
        const cleanup = tooltip(referenceEl, floatingEl, arrowEl);
        return () => cleanup();
    });
</script>

<div bind:this={referenceEl} class="inline-flex" use:portal>
    <slot />
    <div
        bind:this={floatingEl}
        id="tooltip"
        role="tooltip"
        class="invisible absolute w-fit rounded bg-gray-800 p-2 text-white opacity-0 transition-opacity delay-200
        peer-hover:visible peer-hover:opacity-100 peer-focus:visible peer-focus:opacity-100"
    >
        {text}
        <div
            bind:this={arrowEl}
            class="absolute h-2 w-2 rotate-45 bg-gray-800"
        />
    </div>
</div>
