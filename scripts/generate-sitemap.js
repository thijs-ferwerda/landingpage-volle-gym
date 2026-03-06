import fs from 'fs';
import path from 'path';

const seoDir = path.resolve('src/content/seo');
const vacanciesDir = path.resolve('src/content/vacancies');

const seoFiles = fs.existsSync(seoDir) ? fs.readdirSync(seoDir).filter(f => f.endsWith('.md')) : [];
const seoSlugs = seoFiles.map(file => file.replace('.md', ''));

const vacancyFiles = fs.existsSync(vacanciesDir) ? fs.readdirSync(vacanciesDir).filter(f => f.endsWith('.md')) : [];
const vacancySlugs = vacancyFiles.map(file => `vacatures/${file.replace('.md', '')}`);

const hostname = 'https://www.vollegym.nl';

const staticRoutes = [
  '/',
  '/intake',
  '/werken-bij',
  '/vacatures',
  '/solliciteren'
];

const dynamicRoutes = [...seoSlugs, ...vacancySlugs].map(slug => `/${slug}`);
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
