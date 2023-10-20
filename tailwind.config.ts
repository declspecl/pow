import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./**/*.html",
		"./src/**/*.{ts,tsx}"
	],
	theme: {
		colors: {
            "text": {
                "DEFAULT": "hsl(var(--text))",
                50: "hsl(var(--text-50))",
                100: "hsl(var(--text-100))",
                150: "hsl(var(--text-150))",
                200: "hsl(var(--text-200))",
                250: "hsl(var(--text-250))",
                300: "hsl(var(--text-300))"
            },
            "background": {
                "DEFAULT": "hsl(var(--background))",
                50: "hsl(var(--background-50))",
                100: "hsl(var(--background-100))",
                150: "hsl(var(--background-150))",
                200: "hsl(var(--background-200))",
                250: "hsl(var(--background-250))",
                300: "hsl(var(--background-300))"
            },
            "primary": {
                300: "hsl(var(--primary-300))",
                350: "hsl(var(--primary-350))",
                400: "hsl(var(--primary-400))",
                450: "hsl(var(--primary-450))",
                500: "hsl(var(--primary-500))",
                550: "hsl(var(--primary-550))",
                600: "hsl(var(--primary-600))",
                650: "hsl(var(--primary-650))",
                700: "hsl(var(--primary-700))",
                "DEFAULT": "hsl(var(--primary-500))"
            },
            "secondary": {
                300: "hsl(var(--secondary-300))",
                350: "hsl(var(--secondary-350))",
                400: "hsl(var(--secondary-400))",
                450: "hsl(var(--secondary-450))",
                500: "hsl(var(--secondary-500))",
                550: "hsl(var(--secondary-550))",
                600: "hsl(var(--secondary-600))",
                650: "hsl(var(--secondary-650))",
                700: "hsl(var(--secondary-700))",
                "DEFAULT": "hsl(var(--secondary-500))"
            },
            "accent": {
                300: "hsl(var(--accent-300))",
                350: "hsl(var(--accent-350))",
                400: "hsl(var(--accent-400))",
                450: "hsl(var(--accent-450))",
                500: "hsl(var(--accent-500))",
                550: "hsl(var(--accent-550))",
                600: "hsl(var(--accent-600))",
                650: "hsl(var(--accent-650))",
                700: "hsl(var(--accent-700))",
                "DEFAULT": "hsl(var(--accent-500))"
            }
		},
		fontFamily: {
			"inter": "inter",
            "poppins": "poppins"
		},
		extend: {}
	},
	plugins: []
};

export default config;
