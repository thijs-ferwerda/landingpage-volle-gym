import fs from 'fs';
import path from 'path';

// Zorg er voor dat we JSON correct inladen afhankelijk van de Node versie, we gebruiken import assertions of fs.readFileSync
const seoPagesPath = path.resolve('src/data/seo-pages.json');
const seoPagesRaw = fs.readFileSync(seoPagesPath, 'utf8');
const seoPages = JSON.parse(seoPagesRaw);

const hostname = 'https://www.vollegym.nl';

const staticRoutes = [
    '/',
    '/intake',
    '/methode',
    '/over-ons'
];

const dynamicRoutes = seoPages.map(page => `/${page.slug}`);
const allRoutes = [...staticRoutes, ...dynamicRoutes];

// Huidige datum voor <lastmod>
const date = new Date().toISOString();

const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes.map(route => `  <url>
    <loc>${hostname}${route}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>
`;

const outputPath = path.resolve('public/sitemap.xml');
fs.writeFileSync(outputPath, sitemapContent);

console.log(`✅ Sitemap gegenereerd in public/sitemap.xml met ${allRoutes.length} URL's.`);
