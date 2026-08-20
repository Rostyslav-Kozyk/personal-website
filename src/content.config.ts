import { defineCollection, reference } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const projects = defineCollection({
    loader: glob({
        base: "./src/content/projects",
        pattern: "**/*.{md,mdx}",
    }),

    schema: z.object({
        title: z.string(),
        description: z.string(),

        technologies: z.array(z.string()),

        github: z.url(),

        status: z.enum([
            "active",
            "completed",
            "archived",
        ]),

        featured: z.boolean().default(false),

        createdAt: z.coerce.date(),

        updatedAt: z.coerce.date().optional(),
    }),
});

const articles = defineCollection({
    loader: glob({
        base: "./src/content/articles",
        pattern: "**/*.{md,mdx}",
    }),

    schema: z.object({
        title: z.string(),
        description: z.string(),

        publishedAt: z.coerce.date(),

        updatedAt: z.coerce.date().optional(),

        tags: z.array(z.string()),

        draft: z.boolean().default(false),

        project: reference("projects").optional(),
    }),
});

export const collections = {
    projects,
    articles,
};