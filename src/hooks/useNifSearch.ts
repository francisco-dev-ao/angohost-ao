
import { useState } from 'react';
import { toast } from 'sonner';
import { Customer } from '@/types/cart';

export const useNifSearch = (
  setRegisterData: React.Dispatch<React.SetStateAction<Customer & { password: string }>>
) => {
  const [isLoading, setIsLoading] = useState(false);

  const fetchNifData = async (nif: string) => {
    setIsLoading(true);
    try {
      toast.info("Consultando dados do NIF...");
      
      const response = await fetch(`http://consulta.edgarsingui.ao/public/consultar-por-nif/${nif}`);
      
      if (!response.ok) {
        throw new Error('Falha ao consultar o NIF');
      }
      
      const data = await response.json();
      
      if (data) {
        setRegisterData(prev => ({
          ...prev,
          name: data.nome || prev.name,
          city: data.provincia || prev.city,
          billingAddress: data.endereco || prev.billingAddress
        }));
        toast.success("Dados do contribuinte carregados com sucesso!");
      } else {
        toast.error("NIF não encontrado.");
      }
    } catch (error) {
      console.error("Error fetching NIF data:", error);
      toast.error("Erro ao consultar o NIF. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, fetchNifData };
};
