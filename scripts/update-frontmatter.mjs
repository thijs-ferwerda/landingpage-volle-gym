import fs from 'fs';
import path from 'path';
import frontMatter from 'front-matter';

// Helper lists based on the SEO clusters:
const servicePages = [
    'fitness-marketing-bureau',
    'sportschool-marketing', // (pillar, acts as service)
    'online-marketing-personal-trainers',
    'yoga-studio-marketing',
    'crossfit-marketing',
    'gym-marketing',
    'online-marketing-fitness',
    'sportschool-beginnen' // acts mostly as service/pillar
];

const blogPages = [
    'marketing-fitnessbranche',
    'marketingplan-sportschool',
    'leadgeneratie-fitness', // pillar/blog
    'leden-werven-sportschool',
    'fitness-leadgeneratie',
    'social-media-sportschool',
    'facebook-ads-sportschool',
    'sportschool-software-vergelijken',
    'ledenbehoud-sportschool',
    'personal-trainer-worden',
    'small-group-training-marketing',
    'eerste-100-leden-sportschool',
    'marketing-pilates-studio',
    'leadgeneratie-uitbesteden',
    'meer-leads-genereren-sportschool',
    'leadgeneratie-website-tips',
    'sportschool-openen-kosten',
    'fitness-leads-opvolgen',
    'personal-trainer-marketing' // if not service, then blog
];

// Fallback logic
const determineType = (slug) => {
    if (servicePages.includes(slug)) return 'service';
    if (blogPages.includes(slug)) return 'blog';

    // Default fallback based on name patterns
    if (slug.includes('social-media') || slug.includes('tips') || slug.includes('hoe') || slug.includes('waarom') || slug.includes('vergelijken')) {
        return 'blog';
    }
    return 'service'; // default commercial bias
};

const determineRelatedLinks = (type, slug) => {
    // Return dummy links initially to satisfy the array structure, these can be optimized over time
    if (type === 'service') {
        return {
            relatedBlogs: ['fitness-leadgeneratie', 'leden-werven-sportschool', 'marketingplan-sportschool'].filter(s => s !== slug).slice(0, 2).map(s => `/kennisbank/${s}`)
        };
    } else {
        return {
            relatedServices: ['sportschool-marketing', 'fitness-marketing-bureau'].filter(s => s !== slug).slice(0, 2).map(s => `/${s}`)
        };
    }
}

const SEO_DIR = path.join(process.cwd(), 'src/content/seo');

const files = fs.readdirSync(SEO_DIR).filter(f => f.endsWith('.md'));

console.log(`Processing ${files.length} MD files...`);

files.forEach(file => {
    const slug = file.replace('.md', '');
    const mdPath = path.join(SEO_DIR, file);
    const fileRaw = fs.readFileSync(mdPath, 'utf8');

    const { attributes: frontmatter, body } = frontMatter(fileRaw);

    // Only update if not already set or to refresh
    if (!frontmatter.type) {
        frontmatter.type = determineType(slug);
    }

    const relations = determineRelatedLinks(frontmatter.type, slug);
    if (!frontmatter.relatedServices && relations.relatedServices) frontmatter.relatedServices = relations.relatedServices;
    if (!frontmatter.relatedBlogs && relations.relatedBlogs) frontmatter.relatedBlogs = relations.relatedBlogs;

    let fileContent = `---\n`;
    for (const [key, value] of Object.entries(frontmatter)) {
        if (Array.isArray(value)) {
            fileContent += `${key}:\n`;
            value.forEach(item => {
                fileContent += `  - "${item}"\n`;
            });
        } else {
            const safeValue = typeof value === 'string' ? `"${value.replace(/"/g, '\\"')}"` : value;
            fileContent += `${key}: ${safeValue}\n`;
        }
    }
    fileContent += `---\n\n`;
    fileContent += body;

    fs.writeFileSync(mdPath, fileContent, 'utf8');
    console.log(`✅ Updated ${file}`);
});

console.log("Done!");
