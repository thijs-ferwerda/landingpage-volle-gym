import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const VolleGymBar = () => {
    const barRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                barRef.current,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: barRef.current,
                        start: 'top 95%',
                    }
                }
            );
        }, barRef);

        return () => ctx.revert();
    }, []);

    return (
        <div className="w-full bg-accent text-primary py-4 px-6 relative z-30" ref={barRef}>
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
                <div className="flex items-center gap-2 font-data text-xs uppercase tracking-widest bg-dark/20 px-3 py-1.5 rounded-full">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                    Live Data
                </div>
                <p className="font-heading font-medium text-sm md:text-base">
                    Op dit moment starten er elke week gemiddeld 2 nieuwe PT-studio's of gyms. <br className="sm:hidden" />
                    <a href="#impact" onClick={(e) => { e.preventDefault(); document.getElementById('impact').scrollIntoView({ behavior: 'smooth' }); }} className="underline decoration-2 underline-offset-4 hover:text-white transition-colors cursor-pointer sm:ml-2">Zie hier hun resultaten.</a>
                </p>
            </div>
        </div>
    );
};

export default VolleGymBar;
