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
    // Standaard 'fallback' (organisch verkeer)
    default: {
        badge: "",
        badgeLabel: "",
        badgeLinkLabel: "",
        headlineStart: "Wil je structureel",
        headlineHighlight: "meer leden",
        headlineEnd: " voor jouw gym?",
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
    },

    // 'uitgeputte-trainer' (Script 1)
    'uitgeputte-trainer': {
        badge: "DIT IS VAST HERKENBAAR VOOR JE",
        badgeLabel: "",
        badgeLinkLabel: "Lees verder >",
        headlineStart: "Je studio groeit niet. En jij bent",
        hideBr: true,
        headlineHighlight: "kapot",
        headlineEnd: ".",
        subtitle: "Jij bent trainer, geen marketeer. Stop met zelf advertenties draaien of bureaus betalen die je markt niet snappen. De beste trainers besteden de rest uit. Wij garanderen 45 nieuwe klanten in 90 dagen. Halen we dat niet? Dan betaal je alleen voor de leden die we wel hebben behaald.",
        ctaPrimary: "Doe de intake",
        ctaSecondary: "Bekijk de methode"
    },

    // 'locatie-2' (Script 4A)
    'locatie-2': {
        badge: "WAUW, EEN TWEEDE LOCATIE! MAAR...?",
        badgeLabel: "",
        badgeLinkLabel: "Zo doe je dat >",
        headlineStart: "Je doet nog steeds",
        headlineHighlight: "alles",
        headlineEnd: " zelf.",
        subtitle: "Die tweede locatie ligt al maanden te wachten, want je bent te druk met de eerste. Je komt pas verder als je nieuwe klanten uit handen geeft. Wat voor anderen werkte, garanderen wij voor jou: 45 nieuwe klanten in 90 dagen. Halen we dat niet? Dan betalen we je terug voor de leden die we hebben gemist.",
        ctaPrimary: "Doe de intake",
        ctaSecondary: "Bekijk de methode"
    },

    // 'voorspelbaar' (Script 2)
    'voorspelbaar': {
        badge: "HET VOELT ALS EEN ACHTBAAN, WANT ...",
        badgeLabel: "",
        badgeLinkLabel: "De Oplossing >",
        headlineStart: "De groei van je studio is",
        headlineHighlight: "onvoorspelbaar",
        headlineEnd: ".",
        subtitle: "Zonder zekerheid kun je niks plannen. Geen tweede locatie. Geen uitbreiding. Ga je zelf het wiel uitvinden, of neem je over wat al werkt voor 40+ studio's? Wij garanderen 45 nieuwe klanten in 90 dagen. Lukt dat niet? Dan betaal je alleen voor de leden die je krijgt.",
        ctaPrimary: "Doe de intake",
        ctaSecondary: "Bekijk de methode"
    }
};
