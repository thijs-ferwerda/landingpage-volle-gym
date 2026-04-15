import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { testimonials, getTestimonialBySlug } from '../../data/testimonials';
import SEO from '../../components/SEO';

const TestimonialPage = () => {
    const { slug } = useParams();
    const testimonial = getTestimonialBySlug(slug);

    // Auto-scroll to video on load
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, [slug]);

    if (!testimonial) {
        return <Navigate to="/resultaten" replace />;
    }

    // Get 3 other testimonials for social proof below
    const others = testimonials.filter(t => t.slug !== slug).slice(0, 3);

    return (
        <>
            <SEO
                title={`${testimonial.name}: ${testimonial.result} | Volle Gym`}
                description={testimonial.objection}
            />
            <main className="bg-background min-h-screen">
                {/* Hero Section with Video */}
                <section className="pt-24 md:pt-32 pb-16 md:pb-24">
                    <div className="max-w-4xl mx-auto px-6 md:px-12">
                        {/* Result Badge */}
                        <div className="flex items-center gap-2 mb-6">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block"></span>
                            <span className="font-data text-primary/60 text-xs uppercase tracking-widest">Succesverhaal</span>
                        </div>

                        {/* Title */}
                        <h1 className="font-heading font-bold text-3xl md:text-5xl lg:text-6xl text-primary tracking-tight mb-3">
                            <span className="text-accent">{testimonial.result}</span>
                        </h1>
                        <p className="font-sans text-lg md:text-xl text-primary/70 uppercase tracking-wider font-medium mb-10">
                            {testimonial.name}
                        </p>

                        {/* Video Embed - Large */}
                        <div className="relative w-full aspect-video bg-dark rounded-2xl overflow-hidden shadow-2xl border border-primary/10 mb-10">
                            <iframe
                                className="absolute top-0 left-0 w-full h-full"
                                src={`https://www.youtube.com/embed/${testimonial.videoId}?rel=0&modestbranding=1&autoplay=1`}
                                title={`Interview met ${testimonial.name}`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>

                        {/* Story */}
                        <div className="bg-white rounded-2xl border border-primary/10 p-8 md:p-10 shadow-sm mb-10">
                            <p className="font-sans text-base md:text-lg text-primary/80 leading-relaxed italic">
                                "{testimonial.objection}"
                            </p>
                        </div>

                        {/* CTA */}
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <Link to="/intake" className="magnetic-btn w-full sm:w-auto bg-accent text-white px-8 py-4 rounded-full text-sm md:text-base font-bold tracking-wide uppercase group inline-flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(255,53,0,0.3)] border border-accent/50 hover:border-accent">
                                <span className="magnetic-btn-content">Doe de intake</span>
                                <svg className="w-5 h-5 magnetic-btn-content group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </Link>
                            <Link to="/resultaten" className="text-primary/60 hover:text-accent text-sm font-semibold uppercase tracking-wider transition-colors">
                                Alle resultaten bekijken
                            </Link>
                        </div>
                    </div>
                </section>

                {/* More Testimonials */}
                <section className="py-16 md:py-24 bg-dark border-t border-primary/10">
                    <div className="max-w-6xl mx-auto px-6 md:px-12">
                        <h2 className="font-heading font-bold text-2xl md:text-3xl text-primary mb-10 tracking-tight">Meer succesverhalen</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {others.map((item) => (
                                <Link
                                    key={item.slug}
                                    to={`/resultaten/${item.slug}`}
                                    className="bg-white rounded-[1.5rem] border border-primary/10 shadow-lg hover:border-primary/20 transition-colors p-2 md:p-3 flex flex-col group"
                                >
                                    <div className="relative shrink-0 w-full aspect-video bg-dark rounded-xl overflow-hidden">
                                        <img
                                            src={`https://img.youtube.com/vi/${item.videoId}/hqdefault.jpg`}
                                            alt={`Interview met ${item.name}`}
                                            className="w-full h-full object-cover"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-14 h-14 rounded-full bg-accent/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                                <svg className="w-6 h-6 ml-1 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-4 pt-5 flex-1 flex flex-col">
                                        <p className="font-heading font-semibold text-[#E03000] text-lg mb-1 tracking-wide">{item.result}</p>
                                        <p className="font-sans font-medium text-sm text-primary/70 uppercase tracking-widest mb-3">{item.name}</p>
                                        <div className="h-px w-full bg-primary/10 mb-3"></div>
                                        <p className="font-sans text-sm text-primary/70 italic leading-relaxed line-clamp-3">{item.objection}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
};

export default TestimonialPage;
