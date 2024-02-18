<script lang="ts">
	import { getContext, onMount } from "svelte";

	import { trpc } from "$lib/trpc";
	import type { Image, User } from "$lib/types";

	export let contactId: string;

	let user: User | null = null;
	let images: Image[] = [];

	// @ts-expect-error: no type inference
	const { openMessages } = getContext("message");

	onMount(async () => {
		user = await trpc.user.view.query(contactId);
		images = await trpc.image.view.query(contactId);
	});

	const onClick = () => {
		openMessages(contactId);
	};
</script>

<button
	class="flex items-center h-16 w-[95%] m-2 bg-purple-400 rounded-3xl p-2"
	on:click={onClick}
>
	<div id="person-image" class="w-10 h-10 m-2 rounded-full overflow-hidden">
		<img alt="pfp" src={images[0]?.url || "person.png"} />
	</div>
	<div id="person-info" class="flex flex-col">
		<div id="person-name" class="text-sm text-left">
			{user?.first_name}
			{user?.last_name}
		</div>
		<div id="username" class="text-xs text-left">{user?.username}</div>
	</div>
</button>
