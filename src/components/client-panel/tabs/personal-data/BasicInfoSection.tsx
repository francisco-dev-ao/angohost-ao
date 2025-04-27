
import React from 'react';
import { Input } from "@/components/ui/input";

interface BasicInfoProps {
  userData: any;
}

export const BasicInfoSection = ({ userData }: BasicInfoProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Nome Completo</label>
        <Input defaultValue={userData?.user_metadata?.full_name || ""} />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Email</label>
        <Input defaultValue={userData?.email || ""} readOnly disabled />
      </div>
    </div>
  );
};
