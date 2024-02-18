<script lang="ts">
	import { getContext } from "svelte";

	export let name: string;

	let checked = false;

	// @ts-expect-error: no type inference
	const { addInterest, removeInterest } = getContext("interest");

	const toggleCheck = () => {
		checked = !checked;
		if (checked) addInterest(name);
		else removeInterest(name);
	};
</script>

<div class="flex items-center ps-4 rounded">
	<input
		id="bordered-checkbox-1"
		type="checkbox"
		name="bordered-checkbox"
		class="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
		bind:value={checked}
		on:click={toggleCheck}
	/>
	<label
		for="bordered-checkbox-1"
		class="w-[30%] py-1 ms-1 text-sm font-medium text-gray-900 dark:text-gray-300"
		>{name}</label
	>
</div>
