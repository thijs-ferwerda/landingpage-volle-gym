import React, { useRef } from 'react';
import { testimonials } from '../data/testimonials';

const SocialProof = () => {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            const scrollAmount = direction === 'left' ? -400 : 400;
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <section id="resultaten" className="py-24 bg-dark overflow-hidden relative border-y border-primary/10">
            {/* Decorative Overlay */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-dark to-transparent z-10 pointer-events-none hidden md:block" />
            <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-dark to-transparent z-10 pointer-events-none hidden md:block" />

            <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-20">
                <div>
                    <h2 className="font-heading font-bold text-3xl md:text-5xl text-primary mb-4 tracking-tight">Echte resultaten.</h2>
                    <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block"></span>
                        <span className="font-data text-primary/60 text-xs uppercase tracking-widest">Bekijk de interviews</span>
                    </div>
                </div>

                <div className="flex gap-4">
                    <button onClick={() => scroll('left')} aria-label="Vorige resultaten" className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center text-primary hover:bg-primary/5 hover:border-accent transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <button onClick={() => scroll('right')} aria-label="Volgende resultaten" className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center text-primary hover:bg-primary/5 hover:border-accent transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                    </button>
                </div>
            </div>

            {/* Horizontal Scroll Container for YouTube Videos */}
            <div
                ref={scrollRef}
                className="flex overflow-x-auto snap-x snap-mandatory gap-6 px-6 md:px-12 pb-8 hide-scrollbar relative z-20"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                <style dangerouslySetInnerHTML={{
                    __html: `
                  .hide-scrollbar::-webkit-scrollbar { display: none; }
                `}} />

                {testimonials.map((item, index) => (
                    <div
                        key={index}
                        className="flex-shrink-0 w-[300px] md:w-[400px] bg-white rounded-[1.5rem] border border-primary/10 snap-center shadow-lg group hover:border-primary/20 transition-colors duration-300 p-2 md:p-3 flex flex-col"
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
                            <p className="font-sans text-sm text-primary/70 italic leading-relaxed">
                                {item.objection}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default SocialProof;
