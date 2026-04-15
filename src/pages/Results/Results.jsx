import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import gsap from 'gsap';
import GoogleReviews from '../../components/GoogleReviews';
import CTA from '../../components/CTA';
import { testimonials } from '../../data/testimonials';

const Results = () => {
    const containerRef = useRef(null);
    const contentRefs = useRef([]);

    const addToRefs = (el) => {
        if (el && !contentRefs.current.includes(el)) {
            contentRefs.current.push(el);
        }
    };

    useEffect(() => {
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
                <title>Onze Resultaten | Volle Gym</title>
                <meta name="description" content="Ontdek hoe we de afgelopen maanden landelijk al succesvolle gyms wisten te transformeren. Bekijk de ervaringen van onze partners." />
                <link rel="canonical" href="https://www.vollegym.nl/resultaten" />
                <script type="application/ld+json">{JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.vollegym.nl"},{"@type":"ListItem","position":2,"name":"Resultaten"}]})}</script>
            </Helmet>

            <div ref={containerRef} className="bg-background min-h-screen pt-32 font-sans text-primary relative overflow-hidden">

                {/* Background glow using accent color */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none z-0"></div>

                <section className="relative z-10 w-full px-6 md:px-12 flex flex-col items-center text-center mb-16 md:mb-24">
                    <div className="max-w-3xl mx-auto flex flex-col items-center">
                        <div ref={addToRefs} className="flex items-center justify-center gap-3 mb-6">
                            <span className="text-accent uppercase tracking-widest text-xs font-semibold px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5">
                                Resultaten
                            </span>
                        </div>
                        <h1 ref={addToRefs} className="font-heading font-bold text-4xl md:text-5xl lg:text-7xl tracking-tighter text-primary leading-[1.1] mb-6">
                            De woorden van <br />
                            <span className="font-drama italic text-accent pr-3">onze partners.</span>
                        </h1>

                        <p ref={addToRefs} className="text-primary/70 text-base md:text-xl max-w-2xl leading-relaxed mb-4">
                            Zie wat gyms uit heel Nederland zeggen over het aantal leden en hun ervaringen met ons.
                        </p>
                    </div>
                </section>

                {/* Video Grid Section */}
                <section className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pb-24 border-b border-primary/5">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {testimonials.map((item, index) => (
                            <div
                                key={index}
                                ref={addToRefs}
                                className="bg-white rounded-[1.5rem] border border-primary/10 shadow-lg group hover:border-primary/20 transition-colors duration-300 flex flex-col h-full p-2 md:p-3"
                            >
                                {/* 16:9 Embedded YouTube Video */}
                                <div className="relative shrink-0 w-full aspect-video bg-black rounded-xl overflow-hidden">
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
                                    <p className="font-heading font-semibold text-accent text-lg md:text-xl mb-1 tracking-wide">{item.result}</p>
                                    <p className="font-sans font-medium text-sm text-primary/70 uppercase tracking-widest mb-3">{item.name}</p>
                                    <div className="h-px w-full bg-primary/10 mb-3"></div>
                                    <p className="font-sans text-sm text-primary/70 italic leading-relaxed flex-1">
                                        {item.objection}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Google Reviews Sectie (Re-using Existing Component, modified via CSS internally to fit) */}
                <section className="bg-white relative z-10">
                    <GoogleReviews />
                </section>

                {/* Final Call To Action underneath the wall of proof */}
                <section className="bg-background relative z-10 min-h-[500px]">
                    {/* The CTA has built-in large margins, so we wrap it slightly */}
                    <CTA />
                </section>
            </div>
        </>
    );
};

export default Results;
