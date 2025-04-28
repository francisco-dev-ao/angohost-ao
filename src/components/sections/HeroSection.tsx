
import React from 'react';
import HeroBackground from '../hero/HeroBackground';
import HeroContent from '../hero/HeroContent';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-r from-angohost-700 to-angohost-800">
      <HeroBackground />
      <div className="absolute inset-0 bg-gradient-to-r from-angohost-700/90 to-angohost-800/80" />
      <div className="relative z-10 container max-w-7xl mx-auto px-4 min-h-screen flex items-center">
        <div className="w-full lg:w-1/2">
          <HeroContent />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
