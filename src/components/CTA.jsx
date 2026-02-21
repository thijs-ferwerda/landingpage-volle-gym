import React from 'react';
import { Link } from 'react-router-dom';

const CTA = () => {
    return (
        <section id="inzicht" className="py-32 md:py-48 px-6 md:px-12 bg-black relative overflow-hidden flex items-center justify-center">

            {/* Cinematic Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none z-0"></div>

            <div className="relative z-10 w-full max-w-5xl mx-auto bg-gradient-to-b from-[#0a0a0a] to-[#050505] text-primary rounded-[3rem] p-12 md:p-24 text-center shadow-[0_0_100px_rgba(255,53,0,0.05)] border border-accent/20 flex flex-col items-center">

                <span className="font-data text-accent text-sm md:text-base mb-6 uppercase tracking-widest flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                    Klaar voor schaalbaarheid?
                </span>

                <h2 className="font-heading font-black text-6xl md:text-8xl mb-8 tracking-tighter leading-[1] text-white">
                    Claim je <span className="font-drama italic text-accent font-medium">garantie.</span>
                </h2>

                <p className="font-sans text-primary/70 mb-14 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
                    Plan direct je intake in. Geen softe beloftes of vage overtuigingstactieken. Gewoon ontdekken of we jou <strong className="text-white font-semibold">binnen 90 dagen aan 45 nieuwe, ideale PT-leden</strong> kunnen helpen.
                </p>

                <Link to="/intake" className="magnetic-btn bg-accent text-primary px-12 py-6 rounded-full text-lg md:text-xl font-bold tracking-widest uppercase group inline-flex items-center gap-4 hover:scale-105 transition-all duration-300 shadow-[0_20px_40px_rgba(255,53,0,0.25)] hover:shadow-[0_20px_60px_rgba(255,53,0,0.4)]">
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
        </section>
    );
};

export default CTA;
