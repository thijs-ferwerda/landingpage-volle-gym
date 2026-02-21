import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const System = () => {
    const containerRef = useRef(null);
    const cardsRef = useRef([]);
    const addToCards = (el) => {
        if (el && !cardsRef.current.includes(el)) {
            cardsRef.current.push(el);
        }
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(cardsRef.current,
                { y: 60, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    stagger: 0.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 75%'
                    }
                }
            );
        }, containerRef);
        return () => ctx.revert();
    }, []);

    const pillars = [
        {
            num: "01",
            title: "Duurzame acquisitie",
            desc: "Ons money-model verzekert dat iedere euro in marketing minimaal één euro aan nieuwe sales oplevert. Schaalbaar, overdraagbaar aan je team, en zonder dat jij de hele dag leads hoeft na te jagen.",
            icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
        },
        {
            num: "02",
            title: "Community & netwerk",
            desc: "Samen doe je het langer en beter. Leer van andere succesvolle gym eigenaren, deel je overwinningen en bouw mee aan een gezonder Nederland. Dat is onze gedeelde missie.",
            icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        },
        {
            num: "03",
            title: "Stok achter de deur",
            desc: "Jij bent de accountability partner voor je klanten. Wij zijn die van jou. In onze wekelijkse meetings bekijken we jouw cijfers. Blijf je achter? Dan bellen we je proactief op om je weer op de rit te krijgen.",
            icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        }
    ];

    return (
        <section ref={containerRef} id="systeem" className="py-32 px-6 md:px-12 bg-background relative z-10 overflow-hidden">
            {/* Ambient Background Elements */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/[0.03] via-transparent to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
            <div className="absolute top-1/2 -left-32 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-20">
                <div className="mb-20 max-w-3xl">
                    <p className="font-data text-accent text-sm uppercase tracking-widest mb-4 flex items-center gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                        Het Volle Gym Systeem
                    </p>
                    <h2 className="font-heading font-medium text-4xl md:text-5xl lg:text-6xl text-primary leading-tight tracking-tight mb-6">
                        Drie fundamentele pilaren <br className="hidden md:block" />
                        <span className="font-drama italic text-primary/60">voor ongekende schaalbaarheid.</span>
                    </h2>
                    <p className="font-sans text-primary/70 text-lg md:text-xl leading-relaxed">
                        Geen losse trucjes of tijdelijke hypes. Wij implementeren een fundament dat jouw bedrijf onafhankelijk maakt van jouw uren, en afhankelijk maakt van ijzersterke systemen.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {pillars.map((pillar, idx) => (
                        <div
                            key={idx}
                            ref={addToCards}
                            className="bg-white border border-primary/5 rounded-2xl md:rounded-3xl p-10 lg:p-12 hover:shadow-xl hover:-translate-y-1 hover:border-accent/20 transition-all duration-500 group flex flex-col h-full shadow-sm relative overflow-hidden"
                        >
                            {/* Subtle accent glow top right */}
                            <div className="absolute -top-24 -right-24 w-48 h-48 bg-accent/5 rounded-full blur-[50px] group-hover:bg-accent/10 transition-colors" />

                            <div className="flex justify-between items-start mb-16 relative z-10">
                                <div className="w-14 h-14 rounded-full bg-background flex items-center justify-center border border-primary/10 text-accent group-hover:scale-110 transition-transform duration-500 shadow-sm relative z-20">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={pillar.icon} />
                                    </svg>
                                </div>
                                <span className="font-heading text-accent/40 text-6xl md:text-8xl font-black absolute top-[-10px] right-[-10px] group-hover:text-accent/60 group-hover:scale-125 transition-all duration-500 ease-out origin-top-right select-none">{pillar.num}</span>
                            </div>

                            <div className="mt-auto relative z-10 border-t border-primary/10 pt-8">
                                <h3 className="font-heading font-bold text-2xl text-primary mb-4 leading-snug">
                                    {pillar.title}
                                </h3>
                                <p className="font-sans text-primary/70 leading-relaxed text-sm md:text-base">
                                    {pillar.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default System;
