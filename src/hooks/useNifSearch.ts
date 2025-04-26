
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
      
      // URL corrigida com base no exemplo fornecido (sem o "public/" no caminho)
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
      } else {
        toast.error("NIF não encontrado ou sem dados associados.");
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
