import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

const WerkenBij = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        window.scrollTo(0, 0);

        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".animate-section",
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.2,
                    ease: 'power3.out',
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="bg-background min-h-screen text-primary overflow-hidden">
            <Helmet>
                <title>Werken bij | Volle Gym</title>
                <meta name="description" content="Kom werken bij Volle Gym intern of ontdek vacatures bij één van onze high-end partner studio's." />
                <script type="application/ld+json">{JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.vollegym.nl"},{"@type":"ListItem","position":2,"name":"Werken bij"}]})}</script>
            </Helmet>

            <section className="relative w-full pt-40 pb-20 md:pt-48 md:pb-32 px-6 flex flex-col items-center overflow-hidden animate-section">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/5 via-background to-background pointer-events-none z-0" />
                <div className="relative z-10 w-full max-w-4xl mx-auto text-center flex flex-col items-center">
                    <h1 className="font-heading font-black text-5xl md:text-7xl lg:text-8xl tracking-tighter text-primary leading-[1.05] mb-8">
                        Kies jouw <span className="font-drama italic text-accent font-medium">carrièrepad.</span>
                    </h1>
                    <p className="font-sans text-primary/70 text-lg md:text-2xl max-w-3xl leading-relaxed">
                        Wil je bouwen aan de groei van Volle Gym zélf op ons hoofdkantoor, of sta je liever met je voeten in de klei bij één van onze exclusieve gym partners?
                    </p>
                </div>
            </section>

            <section className="relative z-10 max-w-6xl mx-auto px-6 pb-40">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 animate-section">

                    {/* Interne Vacatures Card */}
                    <div id="volle-gym-hq" className="scroll-mt-32 bg-white rounded-[3rem] p-10 md:p-14 border border-primary/10 shadow-2xl relative overflow-hidden group hover:border-accent/40 transition-colors duration-500">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-[80px] group-hover:bg-accent/10 transition-colors"></div>
                        <div className="relative z-10 flex flex-col h-full">
                            <span className="inline-block px-4 py-1.5 rounded-full bg-primary text-white text-xs font-data uppercase tracking-widest w-fit mb-8 shadow-md">
                                Volle Gym HQ
                            </span>
                            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-6">Werken bij Volle Gym</h2>
                            <p className="font-sans text-primary/70 leading-relaxed mb-12 flex-grow text-lg">
                                Word onderdeel van het team achter het succes van meer dan 60+ Nederlandse boutiek gyms.
                                We zoeken regelmatig performance marketeers, funnel bouwers en strategen in Amsterdam.
                            </p>

                            <Link to="/werken-bij/hq" className="magnetic-btn bg-white border-2 border-primary text-primary px-8 py-4 rounded-full text-sm font-bold tracking-wide uppercase hover:bg-primary hover:text-white transition-all duration-300 w-fit">
                                <span className="magnetic-btn-content">Bekijk HQ Vacatures</span>
                            </Link>
                        </div>
                    </div>

                    {/* Partner Vacatures Card */}
                    <div id="onze-partners" className="scroll-mt-32 bg-[#1a1a1a] text-white rounded-[3rem] p-10 md:p-14 border border-white/10 shadow-2xl relative overflow-hidden group hover:border-accent/40 transition-colors duration-500">
                        <div className="absolute flex h-full w-full left-0 top-0 opacity-10 noise-overlay pointer-events-none"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/20 rounded-full blur-[80px] group-hover:bg-accent/30 transition-colors"></div>

                        <div className="relative z-10 flex flex-col h-full">
                            <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-white text-xs font-data uppercase tracking-widest w-fit mb-8 shadow-[0_0_15px_rgba(255,53,0,0.5)]">
                                Onze Partners
                            </span>
                            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-6">Werken als Personal Trainer</h2>
                            <p className="font-sans text-white/70 leading-relaxed mb-12 flex-grow text-lg">
                                Ambachtelijk trainer of clubmanager? Wij helpen de hardst groeiende gyms aan het beste talent.
                                Solliciteer direct op functies bij onze high-end partners door heel het land.
                            </p>

                            <Link to="/vacatures" className="magnetic-btn bg-accent text-white px-8 py-4 rounded-full text-sm font-bold tracking-wide uppercase transition-all duration-300 w-fit shadow-[0_10px_30px_rgba(255,53,0,0.3)] hover:shadow-[0_10px_40px_rgba(255,53,0,0.5)]">
                                <span className="magnetic-btn-content">Bekijk 10+ Vacatures</span>
                            </Link>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
};

export default WerkenBij;
