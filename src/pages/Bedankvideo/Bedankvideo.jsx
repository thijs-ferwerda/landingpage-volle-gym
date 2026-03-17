import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const featuredVideos = [
    { name: 'Radjin Pitai', result: '34 leden in 5 weken tijd', objection: 'Stond op 9 leden en dacht eraan te stoppen. Groeide met Volle Gym in 5 weken door naar 34 leden.', videoId: 'O_OFRYE3omQ' },
    { name: 'Murat Son', result: '72 leden in 3 maanden tijd', objection: 'Liep compleet vast na drie falende eerdere trajecten. Kreeg zijn focus terug en groeide explosief.', videoId: 'KxT9StIlyeg' },
    { name: 'Sanne Hendriks', result: '20 leden in 1 week tijd', objection: 'Ontving eerder alleen loze aanmeldingen. Bij Volle Gym stroomden direct 20 serieuze leden binnen.', videoId: '_ERwMRB4pgE' },
    { name: 'Benjamin van Keulen', result: '28 leden in 1 maand tijd', objection: 'Had een diepe afkeer van bureaus. Gaf het nog één kans en haalde 28 leden binnen.', videoId: 'Qjc8I01bZE8' },
    { name: 'Jan Donker', result: '30 leden in 2 maanden tijd', objection: 'Durfde uitsluitend te starten op de resultaatgarantie en haalde 10x zijn investering terug.', videoId: 'BbCw16hxhbo' },
];

const metrics = [
    { id: 'intakes', label: 'Aangevraagde intakegesprekken', target: 8432 },
    { id: 'trials', label: 'Gestarte trials', target: 5124 },
    { id: 'clients', label: 'Nieuwe leden', target: 2840 },
];

const gesprekPillars = [
    {
        num: '01',
        title: 'Analyse van jouw gym',
        desc: 'Waar sta je nu? Hoeveel leden, welk aanbod, welke uitdagingen? We brengen je huidige situatie scherp in kaart.',
        icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    },
    {
        num: '02',
        title: 'Jouw groeiplan',
        desc: 'Op basis van jouw cijfers bouwen we een concreet 90-dagen plan. Met duidelijke targets, een acquisitiesysteem en salescoaching.',
        icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
    },
    {
        num: '03',
        title: 'Eerlijk advies',
        desc: 'Geen verkooppraatje. Als we je niet kunnen helpen, zeggen we dat. Je loopt sowieso weg met bruikbare inzichten.',
        icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    },
];

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

