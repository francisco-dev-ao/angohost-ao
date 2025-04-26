
import React from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Building, User, Mail, Phone } from "lucide-react";
import { CheckoutFormData, checkoutFormSchema } from "@/schemas/formSchema";
import { toast } from "sonner";

interface BillingFormProps {
  onSubmit: (data: CheckoutFormData) => void;
  defaultValues?: Partial<CheckoutFormData>;
  isLoading?: boolean;
}

export const BillingForm: React.FC<BillingFormProps> = ({
  onSubmit,
  defaultValues,
  isLoading
}) => {
  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      name: defaultValues?.name || '',
      email: defaultValues?.email || '',
      phone: defaultValues?.phone || '',
      nif: defaultValues?.nif || '',
      billingAddress: defaultValues?.billingAddress || '',
      city: defaultValues?.city || '',
      paymentMethod: defaultValues?.paymentMethod || 'emis'
    }
  });

  const fetchNifData = async (nif: string) => {
    if (nif.length !== 9) return;
    
    try {
      toast.info("Consultando dados do NIF...");
      
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
        // Fallback for demo purposes
        setTimeout(() => {
          if (nif === '123456789') {
            form.setValue('name', 'António Silva');
            form.setValue('city', 'Luanda');
            form.setValue('billingAddress', 'Rua dos Engenheiros, 123');
            toast.success("Dados do contribuinte carregados com sucesso!");
          } else {
            toast.warning("NIF não encontrado na base de dados");
          }
        }, 1000);
      }
    } catch (error) {
      toast.error("Erro ao consultar o NIF. Tente novamente.");
      console.error("Error fetching NIF data:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="nif"
            render={({ field }) => (
              <FormItem>
                <FormLabel>NIF (Número de Contribuinte) *</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input 
                      {...field}
                      placeholder="Insira seu NIF" 
                      className="pl-10 bg-white"
                      onChange={(e) => {
                        field.onChange(e);
                        if (e.target.value.length === 9) {
                          fetchNifData(e.target.value);
                        }
                      }}
                    />
                  </FormControl>
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome Completo *</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input 
                      {...field} 
                      placeholder="Seu nome completo" 
                      className="pl-10 bg-white"
                    />
                  </FormControl>
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email *</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input 
                      {...field} 
                      type="email" 
                      placeholder="seu.email@exemplo.com" 
                      className="pl-10 bg-white"
                    />
                  </FormControl>
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefone *</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input 
                      {...field} 
                      placeholder="Seu número de telefone" 
                      className="pl-10 bg-white"
                    />
                  </FormControl>
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cidade *</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    placeholder="Cidade" 
                    className="bg-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="billingAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Endereço *</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    placeholder="Seu endereço completo" 
                    className="bg-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex space-x-4 pt-6">
          <Button 
            type="submit" 
            disabled={isLoading} 
            className="flex-1 bg-primary hover:bg-primary/90"
          >
            {isLoading ? 'Processando...' : 'Prosseguir com Pagamento'}
          </Button>
        </div>
      </form>
    </Form>
  );
};
