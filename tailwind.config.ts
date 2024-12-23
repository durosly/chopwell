import type { Config } from "tailwindcss";
import daisyUI from "daisyui";

export default {
	content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		extend: {
			colors: {
				background: "var(--background)",
				foreground: "var(--foreground)",
				dark: "#090808",
				neutral: "#EBEBEB",
			},
			fontFamily: {
				inter: ["var(--font-inter)"],
			},
		},
	},
	plugins: [daisyUI],
	daisyui: {
		themes: [
			{
				myTheme: {
					primary: "#800808",
					secondary: "#fdfdfd",
					accent: "#E1E1E1",
					dark: "#090808",
				},
			},
		],
	},
} satisfies Config;
