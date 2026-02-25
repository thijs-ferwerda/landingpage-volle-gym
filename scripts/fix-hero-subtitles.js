import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Anthropic from '@anthropic-ai/sdk';
import frontMatter from 'front-matter';
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SEO_DIR = path.join(__dirname, '../src/content/seo');

const apiKey = process.env.ANTHROPIC_API_KEY;
if (!apiKey) {
    console.error("❌ ANTHROPIC_API_KEY environment variable is niet ingesteld in de .env file!");
    process.exit(1);
}

const anthropic = new Anthropic({ apiKey });

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function fixSubtitle(slug) {
    const mdPath = path.join(SEO_DIR, slug);
    const fileRaw = fs.readFileSync(mdPath, 'utf8');
    const { attributes: frontmatter, body: contentBody } = frontMatter(fileRaw);

    const title = frontmatter.title || '';
    const currentSub = frontmatter.heroSubtitle || '';

    const promptText = `
Jij bent de lead copywriter voor Volle Gym. Je schrijft voor 'sportschooleigenaren' en 'PT studio eigenaren'.
We willen de ondertitel (heroSubtitle) van de SEO landingspagina: "${title}" verbeteren.
De huidige ondertitel is: "${currentSub}"

Taak: Herschrijf deze ondertitel. Bestaande uit MAXIMAAL 2 of 3 zinnen. 
**Regels:**
1. Focus op pure positiviteit ("wat we wel doen" in plaats van "wat we niet doen" of "wat pijn doet").
2. GEEN negatieve framing / associaties zoals "geen lastige vaktermen", "vervelende taak", "zonder kopzorgen".
3. Gebruik een actieve schrijfstijl vanuit onze praktijkervaring ("wij zien/bouwen/doen").
4. Klink professioneel, premium en behulpzaam. Geen "koppeltekens" (em-dashes) midden in je zinnen.

Geef in je antwoord ALLÉÉN de nieuwe ondertitel terug (dus geen extra gezwets of introducties, puur de platte tekst die ik kan kopieëren).
`;

    let responseText = null;
    let retries = 3;
    while (retries > 0) {
        try {
            const message = await anthropic.messages.create({
                max_tokens: 300,
                temperature: 0.7,
                model: 'claude-sonnet-4-6',
                messages: [
                    { role: 'user', content: promptText }
                ]
            });
            responseText = message.content[0].text.trim();
            break;
        } catch (e) {
            console.log("API Error:", e.message || e);
            await delay(10000);
            retries--;
        }
    }

    if (!responseText) {
        console.error("Mislukt voor " + slug);
        return false;
    }

    console.log(`✅ ${slug}: ${responseText}`);

    frontmatter.heroSubtitle = responseText;

    let fileContent = `---\n`;
    for (const [key, value] of Object.entries(frontmatter)) {
        const safeValue = typeof value === 'string' ? `"${value.replace(/"/g, '\\"')}"` : value;
        fileContent += `${key}: ${safeValue}\n`;
    }
    fileContent += `---\n\n`;
    fileContent += contentBody;

    fs.writeFileSync(mdPath, fileContent, 'utf8');
    return true;
}

async function main() {
    const mdFiles = fs.readdirSync(SEO_DIR).filter(f => f.endsWith('.md'));
    console.log(`Starten subtitle fix voor ${mdFiles.length} pagina's...`);

    for (const file of mdFiles) {
        await fixSubtitle(file);
        await delay(5000); // Respect rate limit
    }
    console.log("Klaar met alle subtitles!");
}

main();
