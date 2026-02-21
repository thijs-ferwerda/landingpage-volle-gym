import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Footer = () => {
    const location = useLocation();
    const isIntakePage = location.pathname.startsWith('/intake');

    return (
        <footer className={`bg-dark text-primary px-6 md:px-12 relative z-20 ${isIntakePage ? 'pt-8 pb-8' : 'pt-24 pb-8 rounded-t-[4rem] mt-[-4rem]'}`}>

            {!isIntakePage && (
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-20 border-b border-primary/10 pb-20">
                    <div className="md:col-span-2">
                        <div className="text-3xl font-bold tracking-tight flex items-center gap-3 mb-6">
                            <div className="w-4 h-4 rounded-full bg-accent"></div>
                            Volle Gym
                        </div>
                        <p className="font-sans text-primary/60 max-w-sm leading-relaxed mb-8">
                            De helpende hand van gezond Nederland. Wij bouwen voorspelbare systemen voor PT studio's en small group gyms. Resultaat &gt; Meningen.
                        </p>

                        <div className="inline-flex items-center gap-3 px-4 py-2 border border-primary/10 rounded-full bg-primary/5">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#10b981] animate-pulse"></div>
                            <span className="font-data text-xs tracking-widest text-primary/80">Systeem operationeel</span>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-heading font-bold mb-6 text-primary tracking-wide">Navigatie</h4>
                        <ul className="space-y-4 font-sans text-primary/60 text-sm">
                            <li><a href="/#visie" className="hover:text-accent transition-colors">Visie & principes</a></li>
                            <li><a href="/#systeem" className="hover:text-accent transition-colors">Onze systemen</a></li>
                            <li><a href="/#resultaten" className="hover:text-accent transition-colors">Resultaten</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-heading font-bold mb-6 text-primary tracking-wide">Connect</h4>
                        <ul className="space-y-4 font-sans text-primary/60 text-sm">
                            <li><Link to="/intake" className="hover:text-accent transition-colors">Intake plannen</Link></li>
                            <li><a href="#" className="hover:text-accent transition-colors">LinkedIn</a></li>
                            <li><a href="#" className="hover:text-accent transition-colors">Instagram</a></li>
                        </ul>
                    </div>
                </div>
            )}

            <div className={`max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-data text-primary/40 ${isIntakePage ? 'border-t border-primary/10 pt-4' : ''}`}>
                <p>&copy; {new Date().getFullYear()} Volle Gym. All systems go.</p>
                <div className="flex gap-6">
                    <a href="#" className="hover:text-primary transition-colors">Privacy</a>
                    <a href="#" className="hover:text-primary transition-colors">Voorwaarden</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
