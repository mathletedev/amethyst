<script lang="ts">
</script>

<div id="dashboard-root" class="flex">
	<div
		id="left-container"
		class="flex flex-col bg-purple-500 h-full w-1/3 fixed left-0"
	>
		<div
			id="header"
			class="flex items-center justify-center h-1/6 bg-purple-600"
		>
			header
		</div>
		<div id="dashboard-messages" class="flex flex-grow flex-col p-5">
			<!--Insert Contacts Here-->
            Messages
		</div>
	</div>

	<div id="right-container" class="flex flex-col h-full w-2/3 fixed right-0">
		<div id="info" class="flex h-[90vh] p-10 bg-purple-100">
			<div id="dashboard-image">image</div>
			<div class="dashboard-info">
				<div>Name</div>
				<div>age</div>
				<div>info stuff</div>
			</div>
			<button> no </button>
			<button> yes </button>
		</div>
		<div>controls</div>
	</div>
</div>
