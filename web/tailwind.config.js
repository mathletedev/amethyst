import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{html,js,svelte,ts}"],
	theme: {
		extend: {
			colors: {
				amethyst: "#bf00ff"
			},
			fontFamily: {
				sans: ["Quicksand", ...defaultTheme.fontFamily.sans],
				display: ["Kaushan Script"]
			}
		}
	},
	plugins: []
};
