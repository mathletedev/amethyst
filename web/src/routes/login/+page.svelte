<script lang="ts">
	import { trpc } from "$lib/trpc";

	let username = "";
	let password = "";

	const logIn = async () => {
		try {
			await trpc.user.logIn.query({ username, password });
			window.location.assign("/dashboard");
		} catch (err) {
			alert("Invalid credentials");
		}
	};
</script>

<h1
	class="mt-24 text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl text-center font-display text-amethyst-300"
>
	Amethyst
</h1>

<div class="mt-24 flex justify-center">
	<form class="w-96 p-6 shadow-lg bg-white rounded-md py-8" on:submit={logIn}>
		<h1 class="text-3xl block text-center font-semibold">
			<i class="fa-solid fa-user"></i>Login
		</h1>
		<hr class="mt-3" />
		<div class="mt-3">
			<label for="username" class="block text-base mb-2">Username</label>
			<input
				type="text"
				id="username"
				class="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
				placeholder="Enter Username..."
				bind:value={username}
			/>
		</div>
		<div class="mt-3">
			<label for="password" class="block text-base mb-2">Password</label>
			<input
				type="password"
				id="password"
				class="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
				placeholder="Enter Password..."
				bind:value={password}
			/>
		</div>
		<div class="mt-3 flex justify-between items-center">
			<div>
				<a href="signup" class="font-semibold hover:text-amethyst-300"
					>Make New Account?</a
				>
			</div>
		</div>
		<div class="mt-5">
			<button
				type="submit"
				class="bg-amethyst-200 text-white py-1 w-full rounded-md hover:bg-amethyst-100 font-semibold transition-colors"
				><i class="fa-solid fa-right-to-bracket"></i>&nbsp;&nbsp;Login</button
			>
		</div>
	</form>

	<figure class="max-w-lg contrast-more ml-6">
		<img
			class="h-auto max-w-full rounded-lg"
			src="Happy_Couple.jpg"
			alt="Happy Couple"
		/>
		<figcaption
			class="mt-2 text-sm text-center text-black-500 dark:text-black-400"
		>
			You could be this like this Happy Couple!!!
		</figcaption>
	</figure>
</div>
