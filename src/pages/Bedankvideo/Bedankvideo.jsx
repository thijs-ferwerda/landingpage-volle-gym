import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SocialProof from '../../components/SocialProof';
import GoogleReviews from '../../components/GoogleReviews';

gsap.registerPlugin(ScrollTrigger);

const aanpakItems = [
    { num: '01', title: 'Campagnes die leads opleveren', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
    { num: '02', title: 'Sales coaching & funnel', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
    { num: '03', title: 'Wekelijkse accountability', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
];

const prepItems = [
    { num: '01', title: 'Hoeveel leden heb je nu?', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
    { num: '02', title: 'Hoe ziet je sales eruit?', icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' },
    { num: '03', title: 'Wat heb je al geprobeerd?', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
];

const SystemCards = ({ items, refs }) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {items.map((item, idx) => (
            <div key={idx} ref={refs}
                className="bg-white border border-primary/5 rounded-2xl md:rounded-3xl p-10 lg:p-12 hover:shadow-xl hover:-translate-y-1 hover:border-accent/20 transition-all duration-500 group flex flex-col h-full shadow-sm relative overflow-hidden">
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-accent/5 rounded-full blur-[50px] group-hover:bg-accent/10 transition-colors" />
                <div className="flex justify-between items-start mb-16 relative z-10">
                    <div className="w-14 h-14 rounded-full bg-background flex items-center justify-center border border-primary/10 text-accent group-hover:scale-110 transition-transform duration-500 shadow-sm relative z-20">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={item.icon} />
                        </svg>
                    </div>
                    <span className="font-heading text-accent/40 text-6xl md:text-8xl font-black absolute top-[-10px] right-[-10px] group-hover:text-accent/60 group-hover:scale-125 transition-all duration-500 ease-out origin-top-right select-none">{item.num}</span>
                </div>
                <div className="mt-auto relative z-10 border-t border-primary/10 pt-8">
                    <h3 className="font-heading font-bold text-2xl text-primary leading-snug">{item.title}</h3>
                </div>
            </div>
        ))}
    </div>
);

const Bedankvideo = () => {
    const heroRef = useRef(null);
    const heroTextRefs = useRef([]);
    const aanpakRef = useRef(null);
    const aanpakCardsRef = useRef([]);
    const philRef = useRef(null);
    const philText1 = useRef(null);
    const philText2 = useRef(null);
    const prepRef = useRef(null);
    const prepCardsRef = useRef([]);

    const addToHero = (el) => { if (el && !heroTextRefs.current.includes(el)) heroTextRefs.current.push(el); };
    const addToAanpak = (el) => { if (el && !aanpakCardsRef.current.includes(el)) aanpakCardsRef.current.push(el); };
    const addToPrep = (el) => { if (el && !prepCardsRef.current.includes(el)) prepCardsRef.current.push(el); };

    useEffect(() => {
        window.scrollTo(0, 0);

        const heroCtx = gsap.context(() => {
            gsap.fromTo(heroTextRefs.current,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.5, stagger: 0.15, ease: 'power3.out', delay: 0.2 });
        }, heroRef);

        const aanpakCtx = gsap.context(() => {
            gsap.fromTo(aanpakCardsRef.current,
                { y: 60, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.2, stagger: 0.2, ease: 'power3.out',
                    scrollTrigger: { trigger: aanpakRef.current, start: 'top 75%' } });
        }, aanpakRef);

        const philCtx = gsap.context(() => {
            gsap.fromTo([philText1.current, philText2.current],
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.5, stagger: 0.3, ease: 'power3.out',
                    scrollTrigger: { trigger: philRef.current, start: 'top 60%' } });
        }, philRef);

        const prepCtx = gsap.context(() => {
            gsap.fromTo(prepCardsRef.current,
                { y: 60, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.2, stagger: 0.2, ease: 'power3.out',
                    scrollTrigger: { trigger: prepRef.current, start: 'top 75%' } });
        }, prepRef);

        return () => { heroCtx.revert(); aanpakCtx.revert(); philCtx.revert(); prepCtx.revert(); };
    }, []);

    return (
        <main>
            <Helmet>
                <title>Je gesprek staat ingepland | Volle Gym</title>
                <meta name="robots" content="noindex" />
            </Helmet>

            {/* ── HERO ── */}
            <section ref={heroRef} className="relative w-full flex flex-col items-center pt-20 md:pt-40 pb-8 bg-background overflow-hidden">
                <div className="absolute inset-0 w-full h-full bg-cover bg-center md:bg-[center_top_-2rem] opacity-[0.25] mix-blend-multiply"
                    style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=60&w=1200&auto=format&fit=crop")' }} />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-transparent opacity-60" />

                <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-12 flex flex-col items-center text-center shrink-0 mt-2 md:mt-12">
                    <div ref={addToHero} className="flex items-center justify-center gap-3 mb-6 md:mb-8 text-primary mt-4 md:mt-0">
                        <svg className="w-4 h-4 text-accent" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M4 6h2v12H4zm14 0h2v12h-2zM1 9h2v6H1zm20 0h2v6h-2zM7 11h10v2H7z" />
                        </svg>
                        <p className="text-primary/70 font-data uppercase tracking-widest text-xs md:text-sm font-semibold">Gesprek ingepland</p>
                        <svg className="w-4 h-4 text-accent" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M4 6h2v12H4zm14 0h2v12h-2zM1 9h2v6H1zm20 0h2v6h-2zM7 11h10v2H7z" />
                        </svg>
                    </div>

                    <h1 className="max-w-4xl mb-10 md:mb-12">
                        <span ref={addToHero} className="text-primary font-heading font-bold text-4xl md:text-6xl lg:text-7xl tracking-tighter leading-[1.05]">
                            Goed dat je een stap zet.
                            <br className="hidden md:block" />
                            <span className="font-drama italic text-accent pr-1 md:pr-2">Bereid je voor.</span>
                        </span>
                    </h1>
                </div>

                {/* Trust bar */}
                <div className="relative z-10 w-full pb-8 md:pb-6 pt-10 md:pt-14 mt-8 md:mt-12 border-t border-primary/10 shrink-0">
                    <div ref={addToHero} className="flex flex-row items-center justify-center gap-8 md:gap-16 max-w-4xl mx-auto w-full px-6">
                        <div className="flex items-center gap-4 text-primary/70 text-sm font-sans">
                            <div className="flex -space-x-3">
                                {[
                                    'https://lh3.googleusercontent.com/a-/ALV-UjU2zXgmMVuNbQaNLlkGAqRqYM4rQeFsHsvqko3RXwM6O4CAB8GB=s128-c0x00000000-cc-rp-mo',
                                    'https://lh3.googleusercontent.com/a-/ALV-UjUsjZz5qLlZ-BVl6Ejao50MrnXY_01sr918jmoOECc_fFUunt9J=s128-c0x00000000-cc-rp-mo',
                                    'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=128&h=128&fit=crop',
                                ].map((photoUrl, i) => (
                                    <div key={i} className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-background bg-white overflow-hidden shrink-0 shadow-sm">
                                        <img src={photoUrl} alt="" width="128" height="128" className="w-full h-full object-cover object-[center_20%]" referrerPolicy="no-referrer" loading="lazy" />
                                    </div>
                                ))}
                            </div>
                            <span className="text-primary font-bold text-xs md:text-sm">50+ gyms</span>
                        </div>
                        <div className="hidden md:block w-px h-12 bg-primary/10"></div>
                        <div className="flex items-center gap-3 shrink-0">
                            <div className="flex gap-1 bg-white px-4 py-2 rounded-full border border-primary/10 shadow-sm">
                                {[1,2,3,4,5].map(s => (
                                    <svg key={s} className="w-4 h-4 text-[#FABB05]" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <span className="text-primary/70 text-sm font-bold hidden md:block">5.0</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── VOLLEGYMBAR ── */}
            <div className="w-full bg-accent text-white py-4 px-6 relative z-30">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
                    <div className="flex items-center gap-2 font-data text-xs uppercase tracking-widest bg-dark/20 px-3 py-1.5 rounded-full">
                        <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                        Live Data
                    </div>
                    <span className="font-heading font-medium text-sm md:text-base">
                        Elke week starten gemiddeld 2 nieuwe gyms.
                    </span>
                </div>
            </div>

            {/* ── AANPAK — Hoe werkt het ── */}
            <section ref={aanpakRef} className="py-32 px-6 md:px-12 bg-background relative z-10 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/[0.03] via-transparent to-transparent pointer-events-none" />
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
                <div className="absolute top-1/2 -left-32 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

                <div className="max-w-7xl mx-auto relative z-20">
                    <div className="mb-20 max-w-3xl">
                        <p className="font-data text-[#C02800] text-sm uppercase tracking-widest mb-4 flex items-center gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                            Onze aanpak
                        </p>
                        <h2 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-primary leading-tight tracking-tight">
                            Een bewezen systeem <br className="hidden md:block" />
                            <span className="font-drama italic text-primary/60 font-medium">bij 50+ gyms.</span>
                        </h2>
                    </div>
                    <SystemCards items={aanpakItems} refs={addToAanpak} />
                </div>
            </section>

            {/* ── SOCIAL PROOF ── */}
            <SocialProof />

            {/* ── PHILOSOPHY — Selectie ── */}
            <section ref={philRef} className="relative w-full min-h-[80vh] bg-dark flex items-center justify-center overflow-hidden py-32 border-y border-dark/20">
                <div className="relative z-10 w-full max-w-5xl px-6 md:px-12 mx-auto flex flex-col gap-12">
                    <div ref={philText1} className="text-primary/60 font-heading text-xl md:text-2xl md:pl-12 border-l border-primary/20">
                        Wij werken niet met iedereen. <br />
                        <span className="text-primary font-bold">Als het geen match is, zeggen we dat.</span>
                    </div>
                    <div ref={philText2} className="text-primary font-heading text-4xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight text-right md:pr-12">
                        De beste resultaten? <br />
                        <span className="font-drama italic text-accent text-5xl md:text-7xl lg:text-8xl pr-2">eigenaarschap.</span>
                    </div>
                </div>
            </section>

            {/* ── GOOGLE REVIEWS ── */}
            <GoogleReviews />

            {/* ── VOORBEREIDING ── */}
            <section ref={prepRef} className="py-32 px-6 md:px-12 bg-background relative z-10 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/[0.03] via-transparent to-transparent pointer-events-none" />
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" />

                <div className="max-w-7xl mx-auto relative z-20">
                    <div className="mb-20 max-w-3xl">
                        <p className="font-data text-[#C02800] text-sm uppercase tracking-widest mb-4 flex items-center gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                            Voorbereiding
                        </p>
                        <h2 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-primary leading-tight tracking-tight">
                            Denk alvast na over <br className="hidden md:block" />
                            <span className="font-drama italic text-primary/60 font-medium">deze drie punten.</span>
                        </h2>
                    </div>
                    <SystemCards items={prepItems} refs={addToPrep} />
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="relative overflow-hidden flex flex-col items-center justify-center">
                <div className="w-full bg-black pt-32 pb-40 md:pb-56 px-6 md:px-12 relative flex items-center justify-center border-t-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-accent/20 rounded-full blur-[150px] pointer-events-none z-0"></div>
                    <div className="relative z-10 w-full max-w-5xl mx-auto bg-gradient-to-b from-[#333333] to-[#1a1a1a] rounded-[3rem] p-12 md:p-24 text-center shadow-[0_0_200px_rgba(255,53,0,0.2)] border border-white/30 flex flex-col items-center backdrop-blur-md">
                        <div className="inline-flex items-center justify-center gap-2 md:gap-3 px-3 md:px-4 py-1.5 md:py-2 border border-white/10 rounded-full bg-white/5 mb-6">
                            <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-[#10b981] animate-pulse shrink-0"></div>
                            <span className="font-data text-[10px] sm:text-xs tracking-widest text-white/80 uppercase mt-0.5">Tot snel</span>
                        </div>
                        <h2 className="font-heading font-black text-5xl md:text-7xl lg:text-8xl tracking-tighter leading-[1] text-white">
                            Ik spreek je <span className="font-drama italic text-accent font-medium">snel.</span>
                        </h2>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Bedankvideo;
