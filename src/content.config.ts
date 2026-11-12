import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const articles = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    excerpt: z.string(),
    category: z.string(),
    categorySlug: z.string(),
    tags: z.array(z.string()),
    bodySystems: z.array(z.string()),
    contentType: z.string(),
    draft: z.boolean().optional(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    author: z.string(),
    readingTime: z.number(),
    image: z.string(),
    imageAlt: z.string(),
    keyTakeaways: z.array(z.string()),
    faq: z.array(z.object({
      question: z.string(),
      answer: z.string(),
    })).default([]),
    related: z.array(z.string()).optional(),
    anatomyModel: z.enum(['pelvic-sacral-plexus', 'lumbar-spine', 'carpal-tunnel']).optional(),
    landing: z.object({
      eyebrow: z.string(),
      heroLead: z.string(),
      audienceTitle: z.string(),
      audienceIntro: z.string(),
      benefits: z.array(z.object({
        title: z.string(),
        description: z.string(),
      })).min(1),
      fitTitle: z.string(),
      fitText: z.string(),
      fitPoints: z.array(z.string()).min(1),
    }).optional(),
    reviewedBy: z.object({
      name: z.string(),
      credentials: z.string(),
      reviewedAt: z.coerce.date(),
    }).optional(),
    seo: z.object({
      title: z.string(),
      description: z.string(),
      noindex: z.boolean().optional(),
      canonical: z.string().optional(),
    }),
  }),
});

export const collections = { articles };
