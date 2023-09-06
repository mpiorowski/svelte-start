<script>
    /** @type {string} */
    export let name;
    /** @type {string} */
    export let label;
    /** @type {"text" | "email" | "password"} */
    export let type = "text";
    /** @type {string} */
    export let placeholder = "";

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
        <input
            use:typeAction
            {name}
            id={name}
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            {placeholder}
        />
    </div>
</div>
