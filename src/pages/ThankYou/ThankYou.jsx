import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import gsap from 'gsap';
import GoogleReviews from '../../components/GoogleReviews';

// Reusing all 14 youtube data entries exactly as they are in SocialProof.jsx
const youtubeData = [
    { name: 'Melissa Pach', result: '18 leden in 1 maand tijd', objection: 'Draaide verlies en vocht puur om te overleven met haar vaste ledenbestand. Startte de samenwerking en verkocht vrijwel direct 18 nieuwe trajecten vol energie.', videoId: 'QIEOwUDPo5E' },
    { name: 'Murat Son', result: '72 leden in 3 maanden tijd', objection: 'Liep met zijn club compleet vast na drie falende eerdere trajecten. Kreeg dankzij de 90-dagen pijlers zijn focus terug en groeide explosief met 72 nieuwe inschrijvingen.', videoId: 'KxT9StIlyeg' },
    { name: 'Hugo Le Jollec', result: '35 leden in 2 maanden tijd', objection: 'Werkte zich kapot vóór de schermen zonder aan zijn bedrijf te bouwen. Was sceptisch door eerdere bureaus, maar bouwde nu succesvol een schaalbaar systeem.', videoId: 'b4-jNpoxvwc' },
    { name: 'Radjin Pitai', result: '34 leden in 5 weken tijd', objection: 'Kreeg telkens gouden bergen beloofd door bureaus zonder resultaat. Stond op 9 leden en dacht eraan te stoppen, maar groeide met Volle Gym in 5 weken door naar 34 leden.', videoId: 'O_OFRYE3omQ' },
    { name: 'Sanne Hendriks', result: '20 leden in 1 week tijd', objection: 'Ontving eerder alleen loze aanmeldingen waarmee ze haar business niet kon bouwen. Bij Volle Gym stroomden in de eerste week direct 20 serieuze, betalende leden binnen.', videoId: '_ERwMRB4pgE' },
    { name: 'Benjamin van Keulen', result: '28 leden in 1 maand tijd', objection: 'Had een diepe afkeer gekregen van marketingbureaus wegens het gebrek aan rendement. Gaf het nog één kans en mocht direct 28 nieuwe leden verwelkomen.', videoId: 'Qjc8I01bZE8' },
    { name: 'Mike Bosselaar', result: '25 leden in 5 weken tijd', objection: 'Kreeg bij zijn vorige partij wel kliks, maar totaal geen plan of strategie waardoor budget weglekte. Met de nieuwe structuur tekende hij 25 nieuwe starters op.', videoId: 'PcUTF1gOYNs' },
    { name: 'Casper Hazeveld', result: '30 leden in 1 maand tijd', objection: 'Hing volledig af van langzaam opdrogende mond-tot-mondreclame. Ontdekte hoe je met een gerichte call-to-action snel 30 extra leden binenhaalt.', videoId: 'xnhQBTBJPek' },
    { name: 'Mauricio Franklin', result: '20 leden in 1 maand tijd', objection: 'Was te veel coach en te weinig schaalbare ondernemer doordat hij koude online leads zelf moest uitzoeken. Met de juiste begeleiding scoorde hij direct 20 leden in zijn eerste maand.', videoId: 'SpJ5KgQa9Ww' },
    { name: 'Michel Dekker', result: '35 leden in 3 maanden tijd', objection: 'Kampte met stagnerende conversie door "gratis proefles"-zoekers via standaard internet bureau\'s. Bouwde een premium flow en haalde 35 hoogwaardige leden binnen.', videoId: 'hAj5OnZTSo4' },
    { name: 'Ulrich Heidstra', result: '15 leden in 1 maand tijd', objection: 'Was sceptisch geworden door valse beloftes en had keiharde verantwoordelijkheid nodig voor de cijfers. De stok achter de deur resulteerde direct in een volle agenda en 15 startende leden.', videoId: 'Lf0IVAiILrk' },
    { name: 'Daniëlle Sabajo', result: '35 leden in 2 maanden tijd', objection: 'Had passie voor haar vak, maar worstelde met administratie en chaos in de leadopvolging. Besloot het uit handen te geven en zag direct 35 leden starten.', videoId: '38VjOUsOhz4' },
    { name: 'Jan Donker', result: '30 leden in 2 maanden tijd', objection: 'Werd gek van papieren chaos rondom nieuwe leads. Durfde uitsluitend te starten op de nieuwe resultaatgarantie en haalde 10x zijn complete investering terug aan nieuwe leden.', videoId: 'BbCw16hxhbo' },
    { name: 'Emmy van Erp', result: '15 leden in 1 maand tijd', objection: 'Hadden een prachtig concept in de markt staan, maar geen vaardigheid om de constante ledenstroom zelf op te vangen. Met de nieuwe systemen converteerden ze in de eerste maand direct 15 leden.', videoId: 'EsqOf51DvJ0' }
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

            <div ref={containerRef} className="bg-dark min-h-screen pt-32 pb-24 font-sans text-primary relative overflow-hidden">

                {/* Background glow using accent color */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none z-0"></div>

                <section className="relative z-10 w-full px-6 md:px-12 flex flex-col items-center text-center mb-16 md:mb-24">
                    <div className="max-w-3xl mx-auto flex flex-col items-center">
                        <h1 ref={addToRefs} className="font-heading font-bold text-4xl md:text-5xl lg:text-7xl tracking-tighter leading-[1.1] mb-6">
                            Yes! Je gesprek staat <br />
                            <span className="font-drama italic text-accent pr-3">ingepland</span> 💪
                        </h1>

                        <p ref={addToRefs} className="text-primary/70 text-base md:text-xl max-w-2xl leading-relaxed mb-12">
                            Terwijl je wacht op ons gesprek... Ontdek hier hoe we de afgelopen maanden landelijk al succesvolle gyms wisten te transformeren. We hebben alvast een paar ervaringen voor je op een rijtje gezet.
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
                                className="bg-white rounded-[1.5rem] border border-primary/10 shadow-lg group hover:border-primary/20 transition-colors duration-300 flex flex-col h-full p-2 md:p-3"
                            >
                                {/* 16:9 Embedded YouTube Video */}
                                <div className="relative shrink-0 w-full aspect-video bg-dark rounded-xl overflow-hidden">
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

                                {/* Content below video - matching SocialProof.jsx exactly */}
                                <div className="p-4 pt-5 bg-white flex-1 flex flex-col">
                                    <p className="font-heading font-semibold text-accent text-lg md:text-xl mb-1 tracking-wide">{item.result}</p>
                                    <p className="font-sans font-medium text-sm text-primary/70 uppercase tracking-widest mb-3">{item.name}</p>
                                    <div className="h-px w-full bg-primary/10 mb-3"></div>
                                    <p className="font-sans text-sm text-primary/70 italic leading-relaxed flex-1">
                                        {item.objection}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Google Reviews Sectie (Re-using Existing Component) */}
                <div className="mt-20">
                    <GoogleReviews />
                </div>
            </div>
        </>
    );
};

export default ThankYou;
