/* eslint-disable react-hooks/purity */
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const SolliciterenHQ = () => {
    const [searchParams] = useSearchParams();
    const roleId = searchParams.get('role');

    // Format the role for display from url param (e.g. videograaf-fotograaf-hq -> Videograaf Fotograaf HQ)
    const displayRole = roleId
        ? roleId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
        : 'Volle Gym HQ';

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        portfolioInfo: '',
        motivation: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await fetch("https://formsubmit.co/ajax/bas@vollegym.nl", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    Name: formData.name,
                    Email: formData.email,
                    Phone: formData.phone,
                    Portfolio: formData.portfolioInfo,
                    Motivation: formData.motivation,
                    _subject: `Nieuwe HQ Sollicitatie: ${formData.name} - ${displayRole}`,
                    _template: "table"
                })
            });
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
    }, []);

    return (
        <section className="min-h-screen pt-32 pb-24 px-6 bg-background flex flex-col items-center relative z-10 w-full overflow-hidden">
            {/* Soft decorative background gradients */}
            <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

            <div className="max-w-4xl w-full mx-auto text-center mb-12 relative z-20 flex flex-col items-center">
                <div className="inline-flex items-center gap-3 px-5 py-2.5 border border-primary/10 rounded-full bg-white shadow-sm mb-8">
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                    <p className="font-data text-primary text-xs md:text-sm uppercase tracking-widest font-bold">
                        Werken Bij HQ
                    </p>
                </div>

                <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-primary tracking-tighter leading-[1.1] mb-6">
                    Meld je aan voor {roleId ? displayRole : 'Volle Gym HQ'}
                </h1>

                <p className="font-sans text-primary/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-8">
                    Vul het formulier hieronder in om je sollicitatieproces bij Volle Gym HQ te starten.
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
                        <h3 className="font-heading font-bold text-3xl text-primary mb-4">Sollicitatie succesvol ontvangen!</h3>
                        <p className="font-sans text-primary/70 text-lg leading-relaxed max-w-md mx-auto mb-8">
                            We hebben je gegevens in goede orde ontvangen. <br /><br />
                            Je hoort zo snel mogelijk van ons voor het verdere proces.
                        </p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <div className="text-center mb-6">
                            <h3 className="font-heading font-bold text-2xl text-primary mb-2">Sollicitatieformulier</h3>
                            <p className="font-sans text-primary/60 text-sm">
                                Laat hier je gegevens achter, dan nemen we contact met je op.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-primary/70 uppercase tracking-wider mb-2">Voor- en Achternaam</label>
                                <input
                                    type="text"
                                    required
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
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-primary/5 border border-primary/10 rounded-xl px-4 py-3 text-primary outline-none focus:border-accent/50 transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-primary/70 uppercase tracking-wider mb-2">Link naar Portfolio of CV</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.portfolioInfo}
                                    onChange={(e) => setFormData({ ...formData, portfolioInfo: e.target.value })}
                                    className="w-full bg-primary/5 border border-primary/10 rounded-xl px-4 py-3 text-primary outline-none focus:border-accent/50 transition-colors"
                                    placeholder="Linksbios, Instagram, LinkedIn, etc."
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-primary/70 uppercase tracking-wider mb-2">Waarom ben jij de perfecte match voor deze missie?</label>
                            <textarea
                                required
                                rows="5"
                                value={formData.motivation}
                                onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                                className="w-full bg-primary/5 border border-primary/10 rounded-xl px-4 py-3 text-primary outline-none focus:border-accent/50 transition-colors resize-none"
                                placeholder="Laat ons weten waarom je hier bent..."
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
                                'Sollicitatie Versturen'
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
            </div>
        </section>
    );
};

export default SolliciterenHQ;
