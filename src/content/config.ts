import { z, defineCollection } from "astro:content";

const projectsCollection = defineCollection({
    schema: z.object({
        title: z.string(),
        link: z.string(),
        description: z.string(),
        technologies: z.array(z.string()),
        rank: z.number(),
        draft: z.boolean(),
        demo: z.optional(z.string()),
    }),
});

export const collections = {
    projects: projectsCollection,
};
