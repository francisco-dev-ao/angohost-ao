
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

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
  return (
    <div className="mb-6">
      <Label htmlFor="nif">NIF (Número de Identificação Fiscal)</Label>
      <div className="flex gap-2">
        <Input
          id="nif"
          value={nif}
          onChange={(e) => onNifChange(e.target.value)}
          placeholder="Digite o NIF"
          className="flex-1"
        />
        <Button
          type="button"
          variant="outline"
          onClick={onSearch}
          disabled={isLoading}
        >
          {isLoading ? 'Consultando...' : 'Consultar'}
        </Button>
      </div>
      <p className="text-xs text-gray-500 mt-1">
        Digite o NIF para preencher automaticamente os dados da empresa.
      </p>
    </div>
  );
};
