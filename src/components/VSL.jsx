import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const VSL = () => {
    const containerRef = useRef(null);
    const videoWrapperRef = useRef(null);
    const playButtonRef = useRef(null);
    const textRefs = useRef([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const addToTextRefs = (el) => {
        if (el && !textRefs.current.includes(el)) {
            textRefs.current.push(el);
        }
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Reveal animation for text
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

            // Parallax effect on the video wrapper
            gsap.fromTo(
                videoWrapperRef.current,
                { y: 50, scale: 0.95, opacity: 0 },
                {
                    y: 0,
                    scale: 1,
                    opacity: 1,
                    duration: 1.2,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: videoWrapperRef.current,
                        start: 'top 85%',
                    }
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    // Magnetic hover effect for play button
    const handleMouseMove = (e) => {
        if (!playButtonRef.current) return;
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - left - width / 2) * 0.4;
        const y = (e.clientY - top - height / 2) * 0.4;

        gsap.to(playButtonRef.current, {
            x, y, duration: 0.3, ease: 'power2.out'
        });
    };

    const handleMouseLeave = () => {
        if (!playButtonRef.current) return;
        gsap.to(playButtonRef.current, {
            x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)'
        });
    };

    // Close modal on Escape key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') setIsModalOpen(false);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => { document.body.style.overflow = 'auto'; };
    }, [isModalOpen]);

    return (
        <section id="vsl" ref={containerRef} className="py-24 md:py-32 px-6 md:px-12 bg-background relative z-20 overflow-hidden">
            {/* Cinematic Background Glow */}
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
                        Jij houdt je klanten keihard verantwoordelijk voor hun resultaat. Maar wie doet dat voor jou? Wij zijn gespecialiseerd in het behalen van jouw groeidoelen, doordat we niet alleen de kraan openzetten, maar jou ook verantwoordelijk houden voor de opvolging.
                    </p>
                    <div ref={addToTextRefs} className="flex flex-col sm:flex-row gap-4 mt-6">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="magnetic-btn bg-accent text-white px-8 py-4 rounded-full text-sm font-bold tracking-wide uppercase group inline-flex justify-center items-center gap-3 border border-accent/50 hover:border-accent shadow-[0_0_20px_rgba(255,53,0,0.3)] transition-all"
                        >
                            <span className="magnetic-btn-content">Bekijk De Video</span>
                            <svg className="w-5 h-5 magnetic-btn-content group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Video Column */}
                <div className="w-full lg:w-7/12">
                    <div
                        ref={videoWrapperRef}
                        onClick={() => setIsModalOpen(true)}
                        className="relative w-full aspect-video rounded-[2rem] overflow-hidden bg-dark shadow-2xl group cursor-pointer border border-dark/10"
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                    >
                        {/* Cinematic Overlay */}
                        <div className="absolute inset-0 bg-dark/20 group-hover:bg-dark/40 transition-colors duration-500 z-10" />
                        <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent z-10" />

                        {/* Placeholder Thumbnail - User can replace with actual video thumbnail from VolleGym */}
                        <img
                            src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2940&auto=format&fit=crop"
                            alt="Volle Gym VSL Thumbnail"
                            className="w-full h-full object-cover grayscale opacity-90 group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
                        />

                        {/* Play Button */}
                        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                            <div
                                ref={playButtonRef}
                                className="w-24 h-24 md:w-32 md:h-32 rounded-full border border-primary/30 backdrop-blur-md bg-dark/40 flex items-center justify-center text-primary group-hover:bg-accent group-hover:border-accent transition-colors duration-300"
                            >
                                <svg className="w-8 h-8 md:w-10 md:h-10 ml-2" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </div>
                        </div>

                        {/* Video Label */}
                        <div className="absolute bottom-6 left-8 z-20 font-data text-xs text-primary/80 tracking-widest uppercase">
                            <span className="w-2 h-2 rounded-full bg-accent inline-block mr-2 animate-pulse"></span>
                            Bekijk Video (4:20)
                        </div>
                    </div>
                </div>

            </div>

            {/* Video Modal Overlay */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12">
                    {/* Dark Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/90 backdrop-blur-sm cursor-pointer"
                        onClick={() => setIsModalOpen(false)}
                    />

                    {/* Modal Content */}
                    <div className="relative w-full max-w-6xl aspect-video bg-dark rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] z-10 border border-white/10 animate-fade-in-up">

                        {/* Close Button */}
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute z-20 top-4 right-4 md:top-6 md:right-6 w-10 h-10 md:w-12 md:h-12 bg-black/50 hover:bg-black/80 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors border border-white/10 cursor-pointer group"
                        >
                            <svg className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Note: User should replace 'Qjc8I01bZE8' with actual VSL YouTube ID */}
                        <iframe
                            className="w-full h-full"
                            src="https://www.youtube.com/embed/Qjc8I01bZE8?autoplay=1&rel=0&modestbranding=1"
                            title="Volle Gym VSL"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            )}
        </section>
    );
};

export default VSL;
