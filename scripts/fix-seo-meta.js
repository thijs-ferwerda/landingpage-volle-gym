import fs from 'fs';
import path from 'path';
import frontMatter from 'front-matter';

const seoDir = path.resolve('src/content/seo');
const mdFiles = fs.readdirSync(seoDir).filter(f => f.endsWith('.md'));

console.log(`Verwerken van ${mdFiles.length} markdown bestanden...`);

mdFiles.forEach(file => {
    const filePath = path.join(seoDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const { attributes, body } = frontMatter(content);

    // Bepaal de "topic" naam gebaseerd op de bestandsnaam (bijv: "Personal Trainer Leads")
    const topic = file
        .replace('.md', '')
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    // Maak unieke waarden
    const newTitle = `${topic} - De #1 Groeistrategie | Volle Gym`;
    const newDescription = `Ontdek de bewezen ${topic.toLowerCase()} strategie voor jouw studio. Wij helpen je aan een constante, structurele stroom van high-end klanten. Geen loze beloftes.`;

    // Construeer de nieuwe YAML header
    const yamlHeader = `---
title: "${newTitle}"
description: "${newDescription}"
slug: "${file.replace('.md', '')}"
type: "service"
heroTitleLine1: "${attributes.heroTitleLine1 || attributes.title}"
heroTitleLine2: "${attributes.heroTitleLine2 || 'Meer Leden,'}"
heroTitleLine3: "${attributes.heroTitleLine3 || 'Minder'}"
heroTitleLine4: "${attributes.heroTitleLine4 || 'Gedoe'}"
heroSubtitle: "${attributes.heroSubtitle || newDescription}"
contentSectionTitle: "${attributes.contentSectionTitle || 'Waarom onze methode in Nederland de norm zet.'}"
relatedServices: ${JSON.stringify(attributes.relatedServices || [])}
relatedBlogs: ${JSON.stringify(attributes.relatedBlogs || [])}
---
`;

    // Sla het bestand weer op met de nieuwe header en de originele body
    const newContent = `${yamlHeader}${body}`;
    fs.writeFileSync(filePath, newContent, 'utf8');

    console.log(`✅ ${file} (Titel: ${newTitle})`);
});

console.log('🎉 Alle markdown bestanden zijn voorzien van een unieke titel en beschrijving.');
