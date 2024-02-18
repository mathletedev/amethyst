<script lang="ts">
	import ImageContainer from "../../components/ImageContainer.svelte";
	import type { PageData } from "../$types";
	import { onMount } from "svelte";

	export let data: PageData;

	function returnDashboard() {
		window.location.assign("/dashboard");
	}

	onMount(async () => {
		if (!data.user) window.location.assign("/");
	});
</script>

<title>Amethyst</title>

<div id="header" class="flex flex-row w-full mb-16">
	<h1
		class="m-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl font-display text-amethyst-300"
	>
		Amethyst
	</h1>
	<button class="bottom-0 ml-6 underline" on:click={returnDashboard}>
		Dashboard
	</button>
</div>

<div>test</div>
