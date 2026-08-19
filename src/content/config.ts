import { defineCollection, z } from 'astro:content';

const faqCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    order: z.number().default(100),
    featured: z.boolean().default(false),
  }),
});

export const collections = {
  faq: faqCollection,
};
