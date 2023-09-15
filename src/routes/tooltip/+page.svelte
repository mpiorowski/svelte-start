<script>
    import Tooltip from "$lib/overlay/Tooltip.svelte";
</script>

<div
    class="relative m-auto mt-44 flex h-[400px] w-[400px] items-center justify-center overflow-x-scroll overflow-y-scroll rounded border"
>
    <Tooltip auto={true} text="This is a tooltip">
        <button
            class="peer rounded-md border px-3 py-2 text-sm font-medium focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
        >
            My button
        </button>
    </Tooltip>
    <div class="inline-block h-[1000px]" />
    <div class="absolute mt-40 inline-block w-[1000px] border border-white" />
</div>
