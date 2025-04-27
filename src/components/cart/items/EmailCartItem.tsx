
import React from 'react';
import { CartItem } from '@/types/cart';

interface EmailCartItemProps {
  item: CartItem;
}

export const EmailCartItem: React.FC<EmailCartItemProps> = ({ item }) => {
  return (
    <div className="mt-2 text-sm text-gray-600">
      <p>Armazenamento: {item.details.storage}</p>
      <p>Proteção anti-spam: {item.details.antispam}</p>
      {item.details.quantity && (
        <p>Quantidade: {item.details.quantity} contas</p>
      )}
      <p>Período: {item.details.contractYears} {item.details.contractYears === 1 ? 'ano' : 'anos'}</p>
      <p className="mt-2 text-orange-600">
        Renovação: {item.details.renewalPrice?.toLocaleString('pt-AO')} Kz/ano por conta
      </p>
    </div>
  );
};
