
import React from 'react';
import { ClientDetailsForm } from '../ClientDetailsForm';
import { Button } from '@/components/ui/button';
import { ContactProfile } from '@/types/cart';
import { NifSearch } from '../NifSearch';

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
