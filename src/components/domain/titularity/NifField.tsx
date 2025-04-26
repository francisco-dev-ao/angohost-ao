
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from 'lucide-react';

interface NifFieldProps {
  isLoading: boolean;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export const NifField: React.FC<NifFieldProps> = ({ isLoading, onBlur }) => {
  return (
    <FormField
      name="ownerNif"
      render={({ field }) => (
        <FormItem>
          <FormLabel>NIF/BI do Proprietário</FormLabel>
          <FormControl>
            <div className="relative">
              <Input 
                {...field} 
                placeholder="Digite o NIF ou BI"
                onBlur={onBlur}
                disabled={isLoading}
              />
              {isLoading && (
                <div className="absolute right-3 top-3">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
