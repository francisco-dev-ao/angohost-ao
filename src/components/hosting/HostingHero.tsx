
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export const HostingHero = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-angohost-700 to-angohost-800 text-white">
      <div className="container max-w-6xl mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">Alojamento web Rápido</h1>
          <p className="text-xl mb-8">
            Planos de hospedagem web confiáveis e de alto desempenho para o seu site ou aplicação.
          </p>
          <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600">
            <Link to="#plans">Ver Planos</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
