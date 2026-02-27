import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

// Laad alle markdown bestanden in via Vite's import.meta.glob
const mdFiles = import.meta.glob('../content/seo/*.md', { query: '?raw', import: 'default', eager: true });

const Sitemap = () => {
    const [seoLinks, setSeoLinks] = useState([]);
    const containerRef = React.useRef(null);
    const contentRefs = React.useRef([]);

    const addToRefs = (el) => {
        if (el && !contentRefs.current.includes(el)) {
            contentRefs.current.push(el);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);

        // Verwerk de bestanden en haal slugs eruit
        const links = Object.keys(mdFiles).map(path => {
            const filename = path.split('/').pop();
            const slug = filename.replace('.md', '');

            // Format slug to readable title
            const title = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

            return { slug, title };
        }).sort((a, b) => a.title.localeCompare(b.title));

        setSeoLinks(links);

        const ctx = gsap.context(() => {
            gsap.fromTo(
                contentRefs.current,
                { y: 20, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.05,
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
                <title>Sitemap | Volle Gym</title>
                <meta name="description" content="Overzicht van alle pagina's op Volle Gym, de partner voor PT studio's en boutique gyms." />
            </Helmet>

            <div ref={containerRef} className="bg-background min-h-screen pt-32 pb-24 font-sans text-primary">
                <section className="relative w-full px-6 md:px-12 flex flex-col items-center overflow-hidden mb-16">
                    <div className="relative z-10 w-full max-w-4xl mx-auto">
                        <h1 ref={addToRefs} className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl tracking-tighter leading-[1.1] mb-6">
                            Website <span className="font-drama italic text-primary/60">Sitemap</span>
                        </h1>
                        <p ref={addToRefs} className="text-primary/70 text-base md:text-lg max-w-2xl leading-relaxed mb-10">
                            Navigeer snel naar alle belangrijke pagina's en ontdek onze artikelen over groei en marketing.
                        </p>
                    </div>
                </section>

                <section className="relative z-10 w-full max-w-4xl mx-auto px-6 md:px-0">
                    <div ref={addToRefs} className="bg-white/5 border border-primary/10 rounded-3xl p-8 md:p-12 shadow-sm backdrop-blur-sm grid grid-cols-1 md:grid-cols-2 gap-12">

                        {/* Hoofdpagina's */}
                        <div>
                            <h2 className="font-heading font-bold text-2xl tracking-tight mb-6">Navigatie</h2>
                            <ul className="space-y-3">
                                <li><Link to="/" className="text-primary hover:text-accent font-medium transition-colors">Home</Link></li>
                                <li><Link to="/resultaten" className="text-primary hover:text-accent font-medium transition-colors">Resultaten</Link></li>
                                <li><Link to="/intake" className="text-primary hover:text-accent font-medium transition-colors">Intake Plannen</Link></li>
                                <li><Link to="/privacy" className="text-primary hover:text-accent font-medium transition-colors">Privacybeleid</Link></li>
                                <li><Link to="/voorwaarden" className="text-primary hover:text-accent font-medium transition-colors">Algemene Voorwaarden</Link></li>
                            </ul>
                        </div>

                        {/* SEO Pagina's */}
                        <div>
                            <h2 className="font-heading font-bold text-2xl tracking-tight mb-6">Groeistrategieën</h2>
                            <ul className="space-y-3 text-sm max-h-[400px] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-primary/10 scrollbar-track-transparent">
                                {seoLinks.map(link => (
                                    <li key={link.slug}>
                                        <Link to={`/${link.slug}`} className="text-primary/70 hover:text-accent block py-1 transition-colors">
                                            {link.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>
                </section>
            </div>
        </>
    );
};

export default Sitemap;
