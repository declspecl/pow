import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./**/*.html",
		"./src/**/*.{ts,tsx}"
	],
	theme: {
		colors: {
            "text": {
                "DEFAULT": "hsl(var(--text) / <alpha-value>)",
                50: "hsl(var(--text-50) / <alpha-value>)",
                100: "hsl(var(--text-100) / <alpha-value>)",
                150: "hsl(var(--text-150) / <alpha-value>)",
                200: "hsl(var(--text-200) / <alpha-value>)",
                250: "hsl(var(--text-250) / <alpha-value>)",
                300: "hsl(var(--text-300) / <alpha-value>)"
            },
            "background": {
                "DEFAULT": "hsl(var(--background) / <alpha-value>)",
                50: "hsl(var(--background-50) / <alpha-value>)",
                100: "hsl(var(--background-100) / <alpha-value>)",
                150: "hsl(var(--background-150) / <alpha-value>)",
                200: "hsl(var(--background-200) / <alpha-value>)",
                250: "hsl(var(--background-250) / <alpha-value>)",
                300: "hsl(var(--background-300) / <alpha-value>)"
            },
            "ui-primary": {
                300: "hsl(var(--ui-primary-300) / <alpha-value>)",
                350: "hsl(var(--ui-primary-350) / <alpha-value>)",
                400: "hsl(var(--ui-primary-400) / <alpha-value>)",
                450: "hsl(var(--ui-primary-450) / <alpha-value>)",
                500: "hsl(var(--ui-primary-500) / <alpha-value>)",
                550: "hsl(var(--ui-primary-550) / <alpha-value>)",
                600: "hsl(var(--ui-primary-600) / <alpha-value>)",
                650: "hsl(var(--ui-primary-650) / <alpha-value>)",
                700: "hsl(var(--ui-primary-700) / <alpha-value>)",
                "DEFAULT": "hsl(var(--ui-primary-500) / <alpha-value>)"
            },
            "ui-secondary": {
                300: "hsl(var(--ui-secondary-300) / <alpha-value>)",
                350: "hsl(var(--ui-secondary-350) / <alpha-value>)",
                400: "hsl(var(--ui-secondary-400) / <alpha-value>)",
                450: "hsl(var(--ui-secondary-450) / <alpha-value>)",
                500: "hsl(var(--ui-secondary-500) / <alpha-value>)",
                550: "hsl(var(--ui-secondary-550) / <alpha-value>)",
                600: "hsl(var(--ui-secondary-600) / <alpha-value>)",
                650: "hsl(var(--ui-secondary-650) / <alpha-value>)",
                700: "hsl(var(--ui-secondary-700) / <alpha-value>)",
                "DEFAULT": "hsl(var(--ui-secondary-500) / <alpha-value>)"
            },
            "ui-accent": {
                300: "hsl(var(--ui-accent-300) / <alpha-value>)",
                350: "hsl(var(--ui-accent-350) / <alpha-value>)",
                400: "hsl(var(--ui-accent-400) / <alpha-value>)",
                450: "hsl(var(--ui-accent-450) / <alpha-value>)",
                500: "hsl(var(--ui-accent-500) / <alpha-value>)",
                550: "hsl(var(--ui-accent-550) / <alpha-value>)",
                600: "hsl(var(--ui-accent-600) / <alpha-value>)",
                650: "hsl(var(--ui-accent-650) / <alpha-value>)",
                700: "hsl(var(--ui-accent-700) / <alpha-value>)",
                "DEFAULT": "hsl(var(--ui-accent-500) / <alpha-value>)"
            },
            "folder": "hsl(var(--folder) / <alpha-value>)",
            "file": "hsl(var(--file) / <alpha-value>)",

            "white": "hsl(0, 0%, 100%)",
            "black": "hsl(0, 0%, 0%)"
		},
		fontFamily: {
			"inter": "inter",
            "poppins": "poppins"
		},
		extend: {
            data: {
                "state-open": "state~=open",
                "state-closed": "state~=closed"
            }
        }
	},
	plugins: []
};

export default config;
