import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { jobTypes, technologies } from "./utils/lib";

// TODO:
// Gearbox Link
// Loyalty Link
// Traffic Link

const projects = defineCollection({
    loader: glob({ pattern: "**/*.json", base: "./src/data/projects" }),
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            description: z.string(),
            image: image(),
            fields: z.array(z.enum(jobTypes)),
            tech: z.array(z.enum(technologies)),
            done: z.boolean(),
            link: z.optional(z.string()),
            github: z.optional(z.string()),
        }),
});

export const collections = { projects };
