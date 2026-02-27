import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import frontMatter from 'front-matter';

// Laad alle markdown bestanden in via Vite's import.meta.glob
const mdFiles = import.meta.glob('../../content/seo/*.md', { query: '?raw', import: 'default', eager: true });

const Kennisbank = () => {
    const [blogLinks, setBlogLinks] = useState([]);
    const containerRef = React.useRef(null);
    const contentRefs = React.useRef([]);

    const addToRefs = (el) => {
        if (el && !contentRefs.current.includes(el)) {
            contentRefs.current.push(el);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);

        const blogs = [];

        Object.keys(mdFiles).forEach(path => {
            const rawContent = mdFiles[path];
            const stringContent = typeof rawContent === 'string' ? rawContent : rawContent.default;
            try {
                const { attributes } = frontMatter(stringContent || '');
                const title = attributes.cardTitle || (attributes.title ? attributes.title.split('-')[0].trim() : path.split('/').pop().replace('.md', ''));
                const desc = attributes.cardDescription || attributes.description || '';
                const slug = attributes.slug || path.split('/').pop().replace('.md', '');
                const type = attributes.type || 'service';

                if (type === 'blog') {
                    blogs.push({ slug: `/kennisbank/${slug}`, title, desc });
                }
            } catch (e) {
                console.error("Error parsing frontmatter in kennisbank", e);
            }
        });

        blogs.sort((a, b) => a.title.localeCompare(b.title));
        setBlogLinks(blogs);

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
                <title>Onze beste inzichten en tips. | Volle Gym</title>
                <meta name="description" content="Praktische deep-dives, marketing theorieën en strategieën direct uit het krachthonk van Volle Gym. Speciaal voor de ambitieuze gymeigenaar." />
            </Helmet>

            <div ref={containerRef} className="bg-background min-h-screen pt-32 pb-24 font-sans text-primary">
                <section className="relative w-full px-6 md:px-12 flex flex-col items-center overflow-hidden mb-16">
                    <div className="relative z-10 w-full max-w-4xl mx-auto text-center flex flex-col items-center">
                        <div ref={addToRefs} className="flex items-center justify-center gap-3 mb-6">
                            <span className="text-accent uppercase tracking-widest text-xs font-semibold px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5">
                                Kennisbank
                            </span>
                        </div>
                        <h1 ref={addToRefs} className="font-heading font-bold text-4xl md:text-5xl lg:text-7xl tracking-tighter text-primary leading-[1.1] mb-6">
                            Onze beste <span className="font-drama italic text-accent pr-3">inzichten en tips.</span>
                        </h1>
                        <p ref={addToRefs} className="text-primary/70 text-base md:text-lg max-w-2xl leading-relaxed mb-10">
                            Praktische deep-dives, marketing theorieën en strategieën direct uit het krachthonk van Volle Gym. Speciaal voor de ambitieuze gymeigenaar.
                        </p>
                    </div>
                </section>

                <section className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-0">
                    <div ref={addToRefs} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {blogLinks.map((link, idx) => (
                            <Link
                                key={idx}
                                to={link.slug}
                                className="group flex flex-col p-8 rounded-3xl border border-primary/10 bg-white/5 hover:bg-white/10 backdrop-blur-sm shadow-sm transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="text-xs uppercase tracking-widest text-accent font-semibold mb-4 opacity-80 decoration-accent decoration-2 underline-offset-4 group-hover:underline">Lees Artikel</div>
                                <h3 className="font-heading font-bold text-xl md:text-2xl text-primary mb-4 tracking-tight leading-snug group-hover:text-accent transition-colors">
                                    {link.title}
                                </h3>
                                <p className="text-primary/60 font-sans text-sm leading-relaxed mb-6 flex-grow line-clamp-4">
                                    {link.desc}
                                </p>

                                <div className="mt-auto pt-6 border-t border-primary/10 flex items-center justify-between">
                                    <span className="text-xs font-semibold tracking-wide text-primary/40 uppercase">Volle Gym</span>
                                    <svg className="w-5 h-5 text-accent opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            </div>
        </>
    );
};

export default Kennisbank;
