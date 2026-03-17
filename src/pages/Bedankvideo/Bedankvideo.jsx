import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GoogleReviews from '../../components/GoogleReviews';
import SocialProof from '../../components/SocialProof';
import CTA from '../../components/CTA';

gsap.registerPlugin(ScrollTrigger);

const voorbereidingItems = [
    {
        num: '01',
        title: 'Je huidige ledenbestand',
        desc: 'Hoeveel actieve leden heb je nu, en hoeveel wil je er bij in de komende 90 dagen?',
        icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
    },
    {
        num: '02',
        title: 'Je salesproces',
        desc: 'Wat gebeurt er nu als een nieuwe lead binnenkomt? Wie belt, wie plant in, wie sluit af?',
        icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
    },
    {
        num: '03',
        title: 'Wat je al hebt geprobeerd',
        desc: 'Welke marketing heb je gedaan? Wat werkte, wat niet, en waarom denk je dat het niet werkte?',
        icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    },
];

const aanpakPillars = [
    {
        num: '01',
        title: 'Duurzame acquisitie',
        desc: 'Wij draaien campagnes op Meta die mensen uit jouw regio bereiken. Die leads komen bij jou binnen, jij belt ze op en plant een afspraak in. Je nieuwe leden betalen een startprogramma dat de volgende campagne financiert.',
        icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
    },
    {
        num: '02',
        title: 'Sales coaching',
        desc: 'Het verschil met een marketingbureau is dat wij ook de rest bouwen. Sales coaching zodat jij die leads ook daadwerkelijk binnenhaalt, content die laat zien wie jij bent, en een complete funnel.',
        icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    },
    {
        num: '03',
        title: 'Stok achter de deur',
        desc: 'In onze wekelijkse meetings bekijken we jouw cijfers. Blijf je achter? Dan bellen we je op. De gym owners waar we de beste resultaten mee behalen zijn ondernemers die eigenaarschap nemen.',
        icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
    },
];

