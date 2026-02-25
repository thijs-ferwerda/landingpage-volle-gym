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
Jouw doel is het schrijven van hoogwaardige SEO content (Information Gain) voor sportschooleigenaren en PT studio eigenaren. Spreek de lezer NOOIT aan als 'coach', maar gebruik relevante termen zoals 'sportschooleigenaar', 'PT studio eigenaar' of 'ondernemer'.

**Inhoudelijke en stilistische richtlijnen:**
- **Schrijf een diepgaand, behulpzaam en genuanceerd verhaal:** Schrijf naar de lezer toe (je/jouw) alsof ze een hele goede, inhoudelijke blog/opinie lezen. Verplaats je echt in de schoenen van de ondernemer. Vermijd borstklopperij en te stellig taalgebruik; wees behulpzaam, welwillend- **Perspectief & Bewijsvoering:** Schrijf ALTIJD vanuit de "wij-vorm" (als het ervaren team van Volle Gym), NOOIT in de "ik-vorm". Vermijd zoveel mogelijk zwakke "state of being" zinnen met "er is" of "het is". Gebruik deze alleen als je een onomstotelijk feit brengt. Bouw je argumenten in plaats daarvan actief op vanuit onze praktijkervaring: "wij zien dat", "uit ervaring met 40+ studio's weten wij", "wij merken dat", etc. Wees oprecht behulpzaam en toon begrip voor de uitdagingen van de ondernemer.
- **Positieve framing (Heel Belangrijk):** Vermijd het benoemen van negativiteit en focus op positieve eigenschappen. Zeg dus NIET: "wij doen geen snelle trucjes of domme kortingsacties", want dit creëert alsnog een negatieve associatie bij de lezer. Vertel in plaats daarvan WAT we WEL doen: "wij bouwen robuuste langetermijnsystemen voor premium studio's". Je mag wel analyseren wat er vaak fout gaat in theorie, maar sluit verkoopargumenten of kerninzichten altijd *positief en opbouwend* af.
- **Schrijfstijl & Copywriting (Zeer belangrijk):** Jij bent een meester in copywriting, vergelijkbaar met de stijl van Robin Timmers, maar zonder arrogantie. Je tekst is rete-scherp, inhoudelijk ijzersterk, snijdt direct hout en is leuk om te lezen zonder geforceerd te zijn. Gebruik NOOIT koppeltekens of em-dashes (— of -) midden in je zinnen ter verduidelijking of als pauze; dat leest als een typische AI-tekst. Gebruik in plaats daarvan sterke, korte, afzonderlijke zinnen.
- **GEEN "cringy" of cliché storytelling:** Vermijd de standaard, vermoeiende formats ("dit is je situatie, je hoort krekels, en dat niet vanwege X maar vanwege Y... wij begrijpen je volledig"). Dat is cringy en saai. Wees in plaats daarvan analytisch, confronterend en waardevol. Geef inzichten die ze nog nergens anders hebben gehoord over waarom sportschoolmarketing faalt of werkt. Geen platgetreden paden.
- **Opmaak & Structuur:** Gebruik GEEN dividers of horizontal rules (geen \`---\` of \`***\`). Gebruik headings (H2/H3) zeer spaarzaam. Gebruik ze alleen om échte, grote hoofdstukken in het verhaal aan te geven. Maak er geen rommelige opsomming van subkopjes van. Een vloeiend doorlopend verhaal werkt veel beter.
- **Gym Launch & Groeistrategie (Belangrijke inhoud):** Verweef (zonder de termen lomp te droppen) strategische principes uit de 'Gym Launch' methodiek van Alex Hormozi: 'Client-Financed Acquisition' (zorg dat de front-end aanbieding je marketing betaalt), het draaien van onweerstaanbare High-Ticket Offers (geen gratis proeflesjes meer, maar een transformatie verkopen), en focus extreem op retentie, churn verlagen en prijzen strategisch verhogen als de capaciteit vol raakt. Blijf professioneel vaag over de exacte IT/technische uitvoering van onze kant. Wij tonen keihard autoriteit in onze inzichten, waarna de lezer overtuigd raakt en de intake boekt.
- **Call to Action (CTA):** Aan het allerlaatste einde van de tekst mag SLECHTS ÉÉN Call to Action staan: "Doe de intake" met een link naar \`/intake\`. Gebruik NOOIT zoiets als "Plan een gratis verdiepingsgesprek". De enige eind-CTA is direct: "[Doe de intake](/intake)".
- **Interne links:** Verwerk op een logische, natuurlijke manier in de lopende tekst 2 tot 3 interne links naar andere SEO pagina's met relevante ankerteksten (bijv. 'fitness marketing'). De beschikbare slugs: /fitness-marketing, /pt-studio-marketing, /leden-werven-sportschool, /fitness-leadgeneratie, /small-group-training-marketing, /personal-trainer-marketing, /sportschool-marketing, /gym-marketing, /fitness-leads-opvolgen.
- **De lengte:** Maak het tussen de 800 en 1500 woorden lang.

BELANGRIJK VOOR DEVELOPMENT:
Het resultaat moet PURE Markdown zijn. Retourneer GEEN markdown code blocks (\`\`\`markdown). Geef direct de tekst terug. Sla de frontmatter over! Geef uitsluitend de contentBody terug.
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
        const force = process.argv.includes('--force');
        if (wordCount > 600 && !force) {
            console.log(`⏩ Overslaan: ${slug} heeft al ${wordCount} woorden. Gebruik --force om opnieuw te genereren.`);
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

Schrijf 800 - 1500 woorden in Markdown over de theorieën en valkuilen. Gebruik GEEN markdown dividers en bepekte tussenkoppen. Sluit af met de enige Call to Action: [Doe de intake](/intake). Zorg ook voor de 2-3 interne links zoals beschreven in de system prompt.
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
