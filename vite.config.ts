import { defineConfig } from "vite";
import { fileURLToPath } from "url";
import Unfonts from "unplugin-fonts/vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
	clearScreen: false,
	server: {
		strictPort: true
	},
	envPrefix: ["VITE_", "TAURI_"],
	build: {
		target: process.env.TAURI_PLATFORM == "windows" ? "chrome105" : "safari13",
		minify: !process.env.TAURI_DEBUG ? "esbuild" : false,
		sourcemap: !!process.env.TAURI_DEBUG
	},
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url))
		}
	},
	plugins: [
		react(),
		Unfonts({
			google: {
				families: [
					"Inter",
                    "Poppins"
				]
			}
		})
	],
});
