<script lang="ts">
	export let id: string;
	export let name: string;
	export let label: string;
	export let value: string;
	export let group: string;
	export let description = '';
</script>

<div class="relative flex items-start">
	<div class="flex h-6 items-center">
		<input
			{value}
			bind:group
			{id}
			{name}
			type="radio"
			class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
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
