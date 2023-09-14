<script>
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import { tooltip } from "$lib/overlay/tooltip";

    /** @type {string} */
    export let href;
    /** @type {string} */
    export let label;

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

<!-- Current: "bg-indigo-100 text-indigo-700", Default: "text-gray-500 hover:text-gray-700" -->
<a
    bind:this={referenceEl}
    {href}
    class="group rounded-md px-3 py-2 text-sm font-medium focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2
                {$page.url.pathname === href
        ? 'bg-indigo-100 text-indigo-700'
        : 'text-gray-500 hover:text-gray-700'}"
    aria-current={$page.url.pathname === href ? "page" : undefined}
>
    {label}
    <div
        bind:this={floatingEl}
        id="tooltip"
        role="tooltip"
        class="absolute w-fit rounded bg-gray-800 p-2 text-white opacity-0 transition-opacity delay-200 group-hover:opacity-100 group-focus:opacity-100"
    >
        <div class="text-sm">{label}</div>
        <div
            bind:this={arrowEl}
            class="absolute h-2 w-2 rotate-45 bg-gray-800"
        />
    </div>
</a>
