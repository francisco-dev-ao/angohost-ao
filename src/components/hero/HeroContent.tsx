
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { textVariants } from '@/lib/animations';

const HeroContent = () => {
  return (
    <div className="relative z-20">
      <div className="flex flex-col items-start text-left">
        <motion.div
          variants={textVariants}
          initial="hidden"
          animate="visible"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-primary">
            Sua Presença Online Começa Aqui
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-600">
            Hospedagem confiável, domínios .AO e soluções completas para o mercado angolano
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg" className="bg-primary text-white hover:bg-primary/90">
              <Link to="/hospedagem/cpanel">Ver Planos de Hospedagem</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
              <Link to="/dominios/registrar">Registrar Domínio</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroContent;
