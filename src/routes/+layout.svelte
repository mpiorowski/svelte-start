<script>
    import "../app.css";
    import Toast from "$lib/overlay/Toast.svelte";
    import { toastStore } from "$lib/overlay/toast";
    import Button from "$lib/form/Button.svelte";
    import MenuIcon from "$lib/icons/MenuIcon.svelte";
    import Drawer from "$lib/overlay/Drawer.svelte";
    import Dropdown from "$lib/overlay/Dropdown.svelte";
    import Avatar from "$lib/overlay/Avatar.svelte";
    import Nav from "./Nav.svelte";

    let open = false;
    let navs = [
        { href: "/", label: "Form" },
        { href: "/table", label: "Table" },
        { href: "/tooltip", label: "Tooltip" },
    ];
</script>

<header class="bg-white shadow">
    {#if open}
        <Drawer position="left" title="Svelte Start" bind:open>
            <nav class="flex flex-col space-y-4">
                {#each navs as nav}
                    <Nav label={nav.label} href={nav.href} />
                {/each}
            </nav>
        </Drawer>
    {/if}
    <div class="mx-auto max-w-5xl px-2 py-4 sm:px-4 lg:px-6">
        <div class="flex items-center gap-2 sm:hidden">
            <div class="inline-flex">
                <Button variant="link" on:click={() => (open = !open)}>
                    <MenuIcon />
                </Button>
            </div>
            <h1>Svelte Start</h1>
        </div>

        <div class="hidden sm:block">
            <nav class="flex gap-x-4" aria-label="Tabs">
                {#each navs as nav}
                    <Nav label={nav.label} href={nav.href} />
                {/each}
                <div class="ml-auto flex items-center justify-center">
                    <Dropdown rounded>
                        <svelte:fragment slot="button">
                            <span class="sr-only">User Settings</span>
                            <Avatar />
                        </svelte:fragment>
                    </Dropdown>
                </div>
            </nav>
        </div>
    </div>
</header>
<main>
    <slot />
</main>
<!-- Global notification live region, render this permanently at the end of the document -->
<div
    aria-live="assertive"
    class="pointer-events-none fixed inset-0 z-20 flex items-end px-4 py-6 sm:items-start sm:p-6"
>
    <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
        {#each $toastStore as toast}
            <Toast {toast} />
        {/each}
    </div>
</div>
