
import React from 'react';
import { Input } from "@/components/ui/input";

interface IdentificationSectionProps {
  userData: any;
  formData?: any;
  onInputChange?: (field: string, value: string) => void;
}

export const IdentificationSection = ({ userData, formData, onInputChange }: IdentificationSectionProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Número de Identificação</label>
        <Input 
          value={formData?.id_number || userData?.user_metadata?.id_number || ""} 
          onChange={(e) => onInputChange && onInputChange('id_number', e.target.value)}
        />
      </div>
    </div>
  );
};
