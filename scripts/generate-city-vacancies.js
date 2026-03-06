import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cities = [
    "Amsterdam", "Rotterdam", "Den Haag", "Utrecht", "Eindhoven",
    "Groningen", "Tilburg", "Almere", "Breda", "Nijmegen",
    "Apeldoorn", "Haarlem", "Enschede", "Arnhem", "Amersfoort",
    "Zaanstad", "s-Hertogenbosch", "Haarlemmermeer", "Zwolle", "Zoetermeer",
    "Leiden", "Leeuwarden", "Maastricht", "Dordrecht", "Ede"
];

const targetDir = path.join(__dirname, '../src/content/vacancies');

// Ensure directory exists
if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
}

const generateMarkdown = (city) => {
    const slug = `vacature-personal-trainer-${city.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;

    return `---
title: "Personal Trainer - ${city}"
location: "${city}"
type: "Personal Training"
hours: "16 - 40 uur"
description: "Word de drijvende kracht achter de fitnessdoelen van cliënten in ${city}. Een dynamische rol bij een van onze exclusieve boutique partners."
slug: "${slug}"
heroImage: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop"
---

# Personal Trainer in ${city}

Jij haalt het maximale uit elke cliënt. Als Personal Trainer bij onze partner in de regio ${city} ben jij het gezicht van de studio en de expert als het gaat om techniek, motivatie en resultaat.

## Wat gaat jouw rol inhouden?

- **1-op-1 Begeleiding:** Je verzorgt complete en op maat gemaakte trainingstrajecten.
- **Voeding & Lifestyle:** Je coacht cliënten niet alleen op de vloer, maar ook op herstel, slaap en voeding.
- **Client Management:** Via gestroomlijnde systemen houd jij de progressie en retentie van je klantenbestand hoog.
- **Studio Bijdrage:** Je denkt actief mee in de ontwikkeling van de gym en het verbeteren van de members experience.

## Wat we van jou verwachten

- Minimaal 1-2 jaar ervaring met 1-op-1 personal training of small group training.
- Relevante certificeringen (bijv. NASM, Chivo, Milo, of vergelijkbaar).
- Sterke communicatieve skills: jij kan mensen inspireren en in beweging krijgen.
- Een ondernemende mindset; je runt eigenlijk je "eigen toko" binnen de studio.
- Woonachtig in (de buurt van) ${city}.
`;
};

cities.forEach(city => {
    const content = generateMarkdown(city);
    const fileName = `vacature-personal-trainer-${city.toLowerCase().replace(/[^a-z0-9]/g, '-')}.md`;
    const filePath = path.join(targetDir, fileName);

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Generated: ${fileName}`);
});

console.log("Finished generating all 25 major city vacancies.");
