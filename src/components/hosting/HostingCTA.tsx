
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export const HostingCTA = () => {
  return (
    <section className="py-16 px-4 bg-angohost-700 text-white">
      <div className="container max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">
          Pronto para hospedar seu site?
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Comece agora com nossos planos acessíveis e de alta qualidade
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600">
            <Link to="#plans">Ver Planos</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
            <Link to="/contato">Fale Conosco</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
