
import React from 'react';
import { Input } from "@/components/ui/input";

interface ContactSectionProps {
  userData: any;
  formData: any;
  onInputChange: (field: string, value: string) => void;
}

export const ContactSection = ({ userData, formData, onInputChange }: ContactSectionProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Telefone</label>
        <Input 
          value={formData?.phone || ""} 
          onChange={(e) => onInputChange('phone', e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">NIF</label>
        <Input 
          value={formData?.nif || ""} 
          onChange={(e) => onInputChange('nif', e.target.value)}
        />
      </div>
    </div>
  );
};
