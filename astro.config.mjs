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

// Ensure all svg files are present
// @ts-ignore
import fs from "fs";
// @ts-ignore
import path from "path";
import { technologies, getTechSVGPath } from "./src/utils/lib";

const publicDir = path.resolve("./public/");

for (const tech of technologies) {
    if (!fs.existsSync(path.join(publicDir, getTechSVGPath(tech)))) {
        throw new Error(`Missing required image: ${tech}`);
    }
}
