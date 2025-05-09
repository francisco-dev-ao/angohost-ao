
import React from 'react';
import HeroSection from '@/components/sections/HeroSection';
import DomainSearchSection from '@/components/sections/DomainSearchSection';
import ServicesSection from '@/components/sections/ServicesSection';
import PricingSection from '@/components/sections/PricingSection';
import SupportSection from '@/components/sections/SupportSection';
import CallToActionSection from '@/components/sections/CallToActionSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ClientLogosSection from '@/components/ClientLogosSection';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <ClientLogosSection />
      <DomainSearchSection />
      <ServicesSection />
      <PricingSection />
      <TestimonialsSection />
      <SupportSection />
      <CallToActionSection 
        title="Pronto para começar?"
        description="Registre seu domínio e obtenha hospedagem de alta qualidade com suporte técnico especializado."
        buttonText="Comece Agora"
        buttonLink="/auth" 
      />
    </div>
  );
};

export default Index;
