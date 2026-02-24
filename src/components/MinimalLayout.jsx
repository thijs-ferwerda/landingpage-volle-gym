import React from 'react';
import { Link } from 'react-router-dom';

const MinimalLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-background flex flex-col font-sans">
            <div className="noise-overlay"></div>

            {/* Minimal Header (Logo only) */}
            <header className="absolute top-0 left-0 w-full z-50 p-6 md:p-8 flex justify-center items-center">
                <div className="flex items-center gap-3 select-none pointer-events-none">
                    <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M4 6h2v12H4zm14 0h2v12h-2zM1 9h2v6H1zm20 0h2v6h-2zM7 11h10v2H7z" />
                    </svg>
                    <span className="text-xl font-bold tracking-tight uppercase flex items-center gap-2 text-primary">
                        Volle Gym
                    </span>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow flex flex-col items-center justify-center">
                {children}
            </main>

            {/* Minimal Footer */}
            <footer className="w-full py-8 text-center text-primary/40 text-xs mt-auto">
                <p>&copy; {new Date().getFullYear()} Volle Gym Consulting B.V. Alle rechten voorbehouden.</p>
            </footer>
        </div>
    );
};

export default MinimalLayout;
