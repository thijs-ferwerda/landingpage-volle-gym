import React, { useEffect } from 'react';

const Sorry = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <section className="min-h-screen pt-32 pb-24 px-6 bg-background flex flex-col items-center relative z-10 w-full overflow-hidden">
            {/* Soft decorative background gradients */}
            <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

            <div className="max-w-4xl w-full mx-auto text-center mb-12 relative z-20 flex flex-col items-center">
                <div className="inline-flex items-center gap-3 px-5 py-2.5 border border-primary/10 rounded-full bg-white shadow-sm mb-8">
                    <span className="w-2 h-2 rounded-full bg-accent"></span>
                    <p className="font-data text-primary text-xs md:text-sm uppercase tracking-widest font-bold">
                        Intake afgerond
                    </p>
                </div>

                <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-primary tracking-tighter leading-[1.1] mb-6">
                    Bedankt voor het <br className="hidden md:block" />
                    <span className="font-drama italic text-primary/70">invullen.</span>
                </h1>

                <p className="font-sans text-primary/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-8">
                    Op basis van je antwoorden in de intake lijkt het er op dit moment op <br className="hidden md:block" /> dat we geen perfecte match zijn.
                </p>
            </div>

            {/* Embedded "Frame" Container for text */}
            <div className="w-full max-w-4xl mx-auto px-8 md:px-20 py-16 bg-white rounded-3xl shadow-xl border border-primary/10 overflow-hidden relative z-20 text-center">
                <h2 className="font-heading font-bold text-2xl md:text-3xl text-primary mb-6">Waarom we je aanvraag niet doorzetten</h2>
                
                <div className="space-y-6 font-sans text-primary/80 text-lg leading-relaxed max-w-2xl mx-auto">
                    <p>
                        Wij hebben onze systemen zodanig aangescherpt, dat we keiharde garanties durven te geven. Maar die garanties kunnen we alleen waarmaken als elke factor in onze samenwerking klopt.
                    </p>
                    <p>
                        Daarom werken we uitsluitend samen met sportscholen en studio's die klaar zijn voor de volgende stap, het systeem volledig willen implementeren en de brandstof hebben om vol gas te geven.
                    </p>
                    <p>
                        Door onze volle 100% focus te leggen op de groep ondernemers die we écht het beste kunnen helpen, behalen we op de lange termijn de allerbeste en meest voorspelbare resultaten voor onze partners.
                    </p>
                    <p>
                        Als je situatie, visie of groeicapaciteit in de toekomst verandert: onze deur staat altijd open voor een hernieuwde kennismaking.
                    </p>
                    <p className="font-bold pt-4 text-primary">
                        Heel veel succes verder met je business.
                    </p>
                </div>
            </div>

            <div className="w-full text-center mt-12 relative z-20 opacity-60">
                <p className="text-primary text-sm font-sans font-medium">
                    &copy; {new Date().getFullYear()} Volle Gym Consulting.
                </p>
            </div>
        </section>
    );
};

export default Sorry;
