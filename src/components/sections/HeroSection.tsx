
import React from 'react';
import HeroBackground from '../hero/HeroBackground';
import HeroContent from '../hero/HeroContent';

const HeroSection = () => {
  return (
    <section className="relative min-h-[80vh]">
      <HeroBackground />
      <div className="relative z-10 container max-w-7xl mx-auto px-4 min-h-[80vh] flex items-center">
        <div className="w-full lg:w-1/2">
          <HeroContent />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
