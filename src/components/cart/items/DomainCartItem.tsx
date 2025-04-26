
import React from 'react';
import { CartItem } from '@/types/cart';

interface DomainCartItemProps {
  item: CartItem;
  getContactProfileById: (id: string) => any;
}

export const DomainCartItem: React.FC<DomainCartItemProps> = ({ item, getContactProfileById }) => {
  return (
    <div className="mt-2 text-sm text-gray-600">
      <p>Período: {item.details.registrationPeriod}</p>
      <p>Proteção de privacidade: Incluída</p>
      {item.details.contactProfileId && (
        <p>Perfil de contato: {getContactProfileById(item.details.contactProfileId)?.name || 'Perfil não encontrado'}</p>
      )}
      <p className="mt-2 text-orange-600">
        Renovação: {item.details.renewalPrice?.toLocaleString('pt-AO') || 
          Math.round(item.price / (item.details.contractYears || 1)).toLocaleString('pt-AO')} Kz/ano
      </p>
    </div>
  );
};
