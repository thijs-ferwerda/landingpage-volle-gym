import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import frontMatter from 'front-matter';
import { Clock, Briefcase } from 'lucide-react';

// Load markdown files from the vacancies/hq folder
const mdFiles = import.meta.glob('../../content/vacancies/hq/*.md', { query: '?raw', import: 'default', eager: true });

const VacanciesOverviewHQ = () => {
    const [vacancies, setVacancies] = useState([]);

    const containerRef = React.useRef(null);
    const contentRefs = React.useRef([]);

    const addToRefs = (el) => {
        if (el && !contentRefs.current.includes(el)) {
            contentRefs.current.push(el);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        const parsedVacancies = [];

        Object.keys(mdFiles).forEach(path => {
            const rawContent = mdFiles[path];
            const stringContent = typeof rawContent === 'string' ? rawContent : rawContent.default;
            try {
                const { attributes } = frontMatter(stringContent || '');
                const slug = attributes.slug || path.split('/').pop().replace('.md', '');

                parsedVacancies.push({
                    slug: `/vacatures/${slug}`,
                    title: attributes.title || 'Vacature HQ',
                    location: attributes.location || 'Amsterdam (HQ)',
                    hours: attributes.hours || 'In overleg',
                    type: attributes.type || 'Functie HQ',
                    description: attributes.description || 'Bekijk deze openstaande interne vacature bij Volle Gym HQ.'
                });
            } catch (e) {
                console.error("Error parsing frontmatter in HQ vacancies overview", e);
            }
        });

        parsedVacancies.sort((a, b) => a.title.localeCompare(b.title));
        setVacancies(parsedVacancies);

        const ctx = gsap.context(() => {
            gsap.fromTo(
                contentRefs.current,
                { y: 20, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: 'power3.out',
                    delay: 0.1
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <>
            <Helmet>
                <title>Werken bij Volle Gym HQ | Openstaande Interne Vacatures</title>
                <meta name="description" content="Klaar voor impact? Bekijk alle openstaande vacatures bij Volle Gym HQ in Amsterdam." />
            </Helmet>

            <div ref={containerRef} className="bg-background min-h-screen pt-32 pb-24 font-sans text-primary relative overflow-hidden">
                {/* Visual Elements for HQ branding */}
                <div className="absolute top-0 right-0 w-full h-[60vh] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
                <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

                <section className="relative w-full px-6 md:px-12 flex flex-col items-center mb-16">
                    <div className="relative z-10 w-full max-w-4xl mx-auto text-center flex flex-col items-center">
                        <div ref={addToRefs} className="flex items-center justify-center gap-3 mb-6">
                            <span className="text-accent uppercase tracking-widest text-xs font-semibold px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5">
                                HQ Vacatures
                            </span>
                        </div>
                        <h1 ref={addToRefs} className="font-heading font-bold text-4xl md:text-5xl lg:text-7xl tracking-tighter text-primary leading-[1.1] mb-6">
                            Bouw mee aan de visie <br />
                            <span className="font-drama italic text-primary/60 pr-3">vanuit headquarters.</span>
                        </h1>
                        <p ref={addToRefs} className="text-primary/70 text-base md:text-lg max-w-2xl leading-relaxed mb-10">
                            Geen gelul, hard werken, extreme ownership en de top van de fitnessbranche ondersteunen. Bekijk hieronder de vacatures voor ons interne team in Amsterdam.
                        </p>
                    </div>
                </section>

                <section className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-0">
                    <div ref={addToRefs} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {vacancies.length > 0 ? (
                            vacancies.map((job, idx) => (
                                <Link
                                    key={idx}
                                    to={job.slug}
                                    className="group relative flex flex-col p-10 rounded-[2.5rem] border border-primary/10 bg-white hover:bg-white/90 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-accent/40 overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-bl-full group-hover:bg-accent/10 transition-colors pointer-events-none" />

                                    <div className="text-xs uppercase tracking-widest text-accent font-semibold mb-6 flex items-center gap-2">
                                        <Briefcase size={14} /> {job.type} • {job.location}
                                    </div>
                                    <h3 className="font-heading font-bold text-2xl md:text-3xl text-primary mb-4 tracking-tight leading-snug group-hover:text-accent transition-colors relative z-10">
                                        {job.title}
                                    </h3>
                                    <p className="text-primary/70 font-sans text-base leading-relaxed mb-8 flex-grow relative z-10">
                                        {job.description}
                                    </p>

                                    <div className="mt-auto pt-6 border-t border-primary/5 flex items-center justify-between text-xs text-primary/60 font-bold tracking-wider relative z-10">
                                        <div className="flex items-center gap-3 font-data uppercase">
                                            <span className="flex items-center gap-2 px-3 py-1.5 bg-primary/5 rounded-full"><Clock size={12} /> {job.hours}</span>
                                        </div>
                                        <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-20 border border-primary/10 rounded-[3rem] bg-white/5">
                                <p className="text-primary/80 font-heading font-bold text-2xl mb-4">Er zijn momenteel geen HQ vacatures.</p>
                                <p className="text-primary/60 font-sans text-lg">We zijn altijd op zoek naar A-spelers. Stuur gerust een open sollicitatie als je gelooft dat je waarde kunt toevoegen.</p>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </>
    );
};

export default VacanciesOverviewHQ;
