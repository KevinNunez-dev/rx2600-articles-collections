import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async ({ site }) => {
  if (!site) {
    throw new Error('The site URL must be configured to generate the therapy sitemap.');
  }

  const articles = await getCollection('articles', ({ data }) => !data.draft && !data.seo.noindex);
  const urls = [
    new URL('/therapy/', site).toString(),
    new URL('/therapy/articles/', site).toString(),
    new URL('/therapy/business/', site).toString(),
    ...articles.map((article) => new URL(`/therapy/${article.id}/`, site).toString()),
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls
    .map((url) => `<url><loc>${url}</loc></url>`)
    .join('')}</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
