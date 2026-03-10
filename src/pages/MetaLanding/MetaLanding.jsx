import React, { useEffect, useRef } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { metaAdsVariations } from '../../data/metaAds';
import LogoMarquee from '../../components/LogoMarquee';

gsap.registerPlugin(ScrollTrigger);

// Curated Google reviews for landing pages (top 6)
const reviews = [
    {
        author: 'Dominique van Do\'s Gym',
        text: 'VolleGym is een top partij. Het 3 maanden Gym Leaders Programma was helder opgebouwd, met goede tools en begeleiding die je direct kunt toepassen in je gym.',
    },
    {
        author: 'Mike',
        text: 'Je betaald bij volle gym niet voor het verzamelen van Leads. Je wordt uitgebreid begeleid om er voor te zorgen dat deze mensen ook daadwerkelijk bij jou van start gaan.',
    },
    {
        author: 'Kelt Jager',
        text: 'Veel marketing agency\'s versleten de afgelopen tijd. Volle gym is tot nu toe met afstand de beste! De manier van werken en de systemen die ze hebben gebouwd zijn top!',
        photo: 'https://lh3.googleusercontent.com/a-/ALV-UjVbt_MWCcpdUDOPjyBv8O1poTQgal9Ep7-FBtw9osaftSVFE05J=w144-h144-p-rp-mo-br100',
    },
    {
        author: 'Sanne Hendriks',
        text: 'Mijn gestelde doel binnen een maand behaald terwijl er 3 maanden voor stond. Bas en Bart weten precies waar ze het over hebben.',
    },
    {
        author: 'Niels Bakker',
        text: 'Stuk voor stuk vakmensen. We hebben onze capaciteit moeten uitbreiden omdat we de aanvoer van leads bijna niet meer aankonden. Dikke prima.',
    },
    {
        author: 'Kevin Visser',
        text: 'Wat een verademing vergeleken met alle andere marketing agency\'s. Bas en Bart denken strategisch mee op een niveau dat ik zelden zie. Absolute aanrader.',
    },
];

