import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import gsap from 'gsap';

const Welcome = () => {
    const containerRef = useRef(null);
    const contentRefs = useRef([]);

    const addToRefs = (el) => {
        if (el && !contentRefs.current.includes(el)) {
            contentRefs.current.push(el);
        }
    };

    useEffect(() => {
        // Scroll to top
        window.scrollTo(0, 0);

        const ctx = gsap.context(() => {
            gsap.fromTo(
                contentRefs.current,
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.1,
                    ease: 'power3.out',
                    delay: 0.1
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <>
            <Helmet>
                <title>Welkom bij Volle Gym! | Volle Gym</title>
                <meta name="robots" content="noindex" />
            </Helmet>

            <div ref={containerRef} className="bg-background min-h-screen pt-32 pb-24 font-sans text-primary">

                {/* Minimalistische Hero Sectie */}
                <section className="relative w-full px-6 md:px-12 flex flex-col items-center text-center overflow-hidden mb-16 md:mb-20">
                    <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-transparent opacity-60 z-0" />

                    <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
                        <div ref={addToRefs} className="flex items-center justify-center gap-3 mb-6">
                            <span className="text-accent uppercase tracking-widest text-xs font-semibold px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5">
                                Onboarding
                            </span>
                        </div>

                        <h1 ref={addToRefs} className="font-heading font-bold text-4xl md:text-5xl lg:text-7xl tracking-tighter leading-[1.1] mb-6">
                            Hartelijk welkom <br className="hidden md:block" />
                            <span className="font-drama italic text-primary/70">bij Volle Gym!</span>
                        </h1>

                        <p ref={addToRefs} className="text-primary/70 text-base md:text-xl max-w-2xl leading-relaxed mb-10">
                            We waarderen je vertrouwen enorm en kijken ernaar uit om samen een succesvolle tijd tegemoet te gaan. Om je goed op weg te helpen, vind je hieronder de belangrijkste vervolgstappen.
                        </p>
                    </div>
                </section>

                {/* Vervolgstappen Sectie */}
                <section className="relative z-10 w-full max-w-4xl mx-auto px-6 md:px-0">
                    <div ref={addToRefs} className="bg-white/5 border border-primary/10 rounded-[2.5rem] p-8 md:p-14 shadow-sm backdrop-blur-sm">
                        <h2 className="font-heading font-bold text-2xl md:text-4xl tracking-tight mb-12 text-center">
                            Vervolgstappen <span className="text-accent italic font-drama">op een rijtje.</span>
                        </h2>

                        <div className="space-y-12">
                            {/* Step 1 */}
                            <div className="flex flex-col md:flex-row gap-6 items-start relative pb-12 border-b border-primary/10">
                                <div className="shrink-0 w-12 h-12 rounded-full bg-accent/10 border border-accent/30 text-accent flex items-center justify-center font-heading font-black text-xl">
                                    1
                                </div>
                                <div>
                                    <h3 className="font-heading font-bold text-2xl mb-3">Check je mailbox</h3>
                                    <p className="text-primary/70 leading-relaxed mb-4 text-lg">
                                        Controleer of je een bevestigingsmail hebt ontvangen. Dit kan tot 10 minuten duren. Check voor de zekerheid ook je spambox.
                                    </p>
                                    <p className="text-primary/50 text-sm">
                                        Heb je vragen of is iets onduidelijk? Stuur een e-mail naar <a href="mailto:info@vollegym.nl" className="text-accent hover:underline">info@vollegym.nl</a>.
                                    </p>
                                </div>
                            </div>

                            {/* Step 2 */}
                            <div className="flex flex-col md:flex-row gap-6 items-start relative pb-12 border-b border-primary/10">
                                <div className="shrink-0 w-12 h-12 rounded-full bg-accent/10 border border-accent/30 text-accent flex items-center justify-center font-heading font-black text-xl">
                                    2
                                </div>
                                <div>
                                    <h3 className="font-heading font-bold text-2xl mb-3">Word lid van de Volle Gym Community</h3>
                                    <p className="text-primary/70 leading-relaxed mb-4 text-lg">
                                        Check je mailbox voor de uitnodiging om lid te worden van onze exclusieve community omgeving (via GoHighLevel).
                                    </p>
                                    <p className="text-primary/50 text-sm p-4 bg-primary/5 rounded-xl border border-primary/10">
                                        <strong>Let op:</strong> Gebruik bij voorkeur de invite-link uit je mail. Meld je je via een open link aan? Dan moeten we je handmatig accepteren, wat maximaal 24 uur kan duren.
                                    </p>
                                </div>
                            </div>

                            {/* Step 3 */}
                            <div className="flex flex-col md:flex-row gap-6 items-start relative pb-12 border-b border-primary/10">
                                <div className="shrink-0 w-12 h-12 rounded-full bg-accent/10 border border-accent/30 text-accent flex items-center justify-center font-heading font-black text-xl">
                                    3
                                </div>
                                <div>
                                    <h3 className="font-heading font-bold text-2xl mb-3">Teken de overeenkomst</h3>
                                    <p className="text-primary/70 leading-relaxed mb-4 text-lg">
                                        Bekijk en teken de samenwerkingsovereenkomst. Deze wordt direct en veilig (digitaal) naar je toe verzonden.
                                    </p>
                                </div>
                            </div>

                            {/* Step 4 */}
                            <div className="flex flex-col md:flex-row gap-6 items-start relative">
                                <div className="shrink-0 w-12 h-12 rounded-full bg-[#10b981]/10 border border-[#10b981]/30 text-[#10b981] flex items-center justify-center font-heading font-black text-xl">
                                    4
                                </div>
                                <div>
                                    <h3 className="font-heading font-bold text-2xl mb-3">Klaar voor de aftrap?</h3>
                                    <p className="text-primary/70 leading-relaxed mb-4 text-lg">
                                        Meld je via de ontvangen link direct aan voor de Onboarding Call van 45 minuten. Hier leggen we de exacte strategie voor jouw gym vast en zetten we alles in gang.
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                {/* Soft Footer Indicator */}
                <section className="w-full max-w-5xl mx-auto px-6 mt-16 mb-10 text-center">
                    <p className="font-sans text-primary/40 text-sm">
                        Je kunt inloggen op het klantenportaal via de link in je mail om facturen te bekijken.
                    </p>
                </section>
            </div>
        </>
    );
};

export default Welcome;
