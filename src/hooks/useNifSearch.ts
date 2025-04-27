
import { useState } from 'react';
import { toast } from 'sonner';

interface NifData {
  name?: string;
  nome?: string;
  address?: string;
  endereco?: string;
  [key: string]: any;
}

type SetDataCallback = (data: NifData | null) => void;

export const useNifSearch = (onDataReceived?: SetDataCallback) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNifData = async (nif: string) => {
    if (!nif || nif.length < 8) {
      setError('NIF ou BI deve ter pelo menos 8 caracteres');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://consulta.edgarsingui.ao/public/consultar-por-nif/${nif}`);
      
      if (!response.ok) {
        throw new Error('Erro ao consultar NIF');
      }
      
      const result = await response.json();
      
      if (result.data && result.data.success) {
        const data = {
          nome: result.data.nome,
          endereco: result.data.endereco,
          // Map other fields as needed
        };
        
        if (onDataReceived) {
          onDataReceived(data);
        }
        
        return data;
      } else {
        throw new Error('NIF não encontrado ou inválido');
      }
    } catch (err: any) {
      setError(err.message || 'Erro ao consultar NIF');
      if (onDataReceived) {
        onDataReceived(null);
      }
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, fetchNifData };
};
