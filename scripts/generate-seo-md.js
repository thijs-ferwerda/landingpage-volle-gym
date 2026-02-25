import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Anthropic from '@anthropic-ai/sdk';
import frontMatter from 'front-matter';
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SEO_DIR = path.join(__dirname, '../src/content/seo');
const TRANSCRIPTS_FILE = path.join(__dirname, '../transcripts.txt');

// Parse arguments
const args = process.argv.slice(2);
const slugArg = args[0];

if (!slugArg) {
    console.error("❌ Geen actie opgegeven.");
    console.error("👉 Gebruik: npm run generate-seo <slug-naam>   OF   npm run generate-seo --all");
    process.exit(1);
}

// Haal API key handmatig (of via env)
const apiKey = process.env.ANTHROPIC_API_KEY;
if (!apiKey) {
    console.error("❌ ANTHROPIC_API_KEY environment variable is niet ingesteld in de .env file!");
    process.exit(1);
}

// Initialiseer Anthropic API
const anthropic = new Anthropic({
    apiKey: apiKey,
});

// Lees interne context indien aanwezig
let contextText = "";
try {
    if (fs.existsSync(TRANSCRIPTS_FILE)) {
        contextText = fs.readFileSync(TRANSCRIPTS_FILE, 'utf8').substring(0, 2000);
    }
} catch (e) {
    console.warn("⚠️ transcripts.txt kon niet worden gelezen, we werken zonder opgeslagen kennis.");
}

