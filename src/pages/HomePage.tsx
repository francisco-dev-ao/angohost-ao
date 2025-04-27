
import React from 'react';
import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import DomainSearchSection from '@/components/sections/DomainSearchSection';
import PricingSection from '@/components/sections/PricingSection';
import ClientLogosSection from '@/components/ClientLogosSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CallToActionSection from '@/components/sections/CallToActionSection';
import SupportSection from '@/components/sections/SupportSection';

const HomePage = () => {
  return (
    <div className="flex flex-col gap-16 pb-16">
      <HeroSection />
      <ServicesSection />
      <DomainSearchSection />
      <PricingSection />
      <ClientLogosSection />
      <TestimonialsSection />
      <SupportSection />
      <CallToActionSection />
    </div>
  );
};

export default HomePage;
