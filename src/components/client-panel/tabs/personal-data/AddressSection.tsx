
import React from 'react';
import { Input } from "@/components/ui/input";

interface AddressSectionProps {
  userData: any;
}

export const AddressSection = ({ userData }: AddressSectionProps) => {
  return (
    <>
      <div className="space-y-2">
        <label className="text-sm font-medium">Endereço</label>
        <Input defaultValue={userData?.user_metadata?.billing_address || ""} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Cidade</label>
          <Input defaultValue={userData?.user_metadata?.city || ""} />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Código Postal</label>
          <Input defaultValue={userData?.user_metadata?.postal_code || ""} />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">País</label>
          <Input defaultValue="Angola" readOnly />
        </div>
      </div>
    </>
  );
};
