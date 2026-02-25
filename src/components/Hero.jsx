import React, { useEffect, useRef, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { campaigns } from '../data/campaigns';

const Hero = ({ campaign }) => {
    const location = useLocation();

    // Parse the campaign from prop or URL search params
    const campaignKey = useMemo(() => {
        if (campaign && campaigns[campaign]) {
            return campaign;
        }
        const searchParams = new URLSearchParams(location.search);
        // We support both ?campaign=x and ?c=x for shorter URLs
        const c = searchParams.get('campaign') || searchParams.get('c');
        return c && campaigns[c] ? c : 'default';
    }, [campaign, location.search]);

    const activeCampaign = campaigns[campaignKey];

    const containerRef = useRef(null);
    const textRefs = useRef([]);
    const addToRefs = (el) => {
        if (el && !textRefs.current.includes(el)) {
            textRefs.current.push(el);
        }
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                textRefs.current,
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.5,
                    stagger: 0.15,
                    ease: 'power3.out',
                    delay: 0.2
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    // Track A/B test exposure in Google Analytics via GTM dataLayer
    useEffect(() => {
        if (campaignKey === 'default') {
            const headlineShown = activeCampaign.headlineStart;
            const variationId = headlineShown.includes("Wil je") ? "B_Meer_Leden" : "A_Leeg_Of_Vol";

            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                event: 'ab_test_exposure',
                ab_test_name: 'hero_headline_copy',
                ab_test_variation: variationId
            });
        }
    }, [campaignKey, activeCampaign]);

    return (
        <section
            ref={containerRef}
            className="relative w-full flex flex-col items-center pt-32 md:pt-40 pb-8 bg-background overflow-hidden"
        >
            {/* Lighter, premium background image of people training/coaching */}
            <div
                className="absolute inset-0 w-full h-full bg-cover bg-center md:bg-[center_top_-2rem] opacity-[0.25] mix-blend-multiply"
                style={{
                    backgroundImage: 'url("https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2940&auto=format&fit=crop")',
                }}
            />

            {/* Elegant Soft Gradient Overlays for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-transparent opacity-60" />

            {/* Content Container - Centered */}
            <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-12 flex flex-col items-center text-center shrink-0 mt-8 md:mt-12">



                {/* Mobile Gym Partners (Top of Hero) - HIDE ON DESKTOP */}
                <div ref={addToRefs} className="flex md:hidden flex-col items-center justify-center gap-4 mb-6 w-full mt-2">
                    <a href="#resultaten" className="flex items-center justify-center gap-3 text-primary/70 text-sm font-sans cursor-pointer hover:opacity-80 transition-opacity">
                        <div className="flex -space-x-3">
                            {[
                                'https://lh3.googleusercontent.com/a-/ALV-UjU2zXgmMVuNbQaNLlkGAqRqYM4rQeFsHsvqko3RXwM6O4CAB8GB=s128-c0x00000000-cc-rp-mo',
                                'https://lh3.googleusercontent.com/a-/ALV-UjUsjZz5qLlZ-BVl6Ejao50MrnXY_01sr918jmoOECc_fFUunt9J=s128-c0x00000000-cc-rp-mo',
                                'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=128&h=128&fit=crop'
                            ].map((photoUrl, i) => (
                                <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-primary/5 overflow-hidden shrink-0 shadow-sm relative" style={{ transitionDelay: `${i * 50}ms` }}>
                                    <img src={photoUrl} alt="Gym Eigenaar" className="w-full h-full object-cover scale-100 object-center" referrerPolicy="no-referrer" />
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-col text-left">
                            <span className="text-primary font-bold text-xs">40+ succesvolle gyms</span>
                            <span className="text-[10px] font-medium text-primary/60">Bekijk resultaten</span>
                        </div>
                    </a>
                </div>

                {/* Intro Tag */}
                <div ref={addToRefs} className="hidden md:flex items-center justify-center gap-3 mb-8">
                    <svg className="w-4 h-4 text-accent" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M4 6h2v12H4zm14 0h2v12h-2zM1 9h2v6H1zm20 0h2v6h-2zM7 11h10v2H7z" />
                    </svg>
                    <p className="text-primary/70 font-data uppercase tracking-widest text-xs md:text-sm font-semibold">
                        {activeCampaign.badge ? (
                            <>
                                {activeCampaign.badgeLabel && <span className="font-bold">{activeCampaign.badgeLabel} </span>}
                                {activeCampaign.badge}
                            </>
                        ) : (
                            activeCampaign.introTag || "De helpende hand van gezond Nederland"
                        )}
                    </p>
                    <svg className="w-4 h-4 text-accent" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M4 6h2v12H4zm14 0h2v12h-2zM1 9h2v6H1zm20 0h2v6h-2zM7 11h10v2H7z" />
                    </svg>
                </div>



                {/* Narrative Headline */}
                <h1 className="max-w-4xl flex flex-col gap-2 mb-8">
                    <span
                        ref={addToRefs}
                        className="text-primary font-heading font-bold text-4xl md:text-6xl lg:text-7xl tracking-tighter leading-[1.05]"
                    >
                        {activeCampaign.titleLine1 || activeCampaign.headlineStart}
                        {activeCampaign.hideBr ? ' ' : <br className="hidden md:block" />}
                        <span className="text-primary/30">{activeCampaign.titleLine2 || activeCampaign.headlineHighlight}</span>{activeCampaign.titleLine3 || activeCampaign.headlineEnd} <span className="font-drama italic text-primary">{activeCampaign.titleLine4 || ''}</span>
                    </span>
                </h1>

                {/* Supportive Subheadline */}
                <p
                    ref={addToRefs}
                    className="text-primary/70 font-sans text-base sm:text-lg md:text-xl max-w-2xl mb-10 md:mb-12 leading-relaxed"
                >
                    {activeCampaign.subtitle}
                </p>

                <div ref={addToRefs} className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12 md:mb-16">
                    <Link to="/intake" className="magnetic-btn w-full sm:w-auto bg-accent text-white px-8 py-4 rounded-full text-sm md:text-base font-bold tracking-wide uppercase group inline-flex items-center justify-center gap-3 shrink-0 shadow-[0_0_20px_rgba(255,53,0,0.3)] border border-accent/50 hover:border-accent">
                        <span className="magnetic-btn-content">{activeCampaign.ctaText || activeCampaign.ctaPrimary || "Doe de intake"}</span>
                        <svg
                            className="w-5 h-5 magnetic-btn-content group-hover:translate-x-1 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </Link>

                    <a href="#vsl" className="flex items-center gap-3 text-primary/80 hover:text-accent transition-colors group">
                        <div className="w-12 h-12 rounded-full border border-primary/20 bg-white flex items-center justify-center group-hover:border-accent/40 shadow-sm transition-colors">
                            <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                        </div>
                        <span className="font-sans text-sm font-semibold uppercase tracking-wider">{activeCampaign.ctaSecondary || "Bekijk de methode"}</span>
                    </a>
                </div>
            </div>
            {/* Trust Indicators (Google/Gyms) - Desktop Only, Pinned below content */}
            <div className="relative z-10 w-full pb-8 md:pb-6 pt-10 md:pt-14 mt-8 md:mt-12 border-t border-primary/10 shrink-0">
                <div ref={addToRefs} className="hidden md:flex flex-row items-center justify-center gap-16 max-w-4xl mx-auto w-full">
                    <a href="#resultaten" className="flex items-center justify-center gap-4 text-primary/70 text-sm font-sans flex-1 group cursor-pointer hover:opacity-80 transition-opacity">
                        <div className="flex -space-x-3">
                            {[
                                'https://lh3.googleusercontent.com/a-/ALV-UjU2zXgmMVuNbQaNLlkGAqRqYM4rQeFsHsvqko3RXwM6O4CAB8GB=s128-c0x00000000-cc-rp-mo',
                                'https://lh3.googleusercontent.com/a-/ALV-UjUsjZz5qLlZ-BVl6Ejao50MrnXY_01sr918jmoOECc_fFUunt9J=s128-c0x00000000-cc-rp-mo',
                                'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=128&h=128&fit=crop'
                            ].map((photoUrl, i) => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-white overflow-hidden shrink-0 shadow-sm relative group-hover:-translate-y-1 transition-transform" style={{ transitionDelay: `${i * 50}ms` }}>
                                    <img src={photoUrl} alt="Succesverhaal" className="w-full h-full object-cover scale-100 object-[center_20%]" referrerPolicy="no-referrer" />
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-col text-left">
                            <span className="text-primary font-bold group-hover:text-accent transition-colors">40+ succesvolle gyms</span>
                            <span className="text-xs font-medium text-primary/60">Bekijk de resultaten</span>
                        </div>
                    </a>

                    <div className="hidden md:block w-px h-12 bg-primary/10"></div>

                    {/* Verwijs naar de specifieke ID van de Google Reviews sectie - HIDE ON MOBILE TO REDUCE CLUTTER */}
                    <a
                        href="#ervaringen"
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById('ervaringen')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="hidden md:flex items-center justify-center gap-3 shrink-0 flex-1 group cursor-pointer hover:opacity-80 transition-opacity"
                    >
                        <div className="flex gap-1 bg-white px-4 py-2 rounded-full border border-primary/10 shadow-sm group-hover:border-accent/30 transition-colors">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <svg key={star} className="w-4 h-4 text-[#FABB05]" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>
                        <span className="text-primary/70 text-sm font-sans font-bold group-hover:text-accent transition-colors">Tientallen 5⭐ reviews</span>
                    </a>
                </div>
            </div>
        </section >
    );
};

export default Hero;