const Bedankvideo = () => {
    const heroRef = useRef(null);
    const heroTextRefs = useRef([]);
    const storyRef = useRef(null);
    const storyTextRefs = useRef([]);
    const aanpakRef = useRef(null);
    const aanpakCardsRef = useRef([]);
    const prepRef = useRef(null);
    const prepCardsRef = useRef([]);

    const addToHeroRefs = (el) => { if (el && !heroTextRefs.current.includes(el)) heroTextRefs.current.push(el); };
    const addToStoryRefs = (el) => { if (el && !storyTextRefs.current.includes(el)) storyTextRefs.current.push(el); };
    const addToAanpakCards = (el) => { if (el && !aanpakCardsRef.current.includes(el)) aanpakCardsRef.current.push(el); };
    const addToPrepCards = (el) => { if (el && !prepCardsRef.current.includes(el)) prepCardsRef.current.push(el); };

    useEffect(() => {
        window.scrollTo(0, 0);

        const heroCtx = gsap.context(() => {
            gsap.fromTo(heroTextRefs.current,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.5, stagger: 0.15, ease: 'power3.out', delay: 0.2 }
            );
        }, heroRef);

        const storyCtx = gsap.context(() => {
            gsap.fromTo(storyTextRefs.current,
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: 'power3.out',
                    scrollTrigger: { trigger: storyRef.current, start: 'top 70%' } }
            );
        }, storyRef);

        const aanpakCtx = gsap.context(() => {
            gsap.fromTo(aanpakCardsRef.current,
                { y: 60, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.2, stagger: 0.2, ease: 'power3.out',
                    scrollTrigger: { trigger: aanpakRef.current, start: 'top 75%' } }
            );
        }, aanpakRef);

        const prepCtx = gsap.context(() => {
            gsap.fromTo(prepCardsRef.current,
                { y: 60, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.2, stagger: 0.2, ease: 'power3.out',
                    scrollTrigger: { trigger: prepRef.current, start: 'top 75%' } }
            );
        }, prepRef);

        return () => { heroCtx.revert(); storyCtx.revert(); aanpakCtx.revert(); prepCtx.revert(); };
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
                    <div ref={addToHeroRefs} className="flex items-center justify-center gap-3 mb-6 md:mb-8 text-primary mt-4 md:mt-0">
                        <svg className="w-4 h-4 text-accent" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M4 6h2v12H4zm14 0h2v12h-2zM1 9h2v6H1zm20 0h2v6h-2zM7 11h10v2H7z" />
                        </svg>
                        <p className="text-primary/70 font-data uppercase tracking-widest text-xs md:text-sm font-semibold">Gesprek ingepland</p>
                        <svg className="w-4 h-4 text-accent" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M4 6h2v12H4zm14 0h2v12h-2zM1 9h2v6H1zm20 0h2v6h-2zM7 11h10v2H7z" />
                        </svg>
                    </div>

                    <h1 className="max-w-4xl flex flex-col gap-2 mb-8">
                        <span ref={addToHeroRefs} className="text-primary font-heading font-bold text-4xl md:text-6xl lg:text-7xl tracking-tighter leading-[1.05]">
                            Goed dat je een stap zet.
                            <br className="hidden md:block" />
                            <span className="font-drama italic text-accent pr-1 md:pr-2">Bereid je voor.</span>
                        </span>
                    </h1>

                    <p ref={addToHeroRefs} className="text-primary/70 font-sans text-base sm:text-lg md:text-xl max-w-2xl mb-10 md:mb-12 leading-relaxed">
                        De meeste gym owners die een gesprek inplannen doen er uiteindelijk niks mee. Het feit dat jij wél een stap zet, zegt iets over waar jij staat als ondernemer. Hieronder leggen we uit wat je kunt verwachten.
                    </p>

                    <div ref={addToHeroRefs} className="flex flex-col items-center justify-center w-full mb-12 md:mb-16">
                        <a href="#verwachting" className="magnetic-btn w-full sm:w-auto bg-accent text-white px-8 py-4 rounded-full text-sm md:text-base font-bold tracking-wide uppercase group inline-flex items-center justify-center gap-3 shrink-0 shadow-[0_0_20px_rgba(255,53,0,0.3)] border border-accent/50 hover:border-accent">
                            <span className="magnetic-btn-content">Bekijk wat je kunt verwachten</span>
                            <svg className="w-5 h-5 magnetic-btn-content group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                        </a>
                    </div>
                </div>

                {/* Trust bar */}
                <div className="relative z-10 w-full pb-8 md:pb-6 pt-10 md:pt-14 mt-8 md:mt-12 border-t border-primary/10 shrink-0">
                    <div ref={addToHeroRefs} className="hidden md:flex flex-row items-center justify-center gap-16 max-w-4xl mx-auto w-full">
                        <div className="flex items-center justify-center gap-4 text-primary/70 text-sm font-sans flex-1 group">
                            <div className="flex -space-x-3">
                                {[
                                    'https://lh3.googleusercontent.com/a-/ALV-UjU2zXgmMVuNbQaNLlkGAqRqYM4rQeFsHsvqko3RXwM6O4CAB8GB=s128-c0x00000000-cc-rp-mo',
                                    'https://lh3.googleusercontent.com/a-/ALV-UjUsjZz5qLlZ-BVl6Ejao50MrnXY_01sr918jmoOECc_fFUunt9J=s128-c0x00000000-cc-rp-mo',
                                    'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=128&h=128&fit=crop',
                                ].map((photoUrl, i) => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-white overflow-hidden shrink-0 shadow-sm">
                                        <img src={photoUrl} alt="Gym Eigenaar" width="128" height="128" className="w-full h-full object-cover object-[center_20%]" referrerPolicy="no-referrer" loading="lazy" />
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-col text-left">
                                <span className="text-primary font-bold">50+ succesvolle gyms</span>
                                <span className="text-xs font-medium text-primary/60">In heel Nederland</span>
                            </div>
                        </div>

                        <div className="w-px h-12 bg-primary/10"></div>

                        <div className="flex items-center justify-center gap-3 shrink-0 flex-1">
                            <div className="flex gap-1 bg-white px-4 py-2 rounded-full border border-primary/10 shadow-sm">
                                {[1,2,3,4,5].map((star) => (
                                    <svg key={star} className="w-4 h-4 text-[#FABB05]" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <span className="text-primary/70 text-sm font-sans font-bold">5.0 Google Reviews</span>
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
                        Op dit moment starten er elke week gemiddeld 2 nieuwe PT-studio's of gyms.
                    </span>
                </div>
            </div>

            {/* ── STORY — Wat verwachten ── */}
            <section ref={storyRef} id="verwachting" className="py-24 md:py-32 px-6 md:px-12 bg-white relative z-10 border-b border-primary/5 overflow-hidden">
                <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

                <div className="max-w-4xl mx-auto flex flex-col items-center relative z-20">
                    <div ref={addToStoryRefs} className="flex items-center gap-3 mb-8">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
                        <p className="text-primary/70 font-data uppercase tracking-widest text-xs md:text-sm font-semibold">Dit kun je verwachten</p>
                        <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                    </div>

                    <h2 ref={addToStoryRefs} className="font-heading font-bold text-3xl md:text-5xl lg:text-5xl text-primary leading-tight tracking-tight mb-16 text-center">
                        Geen standaard verkoopgesprek. <br className="hidden md:block" />
                        <span className="font-drama italic text-primary/60">Een eerlijke analyse van jouw gym.</span>
                    </h2>

                    <div ref={addToStoryRefs} className="group relative mt-4 cursor-default w-full max-w-3xl">
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-10 bg-white/30 backdrop-blur-sm border-t border-b border-white/40 shadow-sm rotate-[-3deg] z-30" style={{
                            clipPath: 'polygon(0% 10%, 5% 0%, 15% 15%, 25% 0%, 35% 15%, 45% 0%, 55% 15%, 65% 0%, 75% 15%, 85% 0%, 95% 15%, 100% 5%, 100% 90%, 95% 100%, 85% 85%, 75% 100%, 65% 85%, 55% 100%, 45% 85%, 35% 100%, 25% 85%, 15% 100%, 5% 85%, 0% 95%)'
                        }}>
                            <div className="w-full h-full opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIi8+CjxwYXRoIGQ9Ik0wIDRMMCAwTDAgNEwiIHN0cm9rZT0iIzIyMiIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBvcGFjaXR5PSIwLjMiLz4KPC9zdmc+')]"></div>
                        </div>
                        <div className="absolute top-6 -right-6 w-20 h-8 bg-white/30 backdrop-blur-sm border-t border-b border-white/40 shadow-sm rotate-[45deg] z-30 hidden md:block" style={{
                            clipPath: 'polygon(0% 10%, 10% 0%, 20% 15%, 30% 0%, 40% 15%, 50% 0%, 60% 15%, 70% 0%, 80% 15%, 90% 0%, 100% 10%, 100% 90%, 90% 100%, 80% 85%, 70% 100%, 60% 85%, 50% 100%, 40% 85%, 30% 100%, 20% 85%, 10% 100%, 0% 90%)'
                        }}></div>

                        <div className="bg-[#fdfbf7] rounded-sm p-8 md:p-14 shadow-[2px_15px_40px_rgba(0,0,0,0.08)] border border-[#e8E5df] relative overflow-hidden transform rotate-[1.5deg] transition-all hover:rotate-[0.5deg] duration-500 ease-out z-20">
                            <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '12px 12px' }}></div>
                            <div className="relative z-10 text-[#1e293b]" style={{ fontFamily: "'Caveat', cursive", fontSize: '110%' }}>
                                <p className="leading-relaxed text-2xl md:text-3xl mb-8 transform rotate-[-1deg] opacity-90">
                                    In ons gesprek gaan we samen kijken naar jouw gym. Waar je nu staat, waar je naartoe wilt, en wat er tussen zit. Ik ga je eerlijke vragen stellen over je business, je salesproces, je aanbod.
                                </p>
                                <ul className="space-y-6 text-2xl md:text-3xl mb-12 ml-2 transform rotate-[-0.5deg] opacity-90">
                                    <li className="flex items-start gap-4">
                                        <span className="text-green-700 font-bold leading-none mt-1">&#10003;</span>
                                        <span>In het beste geval loop je weg met een concreet plan om de komende 90 dagen structureel te groeien.</span>
                                    </li>
                                    <li className="flex items-start gap-4">
                                        <span className="text-green-700 font-bold leading-none mt-1">&#10003;</span>
                                        <span>In het slechtste geval heb je een uur gesproken met iemand die je gym door en door snapt.</span>
                                    </li>
                                    <li className="flex items-start gap-4">
                                        <span className="text-green-700 font-bold leading-none mt-1">&#10003;</span>
                                        <span>Sowieso ga je weg met inzichten waar je direct iets mee kunt.</span>
                                    </li>
                                </ul>
                                <div className="mt-8 pt-4 relative transform rotate-[1deg]">
                                    <h3 className="font-bold text-3xl md:text-4xl mb-4 tracking-wide mt-2">Onze missie is die chaos wegnemen.</h3>
                                    <p className="leading-relaxed text-2xl md:text-3xl opacity-90">
                                        Zodat jij niet meer hoeft te hopen op groei, maar kan vertrouwen op een systeem. Radjin Pitai zei na zijn eerste gesprek dat hij eindelijk snapte waarom zijn mond-tot-mond was opgedroogd. Dat soort inzichten neem je sowieso mee.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="absolute inset-0 bg-black/10 rounded-sm transform rotate-[-1.5deg] translate-y-3 translate-x-2 z-10 blur-[4px]"></div>
                    </div>
                </div>
            </section>

            {/* ── AANPAK — System cards ── */}
            <section ref={aanpakRef} className="py-32 px-6 md:px-12 bg-background relative z-10 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/[0.03] via-transparent to-transparent pointer-events-none" />
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
                <div className="absolute top-1/2 -left-32 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

                <div className="max-w-7xl mx-auto relative z-20">
                    <div className="mb-20 max-w-3xl">
                        <p className="font-data text-[#C02800] text-sm uppercase tracking-widest mb-4 flex items-center gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                            Hoe werkt onze aanpak
                        </p>
                        <h2 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-primary leading-tight tracking-tight mb-6">
                            Een bewezen systeem <br className="hidden md:block" />
                            <span className="font-drama italic text-primary/60 font-medium">bij 50+ gyms in Nederland.</span>
                        </h2>
                        <p className="font-sans text-primary/70 text-lg md:text-xl leading-relaxed">
                            Wij bouwen niet alleen campagnes. Wij implementeren een compleet acquisitiesysteem dat zichzelf financiert. Klantgefinancierde groei. Jan Donker haalde op die manier 10 keer zijn investering terug.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {aanpakPillars.map((pillar, idx) => (
                            <div key={idx} ref={addToAanpakCards}
                                className="bg-white border border-primary/5 rounded-2xl md:rounded-3xl p-10 lg:p-12 hover:shadow-xl hover:-translate-y-1 hover:border-accent/20 transition-all duration-500 group flex flex-col h-full shadow-sm relative overflow-hidden">
                                <div className="absolute -top-24 -right-24 w-48 h-48 bg-accent/5 rounded-full blur-[50px] group-hover:bg-accent/10 transition-colors" />
                                <div className="flex justify-between items-start mb-16 relative z-10">
                                    <div className="w-14 h-14 rounded-full bg-background flex items-center justify-center border border-primary/10 text-accent group-hover:scale-110 transition-transform duration-500 shadow-sm relative z-20">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={pillar.icon} />
                                        </svg>
                                    </div>
                                    <span className="font-heading text-accent/40 text-6xl md:text-8xl font-black absolute top-[-10px] right-[-10px] group-hover:text-accent/60 group-hover:scale-125 transition-all duration-500 ease-out origin-top-right select-none">{pillar.num}</span>
                                </div>
                                <div className="mt-auto relative z-10 border-t border-primary/10 pt-8">
                                    <h3 className="font-heading font-bold text-2xl text-primary mb-4 leading-snug">{pillar.title}</h3>
                                    <p className="font-sans text-primary/70 leading-relaxed text-sm md:text-base">{pillar.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── SOCIAL PROOF — Video testimonials (hergebruikt component) ── */}
            <SocialProof />

            {/* ── GOOGLE REVIEWS (hergebruikt component) ── */}
            <GoogleReviews />

            {/* ── VOORBEREIDING ── */}
            <section ref={prepRef} className="py-32 px-6 md:px-12 bg-background relative z-10 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/[0.03] via-transparent to-transparent pointer-events-none" />
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
                <div className="absolute top-1/2 -left-32 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

                <div className="max-w-7xl mx-auto relative z-20">
                    <div className="mb-20 max-w-3xl">
                        <p className="font-data text-[#C02800] text-sm uppercase tracking-widest mb-4 flex items-center gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                            Voorbereiding
                        </p>
                        <h2 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-primary leading-tight tracking-tight mb-6">
                            Denk alvast na over <br className="hidden md:block" />
                            <span className="font-drama italic text-primary/60 font-medium">deze drie punten.</span>
                        </h2>
                        <p className="font-sans text-primary/70 text-lg md:text-xl leading-relaxed">
                            Hoe beter je voorbereid bent, hoe meer waarde we uit het gesprek halen. Geen huiswerk, gewoon even nadenken.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {voorbereidingItems.map((item, idx) => (
                            <div key={idx} ref={addToPrepCards}
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
                                    <h3 className="font-heading font-bold text-2xl text-primary mb-4 leading-snug">{item.title}</h3>
                                    <p className="font-sans text-primary/70 leading-relaxed text-sm md:text-base">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA (hergebruikt component) ── */}
            <CTA />
        </main>
    );
};

export default Bedankvideo;
