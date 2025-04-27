
import React from 'react';
import { Input } from "@/components/ui/input";

interface ContactSectionProps {
  userData: any;
}

export const ContactSection = ({ userData }: ContactSectionProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Telefone</label>
        <Input defaultValue={userData?.user_metadata?.phone || ""} />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">NIF</label>
        <Input defaultValue={userData?.user_metadata?.nif || ""} />
      </div>
    </div>
  );
};
