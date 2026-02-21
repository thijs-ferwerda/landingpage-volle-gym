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
        <section ref={containerRef} id="visie" className="py-24 md:py-32 px-6 md:px-12 bg-white relative z-10 border-b border-primary/5 overflow-hidden">
            {/* Ambient Background Elements */}
            <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-4xl mx-auto flex flex-col items-center relative z-20">

                <div ref={addToTextRefs} className="flex items-center gap-3 mb-8">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
                    <p className="text-primary/70 font-data uppercase tracking-widest text-xs md:text-sm font-semibold">
                        Klinkt dit herkenbaar?
                    </p>
                    <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                </div>

                <h2 ref={addToTextRefs} className="font-heading font-bold text-3xl md:text-5xl lg:text-5xl text-primary leading-tight tracking-tight mb-16 text-center">
                    Je bent je gym of PT-studio niet gestart <br className="hidden md:block" />
                    <span className="font-drama italic text-primary/60">om de hele dag acquisitie te doen.</span>
                </h2>

                <div className="flex flex-col gap-10 text-left relative max-w-3xl w-full">

                    {/* The "Paper" Card */}
                    <div ref={addToTextRefs} className="relative mt-4">

                        {/* Subtle Tape Effect (Top Center) */}
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-white/40 backdrop-blur-sm border border-black/5 rotate-[-2deg] shadow-sm z-30"></div>

                        <div className="bg-[#fdfbf7] rounded-sm p-8 md:p-14 shadow-[2px_10px_30px_rgba(0,0,0,0.06)] border border-[#e8E5df] relative overflow-hidden transform rotate-[1deg] transition-transform hover:rotate-0 duration-500 ease-out z-20">

                            {/* Subtle Paper Texture Overlay using a CSS radial gradient pattern */}
                            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>

                            {/* Content wrapper with a slightly different, more organic serif-like feel for the note */}
                            <div className="relative z-10 font-serif">
                                <p className="text-[#3a3a3a] leading-relaxed text-xl mb-8">
                                    Je bent jouw club gestart met een duidelijke missie: mensen helpen en vrijheid voor jezelf creëren. En dat doe je fantastisch. Jouw leden zijn blij, ze halen resultaat en er hangt een onverslaanbare sfeer.
                                </p>
                                <p className="text-[#3a3a3a] leading-relaxed text-xl mb-8">
                                    <strong className="font-bold text-[#1a1a1a]">Maar als je écht eerlijk bent</strong>... is die vrijheid er nog steeds niet. In plaats van werken <span className="italic">aan</span> je bedrijf, werk je je kapot <span className="italic">in</span> je bedrijf.
                                </p>

                                {/* Checkmarks changed to handwritten style Xs */}
                                <ul className="space-y-5 text-[#4a4a4a] text-lg mb-10 ml-2">
                                    <li className="flex items-start gap-4">
                                        <span className="text-accent mt-0.5 font-drama text-2xl font-bold leading-none">x</span>
                                        <span>Je bent afhankelijk van hoop en mond-tot-mondreclame.</span>
                                    </li>
                                    <li className="flex items-start gap-4">
                                        <span className="text-accent mt-0.5 font-drama text-2xl font-bold leading-none">x</span>
                                        <span>Je hebt bureaus en campagnes geprobeerd, maar leads namen de telefoon niet op.</span>
                                    </li>
                                    <li className="flex items-start gap-4">
                                        <span className="text-accent mt-0.5 font-drama text-2xl font-bold leading-none">x</span>
                                        <span>Elke maand voelt de omzet en ledeninstroom weer als een verrassing.</span>
                                    </li>
                                </ul>

                                {/* "Handwritten" Signature / Conclusion area */}
                                <div className="mt-10 pt-10 relative">
                                    {/* Squiggly line separator */}
                                    <svg className="absolute top-0 left-0 w-full h-4 text-black/10" preserveAspectRatio="none" viewBox="0 0 100 10" fill="none" stroke="currentColor" strokeWidth="1">
                                        <path d="M0 5 Q 10 0, 20 5 T 40 5 T 60 5 T 80 5 T 100 5"></path>
                                    </svg>

                                    <h3 className="font-heading font-bold text-2xl text-[#1a1a1a] mb-5 tracking-wide mt-4">Onze missie is die chaos wegnemen.</h3>
                                    <p className="text-[#3a3a3a] leading-relaxed text-xl">
                                        Zodat jij niet meer hoeft te hopen op groei, maar kan vertrouwen op een systeem. Wij geven je de rust en de leads, zodat jij weer de coach en ondernemer kan zijn die jouw leden—en jijzelf—zo hard nodig hebben.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Background drop shadow layer for realistic paper depth */}
                        <div className="absolute inset-0 bg-black/5 rounded-sm transform rotate-[-1deg] translate-y-2 translate-x-1 z-10 blur-[2px]"></div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Story;
