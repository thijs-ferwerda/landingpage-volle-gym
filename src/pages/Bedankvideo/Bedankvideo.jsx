import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GoogleReviews from '../../components/GoogleReviews';

gsap.registerPlugin(ScrollTrigger);

const featuredVideos = [
    { name: 'Radjin Pitai', result: '34 leden in 5 weken', objection: 'Stond op 9 leden en dacht eraan te stoppen. Groeide met Volle Gym in 5 weken door naar 34 leden.', videoId: 'O_OFRYE3omQ' },
    { name: 'Murat Son', result: '72 leden in 3 maanden', objection: 'Liep compleet vast na drie falende eerdere trajecten. Kreeg zijn focus terug en groeide explosief met 72 nieuwe inschrijvingen.', videoId: 'KxT9StIlyeg' },
    { name: 'Sanne Hendriks', result: '20 leden in 1 week', objection: 'Ontving eerder alleen loze aanmeldingen waarmee ze haar business niet kon bouwen. Bij Volle Gym stroomden direct 20 serieuze, betalende leden binnen.', videoId: '_ERwMRB4pgE' },
    { name: 'Benjamin van Keulen', result: '28 leden in 1 maand', objection: 'Had een diepe afkeer van bureaus wegens het gebrek aan rendement. Gaf het nog één kans en haalde 28 leden binnen.', videoId: 'Qjc8I01bZE8' },
    { name: 'Jan Donker', result: '30 leden in 2 maanden', objection: 'Durfde uitsluitend te starten op de resultaatgarantie en haalde 10x zijn complete investering terug aan nieuwe leden.', videoId: 'BbCw16hxhbo' },
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
    const storyRef = useRef(null);
    const storyTextRefs = useRef([]);
    const videoGridRef = useRef(null);
    const videoCardRefs = useRef([]);
    const prepRef = useRef(null);
    const prepCardsRef = useRef([]);
    const ctaRef = useRef(null);

    const addToHeroRefs = (el) => { if (el && !heroTextRefs.current.includes(el)) heroTextRefs.current.push(el); };
    const addToStoryRefs = (el) => { if (el && !storyTextRefs.current.includes(el)) storyTextRefs.current.push(el); };
    const addToVideoCards = (el) => { if (el && !videoCardRefs.current.includes(el)) videoCardRefs.current.push(el); };
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

        const videoCtx = gsap.context(() => {
            gsap.fromTo(videoCardRefs.current,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out',
                    scrollTrigger: { trigger: videoGridRef.current, start: 'top 80%' } }
            );
        }, videoGridRef);

        const prepCtx = gsap.context(() => {
            gsap.fromTo(prepCardsRef.current,
                { y: 60, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.2, stagger: 0.2, ease: 'power3.out',
                    scrollTrigger: { trigger: prepRef.current, start: 'top 75%' } }
            );
        }, prepRef);

        const ctaCtx = gsap.context(() => {
            gsap.fromTo('.bedankvideo-cta-fade',
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: 'power3.out',
                    scrollTrigger: { trigger: ctaRef.current, start: 'top 75%' } }
            );
        }, ctaRef);

        return () => { heroCtx.revert(); storyCtx.revert(); videoCtx.revert(); prepCtx.revert(); ctaCtx.revert(); };
    }, []);

    return (
        <>
            <Helmet>
                <title>Je gesprek staat ingepland | Volle Gym</title>
                <meta name="robots" content="noindex" />
            </Helmet>

            {/* ── 1. HERO ── */}
            <section ref={heroRef} className="relative w-full flex flex-col items-center pt-20 md:pt-40 pb-16 bg-background overflow-hidden">
                <div className="absolute inset-0 w-full h-full bg-cover bg-center opacity-[0.25] mix-blend-multiply"
                    style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=60&w=1200&auto=format&fit=crop")' }} />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-transparent opacity-60" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none z-0" />

                <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-12 flex flex-col items-center text-center mt-2 md:mt-12">
                    <div ref={addToHeroRefs} className="flex items-center justify-center gap-3 mb-6 md:mb-8">
                        <svg className="w-4 h-4 text-accent" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M4 6h2v12H4zm14 0h2v12h-2zM1 9h2v6H1zm20 0h2v6h-2zM7 11h10v2H7z" />
                        </svg>
                        <p className="text-primary/70 font-data uppercase tracking-widest text-xs md:text-sm font-semibold">Gesprek ingepland</p>
                        <svg className="w-4 h-4 text-accent" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M4 6h2v12H4zm14 0h2v12h-2zM1 9h2v6H1zm20 0h2v6h-2zM7 11h10v2H7z" />
                        </svg>
                    </div>

                    <h1 ref={addToHeroRefs} className="font-heading font-bold text-4xl md:text-6xl lg:text-7xl tracking-tighter leading-[1.05] text-primary mb-8 max-w-4xl">
                        Goed dat je een stap zet.{' '}
                        <br className="hidden md:block" />
                        <span className="font-drama italic text-accent">Bereid je voor.</span>
                    </h1>

                    <p ref={addToHeroRefs} className="text-primary/70 font-sans text-base sm:text-lg md:text-xl max-w-2xl mb-4 leading-relaxed">
                        De meeste gym owners die een gesprek inplannen doen er uiteindelijk niks mee. Het feit dat jij wél een stap zet, zegt iets over waar jij staat als ondernemer.
                    </p>
                </div>
            </section>

            {/* ── 2. TRUST BAR ── */}
            <div className="w-full bg-accent text-white py-4 px-6 relative z-30">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-12 text-center">
                    <div className="flex items-center gap-3 font-data text-xs uppercase tracking-widest">
                        <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                        50+ succesvolle gyms
                    </div>
                    <div className="hidden sm:block w-px h-6 bg-white/30"></div>
                    <div className="flex items-center gap-2">
                        <div className="flex gap-0.5">
                            {[1,2,3,4,5].map(s => (
                                <svg key={s} className="w-3.5 h-3.5 text-[#FABB05]" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>
                        <span className="font-data text-xs uppercase tracking-widest">5.0 Google Reviews</span>
                    </div>
                    <div className="hidden sm:block w-px h-6 bg-white/30"></div>
                    <span className="font-data text-xs uppercase tracking-widest">Gem. 30 nieuwe leden per partner</span>
                </div>
            </div>

            {/* ── 3. STORY — Wat verwachten in het gesprek ── */}
            <section ref={storyRef} className="py-24 md:py-32 px-6 md:px-12 bg-white relative z-10 border-b border-primary/5 overflow-hidden">
                <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

                <div className="max-w-4xl mx-auto flex flex-col items-center relative z-20">
                    <div ref={addToStoryRefs} className="flex items-center gap-3 mb-8">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                        <p className="text-primary/70 font-data uppercase tracking-widest text-xs md:text-sm font-semibold">Dit kun je verwachten</p>
                        <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                    </div>

                    <h2 ref={addToStoryRefs} className="font-heading font-bold text-3xl md:text-5xl text-primary leading-tight tracking-tight mb-16 text-center">
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
                                    <h3 className="font-bold text-3xl md:text-4xl mb-4 tracking-wide mt-2">Geen verkooppraatje.</h3>
                                    <p className="leading-relaxed text-2xl md:text-3xl opacity-90">
                                        Wij werken niet met iedereen. Als het geen match is, zeggen we dat. De gym owners waar we de beste resultaten mee behalen zijn ondernemers die zelf eigenaarschap nemen en het systeem volgen.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="absolute inset-0 bg-black/10 rounded-sm transform rotate-[-1.5deg] translate-y-3 translate-x-2 z-10 blur-[4px]"></div>
                    </div>
                </div>
            </section>

            {/* ── 4. VIDEO TESTIMONIALS ── */}
            <section ref={videoGridRef} className="relative z-10 bg-background py-24">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none z-0" />

                <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12">
                    <div className="text-center mb-16">
                        <div className="flex items-center justify-center gap-3 mb-6">
                            <span className="text-accent uppercase tracking-widest text-xs font-semibold px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5">
                                Resultaten
                            </span>
                        </div>
                        <h2 className="font-heading font-bold text-3xl md:text-5xl lg:text-6xl tracking-tighter text-primary leading-[1.1] mb-4">
                            Zij gingen je <span className="font-drama italic text-accent">voor.</span>
                        </h2>
                        <p className="text-primary/70 font-sans text-base md:text-lg max-w-xl mx-auto leading-relaxed">
                            Bekijk hoe andere gym owners het gesprek aangingen en wat er daarna gebeurde.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredVideos.map((item, index) => (
                            <div
                                key={index}
                                ref={addToVideoCards}
                                className="bg-white rounded-[1.5rem] border border-primary/10 shadow-lg group hover:border-primary/20 transition-colors duration-300 flex flex-col h-full p-2 md:p-3"
                            >
                                <div className="relative shrink-0 w-full aspect-video bg-black rounded-xl overflow-hidden">
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
                                    <p className="font-sans text-sm text-primary/70 italic leading-relaxed flex-1">{item.objection}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 5. GOOGLE REVIEWS (hergebruikt component) ── */}
            <GoogleReviews />

            {/* ── 6. VOORBEREIDING ── */}
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

            {/* ── 7. CTA ── */}
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

                        <p className="bedankvideo-cta-fade font-sans text-white/90 mb-6 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
                            Als je open en eerlijk het gesprek ingaat, dan ga je er sowieso waarde uithalen. Of we nu gaan samenwerken of niet.
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Bedankvideo;
