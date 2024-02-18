<script lang="ts">
	import { onMount, setContext } from "svelte";

	import { trpc } from "$lib/trpc";
	import type { Image, Message, User } from "$lib/types";

	import Contact from "../../components/Contact.svelte";
	import ChatMessage from "../../components/ChatMessage.svelte";
	import type { PageData } from "../$types";

	export let data: PageData;

	let images: Image[] = [];

	let target: User | undefined = undefined;
	let targetImages: Image[] = [];

	let contacts: string[] = [];
	let openId: string | null = null;
	let open: User | undefined = undefined;
	let openImages: Image[] = [];

	let message = "";

	const handleDislikeClicked = () => {
		newTarget();
	};
	const handleLikeClicked = async () => {
		await trpc.user.match.mutate(target!.id);

		newTarget();
	};

	const handleCloseChat = () => {
		openId = null;
	};
	async function handleSignOut() {
		try {
			await trpc.user.logOut.query();
			window.location.assign("/login");
		} catch (err) {
			alert(err);
		}
	}

	const newTarget = async () => {
		try {
			let targetId = await trpc.user.random.query();
			target = await trpc.user.view.query(targetId);
			targetImages = await trpc.image.view.query(targetId);

			// force update
			target = target;
		} catch (err) {
			target = data.user;
		}
	};

	onMount(async () => {
		if (!data.user) window.location.assign("/login");

		images = await trpc.image.mine.query();

		await newTarget();

		contacts = await trpc.user.getMatches.query();
	});

	const getAge = (birthdate: any) => {
		var today = new Date();
		var date = new Date(birthdate);
		var age = today.getFullYear() - date.getFullYear();
		var m = today.getMonth() - date.getMonth();
		if (m < 0 || (m === 0 && today.getDate() < date.getDate())) {
			age--;
		}
		return age;
	};

	let messages: Message[] = [];

	const refreshMessages = async () => {
		messages = await trpc.message.getMessages.query(openId);
		messages = messages;
	};

	const openMessages = async (contactId: string) => {
		openId = contactId;
		open = await trpc.user.view.query(openId);
		open = open;

		openImages = await trpc.image.view.query(openId);
		openImages = openImages;

		await refreshMessages();
	};

	setContext("message", { openMessages });

	const send = async () => {
		if (message === "") return;

		await trpc.message.send.mutate({ to: target?.id, content: message });
		message = "";

		await refreshMessages();
	};
</script>

<div id="dashboard-root" class="flex">
	<div
		id="left-container"
		class="flex flex-col h-full w-1/3 fixed left-0 shadow-lg"
	>
		<div id="header" class="flex overflow-hidden h-1/6 bg-purple-300">
			<div id="user-data" class="flex flex-row w-2/3 p-3">
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
			<div id="settings" class="w-1/3 flex justify-end">
				<button on:click={handleSignOut} class="h-[0%] mt-2 mr-2 underline"
					>Sign Out</button
				>
			</div>
		</div>
		<div id="messages" class="flex flex-grow flex-col p-5">
			<div class="text-xl">Messages</div>
			<!--Insert Contacts Here-->
			<div class="flex flex-col justify-bottom">
				{#each contacts as contactId}
					<Contact {contactId} />
				{/each}
			</div>
		</div>
	</div>

	{#if openId === null}
		<div
			id="right-container"
			class="flex flex-col h-full w-2/3 fixed right-0 bg-purple-100"
		>
			<div id="person" class="flex align-center justify-center h-[90vh] p-10">
				<div
					id="person-image"
					class="w-[35%] h-[100%] overflow-hidden rounded-3xl"
				>
					<img
						alt="Person"
						src={targetImages[0]?.url || "person.png"}
						class="object-cover w-full h-full"
					/>
				</div>
				<div id="right-of-image" class="flex flex-col ml-4 w-[250px]">
					<div
						id="person-info"
						class="justify-top h-[85%] p-5 rounded-3xl bg-purple-200 shadow-md"
					>
						<div>{target?.first_name} {target?.last_name}</div>
						<div>
							{getAge(target?.birthdate || 0)}
						</div>
						<div>{target?.bio || ""}</div>
					</div>
					<div id="yes-no-buttons" class="flex items-stretch mt-4 h-[12%]">
						<button
							id="dislike"
							class="flex items-center justify-center w-full bg-purple-200 mr-2 rounded-xl shadow-md"
							on:click={handleDislikeClicked}
						>
							<img alt="dislike icon" src="x-icon.png" class="w-6 h-6" />
						</button>
						<button
							id="like"
							class="flex items-center justify-center w-full bg-purple-200 ml-2 rounded-xl shadow-md"
							on:click={handleLikeClicked}
						>
							<img alt="like icon" src="heart-icon.png" class="w-7 h-7" />
						</button>
					</div>
				</div>
			</div>
			<div
				id="controls-info"
				class="flex items-center justify-center h-[10vh] bg-purple-200"
			>
				<div id="info-dislike" class="flex items-center flex-row mx-2">
					<img
						alt="<-"
						src="left-arrow-icon.png"
						class="border-black border-2 p-2 w-10 h-10 mx-2 rounded-md"
					/>
					<div>dislike</div>
				</div>
				<div id="info-like" class="flex items-center flex-row mx-2">
					<img
						alt="->"
						src="right-arrow-icon.png"
						class="border-black border-2 p-2 w-10 h-10 mx-2 rounded-md"
					/>
					<div>like</div>
				</div>
			</div>
		</div>
	{:else}
		<div
			id="right-container"
			class="flex flex-col h-full w-2/3 fixed right-0 bg-purple-100"
		>
			<div id="header" class="flex flex-col w-full bg-purple-200">
				<div id="close button" class="flex justify-end items-center">
					<button
						on:click={handleCloseChat}
						class="m-2 p-2 border border-black rounded-lg"
					>
						<img alt="close" src="x-icon.png" class="w-6 h-6" />
					</button>
				</div>
			</div>
			<div id="chat" class="grow flex flex-col-reverse overflow-y-scroll">
				{#each messages as message}
					<ChatMessage
						name={open?.first_name}
						image={openImages[0]?.url ||
							"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png"}
						content={message.content}
					/>
				{/each}
			</div>
			<div class="p-4 h-20">
				<form class="w-full h-full flex" on:submit={send}>
					<input
						class="grow rounded-full pl-6"
						placeholder={`Message ${open?.first_name}`}
						bind:value={message}
					/>
					<button
						class="ml-4 px-2 bg-white rounded-full border-amethyst-500"
						type="submit"
					>
						<img alt="send" src="send-icon.png" class="w-8 h-8" />
					</button>
				</form>
			</div>
		</div>
	{/if}
</div>
