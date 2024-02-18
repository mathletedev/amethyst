<script lang="ts">
	import Contact from "../../components/Contact.svelte";
</script>

<div id="dashboard-root" class="flex">
	<div
		id="left-container"
		class="flex flex-col bg-purple-500 h-full w-1/3 fixed left-0"
	>
		<div id="header" class="flex overflow-hidden h-1/6 bg-purple-600">
			<div id="user-data" class="flex flex-row p-3">
				<div
					id="profile-picture"
					class="w-16 h-16 m-2 rounded-full overflow-hidden"
				>
					<!--Change to load user picture-->
					<img alt="Profile Picture" src="image.png" />
				</div>
				<div id="user-data" class="flex flex-col">
					<div id="name" class="text-2xl m-0 pt-3">name</div>
					<div id="username" class="text-xs">username</div>
				</div>
			</div>
		</div>
		<div id="messages" class="flex flex-grow flex-col p-5">
			<div class="text-xl">Messages</div>
			<!--Insert Contacts Here-->
			<div class="flex flex-col-reverse justify-bottom">
				<Contact></Contact>
				<Contact></Contact>
				<Contact></Contact>
			</div>
		</div>
	</div>

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
					alt="Image of Person"
					src="person.png"
					class="object-cover w-full h-full"
				/>
			</div>
			<div id="right-of-image" class="flex flex-col ml-4 w-[250px]">
				<div
					id="person-info"
					class="justify-top h-[85%] p-5 rounded-3xl bg-purple-200"
				>
					<div>Name</div>
					<div>age</div>
					<div>info stuff</div>
				</div>
				<div id="yes-no-buttons" class="flex items-stretch mt-4 h-[12%]">
					<button
						id="dislike"
						class="flex items-center justify-center w-full bg-purple-200 mr-2 rounded-xl"
					>
						<img alt="dislike icon" src="x-icon.png" class="w-6 h-6" />
					</button>
					<button
						id="like"
						class="flex items-center justify-center w-full bg-purple-200 ml-2 rounded-xl"
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
</div>
