# SEO Strategie Instructies voor Volle Gym (vollegym.nl)

> Dit document is het complete instructiebestand voor de AI-agent die de SEO-strategie uitrolt.
> Doel: Volle Gym organisch laten ranken op alle relevante zoekwoorden in de Nederlandse fitness-marketing markt.

---

## 1. PROJECT CONTEXT

### Wat is Volle Gym?
- **Bedrijf:** Volle Gym — Het #1 marketingbureau voor sportscholen in Nederland
- **Website:** https://www.vollegym.nl
- **Oprichters:** Bas & Bart
- **Opgericht:** 2024
- **Core belofte:** "Gegarandeerd 45 leden in 90 dagen of geld terug"
- **Doelgroep:** Personal Trainers, Boutique Gyms (yoga/pilates), Small Group Fitness Studios, reguliere sportscholen
- **Reviews:** 5.0 sterren (21 reviews op Google)

### Tech Stack
- **Framework:** React 19 + Vite 7
- **Styling:** Tailwind CSS 4
- **Routing:** React Router DOM 7 (SPA)
- **Hosting:** Vercel
- **Animaties:** GSAP
- **SEO Tools:** react-helmet-async, vite-plugin-sitemap
- **Sitemap:** Automatisch gegenereerd via vite-plugin-sitemap (hostname: https://www.vollegym.nl)

### Huidige Pagina Structuur
```
/                          → Homepage (dynamisch via ?campaign=pt|boutique|leadgen)
/fitness-marketing-bureau  → SEO pagina (bestaand)
/sportschool-marketing-tips → SEO pagina (bestaand)
/intake                    → Intake formulier
/intake/gekwalificeerd     → Gekwalificeerde intake
/sorry                     → Afwijzing pagina
/privacy                   → Privacy Policy
/voorwaarden               → Terms of Service
/:slug                     → Dynamische SEO pagina's (via seo-pages.json)
```

### Hoe SEO Pagina's Werken
De site gebruikt een **JSON-driven SEO page systeem**. Alle SEO pagina's worden aangemaakt door entries toe te voegen aan:

**Bestand:** `src/data/seo-pages.json`

**Format per pagina:**
```json
{
    "slug": "url-slug-hier",
    "title": "SEO Title | Volle Gym",
    "description": "Meta description voor Google (max 155 karakters).",
    "heroTitleLine1": "Eerste regel heading",
    "heroTitleLine2": "tweede deel",
    "heroTitleLine3": " extra tekst",
    "heroTitleLine4": "cursieve highlight.",
    "heroSubtitle": "Ondertitel paragraph tekst.",
    "contentSectionTitle": "H2 boven de content",
    "contentBody": "<p>HTML content body. Gebruik <strong>, <h3>, en <p> tags.</p>"
}
```

**Belangrijk:**
- De `slug` wordt automatisch de URL: `https://www.vollegym.nl/{slug}`
- De sitemap wordt automatisch gegenereerd in de build via `vite-plugin-sitemap`
- `contentBody` accepteert HTML: gebruik `<h3>`, `<p>`, `<strong>` tags
- Elke pagina heeft automatisch een CTA sectie onderaan ("Plan een Intakegesprek")
- Canonical tags worden automatisch gezet

---

## 2. ZOEKWOORDEN DATABASE

### Tier 1: Primaire Zoekwoorden (HOOGSTE PRIORITEIT)
Elk van deze zoekwoorden moet een eigen SEO-pagina krijgen in `seo-pages.json`.

| Zoekwoord | Slug Voorstel | Zoekintentie |
|---|---|---|
| fitness marketing bureau | `fitness-marketing-bureau` | Commercieel (BESTAAT AL) |
| sportschool marketing | `sportschool-marketing` | Commercieel |
| leden werven sportschool | `leden-werven-sportschool` | Commercieel |
| personal trainer marketing | `personal-trainer-marketing` | Commercieel |
| fitness leadgeneratie | `fitness-leadgeneratie` | Commercieel |
| meer leden sportschool | `meer-leden-sportschool` | Informatief/Commercieel |
| gym marketing | `gym-marketing` | Commercieel |
| fitness marketing Nederland | `fitness-marketing-nederland` | Commercieel |
| ledenwerving fitness | `ledenwerving-fitness` | Commercieel |
| sportschool marketing bureau | `sportschool-marketing-bureau` | Commercieel |
| PT studio marketing | `pt-studio-marketing` | Commercieel |
| boutique gym marketing | `boutique-gym-marketing` | Commercieel |

### Tier 2: Long-tail Zoekwoorden (HOGE PRIORITEIT)
Deze zoekwoorden moeten verwerkt worden in bestaande of nieuwe pagina's.

**Probleem-gebaseerd (pijn van doelgroep):**
- hoe krijg ik meer leden in mijn sportschool
- sportschool loopt leeg wat nu
- waarom werven mijn Facebook ads geen gym leden
- personal trainer geen klanten wat te doen
- sportschool marketing werkt niet
- hoe voorkom ik ledenverlies sportschool
- sportschool omzet daalt oplossingen
- fitness leads nemen telefoon niet op

**Oplossing-gebaseerd:**
- fitness marketing bureau inhuren kosten
- beste fitness marketing bureau Nederland
- sportschool marketing uitbesteden
- gegarandeerd meer leden sportschool
- leadgeneratie personal training studio
- marketing systeem sportschool
- gym marketing met garantie
- boutique gym leden werven systeem
- PT studio schalen meer klanten

**Vergelijkend/Alternatief:**
- hidden profits marketing alternatief
- fitness marketing bureau vergelijken
- gymleads vs volle gym

**Niche-specifiek:**
- yoga studio meer klanten krijgen
- pilates studio marketing Nederland
- CrossFit box leden werven
- kickboks school marketing

### Tier 3: Informatieve Zoekwoorden (CONTENT MARKETING)
Gebruik voor blogachtige SEO pagina's.

- hoeveel kost een fitness lead
- wat is een goede conversie sportschool
- sportschool marketing strategie 2026
- personal trainer business model
- social media strategie sportschool
- sportschool referral programma opzetten
- retentie verhogen fitness leden
- fitness marketing trends 2026

---

## 3. SEO PAGINA'S AANMAKEN — UITVOERINGSINSTRUCTIES

### Stap 1: Genereer de SEO pagina's
Maak voor ELKE Tier 1 en Tier 2 zoekwoord een entry in `src/data/seo-pages.json`.

**Regels voor elke pagina:**
1. **Title tag:** Bevat het primaire zoekwoord + "| Volle Gym" (max 60 karakters)
2. **Meta description:** Bevat het zoekwoord, een USP, en een CTA (max 155 karakters)
3. **H1 (heroTitleLine1-4):** Bevat het zoekwoord natuurlijk verwerkt
4. **heroSubtitle:** 1-2 zinnen die de pijn van de doelgroep benoemen + hint naar de oplossing
5. **contentSectionTitle (H2):** Variatie op het zoekwoord als vraag of statement
6. **contentBody:** Minimaal 800 woorden, gestructureerd met H3 subkoppen

**Content structuur per pagina:**
```
<p>Inleiding: herken het probleem van de lezer (2-3 zinnen)</p>

<h3>Subkop 1: Het probleem uitdiepen</h3>
<p>Beschrijf de pijn, gebruik data/statistieken waar mogelijk</p>

<h3>Subkop 2: Waarom traditionele aanpakken falen</h3>
<p>Positioneer tegen generieke bureaus, losse leads, ad-hoc marketing</p>

<h3>Subkop 3: De Volle Gym aanpak</h3>
<p>Beschrijf het systeem: Duurzame Acquisitie + Community + Accountability</p>

<h3>Subkop 4: Bewezen resultaten</h3>
<p>Noem concrete cijfers: 40+ gyms, 2.840 nieuwe leden, 5.124 trials, case study voorbeelden</p>

<h3>Subkop 5: Hoe het werkt</h3>
<p>3 stappen: 1. Chaos Verwijderen, 2. Capaciteit Creëren, 3. Blijvende Verandering</p>
```

**Tone of voice:**
- Direct, geen bullshit, resultaatgericht
- Spreek de lezer aan als "je/jij"
- Gebruik concrete cijfers en voorbeelden
- Nooit vaag of wollig — alles moet meetbaar zijn
- Nederlands, geen Engelse termen tenzij gangbaar in de fitness industrie

**Case study data die je kunt gebruiken:**
| Naam | Resultaat |
|---|---|
| Melissa Pach | 18 leden in 1 maand |
| Murat Son | 72 leden in 3 maanden |
| Hugo Le Jollec | 35 leden in 2 maanden |
| Radjin Pitai | 34 leden in 5 weken |
| Sanne Hendriks | 20 leden in 1 week |
| Benjamin van Keulen | 28 leden in 1 maand |
| Mike Bosselaar | 25 leden in 5 weken |
| Casper Hazeveld | 30 leden in 1 maand |
| Mauricio Franklin | 20 leden in 1 maand |
| Michel Dekker | 35 leden in 3 maanden |
| Ulrich Heidstra | 15 leden in 1 maand |
| Danielle Sabajo | 35 leden in 2 maanden |
| Jan Donker | 30 leden in 2 maanden |
| Emmy van Erp | 15 leden in 1 maand |

### Stap 2: Interne Linking
In elke `contentBody` moet je linken naar relevante andere SEO pagina's:
- Gebruik `<a href="/slug">anchor tekst</a>` format
- Elke pagina moet minimaal 2-3 interne links bevatten
- Link altijd naar `/intake` als CTA-link

### Stap 3: Bouw en Deploy
Na het updaten van `seo-pages.json`:
```bash
npm run build
```
De sitemap wordt automatisch gegenereerd met alle nieuwe routes.

---

## 4. GOOGLE SEARCH CONSOLE API — INDEXERING

### Doel
Na elke deploy moeten alle nieuwe pagina's direct worden aangemeld bij Google voor indexering via de Search Console Indexing API.

### Setup Vereisten
1. **Google Cloud Project** met de Indexing API enabled
2. **Service Account** met JSON key
3. **Search Console** eigendom geverifieerd voor `vollegym.nl`
4. **Service account email** toegevoegd als eigenaar in Search Console

### Indexering Script
Maak het bestand `scripts/submit-indexing.js` aan:

```javascript
/**
 * Google Search Console Indexing API Script
 * Submits alle SEO pagina's voor indexering na een deploy.
 *
 * Gebruik: node scripts/submit-indexing.js
 * Vereist: GOOGLE_SERVICE_ACCOUNT_KEY_PATH environment variable
 */

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

async function main() {
    // Authenticatie via Service Account
    const keyPath = process.env.GOOGLE_SERVICE_ACCOUNT_KEY_PATH;
    if (!keyPath) {
        console.error('Set GOOGLE_SERVICE_ACCOUNT_KEY_PATH environment variable');
        process.exit(1);
    }

    const auth = new google.auth.GoogleAuth({
        keyFile: keyPath,
        scopes: ['https://www.googleapis.com/auth/indexing']
    });

    const client = await auth.getClient();
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

        // Rate limiting: 200 requests per minuut max
        await new Promise(resolve => setTimeout(resolve, 350));
    }

    console.log('\nIndexering requests verstuurd!');
}

main().catch(console.error);
```

### Dependencies toevoegen
```bash
npm install googleapis
```

### Package.json script toevoegen
Voeg toe aan `scripts` in `package.json`:
```json
"index": "node scripts/submit-indexing.js"
```

### Gebruik na deploy
```bash
# Na elke build + deploy:
GOOGLE_SERVICE_ACCOUNT_KEY_PATH=./service-account-key.json npm run index
```

### Sitemap ook submitten via Search Console API
Naast individuele URL's, submit ook de sitemap:

```javascript
// Voeg toe aan het indexering script of maak apart:
import { google } from 'googleapis';

async function submitSitemap() {
    const auth = new google.auth.GoogleAuth({
        keyFile: process.env.GOOGLE_SERVICE_ACCOUNT_KEY_PATH,
        scopes: ['https://www.googleapis.com/auth/webmasters']
    });

    const client = await auth.getClient();
    const searchconsole = google.searchconsole({ version: 'v1', auth: client });

    await searchconsole.sitemaps.submit({
        siteUrl: 'https://www.vollegym.nl',
        feedpath: 'https://www.vollegym.nl/sitemap.xml'
    });

    console.log('Sitemap submitted!');
}
```

---

## 5. SEO PAGINA PLANNING — VOLGORDE VAN UITVOERING

### Fase 1: Core Pagina's (Week 1-2) — 10 pagina's
Hoogste zoekvolume, directe commerciele intentie.

1. `sportschool-marketing` — Sportschool Marketing
2. `leden-werven-sportschool` — Leden Werven Sportschool
3. `personal-trainer-marketing` — Personal Trainer Marketing
4. `fitness-leadgeneratie` — Fitness Leadgeneratie
5. `meer-leden-sportschool` — Meer Leden Sportschool
6. `gym-marketing` — Gym Marketing
7. `fitness-marketing-nederland` — Fitness Marketing Nederland
8. `ledenwerving-fitness` — Ledenwerving Fitness
9. `sportschool-marketing-bureau` — Sportschool Marketing Bureau
10. `pt-studio-marketing` — PT Studio Marketing

### Fase 2: Segment Pagina's (Week 3-4) — 8 pagina's
Niche-specifiek, lage concurrentie, hoge conversie.

11. `boutique-gym-marketing` — Boutique Gym Marketing
12. `yoga-studio-marketing` — Yoga Studio Marketing
13. `pilates-studio-leden-werven` — Pilates Studio Leden Werven
14. `crossfit-box-marketing` — CrossFit Box Marketing
15. `kickboks-school-marketing` — Kickboks School Marketing
16. `small-group-training-marketing` — Small Group Training Marketing
17. `personal-training-klanten-werven` — Personal Training Klanten Werven
18. `fitness-studio-groei` — Fitness Studio Groei

### Fase 3: Probleem Pagina's (Week 5-6) — 8 pagina's
Informatieve content, top-of-funnel, trekt frustratie-zoekers.

19. `sportschool-marketing-werkt-niet` — Waarom Sportschool Marketing Niet Werkt
20. `fitness-leads-opvolgen` — Fitness Leads Opvolgen
21. `sportschool-omzet-verhogen` — Sportschool Omzet Verhogen
22. `ledenverlies-sportschool-voorkomen` — Ledenverlies Sportschool Voorkomen
23. `sportschool-retentie-verhogen` — Sportschool Retentie Verhogen
24. `fitness-marketing-kosten` — Fitness Marketing Kosten
25. `sportschool-marketing-uitbesteden` — Sportschool Marketing Uitbesteden
26. `fitness-marketing-bureau-vergelijken` — Fitness Marketing Bureau Vergelijken

### Fase 4: Informatieve Pagina's (Week 7-8) — 6 pagina's
Educatief, link-waardig, autoriteitsopbouw.

27. `hoeveel-kost-een-fitness-lead` — Hoeveel Kost een Fitness Lead
28. `sportschool-marketing-strategie` — Sportschool Marketing Strategie
29. `social-media-strategie-sportschool` — Social Media Strategie Sportschool
30. `personal-trainer-business-model` — Personal Trainer Business Model
31. `sportschool-referral-programma` — Sportschool Referral Programma
32. `fitness-marketing-trends-2026` — Fitness Marketing Trends 2026

---

## 6. CONCURRENTEN — CONTEXT

| Concurrent | URL | Zwakte om op te spelen |
|---|---|---|
| Hidden Profits Marketing | hiddenprofitsmarketing.com | Geen geld-terug-garantie, breed (niet niche) |
| Sportleads | sportleads.nl | Minder zichtbare resultaten |
| GymLeads | gymleads.nl | Alleen leadgen, geen compleet systeem |
| FitAds | fitads.nl | Minder social proof |
| Marketing by Bulls | marketingbybulls.nl | Niet 100% NL-gericht |
| Odiv | odiv.nl | Niet puur fitness |
| Mile Company | mile-company.com | Coaching, geen marketing executie |

---

## 7. TECHNISCHE SEO CHECKLIST

- [ ] Alle SEO pagina's toegevoegd aan `seo-pages.json`
- [ ] `npm run build` succesvol (sitemap gegenereerd)
- [ ] Sitemap bevat alle nieuwe URL's (`dist/sitemap.xml` controleren)
- [ ] Canonical tags correct op elke pagina
- [ ] Title tags uniek en < 60 karakters
- [ ] Meta descriptions uniek en < 155 karakters
- [ ] Interne links verwerkt in contentBody
- [ ] `robots.txt` staat indexering toe
- [ ] Google Search Console Indexing API draait na deploy
- [ ] Alle URL's gesubmit via Indexing API

---

## 8. STRUCTURED DATA UITBREIDINGEN

Voeg aan `src/components/SEO.jsx` de volgende schema types toe:

### FAQ Schema (voor pagina's met veelgestelde vragen)
```json
{
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Hoeveel kost een fitness marketing bureau?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Bij Volle Gym werk je met een resultaatgarantie..."
            }
        }
    ]
}
```

### Service Schema
```json
{
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Fitness Marketing & Ledenwerving",
    "provider": {
        "@type": "Organization",
        "name": "Volle Gym"
    },
    "areaServed": "NL",
    "description": "Compleet marketing systeem voor sportscholen..."
}
```

---

## 9. KPI'S EN SUCCES METRICS

Na 3 maanden moet het volgende bereikt zijn:
- **30+ SEO pagina's** live en geindexeerd
- **Top 10 ranking** op minimaal 5 Tier 1 zoekwoorden
- **Top 20 ranking** op minimaal 15 Tier 2 zoekwoorden
- **Organisch verkeer** minimaal 500 sessies/maand
- **Intake aanvragen** via organisch verkeer: minimaal 10/maand

---

## 10. SAMENVATTING WORKFLOW

```
1. Genereer SEO pagina content (seo-pages.json vullen)
2. Verwerk interne links tussen pagina's
3. npm run build (sitemap auto-generated)
4. Deploy naar Vercel
5. Run indexering script (npm run index)
6. Controleer Google Search Console op indexeringsstatus
7. Herhaal voor volgende batch pagina's
```
