import fs from 'fs';
import path from 'path';

const map = {
    'boutique-gym-marketing': {
        title: 'Hoe je een boutique gym vult met loyale high-end leden',
    },
    'fitness-leadgeneratie': {
        title: 'De formule om voorspelbaar kwalitatieve leads aan te trekken',
    },
    'fitness-leads-opvolgen': {
        title: 'Scripts & systemen: hoe je leads converteert naar betalende leden',
    },
    'fitness-marketing-bureau': {
        title: 'Zelf doen of uitbesteden? De waarheid over marketingbureaus',
    },
    'fitness-marketing-nederland': {
        title: 'De staat van de Nederlandse fitnessmarkt: kansen voor jouw studio',
    },
    'fitness-studio-groei': {
        title: 'Het 90-dagen stappenplan voor schaalbare groei van je studio',
    },
    'gym-marketing': {
        title: 'Gym marketing blueprint: van lege zaal naar volle wachtlijst',
    },
    'high-ticket-pt-sales': {
        title: 'High-ticket sales: hoe je PT-trajecten verkoopt zonder korting',
    },
    'leden-werven-sportschool': {
        title: 'Structureel nieuwe leden werven voor je sportschool of club',
    },
    'ledenwerving-fitness': {
        title: 'De #1 ledenwerving strategie voor resultaatgerichte gyms',
    },
    'meer-leden-sportschool': {
        title: 'Meer leden aantrekken in tijden van toenemende concurrentie',
    },
    'personal-trainer-leads': {
        title: 'Stop met netwerken: genereer voorspelbaar leads voor je PT-business',
    },
    'personal-trainer-marketing': {
        title: 'De complete marketinggids voor ambitieuze personal trainers',
    },
    'personal-training-klanten-werven': {
        title: 'Hoe je consistent high-end klanten werft voor je personal training',
    },
    'pt-studio-marketing': {
        title: 'PT-studio marketing: versla de basis-gyms met dit systeem',
    },
    'pt-studio-starten-marketing': {
        title: 'Start je een PT-studio? Vanaf dag 1 winstgevend met marketing',
    },
    'small-group-leden-werven': {
        title: 'Small group klassen continu vol plannen zonder losse aanwas',
    },
    'small-group-training-marketing': {
        title: 'De ultieme marketingstrategie voor schaalbare small group training',
    },
    'sportschool-marketing-bureau': {
        title: 'Trap niet in loze beloftes: zo kies je de unieke marketingpartner',
    },
    'sportschool-marketing-tips': {
        title: '10 direct toepasbare marketingtips voor ambitieuze gymeigenaren',
    },
    'sportschool-marketing-werkt-niet': {
        title: 'Waarom je huidige leads niets opleveren (en de échte iteratie)',
    },
    'sportschool-marketing': {
        title: 'Het A-Z systeem om jouw sportschool structureel te laten groeien',
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

        // Find the line with cardTitle and replace it
        const titleIndex = lines.findIndex(l => l.startsWith('cardTitle:'));
        if (titleIndex !== -1) {
            lines[titleIndex] = `cardTitle: "${data.title}"`;
            fs.writeFileSync(path.join(dir, file), lines.join('\n'));
        }
    }
}

console.log('Successfully updated 22 card titles to match Dutch grammar rules!');
