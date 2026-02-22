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
        <div className="w-full bg-accent text-white py-4 px-6 relative z-30" ref={barRef}>
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
                <div className="flex items-center gap-2 font-data text-xs uppercase tracking-widest bg-dark/20 px-3 py-1.5 rounded-full">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                    Live Data
                </div>
                <div className="font-heading font-medium text-sm md:text-base flex flex-col sm:block items-center">
                    <span>Op dit moment starten er elke week gemiddeld 2 nieuwe PT-studio's of gyms.</span>
                    <a href="#impact" onClick={(e) => { e.preventDefault(); document.getElementById('impact').scrollIntoView({ behavior: 'smooth' }); }} className="inline-flex sm:inline items-center justify-center bg-background sm:bg-transparent text-primary sm:text-white px-5 py-2 sm:px-0 sm:py-0 rounded-full sm:rounded-none text-xs sm:text-base font-bold sm:font-medium mt-3 sm:mt-0 underline-offset-4 sm:underline hover:bg-white sm:hover:bg-transparent hover:text-black transition-colors cursor-pointer sm:ml-2 shadow-sm sm:shadow-none w-fit">Zie hier hun resultaten.</a>
                </div>
            </div>
        </div>
    );
};

export default VolleGymBar;
