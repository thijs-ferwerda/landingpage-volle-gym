/* eslint-disable react-hooks/purity */
import React, { useEffect, useRef, useState } from 'react';
import { testimonials } from '../../data/testimonials';

const FEATURED_SLUGS = ['murat-son', 'danielle-sabajo', 'hugo-le-jollec'];
const featuredTestimonials = FEATURED_SLUGS
    .map(slug => testimonials.find(t => t.slug === slug))
    .filter(Boolean);

const VideoTestimonial = ({ item }) => {
    const [playing, setPlaying] = useState(false);
    return (
        <div className="bg-white rounded-[1.5rem] border border-primary/10 shadow-lg flex flex-col h-full p-2 md:p-3">
            <div className="relative shrink-0 w-full aspect-video bg-black rounded-xl overflow-hidden">
                {playing ? (
                    <iframe
                        className="absolute top-0 left-0 w-full h-full"
                        src={`https://www.youtube-nocookie.com/embed/${item.videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1&controls=1`}
                        title={`Interview met ${item.name}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                ) : (
                    <button
                        type="button"
                        onClick={() => setPlaying(true)}
                        className="absolute inset-0 group cursor-pointer"
                        aria-label={`Speel video met ${item.name} af`}
                    >
                        <img
                            src={`https://i.ytimg.com/vi/${item.videoId}/hqdefault.jpg`}
                            alt={`Thumbnail van interview met ${item.name}`}
                            className="absolute inset-0 w-full h-full object-cover"
                            loading="lazy"
                        />
                        <span className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                            <span className="w-16 h-16 md:w-20 md:h-20 bg-accent rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                                <svg viewBox="0 0 24 24" className="w-7 h-7 md:w-9 md:h-9 text-white ml-1" fill="currentColor" aria-hidden="true">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </span>
                        </span>
                    </button>
                )}
            </div>
            <div className="p-4 pt-5 bg-white flex-1 flex flex-col">
                <p className="font-heading font-semibold text-accent text-lg md:text-xl mb-1 tracking-wide">{item.result}</p>
                <p className="font-sans font-medium text-sm text-primary/70 uppercase tracking-widest">{item.name}</p>
            </div>
        </div>
    );
};

const IntakeQualified = () => {
    const [timestamp] = useState(Date.now());
    const [interacted, setInteracted] = useState(false);
    const iframeRef = useRef(null);

    useEffect(() => {
        window.scrollTo(0, 0);

        // Load HighLevel Calendar Embed Script
        const script = document.createElement('script');
        script.src = "https://link.msgsndr.com/js/form_embed.js";
        script.async = true;
        document.body.appendChild(script);

        // Detect when user interacts with the booking iframe so we can expand
        // the wrapper from "calendar-only" view to full booking flow (form fields)
        const handleBlur = () => {
            setTimeout(() => {
                if (document.activeElement === iframeRef.current) {
                    setInteracted(true);
                }
            }, 0);
        };
        window.addEventListener('blur', handleBlur);

        return () => {
            window.removeEventListener('blur', handleBlur);
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        };
    }, []);

    return (
        <section className="min-h-screen pt-32 pb-24 px-6 bg-background flex flex-col items-center relative z-10 w-full overflow-hidden">
            {/* Soft decorative background gradients */}
            <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

            <div className="hidden md:flex max-w-4xl w-full mx-auto text-center mb-6 relative z-20 flex-col items-center">
                <div className="inline-flex items-center gap-3 px-5 py-2.5 border border-primary/10 rounded-full bg-white shadow-sm mb-8">
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                    <p className="font-data text-primary text-xs md:text-sm uppercase tracking-widest font-bold">
                        Stap 2 van 2: Plan je gesprek
                    </p>
                </div>

                <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-primary tracking-tighter leading-[1.1] mb-6">
                    Kies een moment voor je <br className="hidden md:block" />
                    <span className="font-drama italic text-primary/70">verdiepingsgesprek.</span>
                </h1>

                <p className="font-sans text-primary/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-0">
                    Gefeliciteerd, je club is gekwalificeerd. Selecteer hieronder een datum en tijd voor een vrijblijvende, strategische sessie met ons.
                </p>
            </div>

            <div className="md:hidden inline-flex items-center gap-3 px-5 py-2.5 border border-primary/10 rounded-full bg-white shadow-sm mb-6 relative z-20">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                <p className="font-data text-primary text-xs uppercase tracking-widest font-bold">
                    Stap 2 van 2: Plan je gesprek
                </p>
            </div>

            {/* Speaker profile — desktop: above calendar */}
            <div className="hidden md:flex w-full max-w-6xl mx-auto px-20 mb-6 relative z-20 flex-col items-center gap-3">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full ring-2 ring-accent/30 ring-offset-2 overflow-hidden flex-shrink-0">
                        <img src="/bas-nagel.jpeg" alt="Bas Nagel" className="w-full h-full object-cover" />
                    </div>
                    <div className="text-left">
                        <p className="font-heading font-semibold text-primary text-base">Bas Nagel</p>
                        <p className="font-sans text-primary/50 text-sm">Oprichter, Volle Gym</p>
                    </div>
                </div>
            </div>

            {/* Embedded Calendar Container */}
            <div className="w-full max-w-6xl -mx-6 px-2 md:mx-auto md:px-20 pb-0 md:pb-10 pt-0 bg-transparent md:bg-white rounded-none md:rounded-3xl shadow-none md:shadow-xl border-0 md:border md:border-primary/10 relative z-20">
                {!interacted && (
                    <style>{`
                        @media (max-width: 767px) {
                            #VJNpnvcHICgLsY8NxG8r_1771696118701 {
                                max-height: 680px !important;
                            }
                        }
                    `}</style>
                )}
                <iframe
                    ref={iframeRef}
                    src={`https://api.leadconnectorhq.com/widget/booking/VJNpnvcHICgLsY8NxG8r?cb=${timestamp}`}
                    style={{ width: '100%', border: 'none', overflow: 'hidden' }}
                    scrolling="no"
                    id="VJNpnvcHICgLsY8NxG8r_1771696118701"
                    title="booking"
                    className="w-full min-h-[300px] md:min-h-[700px]"
                ></iframe>
            </div>

            {/* Fallback contact — mobile only (HighLevel widget verbergt dit op kleine schermen) */}
            <div className="md:hidden mt-4 w-full px-4 relative z-20">
                <p className="font-sans text-sm text-primary/70 text-center leading-snug">
                    Kun je geen passend moment vinden, stuur een mailtje naar{' '}
                    <a href="mailto:info@vollegym.nl" className="text-accent underline font-medium">info@vollegym.nl</a>
                    {' '}of WhatsApp naar{' '}
                    <a href="https://wa.me/3197010256819" className="text-accent underline font-medium whitespace-nowrap">+31 970 102 56819</a>.
                </p>
            </div>

            {/* Speaker profile — mobile: below calendar */}
            <div className="md:hidden mt-4 w-full -mx-6 px-2 relative z-20">
                <div className="w-full flex flex-col items-center gap-4">
                    <p className="font-sans text-sm text-primary/70 text-center leading-snug w-full">Ik kijk ernaar uit je te spreken.</p>
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full ring-2 ring-accent/30 ring-offset-2 overflow-hidden flex-shrink-0">
                            <img src="/bas-nagel.jpeg" alt="Bas Nagel" className="w-full h-full object-cover" />
                        </div>
                        <div className="text-left">
                            <p className="font-heading font-semibold text-primary text-base">Bas Nagel</p>
                            <p className="font-sans text-primary/50 text-sm">Oprichter, Volle Gym</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Video testimonials below calendar */}
            <div className="w-full max-w-6xl mx-auto px-2 md:px-20 mt-10 md:mt-24 relative z-20">
                <div className="text-center mb-6 md:mb-12">
                    <h2 className="font-heading font-bold text-2xl md:text-4xl text-primary tracking-tighter leading-[1.1]">
                        Resultaten uit de praktijk:
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {featuredTestimonials.map((item) => (
                        <VideoTestimonial key={item.slug} item={item} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default IntakeQualified;
