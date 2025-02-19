// @ts-check
import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
    site: "https://ys-raptor.github.io/",
    base: "Portfolio",
    server: { port: 8000, host: true },
    integrations: [tailwind(), react()],
});
