import { defineCollection, z } from 'astro:content';

const faqCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(), // Категория вопросов
    description: z.string().optional(), // Описание категории
    order: z.number().default(100), // Порядок сортировки
    featured: z.boolean().default(false), // Показать на главной?
  }),
});

export const collections = {
  faq: faqCollection,
};
