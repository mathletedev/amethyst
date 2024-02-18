<script lang="ts">
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
</script>

<div>Home Page</div>
<form enctype="multipart/form-data" on:submit={upload}>
	<input type="file" accept=".jpg,.png" bind:files />
	<button type="submit">Upload</button>
</form>
<img src="http://localhost:8080/images/6d1648d05e5ae57204ed9f21da5c750a" />
