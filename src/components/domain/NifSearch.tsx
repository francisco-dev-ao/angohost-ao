
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
  error?: string | null;
}

export const NifSearch: React.FC<NifSearchProps> = ({
  nif,
  onNifChange,
  onSearch,
  isLoading,
  error
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
      <Label htmlFor="nif">NIF (Número de Identificação Fiscal) ou BI</Label>
      <div className="flex gap-2">
        <Input
          id="nif"
          value={nif}
          onChange={(e) => onNifChange(e.target.value)}
          onBlur={() => nif.length >= 8 && onSearch()}
          onKeyPress={handleKeyPress}
          placeholder="Digite o NIF ou BI"
          className={`flex-1 ${error ? 'border-red-500' : ''}`}
          maxLength={14}
          minLength={8}
        />
        <Button
          type="button"
          variant="outline"
          onClick={onSearch}
          disabled={isLoading || nif.length < 8}
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
        Ao informar o NIF, preencheremos alguns campos automaticamente.
      </p>
      {isLoading && (
        <div className="flex items-center gap-2 mt-2">
          <Loader2 size={16} className="animate-spin text-primary" />
          <span className="text-sm text-gray-500">Consultando seus dados...</span>
        </div>
      )}
      {error && (
        <p className="text-sm text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
};
