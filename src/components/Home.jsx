import React from 'react';
import Hero from './Hero';
import VolleGymBar from './VolleGymBar';
import LogoMarquee from './LogoMarquee';
import Story from './Story';
import System from './System';
import VSL from './VSL';
import SocialProof from './SocialProof';
import GoogleReviews from './GoogleReviews';
import CTA from './CTA';
import Impact from './Impact';

const Home = () => {
    return (
        <main>
            <Hero />
            <VolleGymBar />
            <LogoMarquee />
            <Impact />
            <SocialProof />
            <GoogleReviews />
            <Story />
            <System />
            <VSL />
            <CTA />
        </main>
    );
};

export default Home;
