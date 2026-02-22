import React, { useEffect } from 'react';

const IntakeQualified = () => {
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
                        Stap 2 van 2: Plan je intake
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
            <div className="w-full max-w-6xl mx-auto p-4 bg-white rounded-3xl shadow-xl border border-primary/10 relative z-20">
                <iframe
                    src="https://api.leadconnectorhq.com/widget/booking/VJNpnvcHICgLsY8NxG8r"
                    style={{ width: '100%', border: 'none', overflow: 'hidden' }}
                    scrolling="no"
                    id="VJNpnvcHICgLsY8NxG8r_1771696118701"
                    title="booking"
                    className="w-full h-full min-h-[700px]"
                ></iframe>
            </div>

            {/* Security/Trust Indicators below the form */}
            <div className="mt-8 flex items-center justify-center gap-6 opacity-60">
                <div className="flex items-center gap-2 font-sans text-sm text-primary font-medium">
                    <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                    256-bit beveiligde verbinding
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-primary/20"></div>
                <div className="flex items-center gap-2 font-sans text-sm text-primary font-medium">
                    100% Vrijblijvend gesprek
                </div>
            </div>
        </section>
    );
};

export default IntakeQualified;