const MetaLanding = () => {
    const { slug } = useParams();
    const variation = metaAdsVariations[slug];

    const heroRef = useRef(null);
    const textRefs = useRef([]);
    const reviewRefs = useRef([]);

    const addToTextRefs = (el) => {
        if (el && !textRefs.current.includes(el)) textRefs.current.push(el);
    };
    const addToReviewRefs = (el) => {
        if (el && !reviewRefs.current.includes(el)) reviewRefs.current.push(el);
    };

    useEffect(() => {
        if (!variation) return;
        textRefs.current = [];
        reviewRefs.current = [];
    }, [slug]);

    // Hero text animation
    useEffect(() => {
        if (!variation) return;
        const ctx = gsap.context(() => {
            gsap.fromTo(
                textRefs.current,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.2, stagger: 0.12, ease: 'power3.out', delay: 0.15 }
            );
        }, heroRef);
        return () => ctx.revert();
    }, [variation]);

    // Reviews stagger animation
    useEffect(() => {
        if (!variation) return;
        const ctx = gsap.context(() => {
            gsap.fromTo(
                reviewRefs.current,
                { y: 20, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: 'power3.out',
                    scrollTrigger: { trigger: reviewRefs.current[0], start: 'top 85%' }
                }
            );
        });
        return () => ctx.revert();
    }, [variation]);

    if (!variation) return <Navigate to="/" replace />;

    return (
        <HelmetProvider>
            <Helmet>
                <title>{variation.headline} | Volle Gym</title>
                <meta name="description" content={variation.subheadline} />
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>

            <div className="min-h-screen bg-background flex flex-col font-sans">

                {/* ── Minimal Header ── */}
                <header className="w-full z-50 p-5 md:p-6 flex justify-center items-center border-b border-primary/5 bg-white/80 backdrop-blur-md sticky top-0">
                    <Link to="/" className="flex items-center gap-3 select-none hover:opacity-80 transition-opacity">
                        <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M4 6h2v12H4zm14 0h2v12h-2zM1 9h2v6H1zm20 0h2v6h-2zM7 11h10v2H7z" />
                        </svg>
                        <span className="text-lg font-bold tracking-tight uppercase text-primary">Volle Gym</span>
                    </Link>
                </header>

                {/* ── Hero: Emotional Copy ── */}
                <section ref={heroRef} className="w-full bg-background relative overflow-hidden">
                    {/* Subtle background */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent pointer-events-none" />

                    <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-12 pt-16 md:pt-24 pb-12 md:pb-16">
                        {/* Pillar tag */}
                        <div ref={addToTextRefs} className="flex items-center gap-2 mb-6">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                            <span className="font-data text-primary/50 text-[10px] md:text-xs uppercase tracking-[0.2em]">
                                {variation.pillarTag}
                            </span>
                        </div>

                        {/* Headline */}
                        <h1 ref={addToTextRefs} className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] tracking-tight leading-[1.1] text-primary mb-4">
                            {variation.headline}
                        </h1>

                        {/* Subheadline */}
                        <p ref={addToTextRefs} className="font-sans text-lg md:text-xl text-primary/60 mb-10 md:mb-12 leading-relaxed">
                            {variation.subheadline}
                        </p>

                        {/* Body paragraphs */}
                        <div className="space-y-6 mb-12 md:mb-16">
                            {variation.paragraphs.map((p, i) => (
                                <p ref={addToTextRefs} key={i} className="font-sans text-base md:text-lg text-primary/80 leading-[1.8]">
                                    {p}
                                </p>
                            ))}
                        </div>

                        {/* Primary CTA */}
                        <div ref={addToTextRefs} className="flex flex-col items-start gap-3">
                            <Link
                                to="/intake"
                                className="magnetic-btn bg-accent text-white px-8 md:px-10 py-4 md:py-5 rounded-full text-sm md:text-base font-bold tracking-wide uppercase group inline-flex items-center gap-3 shadow-[0_0_30px_rgba(255,53,0,0.25)] border border-accent/50 hover:shadow-[0_0_50px_rgba(255,53,0,0.4)] transition-all duration-300"
                            >
                                <span className="magnetic-btn-content">{variation.cta}</span>
                                <svg className="w-5 h-5 magnetic-btn-content group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </Link>
                            <span className="text-primary/40 text-sm font-sans pl-1">{variation.ctaSub}</span>
                        </div>
                    </div>
                </section>

                {/* ── Trust Bar ── */}
                <section className="w-full bg-primary text-white py-12 md:py-16">
                    <div className="max-w-5xl mx-auto px-6 md:px-12 grid grid-cols-3 gap-6 md:gap-12 text-center">
                        <div>
                            <p className="font-heading font-bold text-3xl md:text-5xl tracking-tighter mb-1">40+</p>
                            <p className="font-sans text-white/60 text-xs md:text-sm uppercase tracking-wide">Succesvolle gyms</p>
                        </div>
                        <div>
                            <p className="font-heading font-bold text-3xl md:text-5xl tracking-tighter mb-1">2.840+</p>
                            <p className="font-sans text-white/60 text-xs md:text-sm uppercase tracking-wide">Nieuwe leden</p>
                        </div>
                        <div>
                            <p className="font-heading font-bold text-3xl md:text-5xl tracking-tighter mb-1">5.0</p>
                            <div className="flex items-center justify-center gap-1 mt-1">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <svg key={s} className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#FABB05]" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <p className="font-sans text-white/60 text-xs md:text-sm uppercase tracking-wide mt-1">Google Reviews</p>
                        </div>
                    </div>
                </section>

                {/* ── Logo Marquee ── */}
                <LogoMarquee />

                {/* ── Google Reviews ── */}
                <section className="py-16 md:py-20 bg-white border-t border-primary/5">
                    <div className="max-w-5xl mx-auto px-6 md:px-12">
                        <div className="flex items-center gap-4 mb-10">
                            <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center border border-primary/10 shrink-0">
                                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>
                            </div>
                            <div>
                                <p className="font-heading font-bold text-lg md:text-xl text-primary">Google Reviews</p>
                                <div className="flex items-center gap-2">
                                    <span className="font-bold text-sm">5.0</span>
                                    <div className="flex gap-0.5">
                                        {[1, 2, 3, 4, 5].map((s) => (
                                            <svg key={s} className="w-3.5 h-3.5 text-[#FABB05]" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {reviews.map((review, idx) => (
                                <div
                                    ref={addToReviewRefs}
                                    key={idx}
                                    className="bg-background border border-primary/5 rounded-2xl p-6 md:p-7 hover:shadow-md transition-shadow duration-300"
                                >
                                    <div className="flex items-center gap-3 mb-4">
                                        {review.photo ? (
                                            <img src={review.photo} alt={review.author} className="w-9 h-9 rounded-full object-cover bg-primary/5" loading="lazy" referrerPolicy="no-referrer" />
                                        ) : (
                                            <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                                                {review.author.charAt(0)}
                                            </div>
                                        )}
                                        <div>
                                            <p className="font-heading font-semibold text-sm text-primary">{review.author}</p>
                                            <div className="flex gap-0.5 mt-0.5">
                                                {[1, 2, 3, 4, 5].map((s) => (
                                                    <svg key={s} className="w-3 h-3 text-[#FABB05]" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <p className="font-sans text-sm text-primary/70 leading-relaxed">"{review.text}"</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Final CTA ── */}
                <section className="w-full bg-primary py-20 md:py-28 relative overflow-hidden">
                    {/* Glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/15 rounded-full blur-[120px] pointer-events-none" />

                    <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-12 text-center">
                        <h2 className="font-heading font-bold text-3xl md:text-5xl text-white tracking-tight mb-6 leading-[1.1]">
                            Klaar om de volgende stap te zetten?
                        </h2>
                        <p className="font-sans text-white/70 text-base md:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
                            Plan een gratis, vrijblijvend gesprek. Geen softe beloftes — gewoon ontdekken of we jou kunnen helpen met voorspelbare, structurele groei.
                        </p>
                        <Link
                            to="/intake"
                            className="magnetic-btn bg-accent text-white px-10 md:px-12 py-5 md:py-6 rounded-full text-base md:text-lg font-bold tracking-widest uppercase group inline-flex items-center gap-4 hover:scale-105 transition-all duration-300 shadow-[0_20px_40px_rgba(255,53,0,0.25)] hover:shadow-[0_20px_60px_rgba(255,53,0,0.5)]"
                        >
                            <span className="magnetic-btn-content">Plan je gratis gesprek</span>
                            <svg className="w-6 h-6 md:w-7 md:h-7 magnetic-btn-content group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2.5" d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                </section>

                {/* ── Minimal Footer ── */}
                <footer className="w-full py-8 text-center text-primary/40 text-xs bg-primary border-t border-white/10">
                    <p className="text-white/30">&copy; {new Date().getFullYear()} Volle Gym Consulting B.V. Alle rechten voorbehouden.</p>
                </footer>
            </div>
        </HelmetProvider>
    );
};

export default MetaLanding;
