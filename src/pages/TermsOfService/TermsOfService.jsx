import React, { useEffect } from 'react';

const TermsOfService = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <section className="min-h-screen pt-32 pb-24 px-6 bg-background flex flex-col items-center relative z-10 w-full">
            <div className="max-w-4xl w-full mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-primary/10">
                <h1 className="font-heading font-bold text-3xl md:text-4xl text-primary mb-8">Algemene Voorwaarden</h1>

                <div className="prose prose-lg text-primary/80 max-w-none space-y-6">
                    <p><strong>Laatst bijgewerkt: Februari 2026</strong></p>

                    <p>Welkom bij Volle Gym Consulting ("Volle Gym", "wij", of "ons"). Door gebruik te maken van onze website (vollegym.nl) en diensten stemt u in met de volgende voorwaarden.</p>

                    <h2 className="text-xl font-bold text-primary mt-8">1. Toepasselijkheid</h2>
                    <p>Deze voorwaarden zijn van toepassing op alle aanbiedingen, offertes, overeenkomsten en diensten geleverd door Volle Gym, tenzij schriftelijk anders is overeengekomen.</p>

                    <h2 className="text-xl font-bold text-primary mt-8">2. Diensten & Kwalificatie</h2>
                    <p>Volle Gym behoudt zich het recht voor om leads of sportscholen te weigeren indien deze, na beoordeling via onze intake, niet aansluiten bij onze werkwijze, ethiek of visie. Onze methodiek vereist inzet en implementatie; het uitblijven daarvan is de verantwoordelijkheid van de klant.</p>

                    <h2 className="text-xl font-bold text-primary mt-8">3. Intellectueel Eigendom</h2>
                    <p>Alle gecommuniceerde marketingstrategieën, scripts, funnels en systemen blijven intellectueel eigendom van Volle Gym, tenzij anders overeengekomen. Het is niet toegestaan om deze materialen zonder toestemming commercieel door te verkopen of publiekelijk te verspreiden.</p>

                    <h2 className="text-xl font-bold text-primary mt-8">4. Aansprakelijkheid aangaande Resultaten</h2>
                    <p>Hoewel Volle Gym geteste acquisitiesystemen bouwt en optimaliseert, kunnen garanties over specifieke ledenaantallen afwijken op basis van de lokale marktsituatie, budget, en de opvolging vanuit de klant (de sportschool/PT-studio zélf). Volle Gym kan niet aansprakelijk worden gesteld voor indirecte schade of gemiste inkomsten.</p>

                    <h2 className="text-xl font-bold text-primary mt-8">5. Wijziging Voorwaarden</h2>
                    <p>Wij behouden ons het recht voor om deze algemene voorwaarden op ieder moment te wijzigen. De meest recente versie is altijd te vinden op deze pagina.</p>
                </div>
            </div>
        </section>
    );
};

export default TermsOfService;
