import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { textVariants } from '@/lib/animations';

const HeroContent = () => {
  return (
    <div className="relative z-20 text-white">
      <motion.div
        variants={textVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
        O seu site sempre no ar, protegido.
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-white/80">
          Hospedagem confiável, domínios .AO e soluções completas para o mercado angolano!
        </p>
        
        <div className="flex flex-wrap gap-4">
          <Button 
            asChild 
            size="lg" 
            className="bg-orange-500 text-white hover:bg-orange-600"
          >
            <Link to="/dominios/registrar">Registrar Domínio</Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroContent;
