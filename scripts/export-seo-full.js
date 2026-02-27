import fs from 'fs';
import path from 'path';
import frontMatter from 'front-matter';

const seoDir = path.resolve('src/content/seo');
const mdFiles = fs.readdirSync(seoDir).filter(f => f.endsWith('.md'));

let fullContentFile = "# Volle Gym SEO Content Overzicht\n\n";

mdFiles.forEach(file => {
    const filePath = path.join(seoDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const { attributes, body } = frontMatter(content);

    const slug = attributes.slug || file.replace('.md', '');
    const title = attributes.title || "Titel ontbreekt";
    const description = attributes.description || "Beschrijving ontbreekt";
    const heroTitle = attributes.heroTitleLine1 || "Geen hero titel";

    fullContentFile += `## URL: /${slug}\n`;
    fullContentFile += `- **Meta Titel**: ${title}\n`;
    fullContentFile += `- **Meta Beschrijving**: ${description}\n`;
    fullContentFile += `- **H1 Titel (Hero)**: ${heroTitle}\n\n`;

    fullContentFile += `### Content\n`;
    fullContentFile += `${body}\n\n`;
    fullContentFile += `---\n\n`; // Scheidingslijn tussen artikelen
});

const outputPath = path.resolve('seo-alle-content.md');
fs.writeFileSync(outputPath, fullContentFile, 'utf8');

console.log(`✅ Alle SEO content succesvol samengevoegd naar: ${outputPath}`);
