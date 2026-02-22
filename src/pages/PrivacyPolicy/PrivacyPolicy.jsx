import React, { useEffect } from 'react';

const PrivacyPolicy = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <section className="min-h-screen pt-32 pb-24 px-6 bg-background flex flex-col items-center relative z-10 w-full">
            <div className="max-w-4xl w-full mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-primary/10">
                <h1 className="font-heading font-bold text-3xl md:text-4xl text-primary mb-8">Privacy Policy</h1>

                <div className="prose prose-lg text-primary/80 max-w-none space-y-6">
                    <p><strong>Laatst bijgewerkt: Februari 2026</strong></p>

                    <p>Volle Gym Consulting ("wij", "ons", of "onze") respecteert uw privacy en zet zich in voor de bescherming van uw persoonlijke gegevens. Deze privacy policy informeert u over hoe wij omgaan met uw persoonlijke gegevens verzameld via onze website (vollegym.nl) en gerelateerde diensten.</p>

                    <h2 className="text-xl font-bold text-primary mt-8">1. Welke gegevens we verzamelen</h2>
                    <p>Wanneer u onze website bezoekt of onze formulieren invult (zoals de intake of kalender), kunnen we de volgende gegevens verzamelen:</p>
                    <ul className="list-disc pl-6">
                        <li>Naam, e-mailadres en telefoonnummer.</li>
                        <li>Bedrijfsgegevens (zoals naam van de sportschool en bedrijfsgrootte).</li>
                        <li>Analytische data (via cookies, indien u hiermee instemt) zoals IP-adres, browser type en bezochte pagina's.</li>
                    </ul>

                    <h2 className="text-xl font-bold text-primary mt-8">2. Hoe we uw gegevens gebruiken</h2>
                    <p>Wij gebruiken uw gegevens voor de volgende doeleinden:</p>
                    <ul className="list-disc pl-6">
                        <li>Om u in te plannen voor een verdiepingsgesprek of intake.</li>
                        <li>Om de effectiviteit van onze marketingcampagnes te meten.</li>
                        <li>Om u relevante diensten en informatie te kunnen aanbieden.</li>
                    </ul>

                    <h2 className="text-xl font-bold text-primary mt-8">3. Gegevensdeling met derden</h2>
                    <p>We verkopen uw gegevens nooit aan derden. Wij delen uw gegevens alleen met dienstverleners die ons helpen de website of diensten aan te bieden (zoals onze CRM- of hostingpartijen), welke gebonden zijn aan strikte geheimhoudingsplichten.</p>

                    <h2 className="text-xl font-bold text-primary mt-8">4. Uw Rechten (GDPR)</h2>
                    <p>Volgens de AVG/GDPR heeft u het recht om in te zien welke gegevens wij van u hebben, deze te laten wijzigen of te laten verwijderen. U kunt hiervoor contact met ons opnemen via info@vollegym.nl.</p>

                    <h2 className="text-xl font-bold text-primary mt-8">5. Cookies</h2>
                    <p>Onze website maakt gebruik van cookies voor analyse en marketing (via tools zoals Google Tag Manager en Meta Pixel). U kunt deze te allen tijde weigeren of accepteren via de cookiebanner links onderin het scherm.</p>
                </div>
            </div>
        </section>
    );
};

export default PrivacyPolicy;