const Bedankvideo = () => {
    const heroRef = useRef(null);
    const heroTextRefs = useRef([]);
    const systemRef = useRef(null);
    const systemCardsRef = useRef([]);
    const impactRef = useRef(null);
    const impactNumbersRef = useRef([]);
    const socialRef = useRef(null);
    const philosophyRef = useRef(null);
    const philText1Ref = useRef(null);
    const philText2Ref = useRef(null);
    const prepRef = useRef(null);
    const prepCardsRef = useRef([]);
    const ctaRef = useRef(null);
    const scrollContainerRef = useRef(null);

    const addToHeroRefs = (el) => {
        if (el && !heroTextRefs.current.includes(el)) heroTextRefs.current.push(el);
    };
    const addToSystemCards = (el) => {
        if (el && !systemCardsRef.current.includes(el)) systemCardsRef.current.push(el);
    };
    const addToImpactNumbers = (el) => {
        if (el && !impactNumbersRef.current.includes(el)) impactNumbersRef.current.push(el);
    };
    const addToPrepCards = (el) => {
        if (el && !prepCardsRef.current.includes(el)) prepCardsRef.current.push(el);
    };

    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            const scrollAmount = direction === 'left' ? -400 : 400;
            scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);

        // Hero animations
        const heroCtx = gsap.context(() => {
            gsap.fromTo(
                heroTextRefs.current,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.5, stagger: 0.15, ease: 'power3.out', delay: 0.2 }
            );
        }, heroRef);

        // System cards stagger
        const systemCtx = gsap.context(() => {
            gsap.fromTo(
                systemCardsRef.current,
                { y: 60, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 1.2, stagger: 0.2, ease: 'power3.out',
                    scrollTrigger: { trigger: systemRef.current, start: 'top 75%' },
                }
            );
        }, systemRef);

        // Impact counter animation
        const impactCtx = gsap.context(() => {
            impactNumbersRef.current.forEach((el, index) => {
                const targetValue = metrics[index].target;
                el.innerText = '0';
                gsap.to(el, {
                    innerText: targetValue,
                    duration: 2.5,
                    ease: 'power2.out',
                    snap: { innerText: 1 },
                    scrollTrigger: { trigger: impactRef.current, start: 'top 80%' },
                    onUpdate: function () {
                        el.innerText = Math.ceil(this.targets()[0].innerText).toLocaleString('nl-NL');
                    },
                });
            });

            gsap.fromTo(
                '.bedankvideo-impact-fade',
                { y: 30, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.out',
                    scrollTrigger: { trigger: impactRef.current, start: 'top 75%' },
                }
            );
        }, impactRef);

        // Philosophy text reveal
        const philCtx = gsap.context(() => {
            gsap.fromTo(
                [philText1Ref.current, philText2Ref.current],
                { y: 50, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 1.5, stagger: 0.3, ease: 'power3.out',
                    scrollTrigger: { trigger: philosophyRef.current, start: 'top 60%' },
                }
            );
        }, philosophyRef);

        // Preparation cards stagger
        const prepCtx = gsap.context(() => {
            gsap.fromTo(
                prepCardsRef.current,
                { y: 60, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 1.2, stagger: 0.2, ease: 'power3.out',
                    scrollTrigger: { trigger: prepRef.current, start: 'top 75%' },
                }
            );
        }, prepRef);

        // CTA fade in
        const ctaCtx = gsap.context(() => {
            gsap.fromTo(
                '.bedankvideo-cta-fade',
                { y: 40, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: 'power3.out',
                    scrollTrigger: { trigger: ctaRef.current, start: 'top 75%' },
                }
            );
        }, ctaRef);

        return () => {
            heroCtx.revert();
            systemCtx.revert();
            impactCtx.revert();
            philCtx.revert();
            prepCtx.revert();
            ctaCtx.revert();
        };
    }, []);

    return (
        <>
            <Helmet>
                <title>Je gesprek staat ingepland | Volle Gym</title>
                <meta name="robots" content="noindex" />
            </Helmet>

            {/* ═══════════════════════════════════════════════════════
                1. HERO — Opening + Bevestiging
            ═══════════════════════════════════════════════════════ */}
            <section
                ref={heroRef}
                className="relative w-full flex flex-col items-center pt-20 md:pt-40 pb-8 bg-background overflow-hidden"
            >
                <div
                    className="absolute inset-0 w-full h-full bg-cover bg-center md:bg-[center_top_-2rem] opacity-[0.25] mix-blend-multiply"
                    style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=60&w=1200&auto=format&fit=crop")' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-transparent opacity-60" />

                <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-12 flex flex-col items-center text-center shrink-0 mt-2 md:mt-12">
                    <div ref={addToHeroRefs} className="flex items-center justify-center gap-3 mb-6 md:mb-8 text-primary mt-4 md:mt-0">
                        <svg className="w-4 h-4 text-accent" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M4 6h2v12H4zm14 0h2v12h-2zM1 9h2v6H1zm20 0h2v6h-2zM7 11h10v2H7z" />
                        </svg>
                        <p className="text-primary/70 font-data uppercase tracking-widest text-xs md:text-sm font-semibold">
                            Gesprek ingepland
                        </p>
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
                        Voordat we bellen, beantwoorden we de vragen die we het vaakst krijgen. Zodat jij goed voorbereid bent en we het meeste uit ons gesprek halen.
                    </p>
                </div>

                <div className="relative z-10 w-full pb-8 md:pb-6 pt-10 md:pt-14 mt-8 md:mt-12 border-t border-primary/10 shrink-0">
                    <div ref={addToHeroRefs} className="flex flex-row items-center justify-center gap-8 md:gap-16 max-w-4xl mx-auto w-full px-6">
                        <div className="flex items-center justify-center gap-4 text-primary/70 text-sm font-sans">
                            <div className="flex -space-x-3">
                                {[
                                    'https://lh3.googleusercontent.com/a-/ALV-UjU2zXgmMVuNbQaNLlkGAqRqYM4rQeFsHsvqko3RXwM6O4CAB8GB=s128-c0x00000000-cc-rp-mo',
                                    'https://lh3.googleusercontent.com/a-/ALV-UjUsjZz5qLlZ-BVl6Ejao50MrnXY_01sr918jmoOECc_fFUunt9J=s128-c0x00000000-cc-rp-mo',
                                    'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=128&h=128&fit=crop',
                                ].map((photoUrl, i) => (
                                    <div key={i} className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-background bg-white overflow-hidden shrink-0 shadow-sm">
                                        <img src={photoUrl} alt="Gym Eigenaar" width="128" height="128" className="w-full h-full object-cover object-[center_20%]" referrerPolicy="no-referrer" loading="lazy" />
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-col text-left">
                                <span className="text-primary font-bold text-xs md:text-sm">50+ succesvolle gyms</span>
                                <span className="text-xs font-medium text-primary/60 hidden md:block">In heel Nederland</span>
                            </div>
                        </div>

                        <div className="hidden md:block w-px h-12 bg-primary/10"></div>

                        <div className="flex items-center justify-center gap-3 shrink-0">
                            <div className="flex gap-1 bg-white px-4 py-2 rounded-full border border-primary/10 shadow-sm">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <svg key={star} className="w-4 h-4 text-[#FABB05]" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <span className="text-primary/70 text-sm font-sans font-bold hidden md:block">5.0 Google Reviews</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════
                2. SYSTEEM CARDS — Wat verwachten in het gesprek
            ═══════════════════════════════════════════════════════ */}
            <section ref={systemRef} className="py-32 px-6 md:px-12 bg-background relative z-10 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/[0.03] via-transparent to-transparent pointer-events-none" />
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
                <div className="absolute top-1/2 -left-32 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

                <div className="max-w-7xl mx-auto relative z-20">
                    <div className="mb-20 max-w-3xl">
                        <p className="font-data text-[#C02800] text-sm uppercase tracking-widest mb-4 flex items-center gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                            Wat verwachten in het gesprek
                        </p>
                        <h2 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-primary leading-tight tracking-tight mb-6">
                            Geen verkooppraatje. <br className="hidden md:block" />
                            <span className="font-drama italic text-primary/60 font-medium">Wel een concreet plan.</span>
                        </h2>
                        <p className="font-sans text-primary/70 text-lg md:text-xl leading-relaxed">
                            In ons gesprek analyseren we jouw gym, identificeren we groeikansen en bouwen we een plan waarmee je de komende 90 dagen structureel kunt groeien.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {gesprekPillars.map((pillar, idx) => (
                            <div
                                key={idx}
                                ref={addToSystemCards}
                                className="bg-white border border-primary/5 rounded-2xl md:rounded-3xl p-10 lg:p-12 hover:shadow-xl hover:-translate-y-1 hover:border-accent/20 transition-all duration-500 group flex flex-col h-full shadow-sm relative overflow-hidden"
                            >
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

            {/* ═══════════════════════════════════════════════════════
                3. IMPACT — Resultaten in cijfers
            ═══════════════════════════════════════════════════════ */}
            <section ref={impactRef} className="py-24 md:py-32 bg-primary text-white relative overflow-hidden border-y border-white/10">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-accent/5 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/10 via-primary to-primary opacity-50 pointer-events-none" />

                <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 flex flex-col md:flex-row items-center md:items-start gap-16 lg:gap-24">
                    <div className="w-full md:w-5/12 text-center md:text-left">
                        <div className="bedankvideo-impact-fade flex items-center justify-center md:justify-start gap-2 mb-4">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block"></span>
                            <span className="font-data text-white/60 text-xs uppercase tracking-widest">Bewezen resultaten</span>
                        </div>
                        <h2 className="bedankvideo-impact-fade font-heading font-bold text-4xl md:text-5xl lg:text-6xl mb-6 leading-[1.1] tracking-tight text-white">
                            Wij vullen studio's <br className="hidden md:block" />
                            <span className="font-drama italic text-accent pr-2">tot de nok toe vol.</span>
                        </h2>
                        <p className="bedankvideo-impact-fade font-sans text-white/70 text-lg md:text-xl leading-relaxed">
                            Gemiddeld 30 nieuwe leden per klant. Sommige gyms zitten na 6 weken al vol. Het systeem werkt, zolang jij de opvolging doet.
                        </p>
                    </div>

                    <div className="w-full md:w-5/12 flex flex-col gap-10 md:gap-14 pt-8 md:pt-0">
                        {metrics.map((metric, i) => (
                            <div key={metric.id} className="bedankvideo-impact-fade flex flex-col md:flex-row items-center md:items-center justify-between gap-4 md:gap-4 relative group border-t border-white/10 pt-8 first:border-0 first:pt-0 text-center md:text-left">
                                <div className="flex flex-col items-center md:items-start w-full md:w-auto">
                                    <span className="font-data text-accent text-sm md:text-xs mb-1 uppercase tracking-wide opacity-80 group-hover:opacity-100 transition-opacity">
                                        // 0{i + 1}
                                    </span>
                                    <p className="font-sans font-medium text-white/80 text-lg md:text-xl">{metric.label}</p>
                                </div>
                                <div className="font-heading font-bold text-5xl md:text-6xl tracking-tighter text-white flex items-baseline justify-center md:justify-end gap-1 w-full md:w-auto mt-2 md:mt-0">
                                    <span ref={addToImpactNumbers}>0</span>
                                    <span className="text-accent text-3xl md:text-4xl">+</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════
                4. SOCIAL PROOF — Video testimonials
            ═══════════════════════════════════════════════════════ */}
            <section ref={socialRef} className="py-24 bg-dark overflow-hidden relative border-y border-primary/10">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-dark to-transparent z-10 pointer-events-none hidden md:block" />
                <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-dark to-transparent z-10 pointer-events-none hidden md:block" />

                <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-20">
                    <div>
                        <h2 className="font-heading font-bold text-3xl md:text-5xl text-primary mb-4 tracking-tight">Echte resultaten.</h2>
                        <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block"></span>
                            <span className="font-data text-primary/60 text-xs uppercase tracking-widest">Bekijk de interviews</span>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <button onClick={() => scroll('left')} aria-label="Vorige resultaten" className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center text-primary hover:bg-primary/5 hover:border-accent transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                        </button>
                        <button onClick={() => scroll('right')} aria-label="Volgende resultaten" className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center text-primary hover:bg-primary/5 hover:border-accent transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                        </button>
                    </div>
                </div>

                <div
                    ref={scrollContainerRef}
                    className="flex overflow-x-auto snap-x snap-mandatory gap-6 px-6 md:px-12 pb-8 hide-scrollbar relative z-20"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    <style dangerouslySetInnerHTML={{ __html: `.hide-scrollbar::-webkit-scrollbar { display: none; }` }} />

                    {featuredVideos.map((item, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 w-[300px] md:w-[400px] bg-white rounded-[1.5rem] border border-primary/10 snap-center shadow-lg group hover:border-primary/20 transition-colors duration-300 p-2 md:p-3 flex flex-col"
                        >
                            <div className="relative shrink-0 w-full aspect-video bg-dark rounded-xl overflow-hidden">
                                <iframe
                                    className="absolute top-0 left-0 w-full h-full"
                                    src={`https://www.youtube.com/embed/${item.videoId}?rel=0&modestbranding=1`}
                                    title={`Interview met ${item.name}`}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    loading="lazy"
                                ></iframe>
                            </div>
                            <div className="p-4 pt-5 bg-white flex-1 flex flex-col">
                                <p className="font-heading font-semibold text-[#E03000] text-lg md:text-xl mb-1 tracking-wide">{item.result}</p>
                                <p className="font-sans font-medium text-sm text-primary/70 uppercase tracking-widest mb-3">{item.name}</p>
                                <div className="h-px w-full bg-primary/10 mb-3"></div>
                                <p className="font-sans text-sm text-primary/70 italic leading-relaxed">{item.objection}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════
                5. PHILOSOPHY — Selectiecriteria
            ═══════════════════════════════════════════════════════ */}
            <section
                ref={philosophyRef}
                className="relative w-full min-h-[80vh] bg-dark flex items-center justify-center overflow-hidden py-32 border-y border-dark/20"
            >
                <div className="relative z-10 w-full max-w-5xl px-6 md:px-12 mx-auto flex flex-col gap-12">
                    <div ref={philText1Ref} className="text-primary/60 font-heading text-xl md:text-2xl md:pl-12 border-l border-primary/20">
                        Wij werken niet met iedereen. <br />
                        <span className="text-primary font-bold">Als het geen match is, zeggen we dat.</span>
                    </div>
                    <div ref={philText2Ref} className="text-primary font-heading text-4xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight text-right md:pr-12">
                        De beste resultaten? <br />
                        <span className="font-drama italic text-accent text-5xl md:text-7xl lg:text-8xl pr-2">eigenaarschap.</span>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════
                6. VOORBEREIDING CARDS — 3 dingen om over na te denken
            ═══════════════════════════════════════════════════════ */}
            <section ref={prepRef} className="py-32 px-6 md:px-12 bg-background relative z-10 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/[0.03] via-transparent to-transparent pointer-events-none" />
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" />

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
                            <div
                                key={idx}
                                ref={addToPrepCards}
                                className="bg-white border border-primary/5 rounded-2xl md:rounded-3xl p-10 lg:p-12 hover:shadow-xl hover:-translate-y-1 hover:border-accent/20 transition-all duration-500 group flex flex-col h-full shadow-sm relative overflow-hidden"
                            >
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

            {/* ═══════════════════════════════════════════════════════
                7. CTA — Afsluiting
            ═══════════════════════════════════════════════════════ */}
            <section ref={ctaRef} className="relative overflow-hidden flex flex-col items-center justify-center">
                <div className="w-full bg-black pt-32 pb-40 md:pb-56 px-6 md:px-12 relative flex items-center justify-center border-t-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-accent/20 rounded-full blur-[150px] pointer-events-none z-0"></div>

                    <div className="relative z-10 w-full max-w-5xl mx-auto bg-gradient-to-b from-[#333333] to-[#1a1a1a] rounded-[3rem] p-12 md:p-24 text-center shadow-[0_0_200px_rgba(255,53,0,0.2)] border border-white/30 flex flex-col items-center backdrop-blur-md">
                        <div className="bedankvideo-cta-fade inline-flex items-center justify-center gap-2 md:gap-3 px-3 md:px-4 py-1.5 md:py-2 border border-white/10 rounded-full bg-white/5 mb-6 mx-auto w-fit max-w-full">
                            <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-[#10b981] animate-pulse shrink-0"></div>
                            <span className="font-data text-[10px] sm:text-xs tracking-widest text-white/80 uppercase text-center mt-0.5">Tot snel in het gesprek</span>
                        </div>

                        <h2 className="bedankvideo-cta-fade font-heading font-black text-5xl md:text-7xl lg:text-8xl mb-8 tracking-tighter leading-[1] text-white">
                            Wij spreken je <span className="font-drama italic text-accent font-medium">snel.</span>
                        </h2>

                        <p className="bedankvideo-cta-fade font-sans text-white/90 mb-14 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
                            Als je open en eerlijk het gesprek ingaat, dan ga je er sowieso waarde uithalen. Of we nu gaan samenwerken of niet.
                        </p>

                        <div className="bedankvideo-cta-fade relative inline-flex items-center justify-center mt-4 w-full md:w-auto">
                            <div className="absolute top-1/2 -translate-y-1/2 -left-20 md:-left-64 transform rotate-[-8deg] text-white/70 text-2xl md:text-3xl pointer-events-none hidden md:block w-56 text-right z-20" style={{ fontFamily: "'Caveat', cursive" }}>
                                Klaar om te groeien?
                                <svg className="absolute top-[65%] -translate-y-1/2 -right-10 md:-right-14 w-8 h-8 md:w-10 md:h-10 text-white/50 transform rotate-[15deg]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12c4-2 8-2 13 0M12 6c2 1.5 4 4 4 6-2 2-4 4-5 5" />
                                </svg>
                            </div>

                            <a href="/" className="magnetic-btn bg-accent text-white px-12 py-6 rounded-full text-lg md:text-xl font-bold tracking-widest uppercase group inline-flex items-center gap-4 hover:scale-105 transition-all duration-300 shadow-[0_20px_40px_rgba(255,53,0,0.25)] hover:shadow-[0_20px_60px_rgba(255,53,0,0.5)] z-10 relative">
                                <span className="magnetic-btn-content">Terug naar home</span>
                                <svg className="w-8 h-8 magnetic-btn-content group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2.5" d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Bedankvideo;
