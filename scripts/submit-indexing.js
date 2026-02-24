/**
 * Google Search Console Indexing API Script
 * Submits alle SEO pagina's voor indexering na een deploy.
 *
 * Gebruik: node scripts/submit-indexing.js
 * Vereist: GOOGLE_SERVICE_ACCOUNT_KEY_PATH environment variable
 */

/* global process */
import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Laad SEO pagina's uit het JSON bestand
const seoPages = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../src/data/seo-pages.json'), 'utf8')
);

// Vaste pagina's die ook geindexeerd moeten worden
const staticPages = [
    '/',
    '/intake',
    '/privacy',
    '/voorwaarden'
];

const SITE_URL = 'https://www.vollegym.nl';

async function submitSitemap(auth) {
    try {
        const client = await auth.getClient();
        const searchconsole = google.searchconsole({ version: 'v1', auth: client });

        await searchconsole.sitemaps.submit({
            siteUrl: 'https://www.vollegym.nl',
            feedpath: 'https://www.vollegym.nl/sitemap.xml'
        });

        console.log('Sitemap submitted!');
    } catch (error) {
        console.error(`Status sitemap submit: kon niet worden voltooid (${error.message})`);
    }
}

async function main() {
    // Authenticatie via Service Account
    const keyPath = process.env.GOOGLE_SERVICE_ACCOUNT_KEY_PATH;
    if (!keyPath) {
        console.error('Set GOOGLE_SERVICE_ACCOUNT_KEY_PATH environment variable');
        process.exit(1);
    }

    const authIndexing = new google.auth.GoogleAuth({
        keyFile: keyPath,
        scopes: ['https://www.googleapis.com/auth/indexing']
    });

    const client = await authIndexing.getClient();
    const indexing = google.indexing({ version: 'v3', auth: client });

    // Verzamel alle URL's
    const allUrls = [
        ...staticPages.map(p => `${SITE_URL}${p}`),
        ...seoPages.map(p => `${SITE_URL}/${p.slug}`)
    ];

    console.log(`Submitting ${allUrls.length} URL's voor indexering...\n`);

    // Submit elke URL
    for (const url of allUrls) {
        try {
            const result = await indexing.urlNotifications.publish({
                requestBody: {
                    url: url,
                    type: 'URL_UPDATED'
                }
            });
            console.log(`[OK] ${url} — ${result.status}`);
        } catch (error) {
            console.error(`[FOUT] ${url} — ${error.message}`);
        }

        // Rate limiting: 200 requests per minuut max (wacht ~350ms)
        await new Promise(resolve => setTimeout(resolve, 350));
    }

    console.log('\nIndexering requests verstuurd!');

    // Sitemap auth has different scopes
    const authSearchConsole = new google.auth.GoogleAuth({
        keyFile: keyPath,
        scopes: ['https://www.googleapis.com/auth/webmasters']
    });

    await submitSitemap(authSearchConsole);
}

main().catch(console.error);
