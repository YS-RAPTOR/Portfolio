import { z, defineCollection } from "astro:content";

const projectsCollection = defineCollection({
    type: "data",
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

const projectsContent = defineCollection({
    type: "content",
})

export const collections = {
    'projects-data' : projectsCollection,
    'projects-content' : projectsContent
};
