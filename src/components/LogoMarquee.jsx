import React from 'react';
import logo1 from '../assets/logos/logo1.webp';
import logo2 from '../assets/logos/logo2.webp';
import logo3 from '../assets/logos/logo3.webp';
import logo4 from '../assets/logos/logo4.webp';
import logo5 from '../assets/logos/logo5.webp';
import logo6 from '../assets/logos/logo6.webp';
import logo7 from '../assets/logos/logo7.webp';
import logo8 from '../assets/logos/logo8.webp';
import logo9 from '../assets/logos/logo9.webp';
import logo10 from '../assets/logos/logo10.webp';
import logo11 from '../assets/logos/logo11.webp';
import logo12 from '../assets/logos/logo12.webp';

const logos = [
    { id: 1, src: logo1 },
    { id: 2, src: logo2 },
    { id: 3, src: logo3 },
    { id: 4, src: logo4 },
    { id: 5, src: logo5 },
    { id: 6, src: logo6 },
    { id: 7, src: logo7 },
    { id: 8, src: logo8 },
    { id: 9, src: logo9 },
    { id: 10, src: logo10 },
    { id: 11, src: logo11 },
    { id: 12, src: logo12 }
];

const LogoMarquee = () => {
    return (
        <section className="py-12 bg-background border-b border-primary/5 overflow-hidden relative z-20">
            {/* Custom CSS for perfectly seamless infinite marquee */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes infinite-scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(calc(-50% - 2rem)); } /* -50% plus gap adjustment */
                }
                .animate-infinite-scroll {
                    animation: infinite-scroll 40s linear infinite;
                }
                .animate-infinite-scroll:hover {
                    animation-play-state: paused;
                }
            `}} />

            {/* Decorative gradients for smooth fade in/out on the edges */}
            <div className="absolute top-0 left-0 w-24 md:w-48 h-full bg-gradient-to-r from-background via-background/90 to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 right-0 w-24 md:w-48 h-full bg-gradient-to-l from-background via-background/90 to-transparent z-10 pointer-events-none" />

            <div className="text-center mb-10 relative z-20">
                <p className="font-sans text-primary/40 text-sm font-semibold tracking-wide uppercase">
                    Reeds 40+ succesvolle trajecten bij o.a.
                </p>
            </div>

            {/* Scrolling Container */}
            <div className="flex w-fit animate-infinite-scroll gap-16 md:gap-24 opacity-70 hover:opacity-100 transition-opacity duration-500 pl-16 mix-blend-multiply">
                {/* Duplicated array for seamless loop (original + clone) */}
                {[...logos, ...logos].map((logo, index) => (
                    <div
                        key={`${logo.id}-${index}`}
                        className="inline-flex items-center justify-center flex-shrink-0 w-40 md:w-56 lg:w-64 grayscale hover:grayscale-0 transition-all duration-300 transform hover:scale-105"
                    >
                        <img
                            src={logo.src}
                            alt={`Partner Logo ${logo.id}`}
                            className="max-h-24 md:max-h-32 w-auto object-contain"
                            loading="lazy"
                        />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default LogoMarquee;
