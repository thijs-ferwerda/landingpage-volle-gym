import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reviews = [
    // --- TOP 6 HANDPICKED ---
    {
        "author": "Dominique van Do's Gym",
        "date": "3 weken geleden",
        "text": "VolleGym is een top partij. Het 3 maanden Gym Leaders Programma was helder opgebouwd, met goede tools en begeleiding die je direct kunt toepassen in je gym. Communicatie was snel en prettig. Wij zijn zeer tevreden."
    },
    {
        "author": "Mike",
        "date": "2 maanden geleden",
        "text": "Je betaald bij volle gym niet voor het verzamelen van Leads. Je wordt uitgebreid begeleid om er voor te zorgen dat deze mensen ook daadwerkelijk bij jou van start gaan en langdurig lid blijven. Dit heeft mijn bedrijf een goede boost gegeven."
    },
    {
        "author": "Kelt Jager",
        "date": "5 maanden geleden",
        "text": "Veel marketing agency's versleten de afgelopen tijd. Volle gym is tot nu toe met afstand de beste! De manier van werken en de systemen die ze hebben gebouwd zijn top! Zeker een aanrader",
        "profile_photo": "https://lh3.googleusercontent.com/a-/ALV-UjVbt_MWCcpdUDOPjyBv8O1poTQgal9Ep7-FBtw9osaftSVFE05J=w144-h144-p-rp-mo-br100"
    },
    {
        "author": "Sanne Hendriks",
        "date": "5 maanden geleden",
        "text": "Super goed geholpen door Bas en Bart! Deze jongens weten precies wat ze doen. Mijn gestelde doel binnen een maand behaald terwijl er 3 maanden voor stond. Bas en Bart weten precies waar ze het over hebben, denken en kijken graag met je mee."
    },
    {
        "author": "Danielle Sabajo",
        "date": "6 maanden geleden",
        "text": "Super tevreden hoe Bas en Bart heel professioneel te werk gaan. Door onze samenwerking hebben wij weer volle lessen. Werken met volle gym is echt een aanrader. Ze doen precies wat ze beloven. 💪 Enthusiaste groet, Danielle",
        "profile_photo": "https://lh3.googleusercontent.com/a-/ALV-UjWslzeCT1gLSsrSTEwa1jq-NIDT67cu2NmkIJ4ynvWtIEB7_OI=w144-h144-p-rp-mo-br100"
    },
    {
        "author": "Tim Hortensius",
        "date": "11 maanden geleden",
        "text": "Wij hebben met volle tevredenheid samengewerkt met Volle Gym. Als boutique gym, gespecialiseerd in kleine groepslessen, waren we op zoek naar effectieve manieren om onze zichtbaarheid te vergroten. Dankzij de marketingcampagnes van Volle Gym hebben we in slechts twee maanden maar liefst 20 nieuwe leden mogen verwelkomen. Kortom, een absolute aanrader!"
    },
    // --- CHRONOLOGICAL REST ---
    {
        "author": "Hugo Le Jollec",
        "date": "2 maanden geleden",
        "text": "Ik werk inmiddels iets meer dan twee maanden samen met de mannen van Volle Gym, en ik kan oprecht zeggen dat dit één van de beste beslissingen is geweest voor mijn bedrijf. Na meerdere slechte ervaringen met marketingbureaus was ik eerlijk gezegd sceptisch. Mooie beloftes, weinig resultaat – ik had het allemaal al eens meegemaakt. Maar Bas en Bart van Volle Gym laten vanaf dag één zien dat zij het anders aanpakken. Ze leveren niet alleen leads, maar geven je ook de tools en het systeem om daar echt klanten van te maken. Ze leren je precies hoe je leads moet opvolgen, zodat je het maximale uit elke kans haalt."
    },
    {
        "author": "Max Van der Meer",
        "date": "2 maanden geleden",
        "text": "Hele fijne samenwerking met Volle Gym. Heb met verschillende ''lead-partijen'' samengewerkt. Maar met Volle Gym merk ik pas écht verschil. Heel professioneel, fijne systemen, goede begeleiding en helpende coaching wat het verschil maakt. Een echte aanrader als je de volgende stap wilt zetten met je Gym!",
        "profile_photo": "https://lh3.googleusercontent.com/a-/ALV-UjU2zXgmMVuNbQaNLlkGAqRqYM4rQeFsHsvqko3RXwM6O4CAB8GB=s128-c0x00000000-cc-rp-mo"
    },
    {
        "author": "Murat Son",
        "date": "10 maanden geleden",
        "text": "Sinds ik met Bart en Bas van Volle Gym samenwerk, is mijn club echt gaan groeiend. Waar ik eerder vastliep in het aantrekken van nieuwe klanten hebben zij mij geholpen om opnieuw en anders naar mijn bedrijf te kijken. Niet alleen met praktische strategieën, maar ook met een heldere structuur en begeleiding die precies aansluit bij wie ik ben en waar ik voor sta. Wat ik enorm waardeer, is dat hun werkwijze niet voelt als een standaard stappenplan. Ze kijken echt naar jou als persoon, staan voor je klaar, naar je bedrijf, je missie en je waarden. Ze stellen goede en kritische vragen en komen met een gerichte oplossing.",
        "profile_photo": "https://lh3.googleusercontent.com/a-/ALV-UjX2-DTB_ey2gSX9evadOMIAWHl8XfFPjgjY3wo70FwlKlegYYmn=s128-c-rp-mo-ba2-br100"
    },
    {
        "author": "Tommy Eichelsheim",
        "date": "1 dag geleden",
        "text": "Top begeleiding en resultaten behaald. De heren van Volle Gym hebben mij goed geholpen."
    },
    {
        "author": "J E",
        "date": "een maand geleden",
        "text": "Top top veel eerder moeten doen super begeleiding!"
    },
    {
        "author": "S Nicolas",
        "date": "een maand geleden",
        "text": "Ze gaan een stapje verder"
    },
    {
        "author": "Kevin Visser",
        "date": "2 maanden geleden",
        "text": "Wat een verademing vergeleken met alle andere marketing agency's. Bas en Bart denken strategisch mee op een niveau dat ik zelden zie. Absolute aanrader voor elke gym."
    },
    {
        "author": "Niels Bakker",
        "date": "4 maanden geleden",
        "text": "Stuk voor stuk vakmensen. We hebben onze capaciteit moeten uitbreiden omdat we de aanvoer van leads bijna niet meer aankonden. Dikke prima."
    },
    {
        "author": "Michel Dekker",
        "date": "6 maanden geleden",
        "text": "Fijne en prettige samenwerking.",
        "profile_photo": "https://lh3.googleusercontent.com/a-/ALV-UjUURq0o-WQOus1TNQfZEkA3TBin7kO3W55BA1v098ZwquvVldk=w144-h144-p-rp-mo-br100"
    },
    {
        "author": "Mauricio Franklin",
        "date": "6 maanden geleden",
        "text": "Echt topwerk van Volle Gym. Sinds wij met hen samenwerken voor onze marketing en leadgeneratie, is er een significante stroom aan nieuwe aanmeldingen binnengekomen.",
        "profile_photo": "https://lh3.googleusercontent.com/a-/ALV-UjVlC4eD6B1LtvIJnqIqyRj5zLif8Lv7SdstA1u6fsSfZZTzwV7D=w144-h144-p-rp-mo-br100"
    },
    {
        "author": "Radjin Pitai",
        "date": "9 maanden geleden",
        "text": "Vollegym heeft verstand van zaken. Goede, betrouwbare jongens die altijd klaar staan en die willen dat je slaagt en je daarin ook heel goed begeleiden. Blij dat ze me helpen.",
        "profile_photo": "https://lh3.googleusercontent.com/a-/ALV-UjWK_si852_JrmNjiERE1_Y6OCj_53pB3qG6aTCbTPfLMPml9Us=w144-h144-p-rp-mo-br100"
    },
    {
        "author": "Bodywork Sportstudio Roermond",
        "date": "9 maanden geleden",
        "text": "Hartelijk dank voor jullie hulp 😄 nieuwe leden na een kortlopende campagne. Goede communicatie en komen hun afspraken na . Dankjewel 🙏",
        "profile_photo": "https://lh3.googleusercontent.com/a-/ALV-UjUtr9aBkNn4t7VGWL8Euk9916eoiGtScxy-gRd0cKEgM38fysUB=w144-h144-p-rp-mo-br100"
    },
    {
        "author": "Lars Ubachs",
        "date": "11 maanden geleden",
        "text": "Bas en Bart hebben ons letterlijk gebracht waar wij naar opzoek waren. Ik ben heel tevreden en zal het elke fitness ondernemer die zoekende is met zijn marketing zeker aanraden",
        "profile_photo": "https://lh3.googleusercontent.com/a-/ALV-UjX2GxR3-hha_ojA1aXk34G-td_VUl6ZxB6jXsTqE_Q4Fm2xI44=w144-h144-p-rp-mo-br100"
    },
    {
        "author": "Circles Waalre",
        "date": "11 maanden geleden",
        "text": "Opzoek naar een fitness marketing bureau? Dan ben je op de juiste adres bij Volle Gym, binnen een paar maanden hebben wij onze doel behaald! Hartelijk bedankt voor de samenwerking jongens van de Volle Gym!",
        "profile_photo": "https://lh3.googleusercontent.com/a-/ALV-UjUsjZz5qLlZ-BVl6Ejao50MrnXY_01sr918jmoOECc_fFUunt9J=w144-h144-p-rp-mo-br100"
    }
];

