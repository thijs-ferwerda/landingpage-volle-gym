// src/data/campaigns.js

/**
 * Dit bestand beheert de dynamische teksten voor Google Ads landingspagina's.
 * Door simpelweg nieuwe 'keys' toe te voegen, kan AI of een marketeer 
 * razendsnel nieuwe landingspagina-varianten maken.
 * 
 * Verkeer sturen naar: /?campaign=[key]
 */

const isVariationB = Math.random() > 0.5;

export const campaigns = {
    // Standaard 'fallback' (organisch verkeer) met A/B split test op de Hero Header
    default: {
        badge: "",
        badgeLabel: "",
        badgeLinkLabel: "",
        headlineStart: isVariationB ? "Wil je structureel meer" : "Is jouw gym momenteel",
        headlineHighlight: isVariationB ? "leden" : "leeg",
        headlineEnd: isVariationB ? " voor je gym?" : ", of vol?",
        subtitle: "Zonder een voorspelbaar systeem blijf je afhankelijk van hoop en mond-tot-mondreclame. Wij vullen jouw PT-studio of Small Group gym systematisch met ideale leden. Gegarandeerd.",
        ctaPrimary: "Doe de intake",
        ctaSecondary: "Bekijk de methode"
    },

    // 'pt' campagne: Gericht op kwetsbare personal trainers die willen schalen
    pt: {
        badge: "UITSLUITEND VOOR PERSONAL TRAINERS",
        badgeLabel: "Speciaal:",
        badgeLinkLabel: "Ontdek het systeem >",
        headlineStart: "Van worstelende PT'er naar",
        headlineHighlight: "winstgevende",
        headlineEnd: "schaalbare club.",
        subtitle: "Stop met de gemaakte uren ruilen voor geld. Pak regie en bouw een winstgevend ledenbestand op. Met keiharde resultaatsgarantie.",
        ctaPrimary: "Resultaten Bekijken",
        ctaSecondary: "Boek Intake"
    },

    // 'boutique' campagne: Gericht op yoga/pilates/boutique gyms
    boutique: {
        badge: "VOOR BOUTIQUE EN NICHE GYMS",
        badgeLabel: "Focus:",
        badgeLinkLabel: "Lees meer >",
        headlineStart: "Meer loyale leden voor jouw",
        headlineHighlight: "boutique",
        headlineEnd: "gym of studio.",
        subtitle: "Jij levert kwaliteit op de vloer, wij regelen een niet te stoppen stroom aan proeflessen voor jouw unieke concept.",
        ctaPrimary: "Resultaten Bekijken",
        ctaSecondary: "Boek Intake"
    },

    // 'leadgen' campagne: Gericht op pure de generatie van fitness marketing "leads"
    leadgen: {
        badge: "STOP MET PRUTSEN MET VERKEERDE LEADS",
        badgeLabel: "Let op:",
        badgeLinkLabel: "Zo doen wij het >",
        headlineStart: "Geen lege beloftes,",
        headlineHighlight: "alleen startende",
        headlineEnd: "betalende leden.",
        subtitle: "Bespaar duizenden euro's aan inefficiënte bureaus. Wij leveren een end-to-end systeem inclusief opvolging met een keiharde ROI-garantie: je betaalt voor commitment, maar krijgt je investering pro-rato terug voor elk lid dat we missen op de belofte.",
        ctaPrimary: "Onze Methode",
        ctaSecondary: "Boek Intake"
    }
};
