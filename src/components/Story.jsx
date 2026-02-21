import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Story = () => {
    const containerRef = useRef(null);
    const textRefs = useRef([]);
    const addToTextRefs = (el) => {
        if (el && !textRefs.current.includes(el)) {
            textRefs.current.push(el);
        }
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                textRefs.current,
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    stagger: 0.15,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 70%',
                    }
                }
            );
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} id="visie" className="py-24 md:py-32 px-6 md:px-12 bg-background relative z-10 border-t border-white/5 overflow-hidden">
            {/* Ambient Background Elements */}
            <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-4xl mx-auto flex flex-col items-center relative z-20">

                <div ref={addToTextRefs} className="flex items-center gap-3 mb-8">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
                    <p className="text-white/50 font-data uppercase tracking-widest text-xs md:text-sm font-semibold">
                        Klinkt dit herkenbaar?
                    </p>
                    <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                </div>

                <h2 ref={addToTextRefs} className="font-heading font-bold text-3xl md:text-5xl lg:text-5xl text-white leading-tight tracking-tight mb-16 text-center">
                    Je bent je gym of PT-studio niet gestart <br className="hidden md:block" />
                    <span className="font-drama italic text-accent/90 font-medium">om de hele dag acquisitie te doen.</span>
                </h2>

                <div className="flex flex-col gap-10 text-left relative max-w-3xl w-full">
                    <div ref={addToTextRefs} className="bg-[#0f0f0f] rounded-[2.5rem] p-8 md:p-12 md:px-16 border border-white/10 shadow-[0_0_50px_rgba(255,53,0,0.03)] relative overflow-hidden">

                        {/* Subtle inner flare */}
                        <div className="absolute -top-32 -right-32 w-64 h-64 bg-accent/10 rounded-full blur-[60px] pointer-events-none"></div>

                        <p className="font-sans text-white/70 leading-relaxed text-lg mb-6 relative z-10">
                            Je bent jouw club gestart met een duidelijke missie: mensen helpen en vrijheid voor jezelf creëren. En dat doe je fantastisch. Jouw leden zijn blij, ze halen resultaat en er hangt een onverslaanbare sfeer.
                        </p>
                        <p className="font-sans text-white/70 leading-relaxed text-lg mb-8 relative z-10">
                            <strong className="text-white">Maar als je écht eerlijk bent</strong>... is die vrijheid er nog steeds niet. In plaats van werken <span className="italic">aan</span> je bedrijf, werk je je kapot <span className="italic">in</span> je bedrijf.
                        </p>
                        <ul className="space-y-4 font-sans text-white/60 text-lg mb-10 ml-2 relative z-10">
                            <li className="flex items-start gap-4">
                                <span className="text-accent mt-1 font-bold">✗</span>
                                <span>Je bent afhankelijk van hoop en mond-tot-mondreclame.</span>
                            </li>
                            <li className="flex items-start gap-4">
                                <span className="text-accent mt-1 font-bold">✗</span>
                                <span>Je hebt bureaus en campagnes geprobeerd, maar leads namen de telefoon niet op.</span>
                            </li>
                            <li className="flex items-start gap-4">
                                <span className="text-accent mt-1 font-bold">✗</span>
                                <span>Elke maand voelt de omzet en ledeninstroom weer als een verrassing.</span>
                            </li>
                        </ul>
                        <div className="mt-10 pt-10 border-t border-white/10 relative z-10">
                            <h3 className="font-heading font-bold text-2xl text-white mb-4 tracking-wide">Onze missie is die chaos wegnemen.</h3>
                            <p className="font-sans text-white/70 leading-relaxed text-lg">
                                Zodat jij niet meer hoeft te hopen op groei, maar kan vertrouwen op een <strong className="text-accent">duurzaam systeem</strong>. Wij geven je de rust en de leads, zodat jij weer de coach en ondernemer kan zijn die jouw leden—en jijzelf—zo hard nodig hebben.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Story;
