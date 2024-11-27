// @ts-check
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
	site: "https://ys-raptor.github.io",
	base: "/Portfolio",
	server: {
		port: 8080,
		host: true,
	},
});
