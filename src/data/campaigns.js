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
    },

    // ─── META ADS: PIJLER 1 – GROEISYSTEEM / KLANTGEFINANCIERDE ACQUISITIE ───

    // Variatie A: Systeem dat structureel nieuwe leden aantrekt
    'meta-groeisysteem-a': {
        badge: "VOOR GYMONDERNEMERS DIE WILLEN GROEIEN",
        badgeLabel: "",
        badgeLinkLabel: "Bekijk het systeem >",
        headlineStart: "Bouw een systeem dat",
        headlineHighlight: "structureel",
        headlineEnd: " nieuwe leden aantrekt.",
        subtitle: "Wij bouwen met gymondernemers een groeiproces waarbij nieuwe leden je eigen marketing financieren. Een voorspelbaar systeem dat elke maand werkt. Wij garanderen 45 nieuwe leden in 90 dagen.",
        ctaPrimary: "Doe de intake",
        ctaSecondary: "Bekijk de methode"
    },

    // Variatie B: Voorspelbaarheid in ledeninstroom
    'meta-groeisysteem-b': {
        badge: "VOORSPELBARE GROEI VOOR JOUW GYM",
        badgeLabel: "",
        badgeLinkLabel: "Zo werkt het >",
        headlineStart: "Weet elke maand precies",
        headlineHighlight: "wat er binnenkomt",
        headlineEnd: ".",
        subtitle: "Wij geven je een systeem waarmee je elke maand exact weet hoeveel leden er starten. Inzicht. Controle. Rust. Wij garanderen 45 nieuwe leden in 90 dagen.",
        ctaPrimary: "Doe de intake",
        ctaSecondary: "Bekijk de methode"
    },

    // Variatie C: Klantgefinancierde acquisitie
    'meta-groeisysteem-c': {
        badge: "SLIMMER GROEIEN MET JOUW GYM",
        badgeLabel: "",
        badgeLinkLabel: "Ontdek de methode >",
        headlineStart: "Van mond-tot-mond naar",
        headlineHighlight: "klantgefinancierde",
        headlineEnd: " acquisitie.",
        subtitle: "Wij bouwen een systeem dat zichzelf terugbetaalt. Elke nieuwe inschrijving financiert de volgende. Zo groeit jouw gym voorspelbaar en structureel. Gegarandeerd 45 nieuwe leden in 90 dagen.",
        ctaPrimary: "Doe de intake",
        ctaSecondary: "Bekijk de methode"
    },

    // ─── META ADS: PIJLER 2 – COMMUNITY / SAMEN VERDER DAN ALLEEN ───

    // Variatie A: Community die je begrijpt
    'meta-community-a': {
        badge: "JE HOEFT HET NIET ALLEEN TE DOEN",
        badgeLabel: "",
        badgeLinkLabel: "Ontdek de community >",
        headlineStart: "Omring je met gymondernemers die",
        hideBr: true,
        headlineHighlight: "precies",
        headlineEnd: " snappen waar je doorheen gaat.",
        subtitle: "Wij hebben een community gebouwd van gymondernemers met dezelfde missie. Mensen die eerlijk met je sparren en hun oplossingen delen. Zodat jij sneller groeit.",
        ctaPrimary: "Doe de intake",
        ctaSecondary: "Bekijk de methode"
    },

    // Variatie B: Groei met de juiste mensen
    'meta-community-b': {
        badge: "SAMEN VERDER DAN ALLEEN",
        badgeLabel: "",
        badgeLinkLabel: "Bekijk hoe >",
        headlineStart: "Groei sneller met de",
        headlineHighlight: "juiste mensen",
        headlineEnd: " om je heen.",
        subtitle: "Wij omringen gymondernemers met mensen die op hetzelfde niveau spelen. Dezelfde ambitie. Dezelfde drive. Zodat jij nooit meer alleen hoeft te bouwen.",
        ctaPrimary: "Doe de intake",
        ctaSecondary: "Bekijk de methode"
    },

    // Variatie C: Sla jaren over door te leren van anderen
    'meta-community-c': {
        badge: "LEER VAN DE BESTE GYMONDERNEMERS",
        badgeLabel: "",
        badgeLinkLabel: "Ontdek het netwerk >",
        headlineStart: "Sla jaren over door te leren van",
        hideBr: true,
        headlineHighlight: "succesvolle",
        headlineEnd: " gymondernemers.",
        subtitle: "Anderen hebben al meegemaakt wat jij nu doormaakt. Wij geven je directe toegang tot wat zij hebben geleerd. Praktisch. Bewezen. Direct toepasbaar.",
        ctaPrimary: "Doe de intake",
        ctaSecondary: "Bekijk de methode"
    },

    // ─── META ADS: PIJLER 3 – ACCOUNTABILITY & STRUCTUUR ───

    // Variatie A: Wekelijkse monitoring
    'meta-accountability-a': {
        badge: "PROACTIEVE BEGELEIDING VOOR JOUW GYM",
        badgeLabel: "",
        badgeLinkLabel: "Zo werkt het >",
        headlineStart: "Wij monitoren jouw groei",
        headlineHighlight: "wekelijks",
        headlineEnd: ".",
        subtitle: "Wij bekijken elke week de resultaten van onze klanten. Als er iets achterblijft, pakken we de telefoon. Proactief. Zodat jij altijd op koers blijft richting je doelen.",
        ctaPrimary: "Doe de intake",
        ctaSecondary: "Bekijk de methode"
    },

    // Variatie B: Structuur die doordraait
    'meta-accountability-b': {
        badge: "GROEI DIE DOORDRAAIT",
        badgeLabel: "",
        badgeLinkLabel: "Bekijk de structuur >",
        headlineStart: "Een groeistructuur die draait",
        hideBr: true,
        headlineHighlight: "ook als jij",
        headlineEnd: " even niet kunt.",
        subtitle: "Wij bouwen een systeem met wekelijkse check-ins en proactieve begeleiding. Zodat de machine blijft draaien. Ook als jij even minder aanwezig bent. Gegarandeerd.",
        ctaPrimary: "Doe de intake",
        ctaSecondary: "Bekijk de methode"
    },

    // Variatie C: Strak wekelijks ritme
    'meta-accountability-c': {
        badge: "STRUCTUUR ACHTER JOUW GROEI",
        badgeLabel: "",
        badgeLinkLabel: "Ontdek het ritme >",
        headlineStart: "Zet structuur achter je",
        headlineHighlight: "groei",
        headlineEnd: " met een strak wekelijks ritme.",
        subtitle: "Onze klanten werken met vaste meetmomenten. Cijfers worden besproken. Acties worden gezet. Wij zijn er proactief als eerste bij als iets achterblijft.",
        ctaPrimary: "Doe de intake",
        ctaSecondary: "Bekijk de methode"
    }
};
