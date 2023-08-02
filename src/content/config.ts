import { z, defineCollection } from 'astro:content';

// Define types for content collections
const faqCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    order: z.number(),
    description: z.string()
  }),
});
export const collections = {
  'faq': faqCollection,
};
