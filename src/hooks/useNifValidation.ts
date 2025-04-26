
import { useState } from 'react';
import { toast } from 'sonner';

interface NifResponse {
  nome: string;
  numero_contacto?: string;
  endereco?: string;
}

export const useNifValidation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateNif = async (nif: string): Promise<NifResponse | null> => {
    if (!nif || nif.length < 8) {
      setError("NIF ou BI inválido");
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://consulta.edgarsingui.ao/consultar-por-nif/${nif}`);
      const result = await response.json();

      if (result?.data?.success) {
        setError(null);
        toast.success("Dados do NIF carregados com sucesso!");
        return result.data;
      }

      setError("NIF não encontrado ou sem dados associados.");
      toast.error("NIF não encontrado ou sem dados associados.");
      return null;
    } catch (error) {
      const errorMessage = "Erro ao consultar o NIF. Tente novamente.";
      setError(errorMessage);
      toast.error(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, validateNif };
};
