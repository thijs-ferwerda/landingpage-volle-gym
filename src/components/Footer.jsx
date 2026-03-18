import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Footer = () => {
    const location = useLocation();
    const isIntakePage = location.pathname.startsWith('/intake');
    const isSalesPage = ['/uitgeputte-trainer', '/tweede-locatie', '/voorspelbare-groei'].includes(location.pathname);
    const isMinimalFooter = isIntakePage || isSalesPage;
    const isVacancyRoute = location.pathname.startsWith('/vacatures') || location.pathname.startsWith('/werken-bij');

    return (
        <footer className={`bg-dark text-primary px-6 md:px-12 relative z-20 ${isMinimalFooter ? 'pt-8 pb-8' : 'pt-24 pb-8 rounded-t-[4rem] mt-[-4rem]'}`}>

            {!isMinimalFooter && (
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-12 mb-20 border-b border-primary/10 pb-20">
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-3 mb-6">
                            <svg className="w-8 h-8 text-primary" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M4 6h2v12H4zm14 0h2v12h-2zM1 9h2v6H1zm20 0h2v6h-2zM7 11h10v2H7z" />
                            </svg>
                            <span className="font-heading font-black text-2xl tracking-tighter uppercase text-primary">Volle Gym</span>
                        </div>
                        <p className="font-sans text-primary/60 max-w-sm leading-relaxed mb-8">
                            {isVacancyRoute
                                ? "De brug tussen toptalent en de beste PT studio's van Nederland. Bouw aan je carrière bij Volle Gym of een van onze exclusieve partners."
                                : "De helpende hand van gezond Nederland. Wij bouwen voorspelbare systemen voor PT studio's en small group gyms. Resultaat > Meningen."
                            }
                        </p>
                    </div>
                    <div className="border-t border-primary/10 pt-6 md:border-t-0 md:pt-0">
                        <h3 className="font-heading font-bold mb-6 text-primary tracking-wide text-base">Navigatie</h3>
                        {isVacancyRoute ? (
                            <ul className="space-y-4 font-sans text-primary/60 text-sm">
                                <li><Link to="/vacatures" className="hover:text-accent transition-colors">Alle vacatures</Link></li>
                                <li><Link to="/werken-bij" className="hover:text-accent transition-colors">Werken bij Volle Gym HQ</Link></li>
                                <li><Link to="/solliciteren" className="hover:text-accent transition-colors">Start aanmelding</Link></li>
                                <li><Link to="/" className="hover:text-accent transition-colors mt-4 block text-primary/40">Terug naar hoofdwebsite</Link></li>
                            </ul>
                        ) : (
                            <ul className="space-y-4 font-sans text-primary/60 text-sm">
                                <li><Link to="/resultaten" className="hover:text-accent transition-colors">Resultaten</Link></li>
                                <li><Link to="/kennisbank" className="hover:text-accent transition-colors">Kennisbank</Link></li>
                                <li><a href="/#visie" className="hover:text-accent transition-colors">Visie</a></li>
                                <li><a href="/#impact" className="hover:text-accent transition-colors">Over ons</a></li>
                                <li><a href="/#garantie" className="hover:text-accent transition-colors">Garantie</a></li>
                                <li><Link to="/werken-bij" className="hover:text-accent transition-colors">Werken bij</Link></li>
                                <li><Link to="/intake" className="hover:text-accent transition-colors font-bold text-primary">Intake plannen</Link></li>
                            </ul>
                        )}
                    </div>

                    <div className="border-t border-primary/10 pt-6 md:border-t-0 md:pt-0">
                        <h3 className="font-heading font-bold mb-6 text-primary tracking-wide text-base">Connect</h3>
                        <ul className="space-y-4 font-sans text-primary/60 text-sm">
                            <li><a href="https://www.linkedin.com/company/volle-gym-consulting/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">LinkedIn</a></li>
                            <li><a href="https://www.instagram.com/vollegym/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">Instagram</a></li>
                            <li><a href="https://www.youtube.com/@vollegym" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">YouTube</a></li>
                        </ul>
                    </div>

                    <div className="border-t border-primary/10 pt-6 md:border-t-0 md:pt-0">
                        <h3 className="font-heading font-bold mb-6 text-primary tracking-wide text-base">Contact</h3>
                        <ul className="space-y-4 font-sans text-primary/60 text-sm">
                            <li><a href="mailto:info@vollegym.nl" className="hover:text-accent transition-colors">info@vollegym.nl</a></li>
                            <li><a href="tel:+3197010256819" className="hover:text-accent transition-colors">+31 97010256819</a></li>
                            <li className="pt-2">Keizersgracht 127<br />1015 CJ Amsterdam</li>
                        </ul>
                    </div>
                </div>
            )}

            <div className="max-w-7xl mx-auto mb-8 px-4 md:px-0">
                <p className="font-sans text-[10px] sm:text-xs text-primary/60 leading-relaxed text-center md:text-left">
                    Volle Gym is de specialist in sportschool marketing door heel Nederland en België. Wij helpen personal training studio's, small group gyms en boutique fitness clubs groeien in regio's door heel Nederland en België zoals: Amsterdam, Rotterdam, Den Haag, Utrecht, Eindhoven, Tilburg, Almere, Groningen, Breda, Nijmegen, Arnhem, Haarlem, Enschede, Apeldoorn, Amersfoort, Zaanstad, 's-Hertogenbosch, Haarlemmermeer, Zwolle en Zoetermeer.
                </p>
            </div>

            <div className={`max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-data text-primary/60 ${isMinimalFooter ? 'border-t border-primary/10 pt-4' : ''}`}>
                <p>&copy; {new Date().getFullYear()} Volle Gym Consulting B.V.</p>
                <div className="flex gap-4 md:gap-6">
                    <Link to="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
                    <Link to="/voorwaarden" className="hover:text-primary transition-colors">Voorwaarden</Link>
                    <button onClick={() => window.__openCookieSettings?.()} className="hover:text-primary transition-colors cursor-pointer">Cookies</button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
