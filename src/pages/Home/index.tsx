
import React from 'react';
import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import PricingSection from '@/components/sections/PricingSection';
import CallToActionSection from '@/components/sections/CallToActionSection';

const Home = () => {
  return (
    <div>
      <HeroSection />
      <ServicesSection />
      <PricingSection />
      <CallToActionSection />
    </div>
  );
};

export default Home;
