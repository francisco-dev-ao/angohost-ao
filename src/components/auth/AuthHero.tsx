
import React from 'react';

export const AuthHero = () => {
  return (
    <div className="hidden md:block bg-primary/5 relative">
      <img 
        src="/lovable-uploads/26bd684c-fd6e-4bb5-acbf-36c2eeaa8ee0.png" 
        alt="Atendente" 
        className="object-cover w-full h-full"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent flex flex-col justify-end p-12">
        <div className="max-w-md text-white">
          <h2 className="text-2xl font-bold mb-2">Sua Parceria de Confiança</h2>
          <p>Hospedagem de qualidade e suporte técnico 24/7 para o seu negócio online.</p>
        </div>
      </div>
    </div>
  );
};
