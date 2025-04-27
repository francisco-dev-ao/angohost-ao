
import React from 'react';
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ContactProfile } from '@/types/cart';

interface ProfileFormProps {
  title: string;
  description: string;
  profile: Omit<ContactProfile, 'id'>;
  onProfileChange: (field: keyof Omit<ContactProfile, 'id'>, value: string) => void;
  onSubmit: () => void;
  submitLabel: string;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({
  title,
  description,
  profile,
  onProfileChange,
  onSubmit,
  submitLabel,
}) => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Nome *</Label>
            <Input 
              id="name" 
              value={profile.name} 
              onChange={(e) => onProfileChange('name', e.target.value)}
              placeholder="Nome completo ou empresa"
            />
          </div>
          <div>
            <Label htmlFor="email">Email *</Label>
            <Input 
              id="email" 
              type="email" 
              value={profile.email} 
              onChange={(e) => onProfileChange('email', e.target.value)}
              placeholder="email@exemplo.com"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="phone">Telefone</Label>
            <Input 
              id="phone" 
              value={profile.phone} 
              onChange={(e) => onProfileChange('phone', e.target.value)}
              placeholder="Número de telefone"
            />
          </div>
          <div>
            <Label htmlFor="nif">NIF</Label>
            <Input 
              id="nif" 
              value={profile.nif} 
              onChange={(e) => onProfileChange('nif', e.target.value)}
              placeholder="Número de NIF"
            />
          </div>
        </div>
        <div>
          <Label htmlFor="billingAddress">Endereço</Label>
          <Input 
            id="billingAddress" 
            value={profile.billingAddress} 
            onChange={(e) => onProfileChange('billingAddress', e.target.value)}
            placeholder="Endereço completo"
          />
        </div>
        <div>
          <Label htmlFor="city">Cidade</Label>
          <Input 
            id="city" 
            value={profile.city} 
            onChange={(e) => onProfileChange('city', e.target.value)}
            placeholder="Cidade"
          />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit" onClick={onSubmit}>{submitLabel}</Button>
      </DialogFooter>
    </DialogContent>
  );
};
