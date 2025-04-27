
import React from 'react';
import { Input } from "@/components/ui/input";

interface AddressSectionProps {
  userData: any;
  formData?: any;
  onInputChange?: (field: string, value: string) => void;
}

export const AddressSection = ({ userData, formData, onInputChange }: AddressSectionProps) => {
  return (
    <>
      <div className="space-y-2">
        <label className="text-sm font-medium">Endereço</label>
        <Input 
          value={formData?.billing_address || userData?.user_metadata?.billing_address || ""} 
          onChange={(e) => onInputChange && onInputChange('billing_address', e.target.value)}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Cidade</label>
          <Input 
            value={formData?.city || userData?.user_metadata?.city || ""} 
            onChange={(e) => onInputChange && onInputChange('city', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Código Postal</label>
          <Input 
            value={formData?.postal_code || userData?.user_metadata?.postal_code || ""} 
            onChange={(e) => onInputChange && onInputChange('postal_code', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">País</label>
          <Input 
            defaultValue="Angola" 
            readOnly 
          />
        </div>
      </div>
    </>
  );
};
