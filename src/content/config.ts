import { defineCollection, z } from "astro:content"

const posts = defineCollection({
	schema: ({ image }) =>
		z.object({
			title: z.string().default("title"),
			description: z.string().default("description"),
			ogImage: image().describe("Изображение").optional(),
			// "2024-02-21T15:30:00Z"
			// https://armno.in.th/blog/exploring-keystatic/#published-date-field
			datePublished: z.union([z.string().datetime(), z.date()]),
			tags: z.array(z.string()).default(["прочее"]),
			draft: z.boolean().default(false),
		}),
})

const pages = defineCollection({
	schema: ({ image }) =>
		z.object({
			title: z.string().default("title"),
			description: z.string().default("description"),
			ogImage: image().optional(),
			index: z.boolean().optional(),
		}),
})

export const collections = { posts, pages }
