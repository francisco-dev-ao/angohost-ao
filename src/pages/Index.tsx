
import React from 'react';
import { motion } from 'framer-motion';
import HeroSection from '@/components/sections/HeroSection';
import DomainSearchSection from '@/components/sections/DomainSearchSection';
import SupportSection from '@/components/sections/SupportSection';
import CallToActionSection from '@/components/sections/CallToActionSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ClientLogosSection from '@/components/ClientLogosSection';
import PlanCategories from '@/components/PlanCategories';
import PlanPricingTabs from '@/components/PlanPricingTabs';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <DomainSearchSection />
      
      {/* Services Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-4">Serviços de Alta Qualidade</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Oferecemos soluções completas em hospedagem e domínios para o mercado angolano
              </p>
            </motion.div>
          </div>
          <PlanCategories />
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-4">Planos e Preços</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Compare nossos planos e escolha a solução ideal para seu negócio
              </p>
            </motion.div>
          </div>
          <PlanPricingTabs />
        </div>
      </section>

      <TestimonialsSection />
      <ClientLogosSection />
      <SupportSection />
      <CallToActionSection />
    </div>
  );
};

export default Index;
