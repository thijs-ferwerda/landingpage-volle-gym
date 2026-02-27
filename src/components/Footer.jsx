import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Footer = () => {
    const location = useLocation();
    const isIntakePage = location.pathname.startsWith('/intake');
    const isSalesPage = ['/uitgeputte-trainer', '/tweede-locatie', '/voorspelbare-groei'].includes(location.pathname);
    const isMinimalFooter = isIntakePage || isSalesPage;

    return (
        <footer className={`bg-dark text-primary px-6 md:px-12 relative z-20 ${isMinimalFooter ? 'pt-8 pb-8' : 'pt-24 pb-8 rounded-t-[4rem] mt-[-4rem]'}`}>

            {!isMinimalFooter && (
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-6 md:grid-cols-3 gap-12 mb-20 border-b border-primary/10 pb-20">
                    <div className="lg:col-span-2 md:col-span-3">
                        <div className="flex items-center gap-3 mb-6">
                            <svg className="w-8 h-8 text-primary" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M4 6h2v12H4zm14 0h2v12h-2zM1 9h2v6H1zm20 0h2v6h-2zM7 11h10v2H7z" />
                            </svg>
                            <span className="font-heading font-black text-2xl tracking-tighter uppercase text-primary">Volle Gym</span>
                        </div>
                        <p className="font-sans text-primary/60 max-w-sm leading-relaxed mb-8">
                            De helpende hand van gezond Nederland. Wij bouwen voorspelbare systemen voor PT studio's en small group gyms. Resultaat &gt; Meningen.
                        </p>

                        <div className="inline-flex items-center gap-3 px-4 py-2 border border-primary/10 rounded-full bg-primary/5">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#10b981] animate-pulse"></div>
                            <span className="font-data text-xs tracking-widest text-primary/80">Systeem operationeel</span>
                        </div>
                    </div>
                    <div className="md:col-span-2 border-t border-primary/10 pt-6 md:border-t-0 md:pt-0">
                        <h4 className="font-heading font-bold mb-6 text-primary tracking-wide">Navigatie</h4>
                        <ul className="space-y-4 font-sans text-primary/60 text-sm">
                            <li><Link to="/resultaten" className="hover:text-accent transition-colors">Resultaten</Link></li>
                            <li><a href="/#visie" className="hover:text-accent transition-colors">Visie</a></li>
                            <li><a href="/#impact" className="hover:text-accent transition-colors">Over ons</a></li>
                            <li><a href="/#garantie" className="hover:text-accent transition-colors">Garantie</a></li>
                            <li><Link to="/intake" className="hover:text-accent transition-colors font-bold text-primary">Intake plannen</Link></li>
                        </ul>
                    </div>

                    <div className="md:col-span-2 border-t border-primary/10 pt-6 md:border-t-0 md:pt-0">
                        <h4 className="font-heading font-bold mb-6 text-primary tracking-wide">Connect</h4>
                        <ul className="space-y-4 font-sans text-primary/60 text-sm">
                            <li><a href="https://www.linkedin.com/in/basnagelnl/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">LinkedIn</a></li>
                            <li><a href="https://www.instagram.com/vollegym/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">Instagram</a></li>
                            <li><a href="https://www.youtube.com/@vollegym" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">YouTube</a></li>
                        </ul>
                    </div>
                </div>
            )}

            <div className={`max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-data text-primary/40 ${isMinimalFooter ? 'border-t border-primary/10 pt-4' : ''}`}>
                <p>&copy; {new Date().getFullYear()} Volle Gym Consulting B.V. All systems go.</p>
                <div className="flex gap-4 md:gap-6">
                    <Link to="/sitemap" className="hover:text-primary transition-colors">Sitemap</Link>
                    <Link to="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
                    <Link to="/voorwaarden" className="hover:text-primary transition-colors">Voorwaarden</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
