
import React from 'react';
import { Input } from "@/components/ui/input";

interface BasicInfoProps {
  userData: any;
  formData?: any;
  onInputChange?: (field: string, value: string) => void;
}

export const BasicInfoSection = ({ userData, formData, onInputChange }: BasicInfoProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Nome Completo</label>
        <Input 
          value={formData?.full_name || userData?.user_metadata?.full_name || ""} 
          onChange={(e) => onInputChange && onInputChange('full_name', e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Email</label>
        <Input 
          value={formData?.email || userData?.email || ""} 
          readOnly 
          disabled 
        />
      </div>
    </div>
  );
};
