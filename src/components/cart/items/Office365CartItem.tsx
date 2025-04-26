
import React from 'react';
import { CartItem } from '@/types/cart';

interface Office365CartItemProps {
  item: CartItem;
}

export const Office365CartItem: React.FC<Office365CartItemProps> = ({ item }) => {
  return (
    <div className="mt-2 text-sm text-gray-600">
      <p>Usuários: {item.details.users}</p>
      <p>Período: {item.details.contractYears} {item.details.contractYears === 1 ? 'ano' : 'anos'}</p>
      <p className="mt-2 text-orange-600">
        Renovação: {item.details.renewalPrice?.toLocaleString('pt-AO')} Kz/ano
      </p>
    </div>
  );
};
