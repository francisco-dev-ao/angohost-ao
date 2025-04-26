
import React from 'react';
import { ClientDetailsForm } from '../ClientDetailsForm';
import { Button } from '@/components/ui/button';
import { ContactProfile } from '@/types/cart';
import { NifSearch } from '../NifSearch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ProfileFormProps {
  nif: string;
  onNifChange: (nif: string) => void;
  onNifSearch: () => void;
  isNifLoading: boolean;
  nifError: string | null;
  newProfile: Omit<ContactProfile, 'id'>;
  onInputChange: (field: keyof Omit<ContactProfile, 'id'>, value: string) => void;
  onCreateProfile: () => void;
  onCancel: () => void;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({
  nif,
  onNifChange,
  onNifSearch,
  isNifLoading,
  nifError,
  newProfile,
  onInputChange,
  onCreateProfile,
  onCancel
}) => {
  return (
    <div className="py-4">
      <div className="mb-6">
        <div className="mb-4">
          <Label htmlFor="profileName" className="font-medium">Nome do Perfil</Label>
          <Input
            id="profileName"
            value={newProfile.profileName || ''}
            onChange={(e) => onInputChange('profileName', e.target.value)}
            placeholder="Nome para identificar este perfil"
            className="mt-1"
          />
          <p className="text-xs text-gray-500 mt-1">
            Um nome para identificar facilmente este perfil de contato
          </p>
        </div>
        
        <NifSearch
          nif={nif}
          onNifChange={onNifChange}
          onSearch={onNifSearch}
          isLoading={isNifLoading}
          error={nifError}
        />
      </div>

      <ClientDetailsForm
        details={{
          name: newProfile.name,
          responsibleName: newProfile.name,
          idNumber: newProfile.idNumber || '',
          province: '',
          city: newProfile.city,
          address: newProfile.billingAddress,
          postalCode: newProfile.postalCode || '',
          email: newProfile.email,
          phone: newProfile.phone
        }}
        onInputChange={(field, value) => {
          const mappedField = mapClientDetailsToProfile(field);
          if (mappedField) {
            onInputChange(mappedField, value);
          }
        }}
      />
      
      <div className="mt-6 flex justify-end space-x-2">
        <Button variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button onClick={onCreateProfile}>
          Criar Perfil
        </Button>
      </div>
    </div>
  );
};

// Helper function to map ClientDetails fields to ContactProfile fields
const mapClientDetailsToProfile = (field: string): keyof Omit<ContactProfile, 'id'> | null => {
  const mapping: { [key: string]: keyof Omit<ContactProfile, 'id'> } = {
    name: 'name',
    email: 'email',
    phone: 'phone',
    address: 'billingAddress',
    city: 'city',
    postalCode: 'postalCode',
    idNumber: 'idNumber'
  };
  return mapping[field] || null;
};
