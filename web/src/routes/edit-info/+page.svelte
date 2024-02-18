<script lang="ts">
	import ImageContainer from "../../components/ImageContainer.svelte";
	import { trpc } from "$lib/trpc";
	import type { PageData } from "../$types";
	import type { Image, User } from "$lib/types";
	import { onMount } from "svelte";

	export let data: PageData;

	let images: Image[] = [];

	let target: User | null = null;
	let targetImages: Image[] = [];
	let files: FileList;

	const upload = async () => {
		try {
			let formData = new FormData();
			formData.append("image", files[0]);

			await fetch("http://localhost:8080/upload", {
				method: "POST",
				body: formData,
				credentials: "include"
			});
		} catch (err) {
			alert("Not logged in");
		}
	};

	function returnDashboard() {
		window.location.assign("/dashboard");
	}

	onMount(async () => {
		if (!data.user) window.location.assign("/");
		images = await trpc.image.mine.query();
		let targetId = await trpc.user.random.query();
		target = await trpc.user.view.query(targetId);
		console.log(target);
		targetImages = await trpc.image.view.query(targetId);
	});
</script>

<title>Amethyst</title>

<div id="header" class="flex flex-row w-full mb-4 p-2 bg-purple-100">
	<h1
		class="m-6 text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl font-display text-amethyst-300"
	>
		Amethyst
	</h1>
	<button class="bottom-0 ml-4 underline" on:click={returnDashboard}>
		Dashboard
	</button>
</div>

<div id="user-info">
	<div id="user-data" class="flex flex-row w-full pl-16 pb-8">
		<div
			id="profile-picture"
			class="w-16 h-16 m-2 rounded-full overflow-hidden"
		>
			<img
				alt="Profile"
				src={images[0]?.url ||
					"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png"}
			/>
		</div>
		<div id="user-data" class="flex flex-col">
			<div id="name" class="text-2xl m-0 pt-3">
				{data.user?.first_name}
				{data.user?.last_name}
			</div>
			<div id="username" class="text-xs">{data.user?.username}</div>
		</div>
	</div>
</div>

<div>
	<form enctype="multipart/form-data" on:submit={upload}>
		<input type="file" accept=".jpg,.png" bind:files />
		<button type="submit">Upload</button>
	</form>
</div>
