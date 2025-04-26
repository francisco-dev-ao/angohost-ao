
import React from 'react';
import { motion } from 'framer-motion';
import PlanPricingTabs from '@/components/PlanPricingTabs';

const PricingSection = () => {
  return (
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
            <div className="mt-4 text-sm text-green-600 font-medium">
              Economize até 20% com planos de 3 anos!
            </div>
          </motion.div>
        </div>
        <PlanPricingTabs />
      </div>
    </section>
  );
};

export default PricingSection;
