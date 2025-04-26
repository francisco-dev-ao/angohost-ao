
import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { CheckoutFormData } from '@/schemas/formSchema';
import { toast } from 'sonner';

export const useBillingNif = (form: UseFormReturn<CheckoutFormData>) => {
  const [isNifLoading, setIsNifLoading] = useState(false);

  const handleNifBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const nif = e.target.value;
    if (nif.length >= 8) {
      setIsNifLoading(true);
      
      try {
        const response = await fetch(`https://consulta.edgarsingui.ao/public/consultar-por-nif/${nif}`);
        if (response.ok) {
          const data = await response.json();
          
          if (data && data.nome) {
            form.setValue('name', data.nome);
            form.setValue('city', data.provincia || '');
            form.setValue('billingAddress', data.endereco || '');
            
            toast.success("Dados do contribuinte carregados com sucesso!");
          } else {
            toast.warning("NIF encontrado, mas sem dados adicionais");
          }
        } else {
          toast.error("NIF não encontrado");
        }
      } catch (error) {
        console.error("NIF API error:", error);
        toast.error("Erro ao consultar o NIF. Tente novamente.");
      } finally {
        setIsNifLoading(false);
      }
    }
  };

  return {
    isNifLoading,
    handleNifBlur
  };
};
