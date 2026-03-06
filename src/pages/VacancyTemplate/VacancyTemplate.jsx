import React, { useEffect, useRef } from 'react';
import { CheckCircle2, ChevronRight, MapPin, Clock, Briefcase, TrendingUp, Users, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const VacancyTemplate = ({ job }) => {
  // Fallback data if needed
  const dJob = job || {
    title: "Vacature Personal Trainer",
    location: "Leeuwarden",
    type: "Personal Training",
    hours: "16 - 40 uur",
    heroImage: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop",
    aboutClient: "Onze partner is een toonaangevende personal training studio.",
    contentBody: "### Demo content."
  };

  const systemRef = useRef(null);
  const cardsRef = useRef([]);
  const storyRef = useRef(null);
  const textRefs = useRef([]);

  const addToCards = (el) => {
    if (el && !cardsRef.current.includes(el)) cardsRef.current.push(el);
  };
  const addToTextRefs = (el) => {
    if (el && !textRefs.current.includes(el)) textRefs.current.push(el);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cards Animation
      if (cardsRef.current.length > 0) {
        gsap.fromTo(cardsRef.current,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: systemRef.current,
              start: 'top 90%'
            }
          }
        );
      }

      // Story/Notepad Animation
      if (textRefs.current.length > 0) {
        gsap.fromTo(textRefs.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: storyRef.current,
              start: 'top 70%'
            }
          }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  const pillars = [
    {
      num: "01",
      title: "Volop doorgroeien",
      desc: "Bij ons sta je niet stil. We investeren in jouw persoonlijke ontwikkeling met interne opleidingen en externe budgetten. Jouw groei is de groei van de studio.",
      icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
    },
    {
      num: "02",
      title: "Top faciliteiten",
      desc: "Je werkt met de beste apparatuur in een high-end omgeving. Geen compromissen op kwaliteit, zodat jij je volledig kunt focussen op de resultaten van je cliënten.",
      icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
    },
    {
      num: "03",
      title: "Waardering & eigen regie",
      desc: "Jij krijgt de vrijheid om jouw expertise toe te passen. Wij bieden een eerlijk en transparant salarishuis waarin jouw inzet direct wordt beloond.",
      icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    }
  ];

  return (
    <main className="bg-background">
      {/* Hero Section - Uses most of viewport but caps on ultra-tall screens */}
      <section className="relative w-full min-h-[100vh] max-h-[1000px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 from-0% via-black/50 via-50% via-black/10 via-80% to-background to-100% z-10" />
        <img
          src={dJob.heroImage}
          alt="Personal Training Studio"
          className="absolute inset-0 w-full h-full object-cover grayscale-[20%] scale-105"
        />

        <div className="relative z-20 container mx-auto px-6 text-center text-white mt-12 pb-16">
          <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-accent text-white shadow-lg shadow-accent/20 mb-8 font-data text-sm tracking-widest uppercase border border-white/10">
            <MapPin size={16} />
            <span className="font-bold">{dJob.location}</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-bold font-heading mb-8 tracking-tighter leading-[1.1]">
            {dJob.title}
          </h1>
          <p className="text-xl md:text-3xl font-serif text-white/90 max-w-3xl mx-auto mb-12 shadow-sm">
            Jouw passie voor fitness en gezondheid inzetten om <span className="text-accent italic">echt impact</span> te maken.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm md:text-base font-data mt-4">
            <div className="flex items-center gap-3 bg-white px-8 py-4 rounded-xl shadow-xl border border-white/20">
              <Clock size={20} className="text-accent" />
              <span className="font-bold tracking-wide text-primary">{dJob.hours}</span>
            </div>
            <div className="flex items-center gap-3 bg-white px-8 py-4 rounded-xl shadow-xl border border-white/20">
              <Briefcase size={20} className="text-accent" />
              <span className="font-bold tracking-wide text-primary">{dJob.type}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Transparency Section */}
      <section className="py-16 md:py-20 bg-background relative z-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-neutral-50 to-white p-8 md:p-12 rounded-[2.5rem] border border-neutral-100 shadow-sm flex flex-col md:flex-row gap-8 items-center md:items-start">
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
              <Users className="text-accent" size={32} />
            </div>
            <div>
              <h3 className="font-heading font-bold text-2xl text-primary mb-3">Even transparant over onze rol...</h3>
              <p className="font-sans text-primary/70 leading-relaxed text-lg">
                Volle Gym is de groeipartner van meer dan 60+ succesvolle boutiek gyms en personal training studio's.
                Omdat hun memberbase vaak hard groeit, helpen wij hen direct met het selecteren van het beste
                PT-talent in de regio. Je solliciteert dus via deze vacaturebank,
                maar werkt straks direct in dienst bij onze high-end partner in <strong className="text-primary">{dJob.location}</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Markdown Content Section 1 */}
      <section className="py-12 container mx-auto px-6 relative z-20">
        <div className="max-w-4xl mx-auto bg-white p-10 md:p-16 rounded-[3rem] shadow-xl border border-neutral-100">
          <div className="text-lg max-w-none 
                         [&>h1]:font-heading [&>h1]:font-bold [&>h1]:text-3xl [&>h1]:md:text-5xl [&>h1]:text-[var(--color-primary)] [&>h1]:mb-8
                         [&>h2]:font-heading [&>h2]:font-bold [&>h2]:tracking-tight [&>h2]:text-2xl [&>h2]:mt-12 [&>h2]:mb-6 [&>h2]:text-[var(--color-primary)]
                         [&>h3]:font-heading [&>h3]:font-bold [&>h3]:tracking-tight [&>h3]:text-xl [&>h3]:mt-10 [&>h3]:mb-5 [&>h3]:text-[var(--color-primary)]
                         [&>p]:text-[var(--color-primary)]/80 [&>p]:leading-relaxed [&>p]:mb-8 font-sans
                         [&>strong]:text-[var(--color-primary)] [&>strong]:font-bold
                         [&>ul]:mb-8 [&>ul]:space-y-3 [&>ul]:list-none
                         [&>ul>li]:relative [&>ul>li]:pl-6 [&>ul>li]:text-[var(--color-primary)]/80
                         [&>ul>li::before]:content-[''] [&>ul>li::before]:absolute [&>ul>li::before]:left-0 [&>ul>li::before]:top-[0.6em] [&>ul>li::before]:w-1.5 [&>ul>li::before]:h-1.5 [&>ul>li::before]:bg-[var(--color-accent)] [&>ul>li::before]:rounded-full
                         [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-8 [&>ol>li]:mb-3 [&>ol>li]:text-[var(--color-primary)]/80">
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>
              {dJob.contentBody}
            </ReactMarkdown>
          </div>
        </div>
      </section>

      {/* Werkplek & Salaris (Dark Block) */}
      <section className="py-32 bg-[var(--color-primary)] text-white relative">
        <div className="absolute inset-0 noise-overlay opacity-10"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto space-y-32">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <div className="w-16 h-16 bg-[var(--color-accent)] rounded-3xl flex items-center justify-center mb-8 shadow-lg shadow-accent/20">
                  <Heart className="text-white" size={32} />
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">Jouw <span className="italic text-accent">werkomgeving</span></h2>
                <p className="text-white/80 leading-relaxed font-serif text-xl">
                  Je komt in een team van gepassioneerde trainers die continu streven naar groei en verdieping.
                  Een omgeving die fungeert als mentor en waar kennis delen centraal staat.
                  Wij faciliteren jou met budget voor extra opleidingen, toegang tot top-tools en interne trainingen.
                </p>
              </div>
              <div className="bg-white/5 p-10 rounded-[2.5rem] border border-white/10 backdrop-blur-md shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-accent/20 rounded-full blur-[60px]"></div>
                <Users className="text-accent mb-6 relative z-10" size={56} />
                <h3 className="text-2xl font-bold mb-3 relative z-10">Teamcultuur</h3>
                <p className="text-white/60 mb-8 relative z-10">Samen streven we naar de beste begeleiding, met oog voor de lange termijn.</p>
                <h3 className="text-2xl font-bold mb-3 relative z-10">Faciliteiten</h3>
                <p className="text-white/60 relative z-10">Premium apparatuur, eigen trainingsapps en professionele management tools.</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-16 items-center md:flex-row-reverse">
              <div className="md:order-2">
                <div className="w-16 h-16 bg-white text-primary rounded-3xl flex items-center justify-center mb-8 shadow-lg">
                  <TrendingUp size={32} />
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">Salarisopbouw & <span className="italic text-accent">groei</span></h2>
                <p className="text-white/80 leading-relaxed font-serif text-xl">
                  Wij geloven in het belonen van kwaliteit en impact. Onze organisatie biedt jou de vrijheid
                  om zelf te bepalen hoe je je ontwikkelt en in welk tempo. In ons salarismodel heb jij de regie over je eigen groei.
                </p>
              </div>
              <div className="md:order-1 bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] p-10 rounded-[2.5rem] border border-white/10 shadow-2xl">
                <ul className="space-y-10">
                  <li className="flex items-start gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-accent/20 text-accent flex items-center justify-center shrink-0 mt-1 text-xl font-heading font-black border border-accent/20 shadow-lg shadow-accent/10">01</div>
                    <div>
                      <h4 className="font-bold text-2xl text-white">Eerlijke basis</h4>
                      <p className="text-white/60 text-lg mt-2 leading-relaxed">Start met een marktconform of bovengemiddeld salaris op basis van ervaring.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-accent/20 text-accent flex items-center justify-center shrink-0 mt-1 text-xl font-heading font-black border border-accent/20 shadow-lg shadow-accent/10">02</div>
                    <div>
                      <h4 className="font-bold text-2xl text-white">Groeimodel</h4>
                      <p className="text-white/60 text-lg mt-2 leading-relaxed">Verhoog je waarde door opleidingen en meetbare klantresultaten.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-accent/20 text-accent flex items-center justify-center shrink-0 mt-1 text-xl font-heading font-black border border-accent/20 shadow-lg shadow-accent/10">03</div>
                    <div>
                      <h4 className="font-bold text-2xl text-white">Eigen regie</h4>
                      <p className="text-white/60 text-lg mt-2 leading-relaxed">Jij bepaalt je plafond door ondernemerschap binnen de studio.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Body: 3 Cards from Home, customized for Vacancy */}
      <section ref={systemRef} className="py-32 px-6 md:px-12 bg-neutral-50 relative z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/[0.03] via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-20">
          <div className="mb-20 max-w-3xl">
            <p className="font-data text-accent text-sm uppercase tracking-widest mb-4 flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
              Jouw Toekomst
            </p>
            <h2 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-primary leading-tight tracking-tight mb-6">
              Geen standaard baan, <br className="hidden md:block" />
              <span className="font-drama italic text-primary/60 font-medium">maar een carrière.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((pillar, idx) => (
              <div
                key={idx}
                ref={addToCards}
                className="bg-white border border-primary/5 rounded-2xl md:rounded-[2.5rem] p-10 lg:p-12 hover:shadow-2xl hover:-translate-y-2 hover:border-accent/30 transition-all duration-500 group flex flex-col h-full relative overflow-hidden"
              >
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-accent/5 rounded-full blur-[50px] group-hover:bg-accent/10 transition-colors" />
                <div className="flex justify-between items-start mb-16 relative z-10">
                  <div className="w-14 h-14 rounded-full bg-neutral-50 flex items-center justify-center border border-primary/10 text-accent group-hover:scale-110 transition-transform duration-500 shadow-sm relative z-20">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={pillar.icon} />
                    </svg>
                  </div>
                  <span className="font-heading text-accent/40 text-6xl md:text-8xl font-black absolute top-[-10px] right-[-10px] group-hover:text-accent/60 group-hover:scale-110 transition-all duration-500 ease-out select-none">{pillar.num}</span>
                </div>
                <div className="mt-auto relative z-10 border-t border-neutral-100 pt-8">
                  <h3 className="font-heading font-bold text-2xl text-primary mb-4">{pillar.title}</h3>
                  <p className="font-sans text-primary/70 leading-relaxed text-sm md:text-base">{pillar.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Body: Notepad Story section customized */}
      <section ref={storyRef} className="py-24 md:py-32 px-6 md:px-12 bg-white relative z-10 border-b border-primary/5 overflow-hidden">
        <div className="max-w-4xl mx-auto flex flex-col items-center relative z-20">
          <div ref={addToTextRefs} className="flex items-center gap-3 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
            <p className="text-primary/70 font-data uppercase tracking-widest text-xs md:text-sm font-semibold">
              Klinkt dit herkenbaar?
            </p>
            <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
          </div>

          <h2 ref={addToTextRefs} className="font-heading font-bold text-3xl md:text-5xl lg:text-5xl text-primary leading-tight tracking-tight mb-16 text-center">
            Je bent geen PT'er geworden <br className="hidden md:block" />
            <span className="font-drama italic text-primary/60">om als een nummer behandeld te worden.</span>
          </h2>

          <div className="flex flex-col gap-10 text-left relative max-w-3xl w-full">
            <div ref={addToTextRefs} className="group relative mt-4 cursor-default w-full">
              {/* Torn Tape */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-10 bg-white/30 backdrop-blur-sm border-t border-b border-white/40 shadow-sm rotate-[-3deg] z-30" style={{ clipPath: 'polygon(0% 10%, 5% 0%, 15% 15%, 25% 0%, 35% 15%, 45% 0%, 55% 15%, 65% 0%, 75% 15%, 85% 0%, 95% 15%, 100% 5%, 100% 90%, 95% 100%, 85% 85%, 75% 100%, 65% 85%, 55% 100%, 45% 85%, 35% 100%, 25% 85%, 15% 100%, 5% 85%, 0% 95%)' }}></div>
              <div className="absolute top-6 -right-6 w-20 h-8 bg-white/30 backdrop-blur-sm border-t border-b border-white/40 shadow-sm rotate-[45deg] z-30 hidden md:block" style={{ clipPath: 'polygon(0% 10%, 10% 0%, 20% 15%, 30% 0%, 40% 15%, 50% 0%, 60% 15%, 70% 0%, 80% 15%, 90% 0%, 100% 10%, 100% 90%, 90% 100%, 80% 85%, 70% 100%, 60% 85%, 50% 100%, 40% 85%, 30% 100%, 20% 85%, 10% 100%, 0% 90%)' }}></div>

              <div className="bg-[#fdfbf7] rounded-sm p-8 md:p-14 shadow-[2px_15px_40px_rgba(0,0,0,0.08)] border border-[#e8E5df] relative overflow-hidden transform rotate-[1.5deg] transition-all hover:rotate-[0.5deg] duration-500 ease-out z-20">
                <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '12px 12px' }}></div>
                <style>{`@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;700&display=swap');`}</style>

                <div className="relative z-10 text-[#1e293b]" style={{ fontFamily: "'Caveat', cursive", fontSize: '110%' }}>
                  <p className="leading-relaxed text-2xl md:text-3xl mb-8 transform rotate-[-1deg] opacity-90 relative z-10">
                    Je hebt de passie, de kennis en de drive om mensen écht te helpen. Toch voelt het alsof je in je huidige rol vastzit. Je draait je uren, maar mist erkenning en uitzicht op meer.
                  </p>
                  <p className="leading-relaxed text-2xl md:text-3xl mb-10 transform rotate-[0.5deg] opacity-90">
                    <strong className="font-bold border-b-[2px] border-[#0f172a]/20 pb-1">Als we eerlijk zijn:</strong> je potentieel wordt niet volledig benut.
                  </p>
                  <ul className="space-y-6 text-2xl md:text-3xl mb-12 ml-2 transform rotate-[-0.5deg] opacity-90">
                    <li className="flex items-start gap-4">
                      <span className="text-red-700 font-bold leading-none mt-1">x</span>
                      <span>Je geeft alles voor je cliënten, maar je ziet dat niet terug in je portemonnee.</span>
                    </li>
                    <li className="flex items-start gap-4">
                      <span className="text-red-700 font-bold leading-none mt-1">x</span>
                      <span>Je wil doorgroeien, maar de ruimte of de begeleiding ontbreekt.</span>
                    </li>
                  </ul>
                  <div className="mt-8 pt-4 relative transform rotate-[1deg]">
                    <h3 className="font-bold text-3xl md:text-4xl mb-4 tracking-wide mt-2 opacity-100">Daarom pakken wij het anders aan.</h3>
                    <p className="leading-relaxed text-2xl md:text-3xl opacity-90">
                      Jij krijgt bij ons de waardering die je verdient, een ijzersterke cultuur en een plan voor jouw toekomst. Zodat jij je puur op de kwaliteit van je trainingen kan concentreren.
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-black/10 rounded-sm transform rotate-[-1.5deg] translate-y-3 translate-x-2 z-10 blur-[4px]"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section from Home customized */}
      <section className="relative overflow-hidden flex flex-col items-center justify-center bg-white">
        <div className="w-full bg-black pt-32 pb-40 md:pb-56 px-6 md:px-12 relative flex items-center justify-center border-t border-neutral-800">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-accent/20 rounded-full blur-[150px] pointer-events-none z-0"></div>

          <div className="relative z-10 w-full max-w-5xl mx-auto bg-gradient-to-b from-[#333333] to-[#1a1a1a] rounded-[3rem] p-12 md:p-24 text-center shadow-[0_0_200px_rgba(255,53,0,0.2)] border border-white/30 flex flex-col items-center backdrop-blur-md">
            <div className="inline-flex items-center justify-center gap-2 md:gap-3 px-3 md:px-4 py-1.5 md:py-2 border border-white/10 rounded-full bg-white/5 mb-6 mx-auto w-fit max-w-full">
              <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-[#10b981] animate-pulse shrink-0"></div>
              <span className="font-data text-[10px] sm:text-xs tracking-widest text-white/80 uppercase text-center mt-0.5">Solliciteren duurt 2 minuten</span>
            </div>

            <h2 className="font-heading font-black text-6xl md:text-8xl mb-8 tracking-tighter leading-[1] text-white">
              Klaar voor <span className="font-drama italic text-accent font-medium">impact?</span>
            </h2>

            <p className="font-sans text-white/90 mb-14 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
              Spreekt onze werkwijze (resultaatgericht, focus op de lange termijn en kritisch meedenken) je aan? Wacht dan niet en zet vandaag nog de stap naar een nieuwe carrière in <span className="text-white font-bold">{dJob.location}</span>.
            </p>

            <div className="relative inline-flex items-center justify-center mt-4 w-full md:w-auto">
              <div className="absolute top-1/2 -translate-y-1/2 -left-20 md:-left-64 transform rotate-[-8deg] text-white/70 text-2xl md:text-3xl pointer-events-none hidden md:block w-56 text-right z-20" style={{ fontFamily: "'Caveat', cursive" }}>
                Solliciteer direct
                <svg className="absolute top-[65%] -translate-y-1/2 -right-10 md:-right-14 w-8 h-8 md:w-10 md:h-10 text-white/50 transform rotate-[15deg]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12c4-2 8-2 13 0M12 6c2 1.5 4 4 4 6-2 2-4 4-5 5" />
                </svg>
              </div>

              <Link to="/solliciteren" className="magnetic-btn bg-accent text-white px-12 py-6 rounded-full text-lg md:text-xl font-bold tracking-widest uppercase group inline-flex items-center gap-4 hover:scale-105 transition-all duration-300 shadow-[0_20px_40px_rgba(255,53,0,0.25)] hover:shadow-[0_20px_60px_rgba(255,53,0,0.5)] z-10 relative">
                <span className="magnetic-btn-content">Meld je aan</span>
                <svg className="w-8 h-8 magnetic-btn-content group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2.5" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
};

export default VacancyTemplate;
