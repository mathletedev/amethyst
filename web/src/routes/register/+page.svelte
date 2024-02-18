<script lang="ts">
	import { setContext } from "svelte";

	import { trpc } from "$lib/trpc";

	import Interest from "../../components/Interest.svelte";

	let username = "";
	let password = "";
	let firstName = "";
	let lastName = "";
	let birthdate = new Date();
	let gender = "";
	let targetGender = "";
	let interests: string[] = [];

	let allInterests = [
		"Baking",
		"Chess",
		"Coding",
		"Cooking",
		"Cricket",
		"Cycling",
		"Fishing",
		"Football",
		"Gaming",
		"Gardening",
		"Music",
		"Painting",
		"Photography",
		"Reading",
		"Running",
		"Singing",
		"Skiing",
		"Soccer",
		"Swimming",
		"Tennis",
		"Writing"
	];

	const register = async () => {
		try {
			await trpc.user.create.mutate({
				username,
				password,
				first_name: firstName,
				last_name: lastName,
				birthdate,
				gender,
				target: targetGender
			});
			await trpc.user.logIn.query({ username, password });
			window.location.assign("/dashboard");
		} catch (err) {
			alert("Invalid credentials");
		}
	};

	const addInterest = (interest: string) => {
		interests.push(interest);
	};

	const removeInterest = (interest: string) => {
		interests = interests.filter(e => e !== interest);
	};

	setContext("interest", { addInterest, removeInterest });
</script>

<title>Amethyst • Registration</title>

<h1
	class="mt-20 text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl text-center font-display text-amethyst-300"
>
	Amethyst
</h1>

<div class="mt-20 mb-20 flex justify-center">
	<form class="w-96 p-6 shadow-lg rounded-md py-8" on:submit={register}>
		<h1 class="text-3xl block text-center font-semibold">Registration</h1>
		<hr class="mt-3" />
		<div class="mt-3">
			<label for="first-name" class="block text-base mb-2">First Name</label>
			<input
				type="text"
				id="first-name"
				class="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
				placeholder="Enter first name..."
				bind:value={firstName}
			/>
		</div>
		<div class="mt-3">
			<label for="last-name" class="block text-base mb-2">Last Name</label>
			<input
				type="text"
				id="last-name"
				class="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
				placeholder="Enter last name..."
				bind:value={lastName}
			/>
		</div>
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
		<div class="mt-3">
			<label for="birthdate" class="block text-base mb-2">Birthdate</label>
			<input
				class="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
				type="date"
				id="birthdate"
				min="1900-01-01"
				max={Date.now()}
				bind:value={birthdate}
			/>
		</div>
		<div class="mt-3">
			<label for="gender" class="block text-base mb-2">Choose your gender</label
			>
			<div
				class="border w-[27.5%] text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
			>
				<select name="gender" id="gender" bind:value={gender}>
					<option value="M">Male</option>
					<option value="F">Female</option>
					<option value="O">Other</option>
					<option value="S" selected>Select</option>
				</select>
			</div>
		</div>
		<div class="mt-3">
			<label for="targetGender" class="block text-base mb-2"
				>Choose your preferred gender</label
			>
			<div
				class="border w-[27.5%] text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
			>
				<select name="targetGender" id="targetGender" bind:value={targetGender}>
					<option value="M">Male</option>
					<option value="F">Female</option>
					<option value="O">Other</option>
					<option value="S" selected>Select</option>
				</select>
			</div>
		</div>

		<div class="mt-3">
			<label for="interests" class="block text-base mb-2"
				>Choose your top interests</label
			>
			<div class="grid grid-cols-2">
				{#each allInterests as interest}
					<Interest name={interest} />
				{/each}
			</div>
			<div>
				<div class="mt-5">
					<button
						type="submit"
						class="bg-amethyst-200 text-white py-1.5 w-full rounded-md hover:bg-amethyst-100 font-semibold transition-colors"
						><i class="fa-solid fa-right-to-bracket"></i>Create Account</button
					>
				</div>
			</div>
		</div>
	</form>
</div>
