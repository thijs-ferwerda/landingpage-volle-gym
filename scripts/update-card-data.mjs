import fs from 'fs';
import path from 'path';

const map = {
    'boutique-gym-marketing': {
        title: 'Hoe je een Boutique Gym vult met loyale high-end leden',
        desc: 'Ontdek de specifieke marketingstrategieën om jouw niche studio onder de aandacht te brengen bij de juiste doelgroep en het aantal proeflessen te maximaliseren.'
    },
    'fitness-leadgeneratie': {
        title: 'De formule om voorspelbaar kwalitatieve leads aan te trekken',
        desc: 'Stop met afhankelijk zijn van geluk. Leer hoe je met de juiste advertentie-architectuur maandelijks tientallen serieuze aanvragen voor je gym genereert.'
    },
    'fitness-leads-opvolgen': {
        title: 'Scripts & Systemen: Hoe je leads converteert naar betalende leden',
        desc: 'Een lead is nog geen lid. Ontdek de bewezen opvolg-methodiek en belscripts waarmee je zacht weifelende prospects omzet in harde sales voor je club.'
    },
    'fitness-marketing-bureau': {
        title: 'Zelf doen of uitbesteden? De waarheid over marketing bureaus',
        desc: 'Waar moet je op letten bij het kiezen van een partner? Inzichten om te voorkomen dat je budget verbrandt aan bureaus die de fitnessbranche niet begrijpen.'
    },
    'fitness-marketing-nederland': {
        title: 'De staat van de Nederlandse fitnessmarkt: Kansen voor jouw studio',
        desc: 'Een objectieve blik op het huidige landschap. Waar laten de meeste sportscholen momenteel geld liggen en hoe kun jij je lokaal sterk onderscheiden?'
    },
    'fitness-studio-groei': {
        title: 'Het 90-dagen stappenplan voor schaalbare groei van je studio',
        desc: 'Van chaos naar controle: een stapsgewijze blauwdruk om de ledeninstroom te systematiseren en strategisch te bouwen aan een wachtlijst voor jouw club.'
    },
    'gym-marketing': {
        title: 'Gym Marketing Blueprint: Van lege zaal naar volle wachtlijst',
        desc: 'De fundamentele principes van gym marketing uitgelegd. Geen tijdelijke hypes, maar een tijdloos inzicht in het opzetten van duurzame lid-acquisitie.'
    },
    'high-ticket-pt-sales': {
        title: 'High-ticket sales: Hoe je PT trajecten verkoopt zonder korting',
        desc: 'Leer in gesprekken bezwaren overbruggen en de daadwerkelijke waarde van jouw begeleiding verkopen, in plaats van te concurreren op uurtarieven.'
    },
    'leden-werven-sportschool': {
        title: 'Structureel nieuwe leden werven voor je sportschool of club',
        desc: 'De verschuiving van losse stressvolle kwartaal-acties naar een permanent instroom-systeem. Ontdek hoe je de afhankelijkheid van seizoenspieken de kop indrukt.'
    },
    'ledenwerving-fitness': {
        title: 'De #1 ledenwerving strategie voor resultaatgerichte gyms',
        desc: 'Waarom traditionele "gratis proefweek" advertenties averechts kunnen werken, en welke onweerstaanbare aanbiedingen wél kwalitatieve bezoekers trekken.'
    },
    'meer-leden-sportschool': {
        title: 'Meer leden aantrekken in tijden van toenemende concurrentie',
        desc: 'Hoe zorg je dat jouw PT studio de logische keuze wordt in een overvolle lokale markt? Leer positionering, aanbod en zichtbaarheid strategisch combineren.'
    },
    'personal-trainer-leads': {
        title: 'Stop met netwerken: Genereer voorspelbaar leads voor je PT business',
        desc: 'Verruil het handmatig leuren om klanten via via voor een geautomatiseerde online pijplijn die dag en nacht werkt, zodat jij je kunt focussen op coachen.'
    },
    'personal-trainer-marketing': {
        title: 'De complete marketing gids voor ambitieuze Personal Trainers',
        desc: 'Een deep-dive in de essentiële elementen om jezelf als autoriteit in de markt te branden, de juiste premium doelgroep te bereiken en je agenda te vullen.'
    },
    'personal-training-klanten-werven': {
        title: 'Hoe je consistent high-end klanten werft voor je Personal Training',
        desc: 'Trek klanten aan die bereid zijn te betalen voor kwaliteit. Leer hoe je online de absolute waarden van een totale gezondheidstransformatie overbrengt.'
    },
    'pt-studio-marketing': {
        title: 'PT Studio Marketing: Versla de basis-gyms met dit systeem',
        desc: 'Speel niet in op prijs, maar op resultaat. Hoe je met specifieke marketing de premium uitstraling van je PT studio vertaalt naar een wekelijkse stroom intakes.'
    },
    'pt-studio-starten-marketing': {
        title: 'Start je een PT studio? Vanaf dag 1 winstgevend met marketing',
        desc: 'Ontdek de valkuilen bij de lancering en hoe je zorgt dat je pre-sale structuur al zo doordacht is, dat je met een deels vol rooster je deuren rustig opent.'
    },
    'small-group-leden-werven': {
        title: 'Small Group klassen continu vol plannen zonder losse aanwas',
        desc: 'Het specifieke en bewezen acquisitiemodel voor Small Group Training om de sfeer hoog te houden en capaciteit altijd tot de laatste mat maximaal te benutten.'
    },
    'small-group-training-marketing': {
        title: 'De ultieme marketingstrategie voor schaalbare Small Group Training',
        desc: 'Hoe positioneer je Small Group Training vergeleken met reguliere fitness of 1-op-1 PT in je uitingen? Leer exact de juiste snaar raken bij je beoogde doelgroep.'
    },
    'sportschool-marketing-bureau': {
        title: 'Trap niet in loze beloftes: Zo kies je de unieke marketing partner',
        desc: 'Wat zijn de keiharde rode vlaggen tijdens een sales call met bureaus? Krijg de handvatten om kaf van koren te scheiden in de woelige marketingwereld.'
    },
    'sportschool-marketing-tips': {
        title: '10 Direct toepasbare marketing tips voor ambitieuze gymeigenaren',
        desc: 'Praktische, razendsnel te implementeren adviezen voor je website lay-out, social media kanalen en opvolging die direct deze week zorgen voor een hogere conversie.'
    },
    'sportschool-marketing-werkt-niet': {
        title: 'Waarom je huidige leads niets opleveren (en de échte iteratie)',
        desc: 'Een dissectie van de meest voorkomende pijnpunten in de leadopvolging en ad-copy waardoor advertentiebudget lijkt te verdampen zonder nieuwe contracten.'
    },
    'sportschool-marketing': {
        title: 'Het A-Z systeem om jouw sportschool structureel te laten groeien',
        desc: 'Een hoog-over en holistische blik op de drieluik van acquisitie: vanaf het eerste vonkje online in een advertentie tot aan een langdurig loyaal betalend lid.'
    }
};

const dir = './src/content/seo';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

for (const file of files) {
    const slug = file.replace('.md', '');
    const content = fs.readFileSync(path.join(dir, file), 'utf8');
    const data = map[slug];

    if (data) {
        let lines = content.split('\n');

        // Remove old cardTitle / cardDescription if they exist
        lines = lines.filter(l => !l.startsWith('cardTitle:') && !l.startsWith('cardDescription:'));

        // Find insert point after type
        const typeIndex = lines.findIndex(l => l.startsWith('type:'));
        if (typeIndex !== -1) {
            lines.splice(typeIndex + 1, 0, `cardTitle: "${data.title}"`);
            lines.splice(typeIndex + 2, 0, `cardDescription: "${data.desc}"`);
            fs.writeFileSync(path.join(dir, file), lines.join('\n'));
        }
    }
}

console.log('Successfully updated 22 card titles and descriptions!');
