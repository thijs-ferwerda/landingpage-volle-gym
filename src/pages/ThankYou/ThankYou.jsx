import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import gsap from 'gsap';

// Reusing same youtube data from SocialProof for the grid
const youtubeData = [
    { name: 'Hugo Le Jollec', result: '35 Leden in 2 maanden tijd', objection: '"Het is niet alleen de marketing die je krijgt, maar het hele systeem. Dat heb ik bij geen enkel ander marketingbureau meegemaakt."', videoId: 'b4-jNpoxvwc' },
    { name: 'Casper Hazeveld', result: '35 leden in 1 maand tijd', objection: '"We hebben met verschillende partijen samengewerkt, zonder resultaat. Nu werken we met Volle Gym samen op 4 van onze locaties."', videoId: 'xnhQBTBJPek' },
    { name: 'Melissa Pach', result: '18 leden in 1 maand tijd', objection: '"Draaide verlies en vocht puur om te overleven met haar vaste ledenbestand. Startte de samenwerking en verkocht direct 18 nieuwe trajecten."', videoId: 'QIEOwUDPo5E' },
    { name: 'Sanne Hendriks', result: '20 leden in 1 week tijd', objection: '"Ontving eerder alleen loze aanmeldingen. Bij Volle Gym stroomden in de eerste week direct 20 serieuze, betalende leden binnen."', videoId: '_ERwMRB4pgE' },
    { name: 'Radjin Pitai', result: '34 leden in 5 weken tijd', objection: '"Stond op 9 leden en dacht eraan te stoppen, maar groeide met Volle Gym in 5 weken door naar 34 leden."', videoId: 'O_OFRYE3omQ' },
    { name: 'Murat Son', result: '72 leden in 3 maanden tijd', objection: '"Liep met zijn club compleet vast na drie falende eerdere trajecten. Kreeg zijn focus terug en groeide explosief."', videoId: 'KxT9StIlyeg' }
];

const ThankYou = () => {
    const containerRef = useRef(null);
    const contentRefs = useRef([]);

    const addToRefs = (el) => {
        if (el && !contentRefs.current.includes(el)) {
            contentRefs.current.push(el);
        }
    };

    useEffect(() => {
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

    return (
        <>
            <Helmet>
                <title>Bedankt! Je gesprek staat ingepland | Volle Gym</title>
                <meta name="robots" content="noindex" />
            </Helmet>

            <div ref={containerRef} className="bg-background min-h-screen pt-32 pb-24 font-sans text-primary relative overflow-hidden">

                {/* Background glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none z-0"></div>

                <section className="relative z-10 w-full px-6 md:px-12 flex flex-col items-center text-center mb-16 md:mb-24">
                    <div className="max-w-3xl mx-auto flex flex-col items-center">
                        <h1 ref={addToRefs} className="font-heading font-bold text-4xl md:text-5xl lg:text-7xl tracking-tighter leading-[1.1] mb-6">
                            Yes! Je gesprek staat <br />
                            <span className="font-drama italic text-accent pr-3">ingepland</span> 💪
                        </h1>

                        <p ref={addToRefs} className="text-primary/70 text-base md:text-xl max-w-2xl leading-relaxed mb-4">
                            Thanks voor het boeken — we spreken elkaar snel.
                        </p>
                        <p ref={addToRefs} className="text-primary/70 text-base md:text-xl max-w-2xl leading-relaxed mb-12">
                            Hopelijk kunnen we jou net zo goed helpen als de andere ondernemers hieronder.
                        </p>

                        <div ref={addToRefs} className="inline-flex items-center gap-3 px-6 py-3 border border-primary/10 rounded-full bg-white/5 shadow-sm backdrop-blur-sm">
                            <span className="font-data text-primary text-xs md:text-sm uppercase tracking-widest font-bold">
                                🎥 Check alvast hoe zij het hebben ervaren:
                            </span>
                        </div>
                    </div>
                </section>

                {/* Video Grid Section */}
                <section className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {youtubeData.map((item, index) => (
                            <div
                                key={index}
                                ref={addToRefs}
                                className="bg-white/5 rounded-2xl border border-primary/10 overflow-hidden shadow-lg group hover:border-primary/20 transition-colors duration-300 flex flex-col"
                            >
                                {/* 16:9 Embedded YouTube Video */}
                                <div className="relative w-full aspect-video bg-dark">
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

                                {/* Content below video */}
                                <div className="p-6 md:p-8 flex-1 flex flex-col">
                                    <h3 className="font-heading font-bold text-xl md:text-2xl mb-2 tracking-tight">{item.result}</h3>
                                    <div className="w-12 h-1 bg-accent/30 mb-4 rounded-full"></div>
                                    <p className="font-sans text-base text-primary/70 italic leading-relaxed mb-3 flex-1">
                                        {item.objection}
                                    </p>
                                    <p className="font-sans font-bold text-sm text-primary uppercase tracking-widest mt-auto">
                                        - {item.name}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </>
    );
};

export default ThankYou;
