
import React from 'react';
import { CartItem } from '@/types/cart';

interface DedicatedServerCartItemProps {
  item: CartItem;
}

export const DedicatedServerCartItem: React.FC<DedicatedServerCartItemProps> = ({ item }) => {
  return (
    <div className="mt-2 text-sm text-gray-600">
      <p>CPU: {item.details.cpu}</p>
      <p>Memória RAM: {item.details.ram}</p>
      <p>Armazenamento: {item.details.storage}</p>
      <p>Largura de banda: {item.details.bandwidth}</p>
      <p>Período: {item.details.contractYears} {item.details.contractYears === 1 ? 'ano' : 'anos'}</p>
      <p className="mt-2 text-orange-600">
        Renovação: {item.details.renewalPrice?.toLocaleString('pt-AO')} Kz/ano
      </p>
    </div>
  );
};
