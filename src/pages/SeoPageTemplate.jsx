import React, { useEffect, useMemo } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import gsap from 'gsap';
import frontMatter from 'front-matter';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

import NotFound from './NotFound/NotFound';

// Laad alle markdown bestanden in via Vite's import.meta.glob (als ruwe text string)
const mdFiles = import.meta.glob('../content/seo/*.md', { query: '?raw', import: 'default', eager: true });

const extractFaqFromContent = (contentBody) => {
    // Simpele extractie: zoek naar h2/h3 (## of ###) die eindigen met een vraagteken, en de tekst eronder tot de volgende heading
    if (!contentBody) return [];

    const lines = contentBody.split('\n');
    const faqs = [];
    let currentQuestion = null;
    let currentAnswer = [];

    for (const line of lines) {
        const headingMatch = line.match(/^(#{2,3})\s+(.*)$/);
        if (headingMatch) {
            // Als we al een vraag hadden, sla deze dan op
            if (currentQuestion) {
                if (currentAnswer.length > 0) {
                    faqs.push({
                        question: currentQuestion,
                        answer: currentAnswer.join('\n').trim()
                    });
                }
                currentQuestion = null;
                currentAnswer = [];
            }

            // Is de nieuwe heading een vraag?
            if (headingMatch[2].trim().endsWith('?')) {
                currentQuestion = headingMatch[2].trim();
            }
        } else if (currentQuestion && line.trim() !== '') {
            currentAnswer.push(line);
        }
    }

    // Vergeet de laatste niet
    if (currentQuestion && currentAnswer.length > 0) {
        faqs.push({
            question: currentQuestion,
            answer: currentAnswer.join('\n').trim()
        });
    }
    return faqs;
};

const SeoPageTemplate = ({ expectedType }) => {
    const { slug } = useParams();

    // Zoek en parse de juiste markdown pagina op basis van de URL slug
    const pageData = useMemo(() => {
        const filePath = Object.keys(mdFiles).find(path => path.endsWith(`/${slug}.md`));
        if (!filePath) return null;

        const rawContent = mdFiles[filePath];
        try {
            const { attributes: frontmatter, body } = frontMatter(rawContent);
            return {
                ...frontmatter,
                contentBody: body
            };
        } catch (e) {
            console.error("Fout bij parsen van markdown:", e);
            return null;
        }
    }, [slug]);

    // Animatie effecten instellen
    const containerRef = React.useRef(null);
    const contentRefs = React.useRef([]);

    // Voeg elementen toe aan de ref array voor GSAP
    const addToRefs = (el) => {
        if (el && !contentRefs.current.includes(el)) {
            contentRefs.current.push(el);
        }
    };

    useEffect(() => {
        if (!pageData) return;

        // Simpele fade-in up animatie
        const ctx = gsap.context(() => {
            gsap.fromTo(
                contentRefs.current,
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    stagger: 0.1,
                    ease: 'power3.out',
                    delay: 0.1
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, [pageData]);

    // Als de slug niet bestaat, render de 404 pagina
    if (!pageData) {
        return <NotFound />;
    }

    // Voorkom dat services te bereiken zijn via /kennisbank/ en vice versa (Redirect indien fout)
    // Frontmatter 'type' moet "service" (default) of "blog" / "pillar" zijn. 
    // We treat "pillar" as "blog" or "service" depending on how it's handled, let's treat it as "service" by default unless specified differently.
    const actualType = pageData.type || 'service';

    if (expectedType === 'blog' && actualType !== 'blog' && actualType !== 'pillar') {
        return <Navigate to={`/${slug}`} replace />; // Foute basis, probeer platte structuur
    }
    if (expectedType === 'service' && actualType === 'blog') {
        return <Navigate to={`/kennisbank/${slug}`} replace />; // Moet via kennisbank
    }

    // Genereer Schema.org JSON-LD
    const schemas = [];
    if (actualType === 'service' || actualType === 'pillar') {
        schemas.push({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Volle Gym",
            "url": "https://www.vollegym.nl",
            "logo": "https://www.vollegym.nl/logo.png",
            "description": "Wij vullen jouw PT-studio systematisch tot de nok toe vol met ideale leden.",
            "areaServed": "NL"
        });

        schemas.push({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Sportschool Marketing",
            "provider": {
                "@type": "LocalBusiness",
                "name": "Volle Gym"
            },
            "areaServed": "NL",
            "url": `https://www.vollegym.nl/${slug}`
        });

        const faqs = extractFaqFromContent(pageData.contentBody);
        if (faqs.length > 0) {
            schemas.push({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": faqs.map(faq => ({
                    "@type": "Question",
                    "name": faq.question,
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": faq.answer
                    }
                }))
            });
        }
    }

    return (
        <>
            {/* Dynamische SEO Meta Tags Injectie via React Helmet */}
            <Helmet>
                <title>{pageData.title}</title>
                <meta name="description" content={pageData.description} />
                <link rel="canonical" href={`https://www.vollegym.nl${expectedType === 'blog' ? '/kennisbank' : ''}/${pageData.slug}`} />
                {/* Voorkom duplicatie door canonical tags proper in te stellen */}

                {schemas.map((schema, index) => (
                    <script type="application/ld+json" key={index}>
                        {JSON.stringify(schema)}
                    </script>
                ))}
            </Helmet>

            <div ref={containerRef} className="bg-background min-h-screen pt-32 pb-24 font-sans text-primary">

                {/* Minimalistische Hero Sectie (gebaseerd op het Volle Gym design) */}
                <section className="relative w-full px-6 md:px-12 flex flex-col items-center text-center overflow-hidden mb-16 md:mb-24">
                    {/* Background gradient voor leesbaarheid */}
                    <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-transparent opacity-60 z-0" />

                    <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
                        <div ref={addToRefs} className="flex items-center justify-center gap-3 mb-6">
                            <span className="text-accent uppercase tracking-widest text-xs font-semibold px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5">
                                Groeistrategie
                            </span>
                        </div>

                        <h1 ref={addToRefs} className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl tracking-tighter leading-[1.1] mb-6">
                            {pageData.heroTitleLine1}
                            <span className="text-primary/40 block mt-2">
                                {pageData.heroTitleLine2} {pageData.heroTitleLine3}
                                <span className="font-drama italic text-primary ml-2">{pageData.heroTitleLine4}</span>
                            </span>
                        </h1>

                        <p ref={addToRefs} className="text-primary/70 text-base md:text-lg max-w-2xl leading-relaxed mb-10">
                            {pageData.heroSubtitle}
                        </p>

                        <div ref={addToRefs}>
                            <Link to="/intake" className="magnetic-btn bg-accent text-white px-8 py-3.5 rounded-full text-sm font-bold tracking-wide uppercase group inline-flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(255,53,0,0.3)] transition-transform hover:scale-[1.02]">
                                <span className="magnetic-btn-content">Meld je gym aan</span>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Content Section (Wordt ge-injecteerd vanuit de JSON als HTML string) */}
                <section className="relative z-10 w-full max-w-3xl mx-auto px-6 md:px-0">
                    <div ref={addToRefs} className="bg-white/5 border border-primary/10 rounded-3xl p-8 md:p-12 shadow-sm backdrop-blur-sm">
                        <h2 className="font-heading font-bold text-2xl md:text-3xl tracking-tight mb-8">
                            {pageData.contentSectionTitle}
                        </h2>

                        {/* We renderen hier de Markdown string, we gebruiken rehypeRaw zodat HTML tags in de markdown behouden blijven */}
                        <div
                            className="text-lg max-w-none 
                                     [&>h2]:font-heading [&>h2]:font-bold [&>h2]:tracking-tight [&>h2]:text-3xl [&>h2]:mt-14 [&>h2]:mb-6 [&>h2]:text-primary
                                     [&>h3]:font-heading [&>h3]:font-bold [&>h3]:tracking-tight [&>h3]:text-2xl [&>h3]:mt-10 [&>h3]:mb-5 [&>h3]:text-primary
                                     [&>p]:text-primary/80 [&>p]:leading-relaxed [&>p]:mb-8
                                     [&>strong]:text-primary [&>strong]:font-bold
                                     [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-8 [&>ul>li]:mb-2 [&>ul>li]:text-primary/80
                                     [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-8 [&>ol>li]:mb-2 [&>ol>li]:text-primary/80"
                        >
                            <ReactMarkdown
                                rehypePlugins={[rehypeRaw]}
                                components={{
                                    a: ({ node, ...props }) => {
                                        // Maak een opvallende button van de /intake link
                                        if (props.href === '/intake') {
                                            return (
                                                <span className="block mt-10 mb-4">
                                                    <Link to="/intake" className="inline-flex items-center gap-3 bg-[#FF3500] text-white px-8 py-4 rounded-full font-bold uppercase tracking-wide hover:scale-[1.03] transition-all shadow-[0_10px_20px_rgba(255,53,0,0.2)]">
                                                        {props.children}
                                                        <svg className="w-5 h-5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2.5" d="M5 12h14M12 5l7 7-7 7" />
                                                        </svg>
                                                    </Link>
                                                </span>
                                            );
                                        }

                                        // Reguliere in-text links opmaken zodat ze goed zichtbaar zijn
                                        if (props.href && props.href.startsWith('/')) {
                                            return (
                                                <Link to={props.href} className="text-[#FF3500] font-semibold underline underline-offset-4 decoration-2 decoration-[#FF3500]/40 hover:decoration-[#FF3500] transition-colors">
                                                    {props.children}
                                                </Link>
                                            );
                                        }

                                        // Externe links
                                        return (
                                            <a href={props.href} className="text-[#FF3500] font-semibold underline underline-offset-4 decoration-2 decoration-[#FF3500]/40 hover:decoration-[#FF3500] transition-colors" target="_blank" rel="noopener noreferrer">
                                                {props.children}
                                            </a>
                                        );
                                    }
                                }}
                            >
                                {pageData.contentBody}
                            </ReactMarkdown>
                        </div>

                        {/* Author Section */}
                        <div className="mt-16 pt-10 border-t border-primary/10 flex flex-col md:flex-row gap-8 items-center md:items-start bg-primary/5 rounded-2xl p-6 md:p-8">
                            <div className="w-32 h-32 md:w-40 md:h-40 shrink-0 rounded-full overflow-hidden border-4 border-background shadow-md">
                                <img
                                    src="/team-vollegym-new-v2.jpg"
                                    alt="Team Volle Gym"
                                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=400&fit=crop'; }}
                                />
                            </div>
                            <div>
                                <h3 className="font-heading font-bold text-xl mb-2">Geschreven door het team van Volle Gym</h3>
                                <p className="text-primary/80 text-sm leading-relaxed mb-4">
                                    Wij zijn het team achter Volle Gym. Vanuit onze praktijkervaring helpen we dagelijks ambitieuze sportschooleigenaren, personal trainers en boutique studio's aan een gezonde, stabiele ledengroei. Geen loze beloftes, maar een persoonlijke en eerlijke samenwerking.
                                </p>
                                <div className="text-xs font-semibold uppercase tracking-widest text-[#FF3500]">
                                    Samen investeren in jouw groei
                                </div>
                            </div>
                        </div>

                        {/* Internal Linking / Related Content */}
                        {(pageData.relatedServices || pageData.relatedBlogs) && (
                            <div className="mt-12 pt-8 border-t border-primary/10">
                                <h3 className="font-heading font-bold text-2xl tracking-tight mb-6">Verder lezen</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {pageData.relatedServices && pageData.relatedServices.map((relatedPath, idx) => {
                                        // Zoek slug (haal / weg)
                                        const cleanSlug = relatedPath.replace(/^\//, '');
                                        const relatedMatch = Object.keys(mdFiles).find(path => path.endsWith(`/${cleanSlug}.md`));

                                        if (relatedMatch) {
                                            const { attributes } = frontMatter(mdFiles[relatedMatch]);
                                            return (
                                                <Link key={`rs-${idx}`} to={`/${cleanSlug}`} className="block p-5 rounded-2xl border border-primary/10 bg-primary/5 hover:bg-primary/10 transition-colors">
                                                    <div className="text-xs uppercase tracking-widest text-[#FF3500] font-semibold mb-2">Service</div>
                                                    <div className="font-bold text-lg text-primary">{attributes.title || cleanSlug}</div>
                                                </Link>
                                            );
                                        }
                                        return null;
                                    })}

                                    {pageData.relatedBlogs && pageData.relatedBlogs.map((relatedPath, idx) => {
                                        const cleanSlug = relatedPath.replace(/^\/kennisbank\//, '').replace(/^\//, '');
                                        const relatedMatch = Object.keys(mdFiles).find(path => path.endsWith(`/${cleanSlug}.md`));

                                        if (relatedMatch) {
                                            const { attributes } = frontMatter(mdFiles[relatedMatch]);
                                            return (
                                                <Link key={`rb-${idx}`} to={`/kennisbank/${cleanSlug}`} className="block p-5 rounded-2xl border border-primary/10 bg-primary/5 hover:bg-primary/10 transition-colors">
                                                    <div className="text-xs uppercase tracking-widest text-[#b02200] font-semibold mb-2">Kennisbank</div>
                                                    <div className="font-bold text-lg text-primary">{attributes.title || cleanSlug}</div>
                                                </Link>
                                            );
                                        }
                                        return null;
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                {/* Soft Guarantee CTA - Bottom of Article */}
                <section className="w-full max-w-5xl mx-auto px-6 mt-20 mb-20 text-center">
                    <div className="bg-[#1a1a1a] rounded-[2.5rem] p-10 md:p-14 text-center shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-white/5 relative overflow-hidden group">

                        {/* Soft Hover Glow inside CTA */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#FF3500]/10 rounded-full blur-[90px] pointer-events-none group-hover:bg-[#FF3500]/20 transition-colors duration-700"></div>

                        <div className="relative z-10 flex flex-col items-center">
                            <div className="inline-flex items-center justify-center gap-2 px-3 py-1.5 border border-white/10 rounded-full bg-white/5 mb-5 w-fit">
                                <div className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse shrink-0"></div>
                                <span className="font-data text-[10px] tracking-widest text-white/80 uppercase mt-0.5">Veilig & Voorspelbaar</span>
                            </div>

                            <h3 className="font-heading font-black text-4xl md:text-5xl mb-5 text-white text-center tracking-tight">
                                Claim je <span className="font-drama italic text-[#FF3500] font-medium pr-2">garantie.</span>
                            </h3>

                            <p className="font-sans text-white/70 mb-8 max-w-lg mx-auto text-base text-center leading-relaxed">
                                Geen loze praatjes, geen wurgcontracten. Plan direct je intake en ontdek of we jou binnen 90 dagen aan een structurele, stabiele aanwas van nieuwe leden kunnen helpen met onze no-cure-no-pay aanpak.
                            </p>

                            <Link to="/intake" className="inline-flex items-center gap-3 bg-[#FF3500] text-white px-8 py-4 rounded-full font-bold uppercase tracking-wide hover:scale-[1.03] transition-all shadow-[0_10px_20px_rgba(255,53,0,0.2)]">
                                Plan een intake
                                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2.5" d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default SeoPageTemplate;
