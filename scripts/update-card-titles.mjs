import fs from 'fs';
import path from 'path';

const map = {
    'boutique-gym-marketing': 'Hoe je een Boutique Gym vult met loyale high-end leden',
    'fitness-leadgeneratie': 'De formule om voorspelbaar kwalitatieve leads aan te trekken',
    'fitness-leads-opvolgen': 'Scripts & systemen: Hoe je leads converteert naar betalende leden',
    'fitness-marketing-bureau': 'Zelf doen of uitbesteden? De waarheid over marketing bureaus',
    'fitness-marketing-nederland': 'De staat van de Nederlandse fitnessmarkt: Kansen voor jouw studio',
    'fitness-studio-groei': 'Het 90-dagen stappenplan voor schaalbare groei van je studio',
    'gym-marketing': 'Gym Marketing Blueprint: Van lege zaal naar wachtlijst',
    'high-ticket-pt-sales': 'High-ticket sales: Hoe je PT trajecten verkoopt zonder korting',
    'leden-werven-sportschool': 'Structureel nieuwe leden werven voor je sportschool of club',
    'ledenwerving-fitness': 'De #1 ledenwerving strategie voor resultaatgerichte gyms',
    'meer-leden-sportschool': 'Meer leden aantrekken in tijden van toenemende concurrentie',
    'personal-trainer-leads': 'Stop met netwerken: Genereer voorspelbaar leads voor jouw PT business',
    'personal-trainer-marketing': 'De marketing gids voor ambitieuze Personal Trainers',
    'personal-training-klanten-werven': 'Hoe je consistent high-end klanten werft voor je Personal Training',
    'pt-studio-marketing': 'PT Studio Marketing: Versla de basis-gyms met dit systeem',
    'pt-studio-starten-marketing': 'Start je een PT studio? Vanaf dag 1 winstgevend met marketing',
    'small-group-leden-werven': 'Small Group klassen continu vol plannen zonder eindeloos te leuren',
    'small-group-training-marketing': 'De ultieme marketingstrategie voor schaalbare Small Group Training',
    'sportschool-marketing-bureau': 'Trap niet in loze beloftes: Zo kies je de juiste marketing partner',
    'sportschool-marketing-tips': '10 Direct toepasbare marketing tips voor gymeigenaren',
    'sportschool-marketing-werkt-niet': 'Waarom je huidige ads geen leden opleveren (en de echte fix)',
    'sportschool-marketing': 'Het A-Z systeem om jouw sportschool structureel te laten groeien'
};

const dir = './src/content/seo';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

for (const file of files) {
    const slug = file.replace('.md', '');
    const content = fs.readFileSync(path.join(dir, file), 'utf8');
    const newTitle = map[slug];
    if (newTitle) {
        if (content.includes('cardTitle:')) {
            const updated = content.replace(/cardTitle: ".*"/, `cardTitle: "${newTitle}"`);
            fs.writeFileSync(path.join(dir, file), updated);
        } else {
            const lines = content.split('\n');
            const insertIndex = lines.findIndex(l => l.startsWith('slug:'));
            if (insertIndex !== -1) {
                lines.splice(insertIndex + 1, 0, `cardTitle: "${newTitle}"`);
                fs.writeFileSync(path.join(dir, file), lines.join('\n'));
            }
        }
    }
}
console.log('Successfully updated 22 card titles!');
