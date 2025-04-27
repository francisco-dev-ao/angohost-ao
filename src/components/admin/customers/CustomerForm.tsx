
import React, { useState, useEffect } from 'react';
import { simulateDbOperation } from '@/integrations/postgres/client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const customerSchema = z.object({
  name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().optional(),
  nif: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  postal_code: z.string().optional(),
  country: z.string().default('Angola'),
});

type CustomerFormValues = z.infer<typeof customerSchema>;

interface CustomerFormProps {
  customerId?: string | null;
  onSuccess: () => void;
}

export const CustomerForm: React.FC<CustomerFormProps> = ({ customerId, onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<CustomerFormValues>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      nif: '',
      address: '',
      city: '',
      postal_code: '',
      country: 'Angola',
    },
  });
  
  // Carregar dados do cliente se estiver editando
  useEffect(() => {
    const fetchCustomerData = async () => {
      if (!customerId) return;
      
      try {
        setIsLoading(true);
        // Simulação da busca de dados do cliente
        const { success, data, error } = await simulateDbOperation('get_customer_by_id', { customerId });
        
        if (!success || error) {
          throw new Error(error || 'Falha ao buscar dados do cliente');
        }
        
        // Para demonstração, vamos criar alguns dados fictícios baseados no ID
        const mockCustomerData = {
          name: customerId === '1' ? 'Carlos Silva' : 'Cliente ' + customerId,
          email: customerId === '1' ? 'carlos.silva@example.com' : `cliente${customerId}@example.com`,
          phone: '+244 9' + customerId + '3 456 789',
          nif: '123456' + customerId,
          address: 'Rua Principal, ' + customerId,
          city: customerId === '1' ? 'Luanda' : 'Cidade ' + customerId,
          postal_code: customerId === '1' ? '999-888' : '000-' + customerId,
          country: 'Angola',
        };
        
        // Preencher o formulário com os dados do cliente
        form.reset(mockCustomerData);
      } catch (error) {
        console.error('Erro ao buscar dados do cliente:', error);
        toast.error('Erro ao carregar dados do cliente');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCustomerData();
  }, [customerId, form]);
  
  const onSubmit = async (data: CustomerFormValues) => {
    try {
      setIsLoading(true);
      
      const operation = customerId ? 'update_customer' : 'create_customer';
      const operationData = customerId ? { ...data, id: customerId } : data;
      
      const { success, error } = await simulateDbOperation(operation, operationData);
      
      if (!success || error) {
        throw new Error(error || `Falha ao ${customerId ? 'atualizar' : 'criar'} cliente`);
      }
      
      toast.success(`Cliente ${customerId ? 'atualizado' : 'criado'} com sucesso!`);
      onSuccess();
    } catch (error) {
      console.error(`Erro ao ${customerId ? 'atualizar' : 'criar'} cliente:`, error);
      toast.error(`Erro ao ${customerId ? 'atualizar' : 'criar'} cliente`);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Nome completo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="email@exemplo.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefone</FormLabel>
                <FormControl>
                  <Input placeholder="+244 000 000 000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="nif"
            render={({ field }) => (
              <FormItem>
                <FormLabel>NIF</FormLabel>
                <FormControl>
                  <Input placeholder="Número de Identificação Fiscal" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Endereço</FormLabel>
                <FormControl>
                  <Input placeholder="Endereço" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cidade</FormLabel>
                <FormControl>
                  <Input placeholder="Cidade" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="postal_code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Código Postal</FormLabel>
                <FormControl>
                  <Input placeholder="Código Postal" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>País</FormLabel>
                <FormControl>
                  <Input placeholder="País" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onSuccess}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Processando...' : customerId ? 'Atualizar Cliente' : 'Criar Cliente'}
          </Button>
        </div>
      </form>
    </Form>
  );
};
