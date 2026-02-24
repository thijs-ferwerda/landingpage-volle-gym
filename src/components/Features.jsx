import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const Features = () => {
    return (
        <section id="systeem" className="py-32 px-6 md:px-12 max-w-[1400px] mx-auto bg-background">
            <div className="mb-20">
                <h2 className="font-heading font-medium text-4xl md:text-5xl tracking-tight text-dark mb-4">
                    Interactive Functional Artifacts
                </h2>
                <p className="font-data text-accent text-sm uppercase tracking-widest">
                    Systeem &gt; Meningen
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <DiagnosticShuffler />
                <TelemetryTypewriter />
                <CursorProtocolScheduler />
            </div>
        </section>
    );
};

/* --- Card 1: Diagnostic Shuffler --- */
const DiagnosticShuffler = () => {
    const [items, setItems] = useState([
        { id: 1, title: 'Marketing Systeem', desc: 'Voorspelbare instroom van de juiste leads.' },
        { id: 2, title: 'Verkoop Systeem', desc: 'Systeemmatige conversie zonder hard selling.' },
        { id: 3, title: 'Retentie Systeem', desc: 'Behoud leden ver voorbij week 6.' }
    ]);

    useEffect(() => {
        const interval = setInterval(() => {
            setItems((prev) => {
                const newArr = [...prev];
                const last = newArr.pop();
                newArr.unshift(last);
                return newArr;
            });
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-primary/30 border border-dark/10 rounded-[2rem] p-8 h-[400px] flex flex-col items-center justify-center relative overflow-hidden shadow-sm">
            <h3 className="absolute top-8 left-8 font-heading font-bold text-xl text-dark z-10">Voorspelbare Instroom</h3>
            <div className="absolute top-9 right-8 font-data text-xs text-dark/50">01 / SHUFFLE</div>

            <div className="relative w-full max-w-[280px] h-[160px] perspective-1000 mt-12">
                {items.map((item, index) => {
                    const isTop = index === 0;
                    const isMiddle = index === 1;

                    return (
                        <div
                            key={item.id}
                            className={`absolute top-0 left-0 w-full bg-background border border-dark/10 rounded-2xl p-6 transition-all duration-[800ms] shadow-lg`}
                            style={{
                                top: isTop ? '0px' : isMiddle ? '16px' : '32px',
                                transform: `scale(${isTop ? 1 : isMiddle ? 0.95 : 0.9})`,
                                zIndex: isTop ? 30 : isMiddle ? 20 : 10,
                                opacity: isTop ? 1 : isMiddle ? 0.7 : 0.4,
                                transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
                            }}
                        >
                            <div className="font-heading font-bold text-dark mb-2">{item.title}</div>
                            <div className="font-sans text-xs text-dark/70 leading-relaxed">{item.desc}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

/* --- Card 2: Telemetry Typewriter --- */
const TelemetryTypewriter = () => {
    const text = "Gegarandeerd 45 leden of u krijgt uw geld terug. Wij nemen het volledige financiële risico. Resultaat is de enige metric die telt. Geen bullshit, alleen meetbare groei.";
    const [displayedText, setDisplayedText] = useState("");
    const [isTyping, setIsTyping] = useState(true);

    useEffect(() => {
        let i = 0;
        setDisplayedText("");

        const typeNext = () => {
            if (i < text.length) {
                setDisplayedText(text.substring(0, i + 1));
                i++;
                setTimeout(typeNext, 40); // 40ms per char
            } else {
                setIsTyping(false);
                setTimeout(() => {
                    i = 0;
                    setIsTyping(true);
                    typeNext();
                }, 5000); // 5s pause before loop
            }
        };

        // Slight delay before start
        const startTimeout = setTimeout(typeNext, 1000);
        return () => clearTimeout(startTimeout);
    }, []);

    return (
        <div className="bg-dark rounded-[2rem] p-8 h-[400px] flex flex-col relative overflow-hidden shadow-xl text-primary">
            <div className="flex justify-between items-center mb-8">
                <h3 className="font-heading font-bold text-xl">IJzersterke Garantie</h3>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
                    <span className="font-data text-xs text-accent uppercase tracking-widest">Live Feed</span>
                </div>
            </div>

            <div className="flex-1 font-data text-sm leading-relaxed text-primary/80">
                <p className="whitespace-pre-wrap">
                    <span className="text-accent">&gt;</span> SYSTEM INITIALIZED...
                    <br /><br />
                    {displayedText}
                    <span className={`inline-block w-2.5 h-[1.1em] bg-accent ml-1 align-middle ${isTyping ? '' : 'animate-pulse'}`}></span>
                </p>
            </div>
        </div>
    );
}

/* --- Card 3: Cursor Protocol Scheduler --- */
const CursorProtocolScheduler = () => {
    const days = ['Z', 'M', 'D', 'W', 'D', 'V', 'Z'];
    const gridRef = useRef(null);
    const cursorRef = useRef(null);
    const [activeCell, setActiveCell] = useState(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Create a repeating timeline
            const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

            // Cursor enter
            tl.fromTo(cursorRef.current,
                { x: -50, y: 150, opacity: 0 },
                { x: 80, y: 60, opacity: 1, duration: 1, ease: 'power3.out' }
            )
                // Hover cell
                .to(cursorRef.current, { scale: 0.95, duration: 0.1 })
                .to(cursorRef.current, { scale: 1, duration: 0.1, onComplete: () => setActiveCell(3) }) // Activate Wednesday

                // Move to "Save"
                .to(cursorRef.current, { x: 160, y: 140, duration: 0.8, ease: 'power2.inOut', delay: 0.5 })
                // Click Save
                .to(cursorRef.current, { scale: 0.95, duration: 0.1 })
                .to(cursorRef.current, { scale: 1, duration: 0.1 })

                // Move away and fade out
                .to(cursorRef.current, { x: 250, y: 200, opacity: 0, duration: 0.8, ease: 'power2.in', delay: 0.2 })
                .call(() => setActiveCell(null));

        }, gridRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={gridRef} className="bg-primary/30 border border-dark/10 rounded-[2rem] p-8 h-[400px] flex flex-col relative overflow-hidden shadow-sm">
            <h3 className="font-heading font-bold text-xl text-dark z-10 mb-2">Tijd voor de klant</h3>
            <p className="font-sans text-xs text-dark/60 mb-8 max-w-[200px]">Rust voor de eigenaar door automatisch geplande intake afspraken.</p>

            <div className="grid grid-cols-7 gap-2 mb-8 relative z-10 max-w-[220px] mx-auto w-full">
                {days.map((day, i) => (
                    <div key={i} className="text-center">
                        <div className="font-data text-[10px] text-dark/40 mb-2">{day}</div>
                        <div
                            className={`w-full aspect-square rounded-md border text-xs flex items-center justify-center font-data transition-colors duration-300
                ${activeCell === i ? 'bg-accent border-accent text-primary' : 'bg-background border-dark/10 text-dark/30'}
                ${i === 3 ? 'cell-target' : ''}
              `}
                        >
                            {i + 14}
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-end pr-4 absolute bottom-8 right-8 z-10">
                <div className="bg-dark/5 px-4 py-1.5 rounded text-xs font-bold text-dark/40 save-target border border-dark/10">
                    Opslaan
                </div>
            </div>

            {/* Animated Cursor SVG */}
            <div
                ref={cursorRef}
                className="absolute top-0 left-0 z-50 pointer-events-none drop-shadow-md"
                style={{ opacity: 0 }}
            >
                <svg width="24" height="36" viewBox="0 0 24 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.2111 33.6826L0.245209 0.950291C-0.0988019 -0.0763268 0.925526 -0.52838 1.58332 0.35474L23.2359 29.4184C23.8344 30.2215 23.3276 31.3283 22.3486 31.3571L12.5926 31.6433C12.1623 31.6559 11.7514 31.8696 11.5178 32.2274C11.3934 32.4181 11.3069 32.6394 11.2646 32.8722C11.2223 33.1051 11.2255 33.3426 11.2741 33.5735C11.3227 33.8044 11.4151 34.0229 11.5435 34.2127C11.6719 34.4024 11.8329 34.5586 12.0163 34.6644L12.0003 34.6983C11.7645 34.4608 11.4552 34.1378 11.2111 33.6826Z" fill="#111111" />
                    <path d="M12.0003 34.6983L11.2111 33.6826L0.245209 0.950291C-0.0988019 -0.0763268 0.925526 -0.52838 1.58332 0.35474L23.2359 29.4184C23.8344 30.2215 23.3276 31.3283 22.3486 31.3571L12.5926 31.6433C12.1623 31.6559 11.7514 31.8696 11.5178 32.2274C11.3934 32.4181 11.3069 32.6394 11.2646 32.8722C11.2223 33.1051 11.2255 33.3426 11.2741 33.5735C11.3227 33.8044 11.4151 34.0229 11.5435 34.2127C11.6719 34.4024 11.8329 34.5586 12.0163 34.6644L12.0003 34.6983Z" stroke="#F5F3EE" strokeWidth="1.5" />
                </svg>
            </div>
        </div>
    );
};

export default Features;
