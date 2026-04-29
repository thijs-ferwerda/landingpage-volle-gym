import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { testimonials } from '../data/testimonials';

gsap.registerPlugin(ScrollTrigger);

const SocialProof = () => {
    const containerRef = useRef(null);
    const cardsRef = useRef([]);

    const addToRefs = (el) => {
        if (el && !cardsRef.current.includes(el)) {
            cardsRef.current.push(el);
        }
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                cardsRef.current,
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.08,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 80%',
                    }
                }
            );
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} id="resultaten" className="py-24 bg-dark relative border-y border-primary/10">
            {/* Decorative glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16 relative z-10">
                <div className="flex items-center gap-2 mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block"></span>
                    <span className="font-data text-primary/60 text-xs uppercase tracking-widest">Bekijk de interviews</span>
                </div>
                <h2 className="font-heading font-bold text-3xl md:text-5xl text-primary tracking-tight">Echte resultaten.</h2>
            </div>

            {/* Video Grid */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((item, index) => (
                        <div
                            key={index}
                            ref={addToRefs}
                            className="bg-white rounded-[1.5rem] border border-primary/10 shadow-lg group hover:border-accent/40 transition-colors duration-300 flex flex-col h-full p-2 md:p-3"
                        >
                            {/* 16:9 Embedded YouTube Video */}
                            <div className="relative shrink-0 w-full aspect-video bg-dark rounded-xl overflow-hidden">
                                <iframe
                                    className="absolute top-0 left-0 w-full h-full"
                                    src={`https://www.youtube.com/embed/${item.videoId}?rel=0&modestbranding=1`}
                                    title={`Interview met ${item.name}`}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    loading="lazy"
                                ></iframe>
                            </div>

                            {/* Content below video */}
                            <div className="p-4 pt-5 bg-white flex-1 flex flex-col">
                                <p className="font-heading font-semibold text-[#E03000] text-lg md:text-xl mb-1 tracking-wide">{item.result}</p>
                                <p className="font-sans font-medium text-sm text-primary/70 uppercase tracking-widest mb-3">{item.name}</p>
                                <div className="h-px w-full bg-primary/10 mb-3"></div>
                                <p className="font-sans text-sm text-primary/70 italic leading-relaxed flex-1">
                                    {item.objection}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SocialProof;
