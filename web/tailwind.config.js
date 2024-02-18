import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{html,js,svelte,ts}"],
	theme: {
		extend: {
			colors: {
				amethyst: {
					100: "#a88bbd",
					200: "#83509f",
					300: "#50246c",
					400: "#3a0c57",
					500: "#1b052a"
				}
			},
			fontFamily: {
				sans: ["Quicksand", ...defaultTheme.fontFamily.sans],
				display: ["Kaushan Script"]
			}
		}
	},
	plugins: []
};
