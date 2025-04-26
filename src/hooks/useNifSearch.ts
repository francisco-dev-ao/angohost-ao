
import { useState } from 'react';
import { toast } from 'sonner';
import { Customer } from '@/types/cart';

export const useNifSearch = (
  setRegisterData: React.Dispatch<React.SetStateAction<Customer & { password: string }>>
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNifData = async (nif: string) => {
    if (!nif || nif.trim().length < 8) {
      setError("NIF ou BI inválido");
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      toast.info("Consultando dados do NIF...");
      
      const response = await fetch(`https://consulta.edgarsingui.ao/consultar-por-nif/${nif}`);
      
      if (!response.ok) {
        throw new Error('Falha ao consultar o NIF');
      }
      
      const result = await response.json();
      
      // Verificar se a resposta possui o campo "data" com "success" igual a true
      if (result && result.data && result.data.success === true) {
        const data = result.data;
        setRegisterData(prev => ({
          ...prev,
          name: data.nome || prev.name,
          phone: data.numero_contacto || prev.phone,
          city: data.provincia || prev.city,
          billingAddress: data.endereco || prev.billingAddress
        }));
        toast.success("Dados do contribuinte carregados com sucesso!");
        return true;
      } else {
        setError("NIF não encontrado ou sem dados associados.");
        toast.error("NIF não encontrado ou sem dados associados.");
        return false;
      }
    } catch (error) {
      console.error("Error fetching NIF data:", error);
      setError("Erro ao consultar o NIF. Tente novamente.");
      toast.error("Erro ao consultar o NIF. Tente novamente.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, fetchNifData };
};
