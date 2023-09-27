import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./**/*.html",
		"./src/**/*.{ts,tsx}"
	],
	theme: {
		colors: {
			"text": "hsl(var(--text) / <alpha-value>)",
			"text-shade-1": "hsl(var(--text-shade-1) / <alpha-value>)",
			"text-shade-2": "hsl(var(--text-shade-2) / <alpha-value>)",

			"background": "hsl(var(--background) / <alpha-value>)",
			"background-shade-1": "hsl(var(--background-shade-1) / <alpha-value>)",
			"background-shade-2": "hsl(var(--background-shade-2) / <alpha-value>)",

			"primary": "hsl(var(--primary) / <alpha-value>)",
			"primary-dark": "hsl(var(--primary-dark) / <alpha-value>)",
			"primary-darker": "hsl(var(--primary-darker) / <alpha-value>)",
			"primary-light": "hsl(var(--primary-light) / <alpha-value>)",
			"primary-lighter": "hsl(var(--primary-lighter) / <alpha-value>)",

			"secondary": "hsl(var(--secondary) / <alpha-value>)",
			"secondary-dark": "hsl(var(--secondary-dark) / <alpha-value>)",
			"secondary-darker": "hsl(var(--secondary-darker) / <alpha-value>)",
			"secondary-light": "hsl(var(--secondary-light) / <alpha-value>)",
			"secondary-lighter": "hsl(var(--secondary-lighter) / <alpha-value>)",

			"accent": "hsl(var(--accent) / <alpha-value>)",
			"accent-dark": "hsl(var(--accent-dark) / <alpha-value>)",
			"accent-darker": "hsl(var(--accent-darker) / <alpha-value>)",
			"accent-light": "hsl(var(--accent-light) / <alpha-value>)",
			"accent-lighter": "hsl(var(--accent-lighter) / <alpha-value>)",
		},
		extend: {},
	},
	plugins: [],
};

export default config;
