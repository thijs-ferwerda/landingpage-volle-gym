import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const isIntakePage = location.pathname.startsWith('/intake') || location.pathname.startsWith('/solliciteren') || location.pathname.startsWith('/voordat-je-solliciteert');
    const isVacancyRoute = location.pathname.startsWith('/vacatures') || location.pathname.startsWith('/werken-bij');
    const isWerkenBijRoute = location.pathname === '/werken-bij' || location.pathname === '/werken-bij/';
    const isHQOverviewRoute = location.pathname === '/werken-bij/hq' || location.pathname === '/werken-bij/hq/';
    const isIndividualVacancyRoute = isVacancyRoute && !isWerkenBijRoute && !isHQOverviewRoute;
    const shouldCenterLogo = isIntakePage || isHQOverviewRoute || isIndividualVacancyRoute;

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
                className={`flex items-center justify-between px-6 py-4 rounded-[2rem] transition-all duration-500 ${scrolled || isVacancyRoute
                    ? 'bg-white/90 backdrop-blur-xl border border-primary/10 shadow-lg text-primary'
                    : 'bg-transparent text-primary border border-transparent'
                    }`}
            >
                <Link
                    to="/"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className={`text-xl font-bold tracking-tight uppercase flex items-center gap-2 ${shouldCenterLogo ? 'mx-auto' : scrolled ? '' : 'mx-auto md:mx-0'}`}
                >
                    <svg className={`w-6 h-6 ${scrolled ? 'text-accent' : 'text-primary'} transition-colors duration-300`} viewBox="0 0 24 24" fill="currentColor">
                        <path d="M4 6h2v12H4zm14 0h2v12h-2zM1 9h2v6H1zm20 0h2v6h-2zM7 11h10v2H7z" />
                    </svg>
                    Volle Gym
                </Link>

                {!isIntakePage && (
                    <>
                        {!isVacancyRoute && (
                            <div className="hidden md:flex items-center gap-8 text-sm font-medium">
                                <a href="/#visie" className="hover:-translate-y-[1px] transition-transform">Visie</a>
                                <a href="/#systeem" className="hover:-translate-y-[1px] transition-transform">Systeem</a>
                                <Link to="/resultaten" className="hover:-translate-y-[1px] transition-transform">Resultaten</Link>
                            </div>
                        )}
                        {isWerkenBijRoute && (
                            <div className="hidden md:flex items-center gap-8 text-sm font-medium">
                                <a href="#volle-gym-hq" className="hover:-translate-y-[1px] transition-transform">Volle Gym HQ</a>
                                <a href="#onze-partners" className="hover:-translate-y-[1px] transition-transform">Personal Trainer</a>
                            </div>
                        )}

                        {isVacancyRoute ? (
                            !isIndividualVacancyRoute && !isHQOverviewRoute && (
                                <Link to="/solliciteren" className={`magnetic-btn bg-accent text-white px-6 py-2.5 rounded-full text-sm font-bold tracking-wide uppercase group ${scrolled || isVacancyRoute ? 'inline-block' : 'hidden md:inline-block'}`}>
                                    <span className="magnetic-btn-content">Meld je aan</span>
                                </Link>
                            )
                        ) : (
                            <Link to="/intake" className={`magnetic-btn bg-accent text-white px-6 py-2.5 rounded-full text-sm font-bold tracking-wide uppercase group ${scrolled ? 'inline-block' : 'hidden md:inline-block'}`}>
                                <span className="magnetic-btn-content">Doe de intake</span>
                            </Link>
                        )}
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
