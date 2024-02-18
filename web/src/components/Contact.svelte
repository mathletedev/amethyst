<script lang="ts">
	import { onMount } from "svelte";

	import { trpc } from "$lib/trpc";
	import type { Image, User } from "$lib/types";

	export let contactId: string;

	let user: User | null = null;
	let images: Image[] = [];

	onMount(async () => {
		user = await trpc.user.view.query(contactId);
		images = await trpc.image.view.query(contactId);
	});
</script>

<button
	class="flex items-center h-16 w-[95%] m-2 bg-purple-400 rounded-3xl p-2"
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
