
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const imageRevealVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8 }
  }
};

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.2 }
  }
};

const HeroSection = () => {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/50 to-primary/30 z-10"></div>
      
      <div className="absolute inset-0 w-full h-full">
        <motion.div 
          className="w-full h-full"
          variants={imageRevealVariants}
          initial="hidden"
          animate="visible"
        >
          <img 
            src="/lovable-uploads/198cbc98-86c6-4598-8d0a-bed3b41b6d9f.png" 
            alt="Equipe ANGOHOST" 
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>
      
      <div className="container max-w-7xl mx-auto px-4 relative z-20">
        <div className="flex flex-col items-center text-center text-white">
          <motion.div
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Sua Presença Online Começa Aqui</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
              Hospedagem confiável, domínios .AO e soluções completas para o mercado angolano
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100">
                <Link to="/hospedagem/cpanel">Ver Planos de Hospedagem</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
                <Link to="/dominios/registrar">Registrar Domínio</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-white/10 to-transparent z-20"></div>
    </section>
  );
};

export default HeroSection;
