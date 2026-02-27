import fs from 'fs';
import path from 'path';
import { google } from 'googleapis';

// Let op: Dit script vereist een Google Service Account JSON key.
// Zorg dat deze is aangemaakt in Google Cloud Console en is toegevoegd aan Google Search Console
// als 'Eigenaar' (verplicht voor de Indexing API).

const SERVICE_ACCOUNT_KEY = 'ivory-amplifier-337717-d9f13e4949e6.json';
const SERVICE_ACCOUNT_KEY_PATH = path.resolve(SERVICE_ACCOUNT_KEY);
const SEO_DIR = path.resolve('src/content/seo');

const HOSTNAME = 'https://www.vollegym.nl';

async function main() {
    if (!fs.existsSync(SERVICE_ACCOUNT_KEY_PATH)) {
        console.error('❌ Service Account key niet gevonden!');
        console.error(`Plaats je service account configuratie in: ${SERVICE_ACCOUNT_KEY_PATH}`);
        console.error('Bekijk de documentatie van Google Indexing API voor het aanmaken van een service account.');
        process.exit(1);
    }

    console.log('✅ Service Account key gevonden.');

    const keyFile = JSON.parse(fs.readFileSync(SERVICE_ACCOUNT_KEY_PATH, 'utf8'));

    const jwtClient = new google.auth.JWT(
        keyFile.client_email,
        null,
        keyFile.private_key,
        ['https://www.googleapis.com/auth/indexing'],
        null
    );

    try {
        await jwtClient.authorize();
        console.log('✅ Geautoriseerd bij Google API.');
    } catch (err) {
        console.error('❌ Fout bij autorisatie:', err.message);
        process.exit(1);
    }

    // Lees de pagina's uit de markdown map
    const mdFiles = fs.existsSync(SEO_DIR) ? fs.readdirSync(SEO_DIR).filter(f => f.endsWith('.md')) : [];
    const seoSlugs = mdFiles.map(file => file.replace('.md', ''));

    const urlsToIndex = seoSlugs.map(slug => `${HOSTNAME}/${slug}`);

    // Voeg home en intake ook toe indien gewenst
    urlsToIndex.push(`${HOSTNAME}/`);
    urlsToIndex.push(`${HOSTNAME}/intake`);

    console.log(`🚀 Starten met het indienen van ${urlsToIndex.length} URL's bij de Indexing API...`);

    let successCount = 0;
    let failCount = 0;

    // Google heeft strikte quota (rond de 100-200 per batch/dag per project), 
    // en het is netjes om een kleine delay te gebruiken per request.
    for (const url of urlsToIndex) {
        try {
            const body = JSON.stringify({
                url: url,
                type: 'URL_UPDATED' // 'URL_DELETED' can be used for removal
            });

            await jwtClient.request({
                method: 'POST',
                url: 'https://indexing.googleapis.com/v3/urlNotifications:publish',
                data: body,
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log(`✅ Ingegeven: ${url}`);
            successCount++;

            // Wacht 200ms tussen requests om de rate limiter vriendelijk te behandelen
            await new Promise(resolve => setTimeout(resolve, 200));
        } catch (error) {
            console.error(`❌ Gefaald voor: ${url}`, error.response?.data?.error?.message || error.message);
            failCount++;
        }
    }

    console.log('\n======================================');
    console.log(`Klaar met bulk indexeren!`);
    console.log(`Geslaagd: ${successCount}`);
    console.log(`Mislukt:  ${failCount}`);
    console.log('======================================');

    if (failCount > 0) {
        console.log('Let op: Google Indexing API is officieel bedoeld voor JobPostings en LiveStreams.');
        console.log('Voor reguliere webpagina\'s kan Google GSC quota restricties opleggen.');
    }
}

main().catch(console.error);
