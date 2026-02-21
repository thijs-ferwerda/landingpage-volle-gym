import React from 'react';
import { Link } from 'react-router-dom';

const CTA = () => {
    return (
        <section id="inzicht" className="relative overflow-hidden flex flex-col items-center justify-center">

            {/* Main CTA Content Area - Hard Cut, Increased padding for footer spacing */}
            <div className="w-full bg-black pt-32 pb-40 md:pb-56 px-6 md:px-12 relative flex items-center justify-center border-t-0">

                {/* Cinematic Background Glows */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-accent/20 rounded-full blur-[150px] pointer-events-none z-0"></div>

                {/* The Card - Maximized contrast (much lighter gray, very strong border, intense glow) */}
                <div className="relative z-10 w-full max-w-5xl mx-auto bg-gradient-to-b from-[#333333] to-[#1a1a1a] rounded-[3rem] p-12 md:p-24 text-center shadow-[0_0_200px_rgba(255,53,0,0.2)] border border-white/30 flex flex-col items-center backdrop-blur-md">

                    <span className="font-data text-accent text-sm md:text-base mb-6 uppercase tracking-widest flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                        Klaar voor schaalbaarheid?
                    </span>

                    <h2 className="font-heading font-black text-6xl md:text-8xl mb-8 tracking-tighter leading-[1] text-white">
                        Claim je <span className="font-drama italic text-accent font-medium">garantie.</span>
                    </h2>

                    {/* Fixed Text Visibility: Ensuring it's bright enough against the dark background */}
                    <p className="font-sans text-white/90 mb-14 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
                        Plan direct je intake in. Geen softe beloftes of vage overtuigingstactieken. Gewoon ontdekken of we jou <strong className="text-white font-bold">binnen 90 dagen aan 45 nieuwe, ideale PT-leden</strong> kunnen helpen.
                    </p>

                    <div className="relative inline-flex items-center justify-center mt-4 w-full md:w-auto">
                        <div className="absolute top-1/2 -translate-y-1/2 -left-20 md:-left-64 transform rotate-[-8deg] text-white/70 text-2xl md:text-3xl pointer-events-none hidden md:block w-56 text-right z-20" style={{ fontFamily: "'Caveat', cursive" }}>
                            Tijd om te schalen?
                            {/* Curved arrow pointing rightwards to the button (fixed rotation) */}
                            <svg className="absolute top-1/2 -translate-y-1/2 -right-10 md:-right-14 w-8 h-8 md:w-10 md:h-10 text-white/50 transform rotate-[10deg]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </div>

                        <style>
                            {`
                                @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&display=swap');
                            `}
                        </style>

                        <Link to="/intake" className="magnetic-btn bg-accent text-primary px-12 py-6 rounded-full text-lg md:text-xl font-bold tracking-widest uppercase group inline-flex items-center gap-4 hover:scale-105 transition-all duration-300 shadow-[0_20px_40px_rgba(255,53,0,0.25)] hover:shadow-[0_20px_60px_rgba(255,53,0,0.5)] z-10 relative">
                            <span className="magnetic-btn-content">Plan de intake</span>
                            <svg
                                className="w-8 h-8 magnetic-btn-content group-hover:translate-x-2 transition-transform duration-300"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2.5" d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTA;
