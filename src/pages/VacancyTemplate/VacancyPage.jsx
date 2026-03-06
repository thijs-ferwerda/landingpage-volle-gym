import React, { useMemo } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import frontMatter from 'front-matter';
import { Helmet } from 'react-helmet-async';
import VacancyTemplate from './VacancyTemplate';
import NotFound from '../NotFound/NotFound';

// Laad alle markdown bestanden in via Vite's import.meta.glob
const mdFiles = import.meta.glob('../../content/vacancies/*.md', { query: '?raw', import: 'default', eager: true });

const VacancyPage = () => {
    const { slug } = useParams();

    // Zoek en parse de juiste markdown pagina op basis van de URL slug
    const vacancyData = useMemo(() => {
        const filePath = Object.keys(mdFiles).find(path => path.endsWith(`/${slug}.md`));
        if (!filePath) return null;

        const rawContent = mdFiles[filePath];
        try {
            const { attributes: frontmatter, body } = frontMatter(rawContent);
            return {
                ...frontmatter,
                contentBody: body
            };
        } catch (e) {
            console.error("Fout bij parsen van vacature markdown:", e);
            return null;
        }
    }, [slug]);

    if (!vacancyData) {
        return <NotFound />;
    }

    // Schema.org voor vacatures
    const jobPostingSchema = {
        "@context": "https://schema.org/",
        "@type": "JobPosting",
        "title": vacancyData.title,
        "description": vacancyData.contentBody,
        "datePosted": new Date().toISOString().split('T')[0], // Ideaal gezien dit in frontmatter opslaan
        "employmentType": vacancyData.hours.includes('40') ? "FULL_TIME" : "PART_TIME",
        "hiringOrganization": {
            "@type": "Organization",
            "name": "Volle Gym Partner Studio", // Anoniem / Partner naam
            "sameAs": "https://www.vollegym.nl" // Of de website van de klant
        },
        "jobLocation": {
            "@type": "Place",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": vacancyData.location,
                "addressCountry": "NL"
            }
        }
    };

    return (
        <>
            <Helmet>
                <title>{vacancyData.title} in {vacancyData.location} | Volle Gym</title>
                <meta name="description" content={`Vacature: ${vacancyData.title} in ${vacancyData.location}. Solliciteer direct!`} />
                <script type="application/ld+json">
                    {JSON.stringify(jobPostingSchema)}
                </script>
            </Helmet>
            <VacancyTemplate job={vacancyData} />
        </>
    );
};

export default VacancyPage;
