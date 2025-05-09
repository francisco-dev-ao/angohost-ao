
import React from 'react';
import HeroBackground from '../hero/HeroBackground';
import HeroContent from '../hero/HeroContent';

const HeroSection = () => {
  return (
    <section className="relative py-20 md:py-32 bg-gradient-to-r from-angohost-700 to-angohost-800">
      <div className="container max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-8 items-center">
        <HeroContent />
        <div className="order-last lg:order-last">
          <HeroBackground />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
