import React from 'react';
import { Link } from 'react-router-dom';

const CTA = () => {
    return (
        <section id="inzicht" className="py-32 px-6 md:px-12 bg-background relative overflow-hidden">
            {/* Subtle Noise / Grid behind CTA */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9IiMxMTExMTEiIGZpbGwtb3BhY2l0eT0iMC4xIi8+PC9zdmc+')] opacity-50 z-0"></div>

            <div className="relative z-10 max-w-4xl mx-auto bg-dark text-primary rounded-[3rem] p-12 md:p-24 text-center shadow-2xl border border-dark/10">
                <h2 className="font-heading font-bold text-4xl md:text-6xl mb-6 tracking-tight flex flex-col items-center gap-2">
                    <span className="text-xl md:text-2xl font-normal text-primary/60 tracking-wider w-full">Klaar voor schaalbaarheid?</span>
                    <span>Claim je garantie.</span>
                </h2>

                <p className="font-sans text-primary/80 mb-12 max-w-2xl mx-auto text-lg leading-relaxed">
                    Doe direct de intake in. Geen softe beloftes of vage overtuigingstactieken. Gewoon ontdekken of we jou <strong>binnen 90 dagen aan 45 nieuwe, ideale PT-leden</strong> kunnen helpen.
                </p>

                <Link to="/intake" className="magnetic-btn bg-accent text-primary px-10 py-5 rounded-full text-lg md:text-xl font-bold tracking-wide uppercase group inline-flex items-center gap-4">
                    <span className="magnetic-btn-content">Doe de intake</span>
                    <svg
                        className="w-6 h-6 magnetic-btn-content group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                </Link>
            </div>
        </section>
    );
};

export default CTA;
