<head>
	<meta charset="UTF-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>Document</title>
	<link rel="stylesheet" href="style.css" />
	<link
		rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"
		integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A=="
		crossorigin="anonymous"
		referrerpolicy="no-referrer"
	/>
</head>

<body>
	<div class="flex justify-center items-center h-screen bg-indigo-600">
		<div class="w-96 p-6 shadow-lg bg-white rounded-md">
			<h1 class="text-3xl block text-center font-semibold">
				<i class="fa-solid fa-user"></i> Login
			</h1>
			<hr class="mt-3" />
			<div class="mt-3">
				<label for="username" class="block text-base mb-2">Username</label>
				<input
					type="text"
					id="username"
					class="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
					placeholder="Enter Username..."
				/>
			</div>
			<div class="mt-3">
				<label for="password" class="block text-base mb-2">Password</label>
				<input
					type="password"
					id="password"
					class="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
					placeholder="Enter Password..."
				/>
			</div>
			<div class="mt-3 flex justify-between items-center">
				<div>
					<input type="checkbox" />
					<label>Remember Me</label>
				</div>
				<div>
					<a href="#" class="text-indigo-800 font-semibold">Make New Account?</a
					>
				</div>
			</div>
			<div class="mt-5">
				<button
					type="submit"
					class="border-2 border-indigo-700 bg-indigo-700 text-white py-1 w-full rounded-md hover:bg-transparent hover:text-indigo-700 font-semibold"
					><i class="fa-solid fa-right-to-bracket"></i>&nbsp;&nbsp;Login</button
				>
			</div>
		</div>
	</div>
</body>
