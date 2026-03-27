// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeSlug from 'rehype-slug';

// https://astro.build/config
export default defineConfig({
	site: 'https://nickporcino.com', // Updated for production
	integrations: [
		mdx({
			remarkPlugins: [remarkMath],
			rehypePlugins: [rehypeSlug, rehypeKatex]
		}),
		sitemap()
	],
	markdown: {
		remarkPlugins: [remarkMath],
		rehypePlugins: [rehypeSlug, rehypeKatex]
	}
});