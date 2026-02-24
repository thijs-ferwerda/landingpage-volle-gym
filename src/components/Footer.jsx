import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Footer = () => {
    const location = useLocation();
    const isIntakePage = location.pathname.startsWith('/intake');

    return (
        <footer className={`bg-dark text-primary px-6 md:px-12 relative z-20 ${isIntakePage ? 'pt-8 pb-8' : 'pt-24 pb-8 rounded-t-[4rem] mt-[-4rem]'}`}>

            {!isIntakePage && (
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-20 border-b border-primary/10 pb-20">
                    <div className="md:col-span-1 border-t border-primary/10 pt-6 md:border-t-0 md:pt-0">
                        <h4 className="font-heading font-bold mb-6 text-primary tracking-wide">Navigatie</h4>
                        <ul className="space-y-4 font-sans text-primary/60 text-sm">
                            <li><a href="/#visie" className="hover:text-accent transition-colors">Visie & principes</a></li>
                            <li><a href="/#systeem" className="hover:text-accent transition-colors">Onze systemen</a></li>
                            <li><a href="/#resultaten" className="hover:text-accent transition-colors">Resultaten</a></li>
                            <li><Link to="/intake" className="hover:text-accent transition-colors font-bold text-primary">Intake plannen</Link></li>
                        </ul>
                    </div>

                    <div className="md:col-span-1 border-t border-primary/10 pt-6 md:border-t-0 md:pt-0">
                        <h4 className="font-heading font-bold mb-6 text-primary tracking-wide">Expertise</h4>
                        <ul className="space-y-4 font-sans text-primary/60 text-sm">
                            <li><Link to="/sportschool-marketing" className="hover:text-accent transition-colors">Sportschool Marketing</Link></li>
                            <li><Link to="/leden-werven-sportschool" className="hover:text-accent transition-colors">Leden werven</Link></li>
                            <li><Link to="/fitness-leadgeneratie" className="hover:text-accent transition-colors">Leadgeneratie</Link></li>
                        </ul>
                    </div>

                    <div className="md:col-span-1 border-t border-primary/10 pt-6 md:border-t-0 md:pt-0">
                        <h4 className="font-heading font-bold mb-6 text-primary tracking-wide">Voor wie</h4>
                        <ul className="space-y-4 font-sans text-primary/60 text-sm">
                            <li><Link to="/pt-studio-marketing" className="hover:text-accent transition-colors">PT Studio's</Link></li>
                            <li><Link to="/personal-trainer-marketing" className="hover:text-accent transition-colors">Personal Trainers</Link></li>
                            <li><Link to="/sportschool-marketing-bureau" className="hover:text-accent transition-colors">Groeipartner</Link></li>
                        </ul>
                    </div>

                    <div className="md:col-span-1 border-t border-primary/10 pt-6 md:border-t-0 md:pt-0">
                        <h4 className="font-heading font-bold mb-6 text-primary tracking-wide">Connect</h4>
                        <ul className="space-y-4 font-sans text-primary/60 text-sm">
                            <li><a href="https://www.linkedin.com/in/basnagelnl/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">LinkedIn</a></li>
                            <li><a href="https://www.instagram.com/vollegym/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">Instagram</a></li>
                            <li><a href="https://www.youtube.com/@vollegym" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">YouTube</a></li>
                        </ul>
                    </div>
                </div>
            )}

            <div className={`max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-data text-primary/40 ${isIntakePage ? 'border-t border-primary/10 pt-4' : ''}`}>
                <p>&copy; {new Date().getFullYear()} Volle Gym. All systems go.</p>
                <div className="flex gap-6">
                    <Link to="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
                    <Link to="/voorwaarden" className="hover:text-primary transition-colors">Voorwaarden</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
