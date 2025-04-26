
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Loader2, Search } from 'lucide-react';

interface NifSearchProps {
  nif: string;
  onNifChange: (nif: string) => void;
  onSearch: () => void;
  isLoading: boolean;
}

export const NifSearch: React.FC<NifSearchProps> = ({
  nif,
  onNifChange,
  onSearch,
  isLoading
}) => {
  // Função para lidar com a tecla Enter no input
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSearch();
    }
  };

  return (
    <div className="mb-6">
      <Label htmlFor="nif">NIF (Número de Identificação Fiscal)</Label>
      <div className="flex gap-2">
        <Input
          id="nif"
          value={nif}
          onChange={(e) => onNifChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Digite o NIF"
          className="flex-1"
          maxLength={9}
          minLength={9}
        />
        <Button
          type="button"
          variant="outline"
          onClick={onSearch}
          disabled={isLoading || nif.length < 9}
          className="flex items-center gap-1"
        >
          {isLoading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              <span>Consultando...</span>
            </>
          ) : (
            <>
              <Search size={16} />
              <span>Consultar</span>
            </>
          )}
        </Button>
      </div>
      <p className="text-xs text-gray-500 mt-1">
        Digite o NIF para preencher automaticamente os dados da empresa.
      </p>
    </div>
  );
};
