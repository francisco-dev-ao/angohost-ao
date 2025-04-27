
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Save, Loader2 } from 'lucide-react';
import { User as SupabaseUser } from '@supabase/supabase-js';

interface UserDataFormProps {
  userData: {
    fullName: string;
    phone: string;
    address: string;
    city: string;
    nif: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  loading: boolean;
}

export const UserDataForm = ({ userData, handleChange, handleSubmit, loading }: UserDataFormProps) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="fullName">Nome Completo</Label>
          <Input 
            id="fullName" 
            name="fullName" 
            value={userData.fullName} 
            onChange={handleChange} 
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="phone">Telefone</Label>
          <Input 
            id="phone" 
            name="phone" 
            value={userData.phone} 
            onChange={handleChange} 
          />
        </div>
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="address">Endereço de Cobrança</Label>
        <Input 
          id="address" 
          name="address" 
          value={userData.address} 
          onChange={handleChange} 
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="city">Cidade</Label>
          <Input 
            id="city" 
            name="city" 
            value={userData.city} 
            onChange={handleChange} 
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="nif">NIF</Label>
          <Input 
            id="nif" 
            name="nif" 
            value={userData.nif} 
            onChange={handleChange} 
          />
        </div>
      </div>
      
      <Button type="submit" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
            Salvando...
          </>
        ) : (
          <>
            <Save className="h-4 w-4 mr-2" />
            Salvar Alterações
          </>
        )}
      </Button>
    </form>
  );
};
