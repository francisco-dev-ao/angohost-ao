
import React from 'react';
import HeroBackground from '../hero/HeroBackground';
import HeroContent from '../hero/HeroContent';

const HeroSection = () => {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <HeroBackground />
      <HeroContent />
    </section>
  );
};

export default HeroSection;
