import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import gsap from 'gsap';

const NotFound = () => {
    const containerRef = useRef(null);
    const contentRefs = useRef([]);

    const addToRefs = (el) => {
        if (el && !contentRefs.current.includes(el)) {
            contentRefs.current.push(el);
        }
    };

    useEffect(() => {
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
                <title>Oeps! Pagina niet gevonden | Volle Gym</title>
                <meta name="robots" content="noindex" />
            </Helmet>

            <div ref={containerRef} className="bg-background min-h-[80vh] flex flex-col items-center justify-center font-sans text-primary px-6">

                {/* Background glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none z-0"></div>

                <div className="relative z-10 max-w-2xl mx-auto text-center flex flex-col items-center">

                    <div ref={addToRefs} className="mb-6">
                        <span className="font-drama italic text-accent text-8xl md:text-9xl font-black tracking-tighter drop-shadow-[0_0_30px_rgba(255,53,0,0.3)]">
                            404
                        </span>
                    </div>

                    <h1 ref={addToRefs} className="font-heading font-bold text-3xl md:text-5xl tracking-tighter mb-6 relative">
                        Deze pagina is waarschijnlijk <br />
                        <span className="relative inline-block mt-2">
                            <span className="relative z-10">gaan droogtrainen...</span>
                            <span className="absolute bottom-1 left-0 w-full h-3 bg-accent/20 -z-10 -rotate-1 rounded-sm"></span>
                        </span>
                    </h1>

                    <p ref={addToRefs} className="text-primary/70 text-base md:text-lg max-w-lg leading-relaxed mb-10">
                        ...en nu is hij onzichtbaar geworden. Of we hebben de URL veranderd, dat kan ook. Hoe dan ook, je bent verdwaald in de kleedkamer. Laten we je terugbrengen naar de zaal.
                    </p>

                    <div ref={addToRefs} className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/" className="magnetic-btn bg-accent text-white px-8 py-3.5 rounded-full text-sm font-bold tracking-wide uppercase group inline-flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(255,53,0,0.3)] transition-transform hover:scale-[1.02]">
                            <span className="magnetic-btn-content">Terug naar Home</span>
                        </Link>

                        <Link to="/intake" className="px-8 py-3.5 rounded-full text-sm font-bold tracking-wide uppercase group inline-flex items-center justify-center gap-3 border border-primary/20 text-primary hover:bg-primary/5 transition-colors">
                            <span>Ik wil wél extra leden</span>
                        </Link>
                    </div>

                </div>
            </div>
        </>
    );
};

export default NotFound;
