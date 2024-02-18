<script lang="ts">
	export let name: string;
	export let image: string;
	export let content: string;
</script>

<div
	id="message"
	class="flex max-w-[75%] ml-4 p-4 bg-white shadow-md rounded-xl"
>
	<div>{content}</div>
</div>
<div id="info" class="flex flex-row items-center">
	<div id="profile-picture" class="w-10 h-10 m-2 rounded-full overflow-hidden">
		<img alt="Profile" src={image} />
	</div>
	<div id="name">{name}</div>
</div>
