import type { APIRoute } from 'astro';

// Páginas públicas do site. Ao criar uma página nova, inclua aqui.
const pages = ['/', '/privacidade', '/termos'];

export const GET: APIRoute = ({ site }) => {
  const urls = pages
    .map((path) => `  <url><loc>${new URL(path, site)}</loc></url>`)
    .join('\n');
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
