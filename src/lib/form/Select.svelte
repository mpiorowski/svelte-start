<script>
    import { cubicIn } from "svelte/easing";
    import { fade } from "svelte/transition";
    import { checkElement } from "$lib/helpers";

    /** @type {string} */
    export let name;
    /** @type {string} */
    export let label;
    /** @type {string} */
    export let value;
    /** @type {readonly string[]} */
    export let options;
    /** @type {string} */
    export let helper = "\x80";

    let active = 0;
    let open = false;
    $: if (open) {
        active = options.indexOf(value);
    }

    /**
     * @param {HTMLElement} node
     * @returns {{ destroy(): void }}
     */
    function focus(node) {
        const previous = checkElement(document.activeElement);
        if (!previous || !(previous instanceof HTMLElement)) {
            return { destroy() {} };
        }

        /**
         * @param {KeyboardEvent} event
         * @returns {void}
         */
        function handleKeydown(event) {
            if (event.key === "ArrowDown") {
                event.preventDefault();
                active = (active + 1) % options.length;
            }
            if (event.key === "ArrowUp") {
                event.preventDefault();
                active = (active - 1 + options.length) % options.length;
            }
            if (event.key === "Escape") {
                open = false;
                previous?.focus({ preventScroll: true });
            }
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                value = options[active] ?? "";
                open = false;
                previous?.focus({ preventScroll: true });
            }
        }

        /**
         * @param {MouseEvent} event
         * @returns {void}
         */
        function handleClickOutside(event) {
            if (!(event.target instanceof Node)) {
                return;
            }
            if (!node.contains(event.target)) {
                open = false;
            }
        }

        document.addEventListener("click", handleClickOutside);
        node.addEventListener("keydown", handleKeydown);
        node.focus({ preventScroll: true });

        return {
            destroy() {
                node.removeEventListener("keydown", handleKeydown);
                document.removeEventListener("click", handleClickOutside);
            },
        };
    }
</script>

<div>
    <label
        id="{name}-label"
        class="block text-sm font-medium leading-6 text-gray-900"
        for={name}
    >
        {label}
    </label>
    <div class="relative mt-2">
        <input type="hidden" {name} {value} />
        <button
            id={name}
            type="button"
            class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
            aria-haspopup="listbox"
            aria-describedby="{name}-description"
            aria-expanded={open}
            on:click|stopPropagation={() => (open = !open)}
        >
            <span class="block truncate">{value}</span>
            <span
                class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
            >
                <svg
                    class="h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path
                        fill-rule="evenodd"
                        d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                        clip-rule="evenodd"
                    />
                </svg>
            </span>
        </button>
        {#if open}
            <!--
              Select popover, show/hide based on select state.

              Entering: ""
                From: ""
                To: ""
              Leaving: "transition ease-in duration-100"
                From: "opacity-100"
                To: "opacity-0"
            -->
            <!--{open ? 'opacity-100' : 'opacity-0 transition duration-100 ease-in'}-->
            <ul
                out:fade={{ duration: 100, easing: cubicIn }}
                use:focus
                class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                tabindex="-1"
                role="listbox"
                aria-labelledby="{name}-label"
                aria-activedescendant="{name}-option-{active}"
            >
                {#each options as option, i}
                    <!-- This one is dealt with by the trapfocus function -->
                    <!-- TODO - check if this can be fixed -->
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <li
                        class="group relative cursor-default select-none py-2 pl-3 pr-9
                    {active === i
                            ? 'bg-indigo-600 text-white'
                            : 'text-gray-900'}"
                        id="{name}-option-{i}"
                        role="option"
                        aria-selected={option === value}
                        on:mouseenter={() => (active = i)}
                        on:click={() => {
                            value = option;
                            open = false;
                        }}
                    >
                        <span
                            class="block truncate font-normal
                        {option === value ? 'font-semibold' : 'font-normal'}"
                        >
                            {option}
                        </span>
                        {#if option === value}
                            <span
                                class="absolute inset-y-0 right-0 flex items-center pr-4 group-hover:text-white
                            {active === i ? 'text-white' : 'text-indigo-600'}"
                            >
                                <svg
                                    class="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                        clip-rule="evenodd"
                                    />
                                </svg>
                            </span>
                        {/if}
                    </li>
                {/each}
            </ul>
        {/if}
    </div>
    <p id="{name}-description" class="text-xs leading-6 text-gray-500">
        {helper}
    </p>
</div>