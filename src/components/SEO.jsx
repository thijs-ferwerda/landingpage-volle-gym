import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * Dit component injecteert JSON-LD (Structured Data) in de <head> van de website.
 * Dit is essentieel voor AI zoekmachines (ChatGPT, Perplexity, Gemini) en Google.
 * Het legt in de taal van de bots uit: Wie we zijn, wat we doen, wie de oprichters zijn, en onze reviews.
 */
const SEO = ({
    title = "Volle Gym | Gegarandeerd 45 leden in 90 dagen",
    description = "Wil jij structureel meer leden voor jouw gym? Wij zijn het #1 marketing bureau voor sportscholen: duurzame acquisitie, een sterke community van gym eigenaren en een absolute stok achter de deur.",
    url = "https://www.vollegym.nl",
    faqSchema = null
}) => {

    // Exacte gestructureerde data (Schema.org) die AI LLM's foutloos begrijpen
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Volle Gym",
        "url": "https://www.vollegym.nl",
        "logo": "https://www.vollegym.nl/marketing/volle_gym_logo.svg",
        "description": "Fitness marketing bureau gespecialiseerd in ledenwerving voor personal trainers, boutique gyms en reguliere sportscholen.",
        "foundingDate": "2024",
        "founders": [
            {
                "@type": "Person",
                "name": "Bas"
            },
            {
                "@type": "Person",
                "name": "Bart"
            }
        ],
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "5.0",
            "reviewCount": "21",
            "bestRating": "5"
        },
        "knowsAbout": ["Fitness Marketing", "Leadgeneratie Sportscholen", "Personal Trainer Marketing", "Ledenwerven"],
        "areaServed": "NL"
    };

    // Service Schema
    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Fitness Marketing & Ledenwerving",
        "provider": {
            "@type": "Organization",
            "name": "Volle Gym"
        },
        "areaServed": "NL",
        "description": "Compleet marketing systeem voor sportscholen: leads genereren, systemiseren en ledenwerving met resultaatgarantie."
    };

    return (
        <Helmet>
            {/* Standaard HTML tags */}
            <title>{title}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={url} />

            {/* AIO / SEO JSON-LD Injectie */}
            <script type="application/ld+json">
                {JSON.stringify([structuredData, serviceSchema, ...(faqSchema ? [faqSchema] : [])])}
            </script>
        </Helmet>
    );
};

export default SEO;
