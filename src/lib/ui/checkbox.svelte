<script lang="ts">
	export let id: string;
	export let name: string;
	export let label: string;
	export let value: string;

	export let group: string[];
	export let description = '';

	let checked: boolean;

	$: updateChekbox(group);
	$: updateGroup(checked);

	function updateChekbox(g: string[]): void {
		checked = g.indexOf(value) >= 0;
	}

	function updateGroup(c: boolean): void {
		const index = group.indexOf(value);
		if (c) {
			if (index < 0) {
				group.push(value);
				group = group;
			}
		} else {
			if (index >= 0) {
				group.splice(index, 1);
				group = group;
			}
		}
	}
</script>

<div class="relative flex items-start">
	<div class="flex h-6 items-center">
		<input
			{id}
			{name}
			type="checkbox"
			bind:checked
			bind:value
			class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
			aria-describedby="{id}-description"
		/>
	</div>
	<div class="ml-3 text-sm leading-6">
		<label for={id} class="font-medium">{label}</label>
		<p id="{id}-description" class="text-gray-400">
			{description}
		</p>
	</div>
</div>
