import React, { useEffect } from 'react';

const PrivacyPolicy = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <section className="min-h-screen pt-32 pb-24 px-6 bg-background flex flex-col items-center relative z-10 w-full">
            <div className="max-w-4xl w-full mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-primary/10">
                <h1 className="font-heading font-bold text-3xl md:text-4xl text-primary mb-4">Privacyverklaring</h1>
                <p className="text-primary/60 mb-8">Versie: 04-04-2026</p>

                <div className="prose prose-lg text-primary/80 max-w-none space-y-6">
                    <p>In deze privacyverklaring informeren wij je hoe wij omgaan met jouw persoonsgegevens.</p>

                    <h2 className="text-xl font-bold text-primary mt-10">Welke persoonsgegevens verwerken wij?</h2>
                    <ul className="list-disc pl-6">
                        <li>basisinformatie zoals voornaam, achternaam en geslacht;</li>
                        <li>contactgegevens;</li>
                        <li>bedrijfsgegevens;</li>
                        <li>financiële gegevens, zoals bankrekeningnummer, KvK-nummer en btw-nummer;</li>
                        <li>tech-info, zoals IP-adres, device en paginabezoek;</li>
                        <li>gegevens over toegang tot externe platforms en systemen voor implementatie;</li>
                        <li>ledengegevens van jouw sportschool die nodig zijn voor de uitvoering van het groeitraject;</li>
                        <li>sociale media accountgegevens;</li>
                        <li>foto's en video's, waaronder materiaal geproduceerd tijdens contentdraaidagen;</li>
                        <li>opnames van beeldgesprekken via online communicatie- en samenwerkingsplatformen;</li>
                        <li>gegevens uit CRM-systemen (waaronder GoHighLevel), advertentieplatformen en sales funnels;</li>
                        <li>automatiseringsgegevens en datastromen;</li>
                        <li>alle overige persoonsgegevens die wij van of over je krijgen voor onze werkzaamheden.</li>
                    </ul>

                    <h2 className="text-xl font-bold text-primary mt-10">Waarvoor verwerken wij persoonsgegevens?</h2>
                    <ul className="list-disc pl-6">
                        <li>voor de uitvoering van jouw groeitraject;</li>
                        <li>voor het opzetten en beheren van Meta Ads campagnes;</li>
                        <li>voor de configuratie en integratie van externe platforms (GoHighLevel, Stripe, Meta);</li>
                        <li>voor contact en projectcommunicatie;</li>
                        <li>voor de boekhouding, facturering en incasso;</li>
                        <li>voor naleving van wet- en regelgeving;</li>
                        <li>voor het analyseren en verbeteren van onze dienstverlening en website;</li>
                        <li>voor het onderhouden en uitbreiden van onze relaties;</li>
                        <li>voor marketing en business development;</li>
                        <li>voor het ontwikkelen en optimaliseren van onze systemen en processen;</li>
                        <li>voor het verlenen van toegang tot ons leerportaal, CRM-systeem en dashboards;</li>
                        <li>voor het genereren van statistieken en rapportages;</li>
                        <li>voor registraties, opname, delen en opslag van video-bijeenkomsten en coachingcalls;</li>
                        <li>voor testimonials, casestudies en reviews;</li>
                        <li>voor commerciële activiteiten, uitnodigingen en andere communicatie die vanuit onze visie voor jou van belang kan zijn;</li>
                        <li>voor behandeling van sollicitaties en samenwerkingen;</li>
                        <li>voor ondersteuning door externe specialisten waar nodig.</li>
                    </ul>

                    <h2 className="text-xl font-bold text-primary mt-10">Op welke gronden verwerken wij persoonsgegevens?</h2>
                    <p>Volgens de rechtsgronden uit de AVG: voor de uitvoering van onze overeenkomsten, om te voldoen aan wettelijke verplichtingen, op basis van jouw toestemming of vanwege gerechtvaardigd belang.</p>

                    <h2 className="text-xl font-bold text-primary mt-10">Hoe lang bewaren wij persoonsgegevens?</h2>
                    <p>De persoonsgegevens bewaren wij niet langer dan noodzakelijk is voor het bereiken van de hiervoor genoemde doelen of om aan wet- en regelgeving te voldoen.</p>
                    <p>Financiële gegevens zoals facturen, betalingen en boekhoudkundige informatie bewaren wij 7 jaar om te voldoen aan fiscale verplichtingen.</p>

                    <h2 className="text-xl font-bold text-primary mt-10">Hoe beveiligen wij persoonsgegevens?</h2>
                    <p>Wij hebben maatregelen genomen om persoonsgegevens te beveiligen, zowel technisch als organisatorisch.</p>
                    <p>Heb je daar vragen over of heb je aanwijzingen van mogelijk misbruik van gegevens, neem dan contact op via <a href="mailto:info@vollegym.nl" className="text-blue-600 hover:underline">info@vollegym.nl</a>.</p>

                    <h2 className="text-xl font-bold text-primary mt-10">Samenwerkingen waardoor persoonsgegevens worden gedeeld met derden</h2>
                    <p>Voor de uitvoering van onze diensten delen wij persoonsgegevens met derde partijen. Dit betreft onder andere:</p>
                    <ul className="list-disc pl-6">
                        <li>GoHighLevel (CRM, marketing automation en leerportaal)</li>
                        <li>Meta / Facebook (advertenties en tracking)</li>
                        <li>Stripe (betalingsverwerking)</li>
                        <li>Fathom (opname van video-bijeenkomsten)</li>
                        <li>Google (Analytics, Search Console, Tag Manager, Workspace)</li>
                        <li>Communicatietools zoals WhatsApp Business en Discord</li>
                        <li>Ons intern dashboard (voor het monitoren van klantresultaten, Meta Ads performance en CRM-funneldata)</li>
                        <li>Automatiseringstools en overige business- of marketingtools</li>
                    </ul>
                    <p>Ook maken wij gebruik van de ondersteuning van externe specialisten en teamleden voor specifieke onderdelen van je traject.</p>
                    <p>Deze derden zijn zelf verantwoordelijk voor de verwerking van de gegevens en de naleving van de AVG.</p>
                    <p>Wanneer externe leveranciers persoonsgegevens verwerken buiten de Europese Economische Ruimte, vindt doorgifte plaats op basis van het EU-US Data Privacy Framework (adequaatheidsbesluit Europese Commissie van 10 juli 2023) en/of de door de Europese Commissie vastgestelde standaardcontractbepalingen (Standard Contractual Clauses).</p>
                    <p>Wij testen regelmatig diverse tools en systemen om onze performance en de kwaliteit van onze dienstverlening te verbeteren.</p>
                    <p>Wij verkopen jouw persoonsgegevens niet en gebruiken de verkregen informatie alleen voor onze dienstverlening en het testen van de werking en effectiviteit van de systemen.</p>
                    <p>Omdat de tools en platforms regelmatig wijzigen, zullen we deze hier niet per tool vermelden. Mocht je hierover vragen hebben, neem dan contact met ons op via <a href="mailto:info@vollegym.nl" className="text-blue-600 hover:underline">info@vollegym.nl</a>.</p>

                    <h2 className="text-xl font-bold text-primary mt-10">Google Analytics en Google Search Console</h2>
                    <p>Gegevens die je verstrekt, kunnen worden bewaard voor het maken van statistische analyses. We hebben er belang bij om te zien hoe bezoekers onze website gebruiken en op basis daarvan onze website en dienstverlening verbeteren.</p>
                    <p>Wij maken daarvoor gebruik van Google Analytics en Google Search Console. Google Analytics is ingesteld op geanonimiseerde gegevens conform het standpunt van de Autoriteit Persoonsgegevens.</p>

                    <h2 className="text-xl font-bold text-primary mt-10">Google Tag Manager</h2>
                    <p>Voor onze website kunnen wij gebruik maken van Google Tag Manager om tags te beheren. Deze tool registreert zelf geen persoonsgegevens, maar helpt ons alleen bij het activeren van bepaalde tags. Voor meer details verwijzen wij naar de privacyverklaring van Google.</p>

                    <h2 className="text-xl font-bold text-primary mt-10">Ad Tracking Software</h2>
                    <p>Wij maken gebruik van diverse Ad Tracking Software, waaronder de Meta Pixel en Conversions API, voor het meten en optimaliseren van onze advertentiecampagnes.</p>

                    <h2 className="text-xl font-bold text-primary mt-10">Sociale media</h2>
                    <p>Op onze website staan sociale media links. Door gebruik te maken van deze links deel je jouw gegevens met deze platforms en worden er cookies geplaatst in jouw browser. Informatie over wat deze derde partijen met jouw gegevens doen vind je in hun privacybeleid op hun website.</p>
                    <p>Wij gebruiken op onze website pixels van onder meer Meta (Facebook en Instagram), LinkedIn en YouTube.</p>

                    <h2 className="text-xl font-bold text-primary mt-10">Inzage en aanpassing van persoonsgegevens</h2>
                    <p>Op basis van de AVG heb je recht op inzage in jouw gegevens, aanpassing als je gegevens onjuist zijn, verwijdering van je gegevens, bezwaar tegen een bepaalde gegevensverwerking, beperking van een gegevensverwerking en overdraagbaarheid van je gegevens.</p>
                    <p>Wanneer persoonsgegevens worden verwerkt op basis van gerechtvaardigd belang, heb je het recht hier bezwaar tegen te maken.</p>
                    <p>Als je gebruik wilt maken van een van deze rechten of vragen hebt, dan kun je contact met ons opnemen via <a href="mailto:info@vollegym.nl" className="text-blue-600 hover:underline">info@vollegym.nl</a>.</p>
                    <p>Eventuele klachten mogen ook worden ingediend bij de toezichthouder Autoriteit Persoonsgegevens.</p>

                    <h2 className="text-xl font-bold text-primary mt-10">Wijzigingen</h2>
                    <p>Bij wijzigingen die gevolgen hebben voor de verwerking van persoonsgegevens wijzigen wij deze privacyverklaring en publiceren deze via onze website.</p>

                    <h2 className="text-xl font-bold text-primary mt-10">Contact</h2>
                    <p>Heb je vragen of klachten over hoe wij je persoonsgegevens verwerken? Neem contact met ons op via <a href="mailto:info@vollegym.nl" className="text-blue-600 hover:underline">info@vollegym.nl</a>.</p>
                    <p>
                        Volle Gym Consulting B.V.<br />
                        Keizersgracht 127<br />
                        1015 CJ Amsterdam<br />
                        KvK: 99523337
                    </p>
                </div>
            </div>
        </section>
    );
};

export default PrivacyPolicy;
