import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import gsap from 'gsap';

const Onboarding = () => {
    const containerRef = useRef(null);
    const contentRefs = useRef([]);

    const addToRefs = (el) => {
        if (el && !contentRefs.current.includes(el)) {
            contentRefs.current.push(el);
        }
    };

    useEffect(() => {
        // Scroll to top
        window.scrollTo(0, 0);

        const ctx = gsap.context(() => {
            gsap.fromTo(
                contentRefs.current,
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.1,
                    ease: 'power3.out',
                    delay: 0.1
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    // Load Leadconnector iframe script
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://link.msgsndr.com/js/form_embed.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <>
            <Helmet>
                <title>Onboarding | Volle Gym</title>
                <meta name="robots" content="noindex" />
            </Helmet>

            <div ref={containerRef} className="bg-background min-h-screen pt-32 pb-24 font-sans text-primary">

                {/* Hero / Welkom Sectie */}
                <section className="relative w-full px-6 md:px-12 flex flex-col items-center text-center overflow-hidden mb-12 md:mb-16">
                    <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-transparent opacity-60 z-0" />

                    <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
                        <div ref={addToRefs} className="flex items-center justify-center gap-3 mb-6">
                            <span className="text-accent uppercase tracking-widest text-xs font-semibold px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5">
                                Start Traject
                            </span>
                        </div>

                        <h1 ref={addToRefs} className="font-heading font-bold text-4xl md:text-5xl lg:text-7xl tracking-tighter leading-[1.1] mb-6">
                            Hartelijk welkom <br className="hidden md:block" />
                            <span className="font-drama italic text-primary/70">bij Volle Gym!</span>
                        </h1>

                        <div ref={addToRefs} className="text-primary/70 text-base md:text-lg max-w-3xl leading-relaxed space-y-4 mb-4">
                            <p>
                                We waarderen je vertrouwen enorm en kijken ernaar uit om samen een mooie en succesvolle tijd tegemoet te gaan.
                            </p>
                            <p>
                                Om je goed op weg te helpen hebben we je direct een bevestigingsmail gestuurd waarin alle vervolgstappen overzichtelijk staan uitgelegd. Je vindt ze ook op deze pagina, dus neem ze direct even door.
                            </p>
                        </div>

                        {/* Animated Scroll Indicator */}
                        <div ref={addToRefs} className="flex flex-col items-center justify-center mt-6 mb-4 opacity-70">
                            <span className="text-xs uppercase tracking-widest font-bold text-accent mb-2">Scroll naar beneden</span>
                            <div className="w-8 h-12 rounded-full border-2 border-primary/20 flex justify-center p-1 relative">
                                <div className="w-1.5 h-3 bg-accent rounded-full animate-bounce mt-1"></div>
                            </div>
                        </div>

                    </div>
                </section>

                {/* Onboarding Formulier Sectie */}
                <section className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-12 mb-16 md:mb-24">
                    <div ref={addToRefs} className="bg-white border border-primary/10 shadow-2xl rounded-3xl p-4 md:p-8 pt-12 md:pt-16 overflow-hidden relative">
                        {/* Subtiel decoratief achtergrond element */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-[80px] pointer-events-none" />

                        <div className="mb-4 text-center max-w-2xl mx-auto">
                            <h2 className="font-heading font-bold text-2xl md:text-3xl tracking-tight mb-3">
                                Stap 1: <span className="text-accent">Het onboardingsformulier</span>
                            </h2>
                            <p className="text-primary/70 text-sm leading-relaxed">
                                Tijd voor actie. Vul het formulier (ca. 5 minuten) in. Zodra we jouw gegevens hebben, beginnen wij direct op de achtergrond met het inrichten van je systemen.
                            </p>
                        </div>

                        <div className="relative w-full z-10 min-h-[500px]">
                            <iframe
                                src="https://api.leadconnectorhq.com/widget/survey/IBwDAFjoMLNg4L0SzdvB"
                                style={{ border: 'none', width: '100%' }}
                                scrolling="no"
                                id="IBwDAFjoMLNg4L0SzdvB"
                                title="Volle Gym Onboarding Survey">
                            </iframe>
                        </div>
                    </div>
                </section>

                {/* Vervolgstappen Sectie (Verticale Lijst of Cards) */}
                <section className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-12">
                    <div ref={addToRefs} className="mb-12 text-center max-w-3xl mx-auto">
                        <h2 className="font-heading font-bold text-3xl md:text-5xl tracking-tight mb-4">
                            Vervolgstappen <span className="text-accent italic font-drama">op een rijtje.</span>
                        </h2>
                        <p className="text-primary/60">Dit zijn alle stappen die je direct na de betaling even moet uitvoeren:</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                        {/* Step 1 */}
                        <div ref={addToRefs} className="bg-white/5 border border-primary/5 rounded-2xl p-6 md:p-8 hover:border-accent/20 transition-all duration-300 group relative overflow-hidden">
                            <div className="flex justify-between items-start mb-6 relative z-10">
                                <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center border border-primary/10 text-accent group-hover:scale-110 transition-transform shadow-sm">
                                    <span className="font-bold text-lg">1</span>
                                </div>
                            </div>
                            <div className="relative z-10">
                                <h3 className="font-heading font-bold text-lg text-primary mb-2">
                                    Vul het onboardingsformulier in
                                </h3>
                                <p className="font-sans text-primary/70 leading-relaxed text-sm">
                                    Vul het onboardingsformulier hierboven in. We hebben deze info direct nodig om klaar te staan voor de lancering.
                                </p>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div ref={addToRefs} className="bg-white/5 border border-primary/5 rounded-2xl p-6 md:p-8 hover:border-accent/20 transition-all duration-300 group relative overflow-hidden">
                            <div className="flex justify-between items-start mb-6 relative z-10">
                                <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center border border-primary/10 text-accent group-hover:scale-110 transition-transform shadow-sm">
                                    <span className="font-bold text-lg">2</span>
                                </div>
                            </div>
                            <div className="relative z-10">
                                <h3 className="font-heading font-bold text-lg text-primary mb-2">
                                    Check je mailbox (en spambox)
                                </h3>
                                <p className="font-sans text-primary/70 leading-relaxed text-sm">
                                    Controleer of je de bevestigingsmails (een tweetal) hebt ontvangen. Dit kan tot 10 minuten duren. Check voor de zekerheid ook je spambox.
                                </p>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div ref={addToRefs} className="bg-white/5 border border-primary/5 rounded-2xl p-6 md:p-8 hover:border-accent/20 transition-all duration-300 group relative overflow-hidden">
                            <div className="flex justify-between items-start mb-6 relative z-10">
                                <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center border border-primary/10 text-accent group-hover:scale-110 transition-transform shadow-sm">
                                    <span className="font-bold text-lg">3</span>
                                </div>
                            </div>
                            <div className="relative z-10">
                                <h3 className="font-heading font-bold text-lg text-primary mb-2">
                                    Join de academie
                                </h3>
                                <p className="font-sans text-primary/70 leading-relaxed text-sm">
                                    Join de academie via de mail die je hebt ontvangen met de titel <strong>"🚀 Toegang tot members.vollegym.nl"</strong>. Maak gratis je account aan.
                                </p>
                            </div>
                        </div>

                        {/* Step 4 */}
                        <div ref={addToRefs} className="bg-white/5 border border-primary/5 rounded-2xl p-6 md:p-8 hover:border-accent/20 transition-all duration-300 group relative overflow-hidden">
                            <div className="flex justify-between items-start mb-6 relative z-10">
                                <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center border border-primary/10 text-accent group-hover:scale-110 transition-transform shadow-sm">
                                    <span className="font-bold text-lg">4</span>
                                </div>
                            </div>
                            <div className="relative z-10">
                                <h3 className="font-heading font-bold text-lg text-primary mb-2">
                                    Teken de overeenkomst
                                </h3>
                                <p className="font-sans text-primary/70 leading-relaxed text-sm">
                                    Teken de gedeelde samenwerkingsovereenkomst waarop de behaalde garantie ook netjes zwart-op-wit staat. Wel zo fijn voor jou.
                                </p>
                            </div>
                        </div>

                        {/* Step 5 - Full Width for emphasis */}
                        <div ref={addToRefs} className="md:col-span-2 bg-[#10b981]/5 border border-[#10b981]/20 rounded-2xl p-6 md:p-8 hover:border-[#10b981]/40 transition-all duration-300 group relative overflow-hidden">
                            <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#10b981]/10 rounded-full blur-[60px] pointer-events-none" />
                            <div className="flex justify-between items-start mb-6 relative z-10">
                                <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center border border-[#10b981]/20 text-[#10b981] group-hover:scale-110 transition-transform shadow-sm">
                                    <span className="font-bold text-xl">5</span>
                                </div>
                            </div>
                            <div className="relative z-10">
                                <h3 className="font-heading font-bold text-xl text-primary mb-2">
                                    Doorloop de "Start hier" module
                                </h3>
                                <p className="font-sans text-primary/80 leading-relaxed text-base">
                                    Doorloop de module in de academie (binnen 48 uur). Dit is enorm belangrijk. Je komt hier natuurlijk voor resultaten 😉 dus geef ons zo snel mogelijk de input om daarmee aan de slag te kunnen gaan. We hebben ongeveer 30 minuten nodig om de systemen aan te maken, zodat je toegang hebt. Daarna kun je de module doorlopen en heb je dat lekker achter de rug 💪🏼
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Celebration Team Sectie */}
                <section className="relative z-10 w-full max-w-4xl mx-auto px-6 md:px-12 mt-20 md:mt-32">
                    <div ref={addToRefs} className="bg-white border border-primary/10 shadow-2xl rounded-3xl overflow-hidden relative group hover:border-accent/20 transition-all duration-500">
                        {/* Image Header */}
                        <div className="w-full h-64 md:h-80 relative overflow-hidden bg-dark">
                            <img
                                src="/team-vollegym-new-v2.jpg"
                                alt="Het Volle Gym Team"
                                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                            />
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/40 to-transparent"></div>

                            <div className="absolute bottom-6 left-6 md:left-8 right-6">
                                <span className="inline-block px-3 py-1 bg-accent text-white text-xs font-bold uppercase tracking-widest rounded-full mb-3 shadow-lg">Let's go!</span>
                                <h2 className="font-heading font-bold text-3xl md:text-4xl text-white tracking-tight">
                                    Enorm veel zin in!
                                </h2>
                            </div>
                        </div>

                        {/* Content Body */}
                        <div className="p-6 md:p-10 md:pt-8 bg-white relative">
                            <p className="font-sans text-primary/80 leading-relaxed text-base md:text-lg">
                                Namens het hele team van Volle Gym: tof dat je het vertrouwen in ons hebt uitgesproken! We kunnen écht niet wachten om samen met jou aan de slag te gaan en de reis te starten om jouw gym te vullen met nieuwe leden. We gaan knallen!
                            </p>

                            {/* Subtiele krabbel / groet */}
                            <div className="mt-8 flex items-center justify-between border-t border-primary/10 pt-6">
                                <div className="flex -space-x-3">
                                    <div className="w-10 h-10 rounded-full border-2 border-white bg-accent/20 flex items-center justify-center text-accent font-bold text-xs uppercase shadow-sm">T</div>
                                    <div className="w-10 h-10 rounded-full border-2 border-white bg-primary/20 flex items-center justify-center text-primary font-bold text-xs uppercase shadow-sm">MB</div>
                                    <div className="w-10 h-10 rounded-full border-2 border-white bg-dark/20 flex items-center justify-center text-dark font-bold text-xs uppercase shadow-sm">R</div>
                                </div>
                                <div className="text-right">
                                    <p className="font-heading font-bold text-lg text-primary">Team Volle Gym</p>
                                    <p className="text-xs text-primary/50 uppercase tracking-widest">We Got You</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Info Footer sectie */}
                <section className="w-full max-w-4xl mx-auto px-6 mt-20 text-center">
                    <p ref={addToRefs} className="font-sans text-primary/50 text-sm">
                        Heb je toch nog een vraag of is er iets onduidelijk?<br /> Aarzel niet om contact op te nemen! Stuur een e-mail naar <a href="mailto:info@vollegym.nl" className="text-accent underline hover:opacity-80">info@vollegym.nl</a>, en we staan klaar om je zo snel mogelijk te helpen.
                    </p>
                </section>
            </div>
        </>
    );
};

export default Onboarding;
