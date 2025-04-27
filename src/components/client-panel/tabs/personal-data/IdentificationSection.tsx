
import React from 'react';
import { Input } from "@/components/ui/input";

interface IdentificationSectionProps {
  userData: any;
}

export const IdentificationSection = ({ userData }: IdentificationSectionProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Número de Identificação</label>
        <Input defaultValue={userData?.user_metadata?.id_number || ""} />
      </div>
    </div>
  );
};
