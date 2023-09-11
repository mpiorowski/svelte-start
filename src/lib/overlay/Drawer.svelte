<script>
    import Button from "$lib/form/Button.svelte";
    import { checkElement } from "$lib/helpers";
    import { fade, fly } from "svelte/transition";

    /** @type {boolean} */
    export let open = false;
    /** @type {string} */
    export let title;

    /** @type {HTMLElement | undefined} */
    let previous = undefined;

    $: if (!open) {
        previous?.focus({ preventScroll: true });
    }
    // TODO - check if used
    // $: if (browser) {
    //     document.body.classList.toggle("no-scroll", open);
    // }

    /**
     * @param {HTMLElement} node
     * @returns {{ destroy(): void }}
     */
    function focus(node) {
        previous = checkElement(document.activeElement);

        // trap focus
        const focusableElements = node.querySelectorAll(
            'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select',
        );
        const firstFocusableElement = checkElement(focusableElements[0]);
        const lastFocusableElement = checkElement(
            focusableElements[focusableElements.length - 1],
        );
        firstFocusableElement?.focus({ preventScroll: true });

        /**
         * @param {KeyboardEvent} event
         * @returns {void}
         */
        function handleKeydown(event) {
            if (event.key === "Escape") {
                open = false;
            }
            if (event.key === "Tab") {
                if (event.shiftKey) {
                    if (document.activeElement === firstFocusableElement) {
                        event.preventDefault();
                        lastFocusableElement?.focus({ preventScroll: true });
                    }
                } else {
                    if (document.activeElement === lastFocusableElement) {
                        event.preventDefault();
                        firstFocusableElement?.focus({ preventScroll: true });
                    }
                }
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
            if (previous?.contains(event.target)) {
                return;
            }
            if (!node.contains(event.target)) {
                open = false;
            }
        }
        document.addEventListener("keydown", handleKeydown);
        document.addEventListener("click", handleClickOutside);

        return {
            destroy() {
                document.removeEventListener("keydown", handleKeydown);
                document.removeEventListener("click", handleClickOutside);
            },
        };
    }
</script>

<div
    class="relative z-10"
    aria-labelledby="slide-over-title"
    role="dialog"
    aria-modal="true"
>
    <!--
    Background backdrop, show/hide based on slide-over state.

    Entering: "ease-in-out duration-500"
      From: "opacity-0"
      To: "opacity-100"
    Leaving: "ease-in-out duration-500"
      From: "opacity-100"
      To: "opacity-0"
  -->
    <div
        transition:fade
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
    />

    <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
            <div
                class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10"
            >
                <!--
          Slide-over panel, show/hide based on slide-over state.

          Entering: "transform transition ease-in-out duration-500 sm:duration-700"
            From: "translate-x-full"
            To: "translate-x-0"
          Leaving: "transform transition ease-in-out duration-500 sm:duration-700"
            From: "translate-x-0"
            To: "translate-x-full"
        -->
                <div
                    use:focus
                    in:fly={{ x: "100%", duration: 500, opacity: 100 }}
                    out:fly={{ x: "100%", duration: 500, opacity: 100 }}
                    class="pointer-events-auto w-screen max-w-xl"
                >
                    <div
                        class="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl"
                    >
                        <div
                            class="flex min-h-0 flex-1 flex-col overflow-y-scroll py-6"
                        >
                            <div class="px-4 sm:px-6">
                                <div class="flex items-start justify-between">
                                    <h2
                                        class="text-base font-semibold leading-6 text-gray-900"
                                        id="slide-over-title"
                                    >
                                        {title}
                                    </h2>
                                    <div class="ml-3 flex h-7 items-center">
                                        <button
                                            on:click={() => (open = false)}
                                            type="button"
                                            class="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        >
                                            <span class="absolute -inset-2.5" />
                                            <span class="sr-only">
                                                Close panel
                                            </span>
                                            <svg
                                                class="h-6 w-6"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke-width="1.5"
                                                stroke="currentColor"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    d="M6 18L18 6M6 6l12 12"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="relative mt-6 flex-1 px-4 sm:px-6">
                                <slot />
                            </div>
                        </div>
                        <div
                            class="flex flex-shrink-0 justify-end gap-4 px-4 py-4"
                        >
                            <Button
                                on:click={() => (open = false)}
                                type="button"
                                variant="secondary"
                            >
                                Cancel
                            </Button>
                            <slot name="submit" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
