import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Protocol = () => {
    const containerRef = useRef(null);
    const cardRefs = useRef([]);
    const addToRefs = (el) => {
        if (el && !cardRefs.current.includes(el)) {
            cardRefs.current.push(el);
        }
    };

    const steps = [
        {
            num: '01',
            title: 'Chaos Verwijderen',
            desc: 'Bouwen en implementeren van marketing-, verkoop- en retentiesystemen. Geen losse campagnes.',
            Animation: RotatingMotif
        },
        {
            num: '02',
            title: 'Capaciteit Creëren',
            desc: 'Geen ad hoc beslissingen meer. Rust en tijd overhouden zodat de eigenaar weer écht eigenaar en coach kan zijn.',
            Animation: ScanningLaser
        },
        {
            num: '03',
            title: 'Blijvende Verandering',
            desc: 'Gyms die sterk genoeg zijn om leden écht vast te houden. Blijvende resultaten ver voorbij week 6.',
            Animation: PulsingWaveform
        }
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            const cards = cardRefs.current;

            cards.forEach((card, index) => {
                // We use native CSS position: sticky for the stacking layout.
                // And ScrollTrigger to control the scale/blur/opacity of this card
                // when the NEXT card scrolls over it.
                const isLastCard = index === cards.length - 1;

                if (!isLastCard) {
                    gsap.to(card, {
                        scale: 0.9,
                        opacity: 0.5,
                        filter: 'blur(20px)',
                        ease: 'none',
                        scrollTrigger: {
                            trigger: cards[index + 1],
                            start: 'top bottom',  // when the next card enters the bottom of viewport
                            end: 'top top',       // when the next card reaches the top
                            scrub: true,
                        }
                    });
                }
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} id="protocol" className="relative w-full bg-dark pb-32">
            {steps.map((step, index) => (
                <div
                    key={index}
                    ref={addToRefs}
                    className="sticky top-0 h-screen w-full flex items-center justify-center p-6 md:p-12 filter-container"
                >
                    <div className="w-full max-w-6xl h-[80vh] md:h-[70vh] bg-primary rounded-[3rem] p-12 flex flex-col md:flex-row items-center border border-dark/5 shadow-2xl overflow-hidden relative">

                        {/* Background Graphic Component */}
                        <div className="absolute inset-0 z-0 pointer-events-none opacity-20 flex items-center justify-end pr-12">
                            <step.Animation />
                        </div>

                        <div className="relative z-10 w-full md:w-1/2 flex flex-col justify-center">
                            <div className="font-data text-accent font-bold text-2xl mb-8">
                                {step.num} <span className="text-dark/20">/PROTOCOL</span>
                            </div>
                            <h2 className="font-heading font-bold text-5xl md:text-6xl text-dark mb-6 tracking-tight">
                                {step.title}
                            </h2>
                            <p className="font-sans text-dark/70 text-lg md:text-xl max-w-md leading-relaxed">
                                {step.desc}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </section>
    );
};

/* SVG Animations for each card */

const RotatingMotif = () => {
    const svgRef = useRef(null);
    useEffect(() => {
        gsap.to(svgRef.current, { rotation: 360, duration: 20, repeat: -1, ease: 'none' });
    }, []);

    return (
        <svg ref={svgRef} width="500" height="500" viewBox="0 0 500 500" fill="none" className="translate-x-1/4">
            <circle cx="250" cy="250" r="200" stroke="#111111" strokeWidth="2" strokeDasharray="10 20" />
            <circle cx="250" cy="250" r="150" stroke="#111111" strokeWidth="4" />
            <circle cx="250" cy="250" r="100" stroke="#111111" strokeWidth="8" strokeDasharray="30 40" />
            <circle cx="250" cy="250" r="50" stroke="#111111" strokeWidth="2" />
            <line x1="250" y1="0" x2="250" y2="500" stroke="#111111" strokeWidth="1" opacity="0.5" />
            <line x1="0" y1="250" x2="500" y2="250" stroke="#111111" strokeWidth="1" opacity="0.5" />
        </svg>
    );
}

const ScanningLaser = () => {
    const lineRef = useRef(null);
    useEffect(() => {
        gsap.to(lineRef.current, {
            y: 400,
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut'
        });
    }, []);

    return (
        <div className="relative w-[400px] h-[400px]">
            <div className="absolute inset-0 grid grid-cols-10 grid-rows-10 gap-4 opacity-50">
                {Array.from({ length: 100 }).map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-dark/20"></div>
                ))}
            </div>
            <div
                ref={lineRef}
                className="absolute top-0 left-0 w-full h-[2px] bg-accent shadow-[0_0_15px_rgba(230,59,46,0.8)] z-10"
            />
        </div>
    );
}

const PulsingWaveform = () => {
    const pathRef = useRef(null);
    useEffect(() => {
        gsap.to(pathRef.current, {
            strokeDashoffset: 0,
            duration: 3,
            repeat: -1,
            ease: 'none',
        });
    }, []);

    return (
        <svg width="600" height="200" viewBox="0 0 600 200" fill="none" className="translate-x-1/4">
            <path
                ref={pathRef}
                d="M 0 100 L 100 100 L 130 50 L 160 180 L 190 20 L 220 150 L 250 100 L 600 100"
                stroke="#E63B2E"
                strokeWidth="6"
                strokeDasharray="800"
                strokeDashoffset="800"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M 0 100 L 600 100"
                stroke="#111111"
                strokeWidth="1"
                opacity="0.2"
            />
        </svg>
    );
}

export default Protocol;
