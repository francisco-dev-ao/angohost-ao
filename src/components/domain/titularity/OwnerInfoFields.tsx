
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export const OwnerInfoFields = () => {
  return (
    <>
      <FormField
        name="ownerName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nome do Proprietário</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Nome completo" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          name="ownerContact"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefone</FormLabel>
              <FormControl>
                <Input placeholder="Ex: 923456789" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          name="ownerEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="exemplo@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <FormField
        name="organizationName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nome da Organização (opcional)</FormLabel>
            <FormControl>
              <Input placeholder="Nome da empresa ou organização" {...field} />
            </FormControl>
            <FormDescription>
              Para registros empresariais ou institucionais.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
