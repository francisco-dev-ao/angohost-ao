
import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface DomainSearchResultProps {
  domainName: string;
  extension: string;
  searchResult: { 
    available: boolean; 
    price?: number;
    records?: {
      dns?: boolean;
      nameserver?: boolean;
      a?: boolean;
      txt?: boolean;
    }
  };
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
        <div className="flex items-center mb-2">
          <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
          <h4 className="text-green-800 text-lg font-medium">
            {domainName}{extension} está disponível!
          </h4>
        </div>
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
      <div className="flex items-center mb-2">
        <XCircle className="h-5 w-5 text-red-600 mr-2" />
        <h4 className="text-red-800 text-lg font-medium">
          {domainName}{extension} não está disponível
        </h4>
      </div>
      <p className="text-gray-600 mt-2">
        Este domínio já está registrado por outro proprietário.
      </p>
      
      {searchResult.records && (
        <div className="mt-4 p-3 bg-red-100/50 rounded-lg">
          <p className="text-sm font-medium text-red-700 mb-2">Registros encontrados:</p>
          <ul className="text-xs space-y-1 text-red-700">
            {searchResult.records.nameserver && (
              <li className="flex items-center">
                <AlertCircle className="h-3 w-3 mr-1" />
                Nameservers configurados
              </li>
            )}
            {searchResult.records.a && (
              <li className="flex items-center">
                <AlertCircle className="h-3 w-3 mr-1" />
                Registro A (apontando para um servidor)
              </li>
            )}
            {searchResult.records.txt && (
              <li className="flex items-center">
                <AlertCircle className="h-3 w-3 mr-1" />
                Registros TXT encontrados
              </li>
            )}
            {searchResult.records.dns && (
              <li className="flex items-center">
                <AlertCircle className="h-3 w-3 mr-1" />
                Outros registros DNS presentes
              </li>
            )}
          </ul>
        </div>
      )}
      
      <p className="text-gray-600 mt-4">
        Tente outro nome ou extensão diferente.
      </p>
    </div>
  );
};
