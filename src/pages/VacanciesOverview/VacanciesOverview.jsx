import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import frontMatter from 'front-matter';
import { MapPin, Clock, Search } from 'lucide-react';

// Load markdown files from the vacancies/partners folder
const mdFiles = import.meta.glob('../../content/vacancies/partners/*.md', { query: '?raw', import: 'default', eager: true });

const VacanciesOverview = () => {
    const [vacancies, setVacancies] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

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
                    title: attributes.title || 'Vacature',
                    location: attributes.location || 'Nederland',
                    hours: attributes.hours || 'In overleg',
                    type: attributes.type || 'Functie',
                    description: attributes.description || 'Bekijk deze openstaande vacature bij een van onze exclusieve gym partners.'
                });
            } catch (e) {
                console.error("Error parsing frontmatter in vacancies overview", e);
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
                <title>Vacaturebank | Werken bij Volle Gym Partners</title>
                <meta name="description" content="Bekijk alle actuele PT en clubmanager vacatures bij onze high-end partners door heel Nederland." />
                <script type="application/ld+json">{JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.vollegym.nl"},{"@type":"ListItem","position":2,"name":"Vacatures"}]})}</script>
            </Helmet>

            <div ref={containerRef} className="bg-background min-h-screen pt-32 pb-24 font-sans text-primary">
                <section className="relative w-full px-6 md:px-12 flex flex-col items-center overflow-hidden mb-16">
                    <div className="relative z-10 w-full max-w-4xl mx-auto text-center flex flex-col items-center">
                        <div ref={addToRefs} className="flex items-center justify-center gap-3 mb-6">
                            <span className="text-accent uppercase tracking-widest text-xs font-semibold px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5">
                                Vacatures
                            </span>
                        </div>
                        <h1 ref={addToRefs} className="font-heading font-bold text-4xl md:text-5xl lg:text-7xl tracking-tighter text-primary leading-[1.1] mb-6">
                            Bekijk alle openstaande <br />
                            <span className="font-drama italic text-accent pr-3">partner vacatures.</span>
                        </h1>
                        <p ref={addToRefs} className="text-primary/70 text-base md:text-lg max-w-2xl leading-relaxed mb-10">
                            Volle Gym partners behoren tot de absolute top van Nederland. Ontdek hieronder de actuele posities bij onze aangesloten PT studio's en boutiek gyms.
                        </p>

                        <div ref={addToRefs} className="flex items-center gap-3 bg-white p-2 rounded-full border border-primary/10 shadow-sm w-full max-w-lg mx-auto transition-all focus-within:border-accent/40 focus-within:shadow-md">
                            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0">
                                <Search size={18} />
                            </div>
                            <input
                                type="text"
                                placeholder="Zoek op locatie, functie of trefwoord..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-transparent border-none outline-none text-primary font-sans w-full pr-4 placeholder:text-primary/40"
                            />
                        </div>
                    </div>
                </section>

                <section className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-0">
                    <div ref={addToRefs} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {vacancies.filter(v =>
                            searchQuery === '' ||
                            v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            v.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            v.description.toLowerCase().includes(searchQuery.toLowerCase())
                        ).length > 0 ? (
                            vacancies.filter(v =>
                                searchQuery === '' ||
                                v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                v.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                v.description.toLowerCase().includes(searchQuery.toLowerCase())
                            ).map((job, idx) => (
                                <Link
                                    key={idx}
                                    to={job.slug}
                                    className="group flex flex-col p-8 rounded-3xl border border-primary/10 bg-white hover:bg-white/90 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-accent/30"
                                >
                                    <div className="text-xs uppercase tracking-widest text-accent font-semibold mb-4 opacity-80 decoration-accent decoration-2 underline-offset-4 group-hover:underline flex items-center gap-2">
                                        <MapPin size={14} /> {job.location}
                                    </div>
                                    <h3 className="font-heading font-bold text-xl md:text-2xl text-primary mb-4 tracking-tight leading-snug group-hover:text-accent transition-colors">
                                        {job.title}
                                    </h3>
                                    <p className="text-primary/60 font-sans text-sm leading-relaxed mb-6 flex-grow">
                                        {job.description}
                                    </p>

                                    <div className="mt-auto pt-6 border-t border-primary/10 flex items-center justify-between text-xs text-primary/60 font-medium">
                                        <div className="flex items-center gap-3 font-data uppercase tracking-wider">
                                            <span className="flex items-center gap-1.5"><Clock size={12} /> {job.hours}</span>
                                        </div>
                                        <svg className="w-5 h-5 text-accent opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-20 border border-primary/10 rounded-3xl bg-white/5">
                                <p className="text-primary/60 font-medium text-lg mb-2">Geen vacatures gevonden voor "{searchQuery}"</p>
                                <p className="text-primary/40 block">Probeer een andere stad of functietitel.</p>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </>
    );
};

export default VacanciesOverview;
