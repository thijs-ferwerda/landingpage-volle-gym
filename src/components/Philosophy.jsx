import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Philosophy = () => {
    const containerRef = useRef(null);
    const text1Ref = useRef(null);
    const text2Ref = useRef(null);
    const bgRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Parallax Background
            gsap.to(bgRef.current, {
                yPercent: 30,
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                }
            });

            // Simple Text Reveal without SplitText plugin
            const lines = [text1Ref.current, text2Ref.current];

            gsap.fromTo(lines,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.5,
                    stagger: 0.3,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 60%',
                    }
                }
            );

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            id="visie"
            className="relative w-full min-h-[80vh] bg-dark flex items-center justify-center overflow-hidden py-32 border-y border-dark/20"
        >
            {/* Background Parallax Image */}
            <div
                ref={bgRef}
                className="absolute -inset-[20%] w-[140%] h-[140%] bg-cover bg-center opacity-[0.03] grayscale mix-blend-overlay"
                style={{
                    backgroundImage: 'url("https://images.unsplash.com/photo-1517586979036-b7d1e86b3345?q=80&w=2874&auto=format&fit=crop")',
                }}
            />

            {/* Content */}
            <div className="relative z-10 w-full max-w-5xl px-6 md:px-12 mx-auto flex flex-col gap-12">
                <div ref={text1Ref} className="text-primary/60 font-heading text-xl md:text-2xl md:pl-12 border-l border-primary/20">
                    De meeste gyms focussen op: <br />
                    <span className="text-primary font-bold">ad hoc acties en chaos.</span>
                </div>

                <div ref={text2Ref} className="text-primary font-heading text-4xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight text-right md:pr-12">
                    Wij focussen op: <br />
                    <span className="font-drama italic text-accent text-5xl md:text-7xl lg:text-8xl pr-2">voorspelbare systemen.</span>
                </div>
            </div>
        </section>
    );
};

export default Philosophy;
