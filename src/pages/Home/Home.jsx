import React from 'react';
import SEO from '../../components/SEO';
import Hero from '../../components/Hero';
import VolleGymBar from '../../components/VolleGymBar';
import LogoMarquee from '../../components/LogoMarquee';
import Story from '../../components/Story';
import System from '../../components/System';
import VSL from '../../components/VSL';
import SocialProof from '../../components/SocialProof';
import GoogleReviews from '../../components/GoogleReviews';
import CTA from '../../components/CTA';
import Impact from '../../components/Impact';

const Home = ({ campaign }) => {
    return (
        <main>
            <SEO />
            <Hero campaign={campaign} />
            <VolleGymBar />
            <LogoMarquee />
            <Impact />
            <SocialProof />
            <GoogleReviews />
            <Story />
            <System campaign={campaign} />
            <VSL />
            <CTA />
        </main>
    );
};

export default Home;
