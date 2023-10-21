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
            "primary": {
                300: "hsl(var(--primary-300) / <alpha-value>)",
                350: "hsl(var(--primary-350) / <alpha-value>)",
                400: "hsl(var(--primary-400) / <alpha-value>)",
                450: "hsl(var(--primary-450) / <alpha-value>)",
                500: "hsl(var(--primary-500) / <alpha-value>)",
                550: "hsl(var(--primary-550) / <alpha-value>)",
                600: "hsl(var(--primary-600) / <alpha-value>)",
                650: "hsl(var(--primary-650) / <alpha-value>)",
                700: "hsl(var(--primary-700) / <alpha-value>)",
                "DEFAULT": "hsl(var(--primary-500) / <alpha-value>)"
            },
            "secondary": {
                300: "hsl(var(--secondary-300) / <alpha-value>)",
                350: "hsl(var(--secondary-350) / <alpha-value>)",
                400: "hsl(var(--secondary-400) / <alpha-value>)",
                450: "hsl(var(--secondary-450) / <alpha-value>)",
                500: "hsl(var(--secondary-500) / <alpha-value>)",
                550: "hsl(var(--secondary-550) / <alpha-value>)",
                600: "hsl(var(--secondary-600) / <alpha-value>)",
                650: "hsl(var(--secondary-650) / <alpha-value>)",
                700: "hsl(var(--secondary-700) / <alpha-value>)",
                "DEFAULT": "hsl(var(--secondary-500) / <alpha-value>)"
            },
            "accent": {
                300: "hsl(var(--accent-300) / <alpha-value>)",
                350: "hsl(var(--accent-350) / <alpha-value>)",
                400: "hsl(var(--accent-400) / <alpha-value>)",
                450: "hsl(var(--accent-450) / <alpha-value>)",
                500: "hsl(var(--accent-500) / <alpha-value>)",
                550: "hsl(var(--accent-550) / <alpha-value>)",
                600: "hsl(var(--accent-600) / <alpha-value>)",
                650: "hsl(var(--accent-650) / <alpha-value>)",
                700: "hsl(var(--accent-700) / <alpha-value>)",
                "DEFAULT": "hsl(var(--accent-500) / <alpha-value>)"
            },

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
