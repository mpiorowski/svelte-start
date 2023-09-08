<script lang="ts">
    export let name: string;
    export let label: string;
    export let files: FileList | undefined;
</script>

<div class="m-1">
    <label for={label} class="block text-sm font-medium leading-6 text-gray-50">
        {label}
    </label>
    <label
        id={label}
        for={name}
        class="mt-2 flex cursor-pointer justify-center rounded-lg border border-dashed border-gray-50/25 px-6 py-10"
    >
        <div class="text-center">
            <svg
                class="mx-auto h-12 w-12 text-gray-300"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
            >
                <path
                    fill-rule="evenodd"
                    d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                    clip-rule="evenodd"
                />
            </svg>
            <input id={name} {name} bind:files type="file" class="sr-only" />
            {#if files?.[0]}
                <p class="mt-4 flex text-sm leading-6 text-gray-50">
                    {files[0].name}
                </p>
                <p class="text-xs leading-5 text-gray-400">
                    {files[0].size} bytes
                </p>
            {:else}
                <p class="mt-4 flex text-sm leading-6 text-gray-50">
                    Upload a file or drag and drop
                </p>
                <p class="text-xs leading-5 text-gray-400">
                    SVG, PNG and JPG up to 10 MB
                </p>
            {/if}
        </div>
    </label>
</div>
