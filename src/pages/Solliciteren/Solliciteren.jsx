/* eslint-disable react-hooks/purity */
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const Solliciteren = () => {
    const [timestamp] = useState(Date.now());
    const [searchParams] = useSearchParams();
    const roleId = searchParams.get('role');

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        location: '',
        motivation: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const payload = {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            location: formData.location,
            motivation: formData.motivation,
            form_type: "partner_sollicitatie"
        };

        try {
            await Promise.allSettled([
                fetch("https://services.leadconnectorhq.com/hooks/0ybaSuLNKF7ssKOjBqwH/webhook-trigger/48120e14-7b1b-435c-866e-c09b486373a2", {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                }),
                fetch("https://n8n.vollegym.nl/webhook/recruitment-website-notify", {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                })
            ]);
            setIsSubmitted(true);
        } catch (error) {
            console.error("Fout bij het versturen van formulier:", error);
            setIsSubmitted(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);

        // Load HighLevel Embed Script
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
                        Start je sollicitatie
                    </p>
                </div>

                <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-primary tracking-tighter leading-[1.1] mb-6">
                    Meld je aan voor {roleId ? `de vacature` : 'een gesprek'} <br className="hidden md:block" />
                    bij <span className="font-drama italic text-primary/70">Volle Gym Partners.</span>
                </h1>

                <p className="font-sans text-primary/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-8">
                    Vul het formulier hieronder in om je introductiesessie of kennismaking direct te starten.
                </p>
            </div>

            {/* Embedded Form Container */}
            <div className="w-full max-w-2xl mx-auto bg-white rounded-3xl shadow-xl border border-primary/10 overflow-hidden relative z-20 p-8 md:p-12">
                {isSubmitted ? (
                    <div className="text-center py-10 flex flex-col items-center">
                        <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center text-accent mb-6">
                            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h3 className="font-heading font-bold text-3xl text-primary mb-4">Aanvraag succesvol gestart!</h3>
                        <p className="font-sans text-primary/70 text-lg leading-relaxed max-w-md mx-auto mb-8">
                            Je aanmelding is succesvol op de achtergrond verzonden. Je hebt er geen mailprogramma meer voor nodig! <br /><br />
                            Bas (Volle Gym HQ) neemt zo snel mogelijk contact met je op voor het verdere proces.
                        </p>
                        <button
                            onClick={() => setIsSubmitted(false)}
                            className="text-sm font-bold text-primary/40 hover:text-accent transition-colors uppercase tracking-wider"
                        >
                            Nieuwe aanvraag starten
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <div className="text-center mb-6">
                            <h3 className="font-heading font-bold text-2xl text-primary mb-2">Aanmeldingsformulier</h3>
                            <p className="font-sans text-primary/60 text-sm">
                                Laat hieronder je gegevens achter, dan nemen wij zo snel mogelijk contact met je op.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-primary/70 uppercase tracking-wider mb-2">Voor- en Achternaam</label>
                                <input
                                    type="text"
                                    required
                                    autoComplete="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-primary/5 border border-primary/10 rounded-xl px-4 py-3 text-primary outline-none focus:border-accent/50 transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-primary/70 uppercase tracking-wider mb-2">Telefoonnummer</label>
                                <input
                                    type="tel"
                                    required
                                    autoComplete="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full bg-primary/5 border border-primary/10 rounded-xl px-4 py-3 text-primary outline-none focus:border-accent/50 transition-colors"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-primary/70 uppercase tracking-wider mb-2">E-mailadres</label>
                                <input
                                    type="email"
                                    required
                                    autoComplete="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-primary/5 border border-primary/10 rounded-xl px-4 py-3 text-primary outline-none focus:border-accent/50 transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-primary/70 uppercase tracking-wider mb-2">Voorkeur Vestiging/Regio</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    className="w-full bg-primary/5 border border-primary/10 rounded-xl px-4 py-3 text-primary outline-none focus:border-accent/50 transition-colors"
                                    placeholder="Bijv. Amsterdam of HQ"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-primary/70 uppercase tracking-wider mb-2">Wat spreekt je aan of wat is je doel?</label>
                            <textarea
                                required
                                rows="5"
                                value={formData.motivation}
                                onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                                className="w-full bg-primary/5 border border-primary/10 rounded-xl px-4 py-3 text-primary outline-none focus:border-accent/50 transition-colors resize-none"
                                placeholder="Zet hier waarom je solliciteert of wat je ambities zijn..."
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="mt-4 bg-accent text-white py-4 rounded-xl font-bold tracking-wide uppercase hover:bg-accent/90 transition-colors shadow-lg shadow-accent/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Verzenden...
                                </>
                            ) : (
                                'Verstuur Aanmelding'
                            )}
                        </button>
                    </form>
                )}
            </div>

            {/* Security/Trust Indicators below the form */}
            <div className="mt-8 flex items-center justify-center gap-6 opacity-60">
                <div className="flex items-center gap-2 font-sans text-sm text-primary font-medium">
                    <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                    256-bit beveiligde verbinding
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-primary/20"></div>
                <div className="flex items-center gap-2 font-sans text-sm text-primary font-medium">
                    100% Vrijblijvend kennismaken
                </div>
            </div>
        </section>
    );
};

export default Solliciteren;
