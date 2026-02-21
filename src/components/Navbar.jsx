import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const isIntakePage = location.pathname.startsWith('/intake');

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl">
            <div
                className={`flex items-center justify-between px-6 py-4 rounded-[2rem] transition-all duration-500 ${scrolled
                    ? 'bg-white/90 backdrop-blur-xl border border-primary/10 shadow-lg text-primary'
                    : 'bg-transparent text-primary border border-transparent'
                    }`}
            >
                <Link
                    to="/"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="text-xl font-bold tracking-tight uppercase flex items-center gap-2"
                >
                    <svg className={`w-6 h-6 ${scrolled ? 'text-accent' : 'text-primary'} transition-colors duration-300`} viewBox="0 0 24 24" fill="currentColor">
                        <path d="M4 6h2v12H4zm14 0h2v12h-2zM1 9h2v6H1zm20 0h2v6h-2zM7 11h10v2H7z" />
                    </svg>
                    Volle Gym
                </Link>

                {!isIntakePage && (
                    <>
                        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
                            <a href="/#visie" className="hover:-translate-y-[1px] transition-transform">Visie</a>
                            <a href="/#systeem" className="hover:-translate-y-[1px] transition-transform">Systeem</a>
                            <a href="/#resultaten" className="hover:-translate-y-[1px] transition-transform">Resultaten</a>
                        </div>

                        <Link to="/intake" className="magnetic-btn bg-accent text-primary px-6 py-2.5 rounded-full text-sm font-bold tracking-wide uppercase group inline-block">
                            <span className="magnetic-btn-content">Doe de intake</span>
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
