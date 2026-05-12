import React, { useState } from 'react';

// Inline click-to-play YouTube embed used across the site.
// (Naming kept as VideoLightbox to avoid touching imports; behavior is inline-in-card.)
// Will be replaced with Wistia embeds in a future iteration.
const VideoLightbox = ({ videoId, name, playButtonSize = 'lg' }) => {
    const [playing, setPlaying] = useState(false);

    const playCircle = playButtonSize === 'sm'
        ? 'w-12 h-12 md:w-14 md:h-14'
        : 'w-16 h-16 md:w-20 md:h-20';
    const playIcon = playButtonSize === 'sm'
        ? 'w-5 h-5 md:w-6 md:h-6'
        : 'w-7 h-7 md:w-9 md:h-9';

    if (playing) {
        return (
            <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                title={`Interview met ${name}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
        );
    }

    return (
        <button
            type="button"
            onClick={() => setPlaying(true)}
            className="absolute inset-0 group cursor-pointer"
            aria-label={`Speel video met ${name} af`}
        >
            <img
                src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
                alt={`Thumbnail van interview met ${name}`}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                <span className={`${playCircle} bg-accent rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform`}>
                    <svg viewBox="0 0 24 24" className={`${playIcon} text-white`} fill="currentColor" aria-hidden="true">
                        <path d="M6.5 5v14l11-7z" />
                    </svg>
                </span>
            </span>
        </button>
    );
};

export default VideoLightbox;
