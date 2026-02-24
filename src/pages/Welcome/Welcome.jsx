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

                {/* Vervolgstappen Sectie (Card Layout) */}
                <section className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12">
                    <div ref={addToRefs} className="mb-16 text-center max-w-3xl mx-auto">
                        <h2 className="font-heading font-bold text-3xl md:text-5xl tracking-tight mb-4">
                            Vervolgstappen <span className="text-accent italic font-drama">op een rijtje.</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Step 1 */}
                        <div ref={addToRefs} className="bg-white/5 border border-primary/5 rounded-2xl md:rounded-3xl p-8 hover:shadow-xl hover:-translate-y-1 hover:border-accent/20 transition-all duration-500 group flex flex-col h-full shadow-sm relative overflow-hidden">
                            <div className="absolute -top-24 -right-24 w-48 h-48 bg-accent/5 rounded-full blur-[50px] group-hover:bg-accent/10 transition-colors" />

                            <div className="flex justify-between items-start mb-12 relative z-10">
                                <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center border border-primary/10 text-accent group-hover:scale-110 transition-transform duration-500 shadow-sm relative z-20">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <span className="font-heading text-accent/20 text-5xl md:text-7xl font-black absolute top-[-10px] right-[-10px] group-hover:text-accent/30 group-hover:scale-110 transition-all duration-500 ease-out origin-top-right select-none">01</span>
                            </div>

                            <div className="mt-auto relative z-10 border-t border-primary/10 pt-6">
                                <h3 className="font-heading font-bold text-xl text-primary mb-3 leading-snug">
                                    Check je mailbox
                                </h3>
                                <p className="font-sans text-primary/70 leading-relaxed text-sm">
                                    Controleer of je een bevestigingsmail hebt ontvangen. Dit kan tot 10 minuten duren. Check voor de zekerheid ook je spambox.
                                </p>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div ref={addToRefs} className="bg-white/5 border border-primary/5 rounded-2xl md:rounded-3xl p-8 hover:shadow-xl hover:-translate-y-1 hover:border-accent/20 transition-all duration-500 group flex flex-col h-full shadow-sm relative overflow-hidden">
                            <div className="absolute -top-24 -right-24 w-48 h-48 bg-accent/5 rounded-full blur-[50px] group-hover:bg-accent/10 transition-colors" />

                            <div className="flex justify-between items-start mb-12 relative z-10">
                                <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center border border-primary/10 text-accent group-hover:scale-110 transition-transform duration-500 shadow-sm relative z-20">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <span className="font-heading text-accent/20 text-5xl md:text-7xl font-black absolute top-[-10px] right-[-10px] group-hover:text-accent/30 group-hover:scale-110 transition-all duration-500 ease-out origin-top-right select-none">02</span>
                            </div>

                            <div className="mt-auto relative z-10 border-t border-primary/10 pt-6">
                                <h3 className="font-heading font-bold text-xl text-primary mb-3 leading-snug">
                                    Word lid van de Community
                                </h3>
                                <p className="font-sans text-primary/70 leading-relaxed text-sm">
                                    Check je mailbox voor de uitnodiging om lid te worden van onze exclusieve community omgeving (via GoHighLevel). Gebruik bij voorkeur de invite-link uit je mail.
                                </p>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div ref={addToRefs} className="bg-white/5 border border-primary/5 rounded-2xl md:rounded-3xl p-8 hover:shadow-xl hover:-translate-y-1 hover:border-accent/20 transition-all duration-500 group flex flex-col h-full shadow-sm relative overflow-hidden">
                            <div className="absolute -top-24 -right-24 w-48 h-48 bg-accent/5 rounded-full blur-[50px] group-hover:bg-accent/10 transition-colors" />

                            <div className="flex justify-between items-start mb-12 relative z-10">
                                <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center border border-primary/10 text-accent group-hover:scale-110 transition-transform duration-500 shadow-sm relative z-20">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                    </svg>
                                </div>
                                <span className="font-heading text-accent/20 text-5xl md:text-7xl font-black absolute top-[-10px] right-[-10px] group-hover:text-accent/30 group-hover:scale-110 transition-all duration-500 ease-out origin-top-right select-none">03</span>
                            </div>

                            <div className="mt-auto relative z-10 border-t border-primary/10 pt-6">
                                <h3 className="font-heading font-bold text-xl text-primary mb-3 leading-snug">
                                    Teken de overeenkomst
                                </h3>
                                <p className="font-sans text-primary/70 leading-relaxed text-sm">
                                    Bekijk en teken de samenwerkingsovereenkomst. Deze wordt direct en veilig (digitaal) naar je toe verzonden.
                                </p>
                            </div>
                        </div>

                        {/* Step 4 */}
                        <div ref={addToRefs} className="bg-white/5 border border-primary/5 rounded-2xl md:rounded-3xl p-8 hover:shadow-xl hover:-translate-y-1 hover:border-accent/20 transition-all duration-500 group flex flex-col h-full shadow-sm relative overflow-hidden">
                            <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#10b981]/10 rounded-full blur-[50px] group-hover:bg-[#10b981]/20 transition-colors" />

                            <div className="flex justify-between items-start mb-12 relative z-10">
                                <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center border border-primary/10 text-[#10b981] group-hover:scale-110 transition-transform duration-500 shadow-sm relative z-20">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <span className="font-heading text-[#10b981]/20 text-5xl md:text-7xl font-black absolute top-[-10px] right-[-10px] group-hover:text-[#10b981]/30 group-hover:scale-110 transition-all duration-500 ease-out origin-top-right select-none">04</span>
                            </div>

                            <div className="mt-auto relative z-10 border-t border-primary/10 pt-6">
                                <h3 className="font-heading font-bold text-xl text-primary mb-3 leading-snug">
                                    Klaar voor de aftrap?
                                </h3>
                                <p className="font-sans text-primary/70 leading-relaxed text-sm">
                                    Meld je via de ontvangen link direct aan voor de Onboarding Call. Hier leggen we de exacte strategie voor jouw gym vast en zetten we alles in gang.
                                </p>
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
