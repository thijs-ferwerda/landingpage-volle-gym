import fs from 'fs';
import path from 'path';
import frontMatter from 'front-matter';

const seoDir = path.resolve('src/content/seo');
const mdFiles = fs.readdirSync(seoDir).filter(f => f.endsWith('.md'));

// Start de CSV string met headers
let csvContent = "URL Slug,Titel,Meta Beschrijving\n";

mdFiles.forEach(file => {
    const filePath = path.join(seoDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const { attributes } = frontMatter(content);

    // Escape quotes in the CSV strings
    const slug = attributes.slug || file.replace('.md', '');
    const title = (attributes.title || "").replace(/"/g, '""');
    const description = (attributes.description || "").replace(/"/g, '""');

    csvContent += `"${slug}","${title}","${description}"\n`;
});

const outputPath = path.resolve('seo-export.csv');
fs.writeFileSync(outputPath, csvContent, 'utf8');

console.log(`✅ SEO data succesvol geëxporteerd naar: ${outputPath}`);
