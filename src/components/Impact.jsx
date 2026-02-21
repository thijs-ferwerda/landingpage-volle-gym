import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Impact = () => {
    const sectionRef = useRef(null);
    const numbersRef = useRef([]);

    const addToRefs = (el) => {
        if (el && !numbersRef.current.includes(el)) {
            numbersRef.current.push(el);
        }
    };

    // Placeholder data. In the final version, this will be fed by the CSV sync.
    const metrics = [
        { id: 'intakes', label: 'Aangevraagde intakegesprekken', target: 8432 },
        { id: 'trials', label: 'Gestarte trials', target: 5124 },
        { id: 'clients', label: 'Nieuwe leden', target: 2840 }
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate numbers counting up
            numbersRef.current.forEach((el, index) => {
                const targetValue = metrics[index].target;

                // Initialize text to 0
                el.innerText = '0';

                gsap.to(el, {
                    innerText: targetValue,
                    duration: 2.5,
                    ease: "power2.out",
                    snap: { innerText: 1 },
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                    },
                    onUpdate: function () {
                        // Format the number with periods (e.g., 5.432)
                        el.innerText = Math.ceil(this.targets()[0].innerText).toLocaleString('nl-NL');
                    }
                });
            });

            // Fade in text
            gsap.fromTo(
                ".impact-fade",
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 75%",
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="impact" ref={sectionRef} className="py-24 md:py-32 bg-primary text-white relative overflow-hidden border-y border-white/10">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-accent/5 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/10 via-primary to-primary opacity-50 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 flex flex-col md:flex-row items-center md:items-start gap-16 lg:gap-24">

                {/* Text Side */}
                <div className="w-full md:w-5/12 text-center md:text-left">
                    <div className="impact-fade flex items-center justify-center md:justify-start gap-2 mb-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block"></span>
                        <span className="font-data text-white/60 text-xs uppercase tracking-widest">Missie & Impact</span>
                    </div>

                    <h2 className="impact-fade font-heading font-bold text-4xl md:text-5xl lg:text-6xl mb-6 leading-[1.1] tracking-tight text-white">
                        Wij vullen studio's <br className="hidden md:block" />
                        <span className="font-drama italic text-accent pr-2">tot de nok toe vol.</span>
                    </h2>

                    <p className="impact-fade font-sans text-white/70 text-lg md:text-xl leading-relaxed">
                        Onze belofte is 45 nieuwe leden in 90 dagen. Maar onze échte missie is het domineren van de gezondheidsmarkt in Nederland door ongekende, keiharde resultaten voor onze partners te leveren.
                    </p>
                </div>

                {/* Numbers Side - Stacked Vertically */}
                <div className="w-full md:w-5/12 flex flex-col gap-10 md:gap-14 pt-8 md:pt-0">
                    {metrics.map((metric, i) => (
                        <div key={metric.id} className="impact-fade flex flex-col md:flex-row md:items-center justify-between gap-4 relative group border-t border-white/10 pt-8 first:border-0 first:pt-0">

                            <div className="flex flex-col">
                                <span className="font-data text-accent text-sm md:text-xs mb-1 uppercase tracking-wide opacity-80 group-hover:opacity-100 transition-opacity">
                                    // 0{i + 1}
                                </span>
                                <p className="font-sans font-medium text-white/80 text-lg md:text-xl">{metric.label}</p>
                            </div>

                            <div className="font-heading font-bold text-5xl md:text-6xl tracking-tighter text-white flex items-baseline gap-1">
                                <span ref={addToRefs}>0</span>
                                <span className="text-accent text-3xl md:text-4xl">+</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Impact;
