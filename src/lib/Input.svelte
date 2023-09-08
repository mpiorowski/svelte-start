<script>
    /** @type {string} */
    export let name;
    /** @type {string} */
    export let label;
    /** @type {string} */
    export let value;
    /** @type {"text" | "email" | "password"} */
    export let type = "text";
    /** @type {string} */
    export let placeholder = "";
    /** @type {number} */
    export let textarea = 0;
    /** @type {string[]} */
    export let errors = [];
    /** @type {string} */
    export let helper = "\x80";

    /**
     * @param {HTMLInputElement} node - The HTML input element
     */
    function typeAction(node) {
        node.type = type;
    }
</script>

<div>
    <label for={name} class="block text-sm font-medium leading-6 text-gray-900">
        {label}
    </label>
    <div class="mt-2">
        {#if textarea === 0}
            <input
                use:typeAction
                bind:value
                {name}
                id={name}
                class="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {placeholder}
            />
        {:else}
            <textarea
                bind:value
                {name}
                id={name}
                class="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {placeholder}
                rows={textarea}
            />
        {/if}
    </div>
    <p
        class="mt-2 text-sm leading-6
        {errors.length > 0 ? 'text-red-600' : 'text-gray-500'}"
    >
        {errors.length > 0 ? errors.join(", ") : helper}
    </p>
</div>
