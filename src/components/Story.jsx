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

                    {/* The "Paper" Card & Surrounding Elements wrapper (group for hover) */}
                    <div ref={addToTextRefs} className="group relative mt-4 cursor-default w-full">

                        {/* Removed Hidden Interactive Scribbles */}

                        {/* Torn Tape Effect (Top Center) */}
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-10 bg-white/30 backdrop-blur-sm border-t border-b border-white/40 shadow-sm rotate-[-3deg] z-30" style={{
                            clipPath: 'polygon(0% 10%, 5% 0%, 15% 15%, 25% 0%, 35% 15%, 45% 0%, 55% 15%, 65% 0%, 75% 15%, 85% 0%, 95% 15%, 100% 5%, 100% 90%, 95% 100%, 85% 85%, 75% 100%, 65% 85%, 55% 100%, 45% 85%, 35% 100%, 25% 85%, 15% 100%, 5% 85%, 0% 95%)'
                        }}>
                            <div className="w-full h-full opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIi8+CjxwYXRoIGQ9Ik0wIDRMMCAwTDAgNEwiIHN0cm9rZT0iIzIyMiIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBvcGFjaXR5PSIwLjMiLz4KPC9zdmc+')]"></div>
                        </div>

                        {/* Second torn tape (Top Right) */}
                        <div className="absolute top-6 -right-6 w-20 h-8 bg-white/30 backdrop-blur-sm border-t border-b border-white/40 shadow-sm rotate-[45deg] z-30 hidden md:block" style={{
                            clipPath: 'polygon(0% 10%, 10% 0%, 20% 15%, 30% 0%, 40% 15%, 50% 0%, 60% 15%, 70% 0%, 80% 15%, 90% 0%, 100% 10%, 100% 90%, 90% 100%, 80% 85%, 70% 100%, 60% 85%, 50% 100%, 40% 85%, 30% 100%, 20% 85%, 10% 100%, 0% 90%)'
                        }}></div>

                        <div className="bg-[#fdfbf7] rounded-sm p-8 md:p-14 shadow-[2px_15px_40px_rgba(0,0,0,0.08)] border border-[#e8E5df] relative overflow-hidden transform rotate-[1.5deg] transition-all hover:rotate-[0.5deg] duration-500 ease-out z-20">

                            {/* Subtle Paper Texture Overlay using a CSS radial gradient pattern */}
                            <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '12px 12px' }}></div>

                            {/* Inject Authentic Fineliner Pen Font (Caveat is very realistic for notes) */}
                            <style>
                                {`
                                    @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;700&display=swap');
                                `}
                            </style>

                            {/* Content wrapper with actual fineliner font and dark blue grey 'ink' color */}
                            <div className="relative z-10 text-[#1e293b]" style={{ fontFamily: "'Caveat', cursive", fontSize: '110%' }}>

                                <p className="leading-relaxed text-2xl md:text-3xl mb-8 transform rotate-[-1deg] opacity-90 relative z-10">
                                    Je bent jouw club gestart met een duidelijke missie: mensen helpen en vrijheid voor jezelf creëren. En dat doe je fantastisch. Jouw leden zijn blij, ze halen resultaat en er hangt een onverslaanbare sfeer.
                                </p>
                                <p className="leading-relaxed text-2xl md:text-3xl mb-10 transform rotate-[0.5deg] opacity-90">
                                    <strong className="font-bold border-b-[2px] border-[#0f172a]/20 pb-1">Maar als je écht eerlijk bent</strong>... is die vrijheid er nog steeds niet. In plaats van werken aan je bedrijf, werk je je kapot in je bedrijf.
                                </p>

                                {/* Checkmarks changed to handwritten style Xs */}
                                <ul className="space-y-6 text-2xl md:text-3xl mb-12 ml-2 transform rotate-[-0.5deg] opacity-90">
                                    <li className="flex items-start gap-4">
                                        <span className="text-red-700 font-bold leading-none mt-1">x</span>
                                        <span>Je bent afhankelijk van hoop en mond-tot-mondreclame.</span>
                                    </li>
                                    <li className="flex items-start gap-4">
                                        <span className="text-red-700 font-bold leading-none mt-1">x</span>
                                        <span>Je hebt bureaus en campagnes geprobeerd, maar leads namen de telefoon niet op.</span>
                                    </li>
                                    <li className="flex items-start gap-4">
                                        <span className="text-red-700 font-bold leading-none mt-1">x</span>
                                        <span>Elke maand voelt de omzet en ledeninstroom weer als een verrassing.</span>
                                    </li>
                                </ul>

                                {/* "Handwritten" Signature / Conclusion area (Divider removed) */}
                                <div className="mt-8 pt-4 relative transform rotate-[1deg]">
                                    <h3 className="font-bold text-3xl md:text-4xl mb-4 tracking-wide mt-2 opacity-100">Onze missie is die chaos wegnemen.</h3>
                                    <p className="leading-relaxed text-2xl md:text-3xl opacity-90">
                                        Zodat jij niet meer hoeft te hopen op groei, maar kan vertrouwen op een systeem. Wij geven je de rust en de leads, zodat jij weer de coach en ondernemer kan zijn die jouw leden—en jijzelf—zo hard nodig hebben.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Background drop shadow layer for realistic paper depth */}
                        <div className="absolute inset-0 bg-black/10 rounded-sm transform rotate-[-1.5deg] translate-y-3 translate-x-2 z-10 blur-[4px]"></div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Story;
