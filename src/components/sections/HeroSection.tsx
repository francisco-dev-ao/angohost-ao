
import React from 'react';
import HeroBackground from '../hero/HeroBackground';
import HeroContent from '../hero/HeroContent';

const HeroSection = () => {
  return (
    <section className="relative py-20 md:py-32 bg-gradient-to-r from-primary/50 to-primary/30">
      <div className="container max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-8 items-center">
        <div className="order-last lg:order-first z-10">
          <HeroContent />
        </div>
        <div className="order-first lg:order-last">
          <HeroBackground />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
