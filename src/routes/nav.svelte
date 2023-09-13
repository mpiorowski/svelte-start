<script>
    import { page } from "$app/stores";
</script>

<!-- Current: "bg-indigo-100 text-indigo-700", Default: "text-gray-500 hover:text-gray-700" -->
<a
    href="/"
    class="rounded-md px-3 py-2 text-sm font-medium focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2
                {$page.url.pathname === '/'
        ? 'bg-indigo-100 text-indigo-700'
        : 'text-gray-500 hover:text-gray-700'}"
    aria-current={$page.url.pathname === "/" ? "page" : undefined}
>
    Dashboard
</a>
<a
    href="table"
    class="rounded-md px-3 py-2 text-sm font-medium focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2
                {$page.url.pathname === '/table'
        ? 'bg-indigo-100 text-indigo-700'
        : 'text-gray-500 hover:text-gray-700'}"
    aria-current={$page.url.pathname === "/table" ? "page" : undefined}
>
    Table
</a>
<a
    href="settings"
    class="rounded-md px-3 py-2 text-sm font-medium focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2
                {$page.url.pathname === '/settings'
        ? 'bg-indigo-100 text-indigo-700'
        : 'text-gray-500 hover:text-gray-700'}"
    aria-current={$page.url.pathname === "/settings" ? "page" : undefined}
>
    Settings
</a>
<a
    href="billing"
    class="rounded-md px-3 py-2 text-sm font-medium focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2
                {$page.url.pathname === '/billing'
        ? 'bg-indigo-100 text-indigo-700'
        : 'text-gray-500 hover:text-gray-700'}"
    aria-current={$page.url.pathname === "/billing" ? "page" : undefined}
>
    Billing
</a>
