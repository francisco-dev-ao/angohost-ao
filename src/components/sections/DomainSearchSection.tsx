
import React from 'react';
import DomainSearchForm from '@/components/DomainSearchForm';

const DomainSearchSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Encontre o Domínio Perfeito</h2>
          <p className="text-lg text-gray-600">
            Registre seu domínio .AO e estabeleça sua presença online hoje mesmo
          </p>
        </div>
        
        <DomainSearchForm variant="default" />
        
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <div className="bg-gray-100 py-2 px-4 rounded-full text-sm">
            .co.ao - 35.000 Kz/ano
          </div>
          <div className="bg-gray-100 py-2 px-4 rounded-full text-sm">
            .ao - 25.000 Kz/ano
          </div>
          <div className="bg-gray-100 py-2 px-4 rounded-full text-sm">
            .com - 15.000 Kz/ano
          </div>
          <div className="bg-gray-100 py-2 px-4 rounded-full text-sm">
            .net - 15.000 Kz/ano
          </div>
        </div>
      </div>
    </section>
  );
};

export default DomainSearchSection;
