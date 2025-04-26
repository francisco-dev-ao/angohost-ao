
import React from 'react';
import { FormField, FormItem, FormControl } from "@/components/ui/form";
import { CreditCard } from "lucide-react";
import { UseFormReturn } from 'react-hook-form';
import { CheckoutFormData } from '@/schemas/formSchema';

interface PaymentMethodSelectorProps {
  form: UseFormReturn<CheckoutFormData>;
}

export const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="paymentMethod"
      render={({ field }) => (
        <FormItem>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div 
              className={`flex items-center p-4 border rounded-lg cursor-pointer ${field.value === 'emis' ? 'border-primary bg-blue-50' : 'bg-white'}`}
              onClick={() => form.setValue('paymentMethod', 'emis')}
            >
              <FormControl>
                <input
                  type="radio"
                  checked={field.value === 'emis'}
                  onChange={() => {}}
                  className="mr-3"
                />
              </FormControl>
              <div className="flex items-center">
                <CreditCard className="h-6 w-6 mr-2 text-gray-500" />
                <label>Multicaixa Express</label>
              </div>
            </div>
            
            <div 
              className={`flex items-center p-4 border rounded-lg cursor-pointer ${field.value === 'credit-card' ? 'border-primary bg-blue-50' : 'bg-white'}`}
              onClick={() => form.setValue('paymentMethod', 'credit-card')}
            >
              <FormControl>
                <input
                  type="radio"
                  checked={field.value === 'credit-card'}
                  onChange={() => {}}
                  className="mr-3"
                />
              </FormControl>
              <div className="flex items-center">
                <CreditCard className="h-6 w-6 mr-2 text-gray-500" />
                <label>Cartão de Crédito</label>
              </div>
            </div>
            
            <div 
              className={`flex items-center p-4 border rounded-lg cursor-pointer ${field.value === 'bank-transfer' ? 'border-primary bg-blue-50' : 'bg-white'}`}
              onClick={() => form.setValue('paymentMethod', 'bank-transfer')}
            >
              <FormControl>
                <input
                  type="radio"
                  checked={field.value === 'bank-transfer'}
                  onChange={() => {}}
                  className="mr-3"
                />
              </FormControl>
              <div className="flex items-center">
                <CreditCard className="h-6 w-6 mr-2 text-gray-500" />
                <label>Transferência Bancária</label>
              </div>
            </div>
          </div>
        </FormItem>
      )}
    />
  );
};
