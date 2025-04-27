
import React from 'react';

export const AuthHero = () => {
  return (
    <div className="hidden md:block bg-primary/5 relative">
      <img 
        src="/lovable-uploads/login.png" 
        alt="Atendente" 
        className="object-cover w-full h-full"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex flex-col justify-end p-12">
        <div className="max-w-md text-white">
          <h2 className="text-2xl font-bold mb-2">Sua Parceria de Confiança</h2>
          <p className="mb-4">Hospedagem de qualidade e suporte técnico 24/7 para o seu negócio online.</p>
          <ul className="space-y-2">
            <li className="flex items-center">
              <span className="mr-2 bg-green-500 p-1 rounded-full w-2 h-2"></span>
              Complete seu cadastro para continuar sua compra
            </li>
            <li className="flex items-center">
              <span className="mr-2 bg-green-500 p-1 rounded-full w-2 h-2"></span>
              Acesse seus serviços e faturas no painel do cliente
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
