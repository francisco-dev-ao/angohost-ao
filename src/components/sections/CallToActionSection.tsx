
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const CallToActionSection = () => {
  return (
    <section className="py-16 px-4 relative bg-primary">
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30 z-0"></div>
      <img src="/lovable-uploads/198cbc98-86c6-4598-8d0a-bed3b41b6d9f.png" alt="Equipe AngoHost" className="absolute inset-0 w-full h-full object-cover opacity-20 -z-10" />
      <div className="container max-w-6xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-6 text-white">
            Comece Hoje Mesmo
          </h2>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
            Registre seu domínio, contrate hospedagem e crie sua presença online com a ANGOHOST
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100">
              <Link to="/dominios/registrar">Registrar Domínio</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
              <Link to="/hospedagem/cpanel">Ver Planos de Hospedagem</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToActionSection;
