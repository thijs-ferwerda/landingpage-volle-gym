import React, { useEffect } from 'react';

const Sorry = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <section className="min-h-screen bg-white flex flex-col justify-between items-center relative z-10 w-full pt-32 pb-8 px-6">

            <div className="max-w-3xl w-full mx-auto text-center flex-grow flex flex-col justify-center items-center">
                <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-5xl text-[#0A0A0A] tracking-tight mb-12">
                    Bedankt voor het invullen.
                </h1>

                <div className="space-y-6 font-sans text-[#333333] text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
                    <p>
                        Op basis van je antwoorden lijkt het er op dat we geen match zijn.
                    </p>
                    <p>
                        Wij werken alleen met sportscholen die bereid zijn om onze aanpak volledig te implementeren en consistent uit te voeren.
                    </p>
                    <p>
                        Dat is essentieel om resultaat te garanderen.
                    </p>
                    <p>
                        Mocht je situatie in de toekomst veranderen, dan kun je altijd opnieuw instappen.
                    </p>
                    <p className="font-medium pt-4">
                        Succes verder.
                    </p>
                </div>
            </div>

            <div className="w-full text-center pt-16 pb-4 mt-auto">
                <p className="text-[#888888] text-sm">
                    Copyright 2026. Volle Gym Consulting.
                </p>
            </div>
        </section>
    );
};

export default Sorry;
