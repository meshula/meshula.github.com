import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) => z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: image().optional(),
	}),
});

const papers = defineCollection({
	// Load Markdown and MDX files in the `src/content/papers/` directory.
	loader: glob({ base: './src/content/papers', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema for academic papers
	schema: ({ image }) => z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		// Academic paper specific fields
		category: z.enum(['foundation', 'research', 'application', 'creative', 'philosophy']).optional(),
		triadic_domain: z.enum(['motion', 'memory', 'field', 'emergence']).optional(),
		mathematical_content: z.boolean().optional(),
		sanskrit_terms: z.array(z.string()).optional(),
		tags: z.array(z.string()).optional(),
		author: z.string().optional(),
		draft: z.boolean().optional(),
		heroImage: image().optional(),
	}),
});

const references = defineCollection({
	// Load Markdown and MDX files in the `src/content/references/` directory.
	loader: glob({ base: './src/content/references', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema for reference materials
	schema: ({ image }) => z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		originalDate: z.coerce.date().optional(), // Original publication date
		// Reference-specific fields
		originalAuthor: z.string(),
		originalSource: z.string().optional(),
		publicDomain: z.boolean().optional(),
		historicalContext: z.string().optional(),
		relevanceToTritrayam: z.string().optional(),
		tags: z.array(z.string()).optional(),
		curatedBy: z.string().optional(),
		draft: z.boolean().optional(),
		heroImage: image().optional(),
	}),
});

export const collections = { blog, papers, references };