const SYSTEM_PROMPT = `
Jij bent de lead copywriter voor Volle Gym.
Jouw doel is het schrijven van hoogwaardige SEO content (Information Gain) in 'Jip en Janneke' (simpele, begrijpelijke) taal voor sportschooleigenaren, PT studio's en boutique gyms.

**Inhoudelijke richtlijnen:**
- **Deel vooral veel strategische "evergreen" kennis.** Focus op de theorie achter succesvolle ledenwerving en retentie (bijv. waarom kortingen niet werken op de lange termijn, het belang van snelle opvolging, lokale binding).
- **Leg GEEN specifieke methode of systeem van Volle Gym stap-voor-stap uit.** Blijf vaag genoeg over hóe wij het exact technisch oplossen. Het doel is dat de pagina de lezer overtuigt van onze vakkennis, zodat hij/zij een intake/verdiepingsgesprek inplant. Degene die het gesprek voert, bepaalt uiteindelijk het aanbod.
- **De toon:** Eerlijk, direct, nuchter, en professioneel lokaal Nederlands. Geen bullshit.
- **De lengte:** Maak het tussen de 800 en 1500 woorden lang. Gebruik duidelijke H2 en H3 kopjes, lijstjes, en makkelijk leesbare alinea's.

BELANGRIJK VOOR DEVELOPMENT:
Het resultaat moet PURE Markdown zijn. Retourneer GEEN markdown code blocks (\`\`\`markdown). Geef direct de tekst terug.
Sla de frontmatter over! Geef uitsluitend de contentBody terug. Start direct met een H2 of H3 kopje afhankelijk van de header in het document.
`;

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function generateForSlug(slug) {
    const mdPath = path.join(SEO_DIR, `${slug}.md`);

    if (!fs.existsSync(mdPath)) {
        console.error(`❌ Bestand niet gevonden: ${mdPath}`);
        return false;
    }

    try {
        console.log(`\n⏳ Lezen van ${slug}.md...`);
        const fileRaw = fs.readFileSync(mdPath, 'utf8');
        const { attributes: frontmatter, body: contentBody } = frontMatter(fileRaw);

        const title = frontmatter.title || slug;
        const description = frontmatter.description || '';

        const wordCount = contentBody ? contentBody.split(/\s+/).filter(Boolean).length : 0;
        if (wordCount > 600) {
            console.log(`⏩ Overslaan: ${slug} heeft al ${wordCount} woorden.`);
            return true;
        }

        const promptText = `
${SYSTEM_PROMPT.trim()}

---

Schrijf de VOLLEDIGE SEO content body voor de pagina met de slug: '${slug}'.
De titel van de pagina is: '${title}'.
De meta beschrijving is: '${description}'.
Inleidende tekst (om het eerdere verhaal te starten, gebruik dit als richting maar schrijf zelfstandig verder):
"${frontmatter.heroTitleLine1} ${frontmatter.heroTitleLine2} ${frontmatter.heroTitleLine3} ${frontmatter.heroTitleLine4}. ${frontmatter.heroSubtitle}"

Context vanuit Thijs (Volle Gym) interne data:
${contextText || 'Geen specifieke interne context meegegeven, gebruik algemene Volle Gym visie (kwaliteit boven kwantiteit, lange termijn).'}

Schrijf 800 - 1500 woorden over de evergreen theorieën en strategieën die hierbij horen, houd je exacte werkwijze mysterieus en sluit af met een sterke Call to Action naar '/intake' in Markdown formaat (bijv. [Plan een gratis verdiepingsgesprek](/intake)).
`;

        console.log(`🤖 Claude 3.5 Sonnet aan het nadenken over een lang artikel... (${promptText.length} tekens input)`);

        let responseText = null;
        let retries = 3;
        while (retries > 0) {
            try {
                const message = await anthropic.messages.create({
                    max_tokens: 4096,
                    temperature: 0.7,
                    model: 'claude-sonnet-4-6',
                    messages: [
                        { role: 'user', content: promptText }
                    ]
                });
                responseText = message.content[0].text;
                break; // success
            } catch (e) {
                if (e.status === 429 || e.status === 503 || e.status === 529 || e.message?.includes('429') || e.message?.includes('503') || e.message?.includes('529')) {
                    console.log(`⚠️ API Overbelasting (HTTP ${e.status}), we wachten even en proberen opnieuw... (nog ${retries - 1} pogingen)`);
                    await delay(15000);
                    retries--;
                } else {
                    throw e;
                }
            }
        }

        if (!responseText) {
            throw new Error("Mislukt na 3 pogingen wegens aanhoudende API errors (429/503/529).");
        }

        let generatedMd = responseText.trim();

        // Verwijder ongewenste block tokens aan de randen
        if (generatedMd.startsWith('```markdown')) generatedMd = generatedMd.replace(/^```markdown\n?/, '');
        if (generatedMd.startsWith('```')) generatedMd = generatedMd.replace(/^```\n?/, '');
        if (generatedMd.endsWith('```')) generatedMd = generatedMd.replace(/\n?```$/, '');
        generatedMd = generatedMd.trim();

        console.log(`✅ Succes! ${generatedMd.split(' ').length} woorden gegenereerd.`);

        // Bouw de Frontmatter string (YAML format) opnieuw om de output mee weg te schrijven
        let fileContent = `---\n`;
        for (const [key, value] of Object.entries(frontmatter)) {
            const safeValue = typeof value === 'string' ? `"${value.replace(/"/g, '\\"')}"` : value;
            fileContent += `${key}: ${safeValue}\n`;
        }
        fileContent += `---\n\n`;
        fileContent += generatedMd;

        fs.writeFileSync(mdPath, fileContent, 'utf8');
        console.log(`💾 Opgeslagen naar ${mdPath}`);

        return true;
    } catch (e) {
        console.error(`❌ Er is een fout opgetreden bij ${slug}:`, e?.response?.data || e.message);
        return false;
    }
}

async function main() {
    if (slugArg === '--all') {
        const mdFiles = fs.readdirSync(SEO_DIR).filter(f => f.endsWith('.md'));
        const slugs = mdFiles.map(f => f.replace('.md', ''));
        console.log(`Starten bulk generatie voor ${slugs.length} pagina's...`);
        let successCount = 0;

        for (const s of slugs) {
            const success = await generateForSlug(s);
            if (success) successCount++;

            // Rate limiting pause
            console.log("Wachten (10 seconden) om rate limit te voorkomen...");
            await delay(10000);
        }

        console.log(`\n🎉 Klaar! ${successCount}/${slugs.length} pagina's succesvol gegenereerd.`);
    } else {
        await generateForSlug(slugArg);
    }
}

main();
