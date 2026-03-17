import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, AlertTriangle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const VoorJeSolliciteertHQ = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="bg-background min-h-screen pt-32 pb-24 relative z-10 overflow-hidden">
            <Helmet>
                <title>Lees dit voordat je solliciteert | Volle Gym HQ</title>
                <meta name="description" content="Lees dit voordat je solliciteert bij Volle Gym HQ." />
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>

            {/* Background elements */}
            <div className="absolute top-0 right-0 w-full h-[80vh] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-20">
                <div className="max-w-3xl mx-auto">
                    {/* Header */}
                    <div className="mb-10">
                        <h1 className="font-heading font-bold text-4xl md:text-5xl text-primary tracking-tighter leading-[1.1] mb-4">
                            Neem deze pagina door voordat je solliciteert, alsjeblieft.
                        </h1>
                        <p className="font-sans font-medium text-lg md:text-xl text-neutral-400">
                            Bas, Founder van Volle Gym
                        </p>
                    </div>

                    {/* Content Blocks */}
                    <div className="space-y-6 mb-16 font-sans text-primary">
                        <p className="text-lg leading-relaxed">
                            Op sociale media doe ik mijn best om een reëel beeld te schetsen van Volle Gym. Maar al doe ik mijn best om het 1:1 overeen te laten komen met wat hier daadwerkelijk gebeurt, het blijven toch vaak de hoogtepunten die de "feed" bereiken. Wat je niet zo vaak ziet, is dat er aan de achterkant dagelijks door inmiddels tientallen mensen alles op alles wordt gezet om de kwalitatieve fitnessbranche naar een ongekend niveau te tillen.
                        </p>
                        <p className="text-lg leading-relaxed">
                            Volle Gym heeft één geheim, en dat zijn deze mensen die dat werk verzetten. De mensen die hier werken, zijn ongelooflijk getalenteerd, hardwerkend en creatief. Over de jaren heen heb ik gemerkt dat onze beste mensen een diepe voldoening halen uit hun werk, exceptioneel goed doen: perfectie nastreven in hun werk, vereenvoudigen en nauw samenwerken met andere getalenteerde mensen. Ik geloof erin dat een heel team van deze mensen de impact heeft om de branche positief te veranderen. Mijn hoofdtaak is het bouwen, inspireren en leiden van dit team. Naast dat we idealistisch zijn, zijn we ook serieus. Dat klinkt niet zo leuk, maar in de praktijk geeft serieus zijn meer voldoening en zingeving dan plezier najagen op de korte termijn. We spenderen namelijk onze meest waardevolle jaren aan dit werk. Ons werk helpt dagelijks duizenden mensen in het veld. Dit is belangrijk werk. Dus we kunnen er net zo goed gewoon helemaal voor gaan! :)
                        </p>

                        <h2 className="font-heading font-bold text-2xl mt-12 mb-4">Voordat je solliciteert, is het goed dat je weet hoe we werken</h2>
                        <p className="text-lg leading-relaxed">
                            Bij Volle Gym vormen we geen familie. Bedrijven die dit wel tegen je zeggen, vertellen je wat mij betreft niet de waarheid. Zie Volle Gym eerder als een toegewijd topsportteam dat vastberaden is om de allerbeste te worden. Je komt hier werken omdat je plezier haalt uit je beste werk doen.
                        </p>

                        <h2 className="font-heading font-bold text-2xl mt-12 mb-4">Wat we bieden</h2>
                        <p className="text-lg leading-relaxed">
                            Bij Volle Gym investeren we veel in het team. Vooral in de vorm van werkomgeving. Werkomgeving is alles, en hét verschil tussen geluk en ongeluk. We werken vanuit ons kantoor in hartje Amsterdam, op de Keizersgracht, inclusief een eigen kleine sportschool. Een aantal dagen per week komen we hier samen om ervoor te zorgen dat we de omgeving creëren waarin getalenteerde mensen ook daadwerkelijk floreren. Die omgeving bouwen we heel bewust, zodat alles optimaal werkt voor resultaten. Verder bieden we nog:
                        </p>
                        <ul className="list-disc pl-6 text-lg leading-relaxed space-y-2">
                            <li>Een goed salaris (staat per vacature aangegeven);</li>
                            <li>Kantoor op de Keizersgracht in Amsterdam met eigen gym en sportfaciliteiten;</li>
                            <li>We starten altijd met een contract van 7 maanden, inclusief 1 maand proeftijd. Daarna evalueren we prestaties en potentie. Bij Volle Gym kan je snel stappen maken, mits je verantwoordelijkheid neemt, resultaat levert en blijft leren. Groei is hier geen belofte, maar een mogelijkheid die je zelf waarmaakt.</li>
                        </ul>
                        <p className="text-lg leading-relaxed mt-4">
                            We zijn een gedreven team, elk persoon draagt enorme verantwoordelijkheid en eigendom voor zijn of haar beslissingen.
                        </p>

                        <h2 className="font-heading font-bold text-2xl mt-12 mb-4">Wat we zoeken</h2>
                        <p className="text-lg leading-relaxed">
                            Zoals eerder al benoemd, we zijn op zoek naar passie, creativiteit en inzet. Een paar eigenschappen die we waarderen zijn:
                        </p>
                        <ul className="list-disc pl-6 text-lg leading-relaxed space-y-2">
                            <li>Je zegt wat je denkt;</li>
                            <li>Je kan heel veel informatie verwerken, ordenen en de juiste beslissingen nemen;</li>
                            <li>Je draagt bij aan discussies en komt met inbreng;</li>
                            <li>Je communiceert snel, helder en direct;</li>
                            <li>Je werkt goed in teams en betrekt niet steeds alles op jezelf.</li>
                        </ul>

                        <h2 className="font-heading font-bold text-2xl mt-12 mb-4">Waar we waarde aan hechten</h2>
                        <ul className="list-none text-lg leading-relaxed space-y-4">
                            <li><strong>Nadenken.</strong> We nemen niet zomaar andermans overtuiging aan of idee over. Door zelf vanuit logica te redeneren kom je verder.</li>
                            <li><strong>Nee.</strong> Bij Volle Gym zeggen we vaak nee. Het bedrijf kan alle kanten op, iedereen wil wat van ons. Het is dus essentieel om vaak en luid “nee” te verkondigen. “Nee, dat doen we niet”, heerlijk!</li>
                            <li><strong>Individualiteit.</strong> Bij Volle Gym vormen we geen groepjes. Je wordt hier niet afgerekend op hoe sociaal vaardig je bent. Roddelen wordt de kop ingedrukt. We zijn hier om samen te presteren, en jij bent hier om je beste werk te doen. Zorg voor jezelf, zodat niemand anders dat hoeft te doen.</li>
                            <li><strong>Waarheid.</strong> De objectieve waarheid, wat echt is, daar kan niemand omheen.</li>
                        </ul>

                        <h2 className="font-heading font-bold text-2xl mt-12 mb-4">Waar we geen waarde aan hechten</h2>
                        <ul className="list-none text-lg leading-relaxed space-y-4">
                            <li><strong>Formele communicatie.</strong> Communicatie intern is vaak spontaan, en soms ook een beetje ongestructureerd. En dat is prima. Liever dat, dan dat mensen gaan letten op hun woorden. Mensen zijn van nature niet formeel of professioneel. En goede ideeën ontstaan vaak niet zonder dat mensen zeggen wat ze echt denken of openlijk met hun gedachten durven te spelen.</li>
                            <li><strong>Agenda's.</strong> We hebben relatief weinig vaste vergaderingen, en veel mensen hebben lucht in hun agenda's. Ik heb zelf als regel dat ik het niet inplan als ik het niet kan onthouden. Wil je met iemand overleggen? Loop naar diegene toe en loop samen een rondje. Niet alles hoeft een officiële uitnodiging te zijn en je hebt hier niet zomaar recht op andermans tijd omdat je het "inschiet".</li>
                            <li><strong>Je hand vasthouden.</strong> Als je begint bij Volle Gym kun je weinig sturing verwachten vanuit ons. Je krijgt je verantwoordelijkheden en maandoelen. Haal je die? Dan kunnen we door. Gooi je er met de pet naar? Dan niet. We merken dat de beste mensen zonder uitzondering altijd hun eigen weg vinden of tijdig aangeven dat ze er niet uit komen.</li>
                        </ul>

                        <p className="text-lg leading-relaxed mb-12">
                            Om onze doelen te behalen, zijn we op zoek naar de meest getalenteerde mensen van Nederland die zich volledig willen inzetten voor kwalitatieve fitness. Ben jij dit? En heb je alles gelezen? Solliciteer dan.
                        </p>
                    </div>

                    {/* CTA */}
                    <div className="text-left md:text-center pb-12 border-t border-neutral-200 pt-16">
                        <Link
                            to={`/solliciteren-hq`}
                            className="bg-black text-white px-12 py-5 text-xl font-medium hover:bg-black/80 transition-colors inline-block"
                        >
                            Solliciteer nu
                        </Link>
                    </div>

                </div>
            </div>
        </main>
    );
};

export default VoorJeSolliciteertHQ;
