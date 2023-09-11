<script>
    /** @type {'button' | 'submit' | 'reset'} */
    export let type = "submit";
    /** @type {'primary' | 'secondary' | 'link' | 'error'} */
    export let variant = "primary";
</script>

<button
    on:click
    {type}
    class="group inline-flex items-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
        {variant === 'primary' &&
        'bg-indigo-600 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-indigo-600'}
        {variant === 'secondary' &&
        'bg-white text-gray-900 shadow-sm ring-1 ring-gray-300 hover:bg-gray-50 focus-visible:outline-gray-300'}
        {variant === 'link' &&
        'text-indigo-600 hover:text-indigo-500 focus-visible:outline-indigo-600'}
        {variant === 'error' &&
        'bg-red-600 text-white shadow-sm hover:bg-red-500 focus-visible:outline-red-600'}
        "
>
    <slot />
</button>
