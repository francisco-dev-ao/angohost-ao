
import React from 'react';
import { Button } from '@/components/ui/button';

interface DomainSearchResultProps {
  domainName: string;
  extension: string;
  searchResult: { available: boolean; price?: number };
  onRegister: () => void;
  registerButtonRef: React.RefObject<HTMLButtonElement>;
}

export const DomainSearchResult: React.FC<DomainSearchResultProps> = ({
  domainName,
  extension,
  searchResult,
  onRegister,
  registerButtonRef
}) => {
  if (!searchResult) return null;

  if (searchResult.available) {
    return (
      <div className="bg-green-50/60 backdrop-blur-[2px] border border-green-100/30 rounded-xl p-6 flex flex-col items-center shadow-lg">
        <h4 className="text-green-800 text-lg font-medium">
          {domainName}{extension} está disponível!
        </h4>
        <p className="text-gray-600 mt-2">
          Preço: {searchResult.price?.toLocaleString('pt-AO')} Kz por ano
        </p>
        <p className="text-gray-600 text-sm">
          Renovação: {searchResult.price?.toLocaleString('pt-AO')} Kz por ano
        </p>
        <Button 
          ref={registerButtonRef}
          onClick={onRegister}
          className="mt-4 bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all duration-300"
        >
          Registrar Domínio
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-red-50/80 backdrop-blur-sm border border-red-100 rounded-xl p-6 shadow-lg">
      <h4 className="text-red-800 text-lg font-medium">
        {domainName}{extension} não está disponível
      </h4>
      <p className="text-gray-600 mt-2">
        Tente outro nome ou extensão diferente.
      </p>
    </div>
  );
};
