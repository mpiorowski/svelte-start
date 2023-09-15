<script>
    import { page } from "$app/stores";

    /** @type {string} */
    export let href;
    /** @type {string} */
    export let label;
</script>

<!-- Current: "bg-indigo-100 text-indigo-700", Default: "text-gray-500 hover:text-gray-700" -->
<a
    {href}
    class="peer rounded-md px-3 py-2 text-sm font-medium focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2
                {$page.url.pathname === href
        ? 'bg-indigo-100 text-indigo-700'
        : 'text-gray-500 hover:text-gray-700'}"
    aria-current={$page.url.pathname === href ? "page" : undefined}
>
    {label}
</a>
