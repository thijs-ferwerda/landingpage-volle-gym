import React, { useRef } from 'react';

// You can easily replace the 'videoId' with the actual YouTube video ID from Volle Gym
// Example: If link is https://www.youtube.com/watch?v=dQw4w9WgXcQ, the ID is dQw4w9WgXcQ
const youtubeData = [
    { name: 'Murat Son', result: '72 leden in 3 maanden tijd', objection: '"Waar ik eerder vastliep, hebben zij een heldere structuur die precies aansluit bij wie ik ben."', videoId: 'KxT9StIlyeg' },
    { name: 'Hugo Le Jollec', result: '35 Leden in 2 maanden tijd', objection: '"Na meerdere slechte ervaringen met marketingbureaus was ik sceptisch. Mooie beloftes, weinig resultaat."', videoId: 'b4-jNpoxvwc' },
    { name: 'Sanne Hendriks', result: '20 leden in 1 week tijd', objection: '"Er kwamen veel leads binnen, maar dat waren vooral loze leads. Je houdt er dan maar een klein aantal over."', videoId: '_ERwMRB4pgE' },
    { name: 'Michel Dekker', result: '45 leden in 3 maanden tijd', objection: '"De leads die ik uithaalde vond ik niet genoeg. En de accountmanager wijzigde telkens."', videoId: 'hAj5OnZTSo4' },
    { name: 'Casper Hazeveld', result: '35 leden in 1 maand tijd', objection: '"Voorheen hebben we van alles geprobeerd, maar zonder de gewenste call-to-action."', videoId: 'xnhQBTBJPek' },
    { name: 'Benjamin van Keulen', result: '28 leden in 1 maand tijd', objection: '"Je stopt er €1000 in en er komt nog niet €1000 uit. Dan was ik wel klaar met marketinglui."', videoId: 'Qjc8I01bZE8' },
    { name: 'Radjin Pitai', result: '25 leden in 1 maand tijd', objection: '"In het verleden zijn je al gouden bergen beloofd, wat niks opleverde. Ik wilde bijna weer voor een baas werken."', videoId: 'O_OFRYE3omQ' },
    { name: 'Mauricio Franklin', result: '20 leden in 1 maand tijd', objection: '"In het verleden kreeg je altijd koude leads en moest je zelf maar uitzoeken hoe je die moest converteren."', videoId: 'SpJ5KgQa9Ww' },
    { name: 'Melissa Pach', result: '20 leden in 1 maand tijd', objection: '"Ik zat financieel echt in de problemen en draaide verlies. Dat was geen fijn gevoel."', videoId: 'QIEOwUDPo5E' },
    { name: 'Ulrich Heidstra', result: '15 leden in 1 maand tijd', objection: '"Ik was in het begin heel sceptisch omdat je zoveel partijen voorbijkomen met mooie beloftes."', videoId: 'Lf0IVAiILrk' },
    { name: 'Mike Bosselaar', result: '25 leden in 5 weken tijd', objection: '"Andere partijen boden wel leads, maar er was helemaal geen plan. Daardoor lekte er veel budget weg."', videoId: 'PcUTF1gOYNs' },
    { name: 'Daniëlle Sabajo', result: '20 leden in 6 weken tijd', objection: '"Jullie verzekerden me van volle lessen. Ik heb het aan jullie overgelaten en dat is gelukt."', videoId: '38VjOUsOhz4' },
    { name: 'Emmy van Erp', result: '35 leden in 2 maanden tijd', objection: '"We hadden zelf weinig tijd om de nieuwe leden te werven. Jullie hebben ons daar goed bij geholpen."', videoId: 'EsqOf51DvJ0' },
    { name: 'Jan Donker', result: '30 leden in 2 maanden tijd', objection: '"Jullie zijn de enige partij die mij 100% no-cure-no-pay heeft aangeboden. Daar had ik volle vertrouwen in."', videoId: 'BbCw16hxhbo' }
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
                        <div className="p-6">
                            <p className="font-heading font-semibold text-accent text-lg md:text-xl mb-1 tracking-wide">{item.result}</p>
                            <p className="font-sans font-medium text-sm text-primary/70 uppercase tracking-widest mb-3">{item.name}</p>
                            <div className="h-px w-full bg-primary/10 mb-3"></div>
                            <p className="font-sans text-sm text-primary/60 italic leading-relaxed">
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
