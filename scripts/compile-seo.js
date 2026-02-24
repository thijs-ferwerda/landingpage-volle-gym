import fs from 'fs';
import path from 'path';
import { marked } from 'marked';

const SEO_DATA_FILE = path.resolve('src/data/seo-pages.json');
const MD_DIR = path.resolve('src/content/seo');

if (!fs.existsSync(SEO_DATA_FILE)) {
    console.error(`❌ Kan data bestand niet vinden: ${SEO_DATA_FILE}`);
    process.exit(1);
}

const seoPagesRaw = fs.readFileSync(SEO_DATA_FILE, 'utf8');
let seoPages = JSON.parse(seoPagesRaw);

let updatedCount = 0;

for (let i = 0; i < seoPages.length; i++) {
    const page = seoPages[i];
    const mdFile = path.join(MD_DIR, `${page.slug}.md`);

    if (fs.existsSync(mdFile)) {
        const markdownRaw = fs.readFileSync(mdFile, 'utf8');
        // Zet Markdown the om naar veilige the HTML (zonder extra whitespace)
        const htmlContent = marked.parse(markdownRaw);

        // Zorg dat we rare enters rond de paragraphs een beetje opschonen
        const cleanHtml = htmlContent.replace(/\n/g, '').trim();

        seoPages[i].contentBody = cleanHtml;
        updatedCount++;
    } else {
        console.warn(`⚠️ Waarschuwing: Geen markdown bestand gevonden voor slug '${page.slug}' (Verwachtte: ${mdFile})`);
    }
}

// Schrijf terug naar JSON
fs.writeFileSync(SEO_DATA_FILE, JSON.stringify(seoPages, null, 4), 'utf8');

console.log(`✅ Succes! ${updatedCount} Markdown bestanden omgezet en geïnjecteerd in ${SEO_DATA_FILE}.`);
