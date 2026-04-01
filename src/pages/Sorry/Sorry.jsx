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

                <div className="mt-10 pt-8 border-t border-primary/10 max-w-2xl mx-auto">
                    <p className="font-sans text-primary/70 text-lg leading-relaxed">
                        Ben je toch van mening dat je graag met ons in gesprek wilt komen? Stuur ons dan een berichtje via WhatsApp, dan gaan we persoonlijk het gesprek aan.
                    </p>
                    <a
                        href="https://wa.me/3197010256819"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 inline-flex items-center gap-3 px-6 py-3.5 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold text-sm rounded-xl transition-all active:scale-[0.98]"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                        Stuur een WhatsApp
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Sorry;
