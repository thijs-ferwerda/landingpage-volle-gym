import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { captureUTMs, getUTMs, getLandingContext } from '../../utils/tracking';

const Solliciteren = () => {
    const [searchParams] = useSearchParams();
    const typeParam = searchParams.get('type'); // 'hq' or 'partners'
    const roleParam = searchParams.get('role');

    const hqRoles = [
        { id: 'sales-representative-closer', label: 'Sales Representative (Closer)' },
        { id: 'videograaf-fotograaf', label: 'Videograaf / Fotograaf' },
        { id: 'open-sollicitatie', label: 'Open Sollicitatie' },
    ];

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        type: typeParam === 'hq' ? 'hq' : typeParam === 'partners' ? 'partners' : '',
        role: roleParam || '',
        location: '',
        portfolioInfo: '',
        motivation: ''
    });
    const [cvFile, setCvFile] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(false);

    const isHQ = formData.type === 'hq';
    const isPartner = formData.type === 'partners';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError(false);

        // Upload CV if provided
        let cvUrl = null;
        if (cvFile) {
            try {
                const base64 = await new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onload = () => resolve(reader.result.split(',')[1]);
                    reader.readAsDataURL(cvFile);
                });
                const uploadRes = await fetch('/api/upload-cv', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ filename: cvFile.name, contentType: cvFile.type, data: base64 }),
                });
                const uploadData = await uploadRes.json();
                if (uploadData.ok) cvUrl = uploadData.url;
            } catch {
                // CV upload failed, continue without it
            }
        }

        const payload = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            name: `${formData.firstName} ${formData.lastName}`.trim(),
            email: formData.email,
            phone: formData.phone,
            motivation: formData.motivation,
            sollicitatie_type: formData.type,
            form_type: isHQ ? "hq_sollicitatie" : "partner_sollicitatie",
            portfolio: formData.portfolioInfo || null,
            cvUrl,
            ...getUTMs(),
            ...getLandingContext(),
        };

        if (isHQ) {
            payload.role = formData.role
                ? hqRoles.find(r => r.id === formData.role)?.label || formData.role
                : 'Open Sollicitatie';
        }

        if (isPartner) {
            payload.location = formData.location;
        }

        let apiSucceeded = false;

        // Laag 1: API route (volledige GHL attribution)
        try {
            const res = await fetch('/api/recruitment-submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            const data = await res.json();
            if (data.ok) apiSucceeded = true;
        } catch {
            // API faalde, fallback hieronder vangt het op
        }

        // Laag 2: Als API faalde, direct webhooks aanvuren als fallback
        if (!apiSucceeded) {
            try {
                await Promise.allSettled([
                    fetch("https://services.leadconnectorhq.com/hooks/0ybaSuLNKF7ssKOjBqwH/webhook-trigger/48120e14-7b1b-435c-866e-c09b486373a2", {
                        method: "POST",
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ ...payload, _fallback: true }),
                    }),
                    fetch("https://n8n.vollegym.nl/webhook/recruitment-website-notify", {
                        method: "POST",
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ ...payload, _fallback: true }),
                    }),
                ]);
            } catch {
                // Beide fallbacks faalden ook
                setSubmitError(true);
                setIsSubmitting(false);
                return;
            }
        }

        setIsSubmitted(true);
        setIsSubmitting(false);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        captureUTMs();
    }, []);

    const heading = isHQ
        ? 'Solliciteer bij Volle Gym HQ'
        : isPartner
            ? 'Solliciteer bij een Volle Gym Partner'
            : 'Start je sollicitatie';

    const subtitle = isHQ
        ? 'Vul het formulier hieronder in om je sollicitatieproces bij Volle Gym HQ te starten.'
        : isPartner
            ? 'Vul het formulier hieronder in om je introductie bij een van onze partners te starten.'
            : 'Wil je werken bij Volle Gym HQ of bij een van onze partners? Vul het formulier in en we nemen contact op.';

    return (
        <section className="min-h-screen pt-32 pb-24 px-6 bg-background flex flex-col items-center relative z-10 w-full overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

            <div className="max-w-4xl w-full mx-auto text-center mb-12 relative z-20 flex flex-col items-center">
                <div className="inline-flex items-center gap-3 px-5 py-2.5 border border-primary/10 rounded-full bg-white shadow-sm mb-8">
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                    <p className="font-data text-primary text-xs md:text-sm uppercase tracking-widest font-bold">
                        {isHQ ? 'Werken bij HQ' : isPartner ? 'Werken bij Partners' : 'Solliciteren'}
                    </p>
                </div>

                <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-primary tracking-tighter leading-[1.1] mb-6">
                    {heading}
                </h1>

                <p className="font-sans text-primary/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-8">
                    {subtitle}
                </p>
            </div>

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
                            We hebben je gegevens in goede orde ontvangen. We nemen zo snel mogelijk contact met je op voor het verdere proces.
                        </p>
                        <button
                            onClick={() => setIsSubmitted(false)}
                            className="text-sm font-bold text-primary/40 hover:text-accent transition-colors uppercase tracking-wider"
                        >
                            Nieuwe sollicitatie starten
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <div className="text-center mb-6">
                            <h3 className="font-heading font-bold text-2xl text-primary mb-2">Sollicitatieformulier</h3>
                            <p className="font-sans text-primary/60 text-sm">
                                Laat hier je gegevens achter, dan nemen we contact met je op.
                            </p>
                        </div>

                        {/* Voornaam + Achternaam */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-primary/70 uppercase tracking-wider mb-2">Voornaam</label>
                                <input
                                    type="text"
                                    required
                                    autoComplete="given-name"
                                    value={formData.firstName}
                                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                    className="w-full bg-primary/5 border border-primary/10 rounded-xl px-4 py-3 text-primary outline-none focus:border-accent/50 transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-primary/70 uppercase tracking-wider mb-2">Achternaam</label>
                                <input
                                    type="text"
                                    required
                                    autoComplete="family-name"
                                    value={formData.lastName}
                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                    className="w-full bg-primary/5 border border-primary/10 rounded-xl px-4 py-3 text-primary outline-none focus:border-accent/50 transition-colors"
                                />
                            </div>
                        </div>

                        {/* Telefoon + Email */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        </div>

                        {/* Type selector — hidden when pre-filled via URL */}
                        {!typeParam && (
                            <div>
                                <label className="block text-xs font-bold text-primary/70 uppercase tracking-wider mb-2">Waar solliciteer je?</label>
                                <select
                                    required
                                    value={formData.type}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value, role: '', location: '' })}
                                    className="w-full bg-primary/5 border border-primary/10 rounded-xl px-4 py-3 text-primary outline-none focus:border-accent/50 transition-colors appearance-none"
                                >
                                    <option value="">Maak een keuze...</option>
                                    <option value="hq">Volle Gym Hoofdkantoor</option>
                                    <option value="partners">Bij een van onze Partners</option>
                                </select>
                            </div>
                        )}

                        {/* Conditional: HQ role selector */}
                        {isHQ && (
                            <div>
                                <label className="block text-xs font-bold text-primary/70 uppercase tracking-wider mb-2">Rol</label>
                                <select
                                    required
                                    value={formData.role}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                    className="w-full bg-primary/5 border border-primary/10 rounded-xl px-4 py-3 text-primary outline-none focus:border-accent/50 transition-colors appearance-none"
                                >
                                    <option value="">Selecteer een rol...</option>
                                    {hqRoles.map((role) => (
                                        <option key={role.id} value={role.id}>{role.label}</option>
                                    ))}
                                </select>
                            </div>
                        )}

                        {/* Conditional: Partner location */}
                        {isPartner && (
                            <div>
                                <label className="block text-xs font-bold text-primary/70 uppercase tracking-wider mb-2">Voorkeur Vestiging / Regio</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    className="w-full bg-primary/5 border border-primary/10 rounded-xl px-4 py-3 text-primary outline-none focus:border-accent/50 transition-colors"
                                    placeholder="Bijv. Amsterdam, Utrecht of Noord-Holland"
                                />
                            </div>
                        )}

                        {/* Motivatie */}
                        <div>
                            <label className="block text-xs font-bold text-primary/70 uppercase tracking-wider mb-2">
                                {isHQ ? 'Waarom spreekt deze rol je aan?' : 'Wat trekt je aan en wat wil je bereiken?'}
                            </label>
                            <textarea
                                required
                                rows="5"
                                value={formData.motivation}
                                onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                                className="w-full bg-primary/5 border border-primary/10 rounded-xl px-4 py-3 text-primary outline-none focus:border-accent/50 transition-colors resize-none"
                                placeholder={isHQ ? 'Vertel kort waarom je op deze rol wil reageren en wat je denkt te kunnen bijdragen...' : 'Vertel kort wat je aanspreekt en wat je ambities zijn...'}
                            />
                        </div>

                        {/* Portfolio link */}
                        <div>
                            <label className="block text-xs font-bold text-primary/70 uppercase tracking-wider mb-2">
                                Link naar Portfolio of CV <span className="font-normal text-primary/40">(optioneel)</span>
                            </label>
                            <input
                                type="text"
                                value={formData.portfolioInfo}
                                onChange={(e) => setFormData({ ...formData, portfolioInfo: e.target.value })}
                                className="w-full bg-primary/5 border border-primary/10 rounded-xl px-4 py-3 text-primary outline-none focus:border-accent/50 transition-colors"
                                placeholder="LinkedIn, Instagram, website, etc."
                            />
                        </div>

                        {/* CV/document upload */}
                        <div>
                            <label className="block text-xs font-bold text-primary/70 uppercase tracking-wider mb-2">
                                CV of ander document <span className="font-normal text-primary/40">(optioneel)</span>
                            </label>
                            <label className="flex items-center gap-3 w-full bg-primary/5 border border-primary/10 rounded-xl px-4 py-3 text-primary cursor-pointer hover:border-accent/50 transition-colors">
                                <svg className="w-5 h-5 text-primary/40 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
                                <span className={`text-sm truncate ${cvFile ? 'text-primary' : 'text-primary/40'}`}>
                                    {cvFile ? cvFile.name : 'PDF, Word of afbeelding (max 5MB)'}
                                </span>
                                <input
                                    type="file"
                                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                    className="hidden"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file && file.size <= 5 * 1024 * 1024) setCvFile(file);
                                        else if (file) alert('Bestand is te groot (max 5MB)');
                                    }}
                                />
                            </label>
                            {cvFile && (
                                <button
                                    type="button"
                                    onClick={() => setCvFile(null)}
                                    className="mt-1.5 text-xs text-primary/40 hover:text-accent transition-colors"
                                >
                                    Verwijderen
                                </button>
                            )}
                        </div>

                        {submitError && (
                            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-700 text-sm">
                                Er ging iets mis bij het versturen. Probeer het opnieuw of neem direct contact op.
                            </div>
                        )}

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
