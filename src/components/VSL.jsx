import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const VSL = () => {
    const containerRef = useRef(null);
    const imageWrapperRef = useRef(null);
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
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.15,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 70%',
                    }
                }
            );

            gsap.fromTo(
                imageWrapperRef.current,
                { y: 50, scale: 0.95, opacity: 0 },
                {
                    y: 0,
                    scale: 1,
                    opacity: 1,
                    duration: 1.2,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: imageWrapperRef.current,
                        start: 'top 85%',
                    }
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="vsl" ref={containerRef} className="py-24 md:py-32 px-6 md:px-12 bg-background relative z-20 overflow-hidden">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent pointer-events-none" />
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1/2 h-[800px] bg-accent/5 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 items-center relative z-20">

                {/* Text Column */}
                <div className="w-full lg:w-5/12 flex flex-col justify-center">
                    <div ref={addToTextRefs} className="flex items-center gap-2 mb-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block"></span>
                        <span className="font-data text-primary/60 text-xs uppercase tracking-widest">Je bent niet alleen</span>
                    </div>
                    <h2 ref={addToTextRefs} className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-primary mb-6 leading-[1.1] tracking-tight">
                        Wie is jouw  <br className="hidden md:block" />
                        <span className="font-drama italic text-accent pr-2 shadow-sm">accountability partner?</span>
                    </h2>
                    <p ref={addToTextRefs} className="font-sans text-primary/70 text-lg md:text-xl mb-8 leading-relaxed">
                        Jij houdt jouw klanten soepel verantwoordelijk voor hun resultaten, maar wie doet dat voor jou? Wij hebben ons hele systeem zo ingericht dat wij díe partij voor je zijn. Oprecht meedenken, een keiharde stok achter de deur, en de garantie dat je jouw vastgestelde groeidoelen gaat aantikken.
                    </p>
                </div>

                {/* Team Photo Column */}
                <div className="w-full lg:w-7/12">
                    <div
                        ref={imageWrapperRef}
                        className="relative w-full aspect-video rounded-[2rem] overflow-hidden shadow-2xl border border-dark/10"
                    >
                        <img
                            src="/team-vollegym-new-v2.webp"
                            alt="Het Volle Gym Team"
                            width="682"
                            height="1024"
                            loading="lazy"
                            className="w-full h-full object-cover object-[55%_55%]"
                        />
                    </div>
                </div>

            </div>
        </section>
    );
};

export default VSL;
