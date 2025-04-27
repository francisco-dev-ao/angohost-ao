
import React from 'react';
import { Button } from "@/components/ui/button";

export const DomainSearchPanel = () => {
  return (
    <div className="container max-w-7xl mx-auto my-8 px-4">
      <div className="bg-white border rounded-lg shadow-sm p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
          <h2 className="text-xl md:text-2xl text-gray-700">
            Registre o seu nome de domínio e desfrute de suporte contínuo 24/7
          </h2>
          <span className="text-2xl font-semibold text-gray-700">25.000kz</span>
        </div>
        
        <div className="flex flex-col md:flex-row gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="seudominio.ao"
              className="w-full h-12 rounded-lg border border-gray-300 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <Button className="h-12 bg-green-500 hover:bg-green-600 px-8 text-white">
            Verificar
          </Button>
        </div>
      </div>
    </div>
  );
};
