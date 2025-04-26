
import React from 'react';
import { CartItem, ContactProfile } from '@/types/cart';

interface DomainCartItemProps {
  item: CartItem;
  getContactProfileById: (id: string) => ContactProfile | null;
}

export const DomainCartItem: React.FC<DomainCartItemProps> = ({ item, getContactProfileById }) => {
  const contactProfile = item.details.contactProfileId 
    ? getContactProfileById(item.details.contactProfileId)
    : null;
    
  return (
    <div className="mt-2 text-sm text-gray-600">
      <p>Período: {item.details.registrationPeriod}</p>
      <p>Proteção de privacidade: Incluída</p>
      {contactProfile && (
        <p>Perfil de contato: {contactProfile.profileName || contactProfile.name || 'Perfil não encontrado'}</p>
      )}
      <p className="mt-2 text-orange-600">
        Renovação: {item.details.renewalPrice?.toLocaleString('pt-AO') || 
          Math.round(item.price / (item.details.contractYears || 1)).toLocaleString('pt-AO')} Kz/ano
      </p>
    </div>
  );
};
