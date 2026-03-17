import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

const WerkenBij = () => {
    const containerRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', motivation: '' });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await fetch("https://services.leadconnectorhq.com/hooks/0ybaSuLNKF7ssKOjBqwH/webhook-trigger/48120e14-7b1b-435c-866e-c09b486373a2", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    motivation: formData.motivation,
                    form_type: "open_sollicitatie"
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

        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".animate-section",
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.2,
                    ease: 'power3.out',
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="bg-background min-h-screen text-primary overflow-hidden">
            <Helmet>
                <title>Werken bij | Volle Gym</title>
                <meta name="description" content="Kom werken bij Volle Gym intern of ontdek vacatures bij één van onze high-end partner studio's." />
            </Helmet>

            <section className="relative w-full pt-40 pb-20 md:pt-48 md:pb-32 px-6 flex flex-col items-center overflow-hidden animate-section">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/5 via-background to-background pointer-events-none z-0" />
                <div className="relative z-10 w-full max-w-4xl mx-auto text-center flex flex-col items-center">
                    <h1 className="font-heading font-black text-5xl md:text-7xl lg:text-8xl tracking-tighter text-primary leading-[1.05] mb-8">
                        Kies jouw <span className="font-drama italic text-accent font-medium">carrièrepad.</span>
                    </h1>
                    <p className="font-sans text-primary/70 text-lg md:text-2xl max-w-3xl leading-relaxed">
                        Wil je bouwen aan de groei van Volle Gym zélf op ons hoofdkantoor, of sta je liever met je voeten in de klei bij één van onze exclusieve gym partners?
                    </p>
                </div>
            </section>

            <section className="relative z-10 max-w-6xl mx-auto px-6 pb-40">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 animate-section">

                    {/* Interne Vacatures Card */}
                    <div id="volle-gym-hq" className="scroll-mt-32 bg-white rounded-[3rem] p-10 md:p-14 border border-primary/10 shadow-2xl relative overflow-hidden group hover:border-accent/40 transition-colors duration-500">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-[80px] group-hover:bg-accent/10 transition-colors"></div>
                        <div className="relative z-10 flex flex-col h-full">
                            <span className="inline-block px-4 py-1.5 rounded-full bg-primary text-white text-xs font-data uppercase tracking-widest w-fit mb-8 shadow-md">
                                Volle Gym HQ
                            </span>
                            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-6">Werken bij Volle Gym</h2>
                            <p className="font-sans text-primary/70 leading-relaxed mb-12 flex-grow text-lg">
                                Word onderdeel van het team achter het succes van meer dan 60+ Nederlandse boutiek gyms.
                                We zoeken regelmatig performance marketeers, funnel bouwers en strategen in Amsterdam.
                            </p>

                            <Link to="/werken-bij/hq" className="magnetic-btn bg-white border-2 border-primary text-primary px-8 py-4 rounded-full text-sm font-bold tracking-wide uppercase hover:bg-primary hover:text-white transition-all duration-300 w-fit">
                                <span className="magnetic-btn-content">Bekijk HQ Vacatures</span>
                            </Link>
                        </div>
                    </div>

                    {/* Partner Vacatures Card */}
                    <div id="onze-partners" className="scroll-mt-32 bg-[#1a1a1a] text-white rounded-[3rem] p-10 md:p-14 border border-white/10 shadow-2xl relative overflow-hidden group hover:border-accent/40 transition-colors duration-500">
                        <div className="absolute flex h-full w-full left-0 top-0 opacity-10 noise-overlay pointer-events-none"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/20 rounded-full blur-[80px] group-hover:bg-accent/30 transition-colors"></div>

                        <div className="relative z-10 flex flex-col h-full">
                            <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-white text-xs font-data uppercase tracking-widest w-fit mb-8 shadow-[0_0_15px_rgba(255,53,0,0.5)]">
                                Onze Partners
                            </span>
                            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-6">Werken als Personal Trainer</h2>
                            <p className="font-sans text-white/70 leading-relaxed mb-12 flex-grow text-lg">
                                Ambachtelijk trainer of clubmanager? Wij helpen de hardst groeiende gyms aan het beste talent.
                                Solliciteer direct op functies bij onze high-end partners door heel het land.
                            </p>

                            <Link to="/vacatures" className="magnetic-btn bg-accent text-white px-8 py-4 rounded-full text-sm font-bold tracking-wide uppercase transition-all duration-300 w-fit shadow-[0_10px_30px_rgba(255,53,0,0.3)] hover:shadow-[0_10px_40px_rgba(255,53,0,0.5)]">
                                <span className="magnetic-btn-content">Bekijk 10+ Vacatures</span>
                            </Link>
                        </div>
                    </div>

                </div>
            </section>

            {/* Open Sollicitatie Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white text-primary rounded-[2rem] p-8 md:p-12 max-w-lg w-full relative shadow-2xl animate-section">
                        <button
                            onClick={() => {
                                setIsModalOpen(false);
                                setTimeout(() => setIsSubmitted(false), 300); // Reset after modal close animation
                            }}
                            className="absolute top-6 right-6 text-primary/30 hover:text-accent transition-colors z-10"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>

                        {isSubmitted ? (
                            <div className="text-center py-6 flex flex-col items-center">
                                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center text-accent mb-4">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="font-heading font-bold text-2xl text-primary mb-3">Sollicitatie verstuurd!</h3>
                                <p className="font-sans text-primary/70 text-base leading-relaxed mb-6">
                                    Je gegevens zijn veilig op de achtergrond verzonden. We nemen zo snel mogelijk contact met je op.
                                </p>
                                <button
                                    onClick={() => {
                                        setIsModalOpen(false);
                                        setTimeout(() => setIsSubmitted(false), 300);
                                    }}
                                    className="bg-primary/5 text-primary py-3 px-6 rounded-xl font-bold tracking-wide uppercase hover:bg-primary/10 transition-colors text-sm"
                                >
                                    Sluiten
                                </button>
                            </div>
                        ) : (
                            <>
                                <h3 className="font-heading font-bold text-3xl mb-2">Open Sollicitatie</h3>
                                <p className="text-primary/70 text-sm mb-8 leading-relaxed">
                                    We hebben momenteel geen open posities op HQ, maar we staan altijd open voor toptalent. Laat je gegevens achter en we nemen contact op zodra we een match zien!
                                </p>

                                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                                    <div>
                                        <label className="block text-xs font-bold text-primary/70 uppercase tracking-wider mb-2">Naam</label>
                                        <input
                                            type="text"
                                            required
                                            autoComplete="name"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-primary/5 border border-primary/10 rounded-xl px-4 py-3 text-primary outline-none focus:border-accent/50 transition-colors"
                                            placeholder="Jouw naam"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-primary/70 uppercase tracking-wider mb-2">E-mailadres</label>
                                        <input
                                            type="email"
                                            required
                                            autoComplete="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full bg-primary/5 border border-primary/10 rounded-xl px-4 py-3 text-primary outline-none focus:border-accent/50 transition-colors"
                                            placeholder="jouw@email.nl"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-primary/70 uppercase tracking-wider mb-2">Korte Toelichting</label>
                                        <textarea
                                            required
                                            rows="4"
                                            value={formData.motivation}
                                            onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                                            className="w-full bg-primary/5 border border-primary/10 rounded-xl px-4 py-3 text-primary outline-none focus:border-accent/50 transition-colors resize-none"
                                            placeholder="Waarom ben jij een toevoeging voor Volle Gym?"
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
                                            'Verstuur Sollicitatie'
                                        )}
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default WerkenBij;