const GoogleReviews = () => {
    const containerRef = useRef(null);
    const reviewsRef = useRef([]);
    const [visibleCount, setVisibleCount] = useState(6);
    const [displayReviews, setDisplayReviews] = useState(reviews);
    const [stats, setStats] = useState({ rating: 5.0, count: 21 });

    useEffect(() => {
        const fetchLiveReviews = async () => {
            try {
                const response = await fetch('/api/reviews');
                if (response.ok) {
                    const data = await response.json();
                    if (data && data.result) {
                        setStats({
                            rating: data.result.rating || 5.0,
                            count: data.result.user_ratings_total || 21
                        });

                        if (data.result.reviews && data.result.reviews.length > 0) {
                            // Map live reviews to our format
                            const liveReviews = data.result.reviews.map(r => {
                                // Prefer our hardcoded static profile photo if the API returns a generic letter avatar
                                const staticMatch = reviews.find(sr => sr.author === r.author_name);
                                const photoToUse = (staticMatch && staticMatch.profile_photo) ? staticMatch.profile_photo : r.profile_photo_url;

                                return {
                                    author: r.author_name,
                                    date: r.relative_time_description,
                                    text: r.text,
                                    profile_photo: photoToUse,
                                    rating: r.rating
                                };
                            }).filter(r => r.text); // Only keep reviews with text

                            // Keep the first 6 handpicked static reviews fully locked at the top
                            const top6Static = reviews.slice(0, 6);
                            const top6Names = top6Static.map(r => r.author);

                            // The live reviews that are NOT already in the top 6
                            const liveExclusive = liveReviews.filter(r => !top6Names.includes(r.author));

                            // Start by placing the Top 6 at the very front
                            const combined = [...top6Static, ...liveExclusive];

                            // Fill the rest with the remaining static reviews, filtering out duplicates
                            const combinedAuthorNames = combined.map(r => r.author);
                            reviews.slice(6).forEach(staticReview => {
                                if (!combinedAuthorNames.includes(staticReview.author) && combined.length < reviews.length) {
                                    combined.push(staticReview);
                                }
                            });

                            setDisplayReviews(combined);
                        }
                    }
                }
            } catch (error) {
                console.error("Failed to load live reviews", error);
            }
        };
        fetchLiveReviews();
    }, []);

    const addToRefs = (el) => {
        if (el && !reviewsRef.current.includes(el)) {
            reviewsRef.current.push(el);
        }
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                reviewsRef.current.slice(0, visibleCount),
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 80%',
                    }
                }
            );
        }, [visibleCount, displayReviews]);
        return () => ctx.revert();
    }, [visibleCount, displayReviews]);

    const handleLoadMore = () => {
        setVisibleCount(prev => Math.min(prev + 6, displayReviews.length));
    };

    return (
        <section ref={containerRef} id="ervaringen" className="py-24 bg-white relative border-t border-primary/5">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
                    <div className="flex items-center gap-6">
                        {/* Google G Logo icon */}
                        <div className="w-16 h-16 rounded-full bg-background flex items-center justify-center shadow-sm shrink-0 border border-primary/10">
                            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="font-heading font-bold text-2xl md:text-3xl text-primary tracking-tight mb-2">Google Reviews</h2>
                            <div className="flex items-center gap-3">
                                <span className="font-bold text-xl">{stats.rating.toFixed(1)}</span>
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <svg key={star} className="w-5 h-5 text-[#FABB05]" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <span className="font-sans text-sm text-primary/60">({stats.count} reviews)</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="columns-1 md:columns-2 lg:columns-3 gap-8 mb-12">
                    {displayReviews.slice(0, visibleCount).map((review, idx) => (
                        <div ref={addToRefs} key={idx} className="break-inside-avoid mb-8 bg-background border border-primary/5 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300 flex flex-col h-auto">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    {review.profile_photo ? (
                                        <img src={review.profile_photo} alt={review.author} className="w-10 h-10 rounded-full object-cover shadow-sm bg-primary/5" loading="lazy" />
                                    ) : (
                                        <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg shadow-sm">
                                            {review.author.charAt(0)}
                                        </div>
                                    )}
                                    <div>
                                        <p className="font-heading font-semibold text-primary">{review.author}</p>
                                        <p className="font-sans text-xs text-primary/50">{review.date}</p>
                                    </div>
                                </div>
                                <svg className="w-5 h-5 text-[#4285F4]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-1.41l5.59-5.59-1.41-1.41L11 12.17l-1.88-1.88-1.41 1.41L11 16.5z" /></svg>
                            </div>
                            <div className="flex gap-1 mb-4">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <svg key={star} className={`w-4 h-4 ${star <= (review.rating || 5) ? 'text-[#FABB05]' : 'text-primary/20'}`} fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <p className="font-sans text-primary/70 leading-relaxed text-sm mt-auto break-words">
                                "{review.text}"
                            </p>
                        </div>
                    ))}
                </div>

                {visibleCount < displayReviews.length && (
                    <div className="flex justify-center">
                        <button
                            onClick={handleLoadMore}
                            className="bg-transparent border border-primary/20 text-primary hover:bg-primary/5 transition-colors px-8 py-3 rounded-full text-sm font-bold tracking-wide uppercase inline-flex items-center gap-2"
                        >
                            Meer reviews inladen
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default GoogleReviews;
