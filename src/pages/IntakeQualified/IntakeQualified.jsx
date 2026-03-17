/* eslint-disable react-hooks/purity */
import React, { useEffect, useState } from 'react';

const IntakeQualified = () => {
    const [timestamp] = useState(Date.now());

    useEffect(() => {
        window.scrollTo(0, 0);

        // Load HighLevel Calendar Embed Script
        const script = document.createElement('script');
        script.src = "https://link.msgsndr.com/js/form_embed.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            // Clean up if needed
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        };
    }, []);

    return (
        <section className="min-h-screen pt-32 pb-24 px-6 bg-background flex flex-col items-center relative z-10 w-full overflow-hidden">
            {/* Soft decorative background gradients */}
            <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

            <div className="max-w-4xl w-full mx-auto text-center mb-12 relative z-20 flex flex-col items-center">
                <div className="inline-flex items-center gap-3 px-5 py-2.5 border border-primary/10 rounded-full bg-white shadow-sm mb-8">
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                    <p className="font-data text-primary text-xs md:text-sm uppercase tracking-widest font-bold">
                        Stap 2 van 2: Plan je gesprek
                    </p>
                </div>

                <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-primary tracking-tighter leading-[1.1] mb-6">
                    Kies een moment voor je <br className="hidden md:block" />
                    <span className="font-drama italic text-primary/70">verdiepingsgesprek.</span>
                </h1>

                <p className="font-sans text-primary/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-8">
                    Gefeliciteerd, je club is gekwalificeerd. Selecteer hieronder een datum en tijd voor een vrijblijvende, strategische sessie met ons.
                </p>
            </div>

            {/* Embedded Calendar Container */}
            <div className="w-full max-w-6xl -mx-6 px-2 md:mx-auto md:px-20 pb-0 md:pb-10 pt-0 bg-transparent md:bg-white rounded-none md:rounded-3xl shadow-none md:shadow-xl border-0 md:border md:border-primary/10 relative z-20">
                <iframe
                    src={`https://api.leadconnectorhq.com/widget/booking/VJNpnvcHICgLsY8NxG8r?cb=${timestamp}`}
                    style={{ width: '100%', border: 'none', overflow: 'hidden' }}
                    scrolling="no"
                    id="VJNpnvcHICgLsY8NxG8r_1771696118701"
                    title="booking"
                    className="w-full min-h-[900px] md:min-h-[700px]"
                ></iframe>
            </div>

            {/* Speaker profile */}
            <div className="mt-10 flex items-center gap-4 relative z-20">
                <div className="w-14 h-14 rounded-full ring-2 ring-accent/30 ring-offset-2 overflow-hidden flex-shrink-0">
                    <img src="/bas-nagel.jpeg" alt="Bas Nagel" className="w-full h-full object-cover" />
                </div>
                <div className="text-left">
                    <p className="font-heading font-semibold text-primary text-base">Bas Nagel</p>
                    <p className="font-sans text-primary/50 text-sm">Oprichter, Volle Gym</p>
                </div>
            </div>
        </section>
    );
};

export default IntakeQualified;
