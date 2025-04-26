
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Building, User, Mail, Phone } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { CheckoutFormData } from "@/schemas/formSchema";

interface BillingFormFieldsProps {
  form: UseFormReturn<CheckoutFormData>;
  isNifLoading: boolean;
  onNifBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export const BillingFormFields: React.FC<BillingFormFieldsProps> = ({
  form,
  isNifLoading,
  onNifBlur
}) => {
  return (
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
                  disabled={isNifLoading}
                  onBlur={onNifBlur}
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
  );
};
