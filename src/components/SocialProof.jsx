import React, { useRef } from 'react';

// You can easily replace the 'videoId' with the actual YouTube video ID from Volle Gym
// Example: If link is https://www.youtube.com/watch?v=dQw4w9WgXcQ, the ID is dQw4w9WgXcQ
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
    { name: 'Jan Donker', result: '30 leden in 2 maanden tijd', objection: 'Werd gek van papieren chaos rondom nieuwe leads. Durfde uitsluitend te starten op de no-cure-no-pay garantie en haalde 10x zijn complete investering terug aan nieuwe leden.', videoId: 'BbCw16hxhbo' },
    { name: 'Emmy van Erp', result: '15 leden in 1 maand tijd', objection: 'Hadden een prachtig concept in de markt staan, maar geen vaardigheid om de constante ledenstroom zelf op te vangen. Met de nieuwe systemen converteerden ze in de eerste maand direct 15 leden.', videoId: 'EsqOf51DvJ0' }
];

const SocialProof = () => {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            const scrollAmount = direction === 'left' ? -400 : 400;
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <section id="resultaten" className="py-24 bg-dark overflow-hidden relative border-y border-primary/10">
            {/* Decorative Overlay */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-dark to-transparent z-10 pointer-events-none hidden md:block" />
            <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-dark to-transparent z-10 pointer-events-none hidden md:block" />

            <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-20">
                <div>
                    <h2 className="font-heading font-bold text-3xl md:text-5xl text-primary mb-4 tracking-tight">Echte resultaten.</h2>
                    <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block"></span>
                        <span className="font-data text-primary/60 text-xs uppercase tracking-widest">Bekijk de interviews</span>
                    </div>
                </div>

                <div className="flex gap-4">
                    <button onClick={() => scroll('left')} className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center text-primary hover:bg-primary/5 hover:border-accent transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <button onClick={() => scroll('right')} className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center text-primary hover:bg-primary/5 hover:border-accent transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                    </button>
                </div>
            </div>

            {/* Horizontal Scroll Container for YouTube Videos */}
            <div
                ref={scrollRef}
                className="flex overflow-x-auto snap-x snap-mandatory gap-6 px-6 md:px-12 pb-8 hide-scrollbar relative z-20"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                <style dangerouslySetInnerHTML={{
                    __html: `
                  .hide-scrollbar::-webkit-scrollbar { display: none; }
                `}} />

                {youtubeData.map((item, index) => (
                    <div
                        key={index}
                        className="flex-shrink-0 w-[300px] md:w-[400px] bg-background rounded-2xl border border-primary/10 overflow-hidden snap-center shadow-lg group hover:border-primary/20 transition-colors duration-300"
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
                            ></iframe>
                        </div>

                        {/* Content below video */}
                        <div className="p-6 bg-white h-full">
                            <p className="font-heading font-semibold text-accent text-lg md:text-xl mb-1 tracking-wide">{item.result}</p>
                            <p className="font-sans font-medium text-sm text-primary/70 uppercase tracking-widest mb-3">{item.name}</p>
                            <div className="h-px w-full bg-primary/10 mb-3"></div>
                            <p className="font-sans text-sm text-primary/70 italic leading-relaxed">
                                {item.objection}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default SocialProof;
