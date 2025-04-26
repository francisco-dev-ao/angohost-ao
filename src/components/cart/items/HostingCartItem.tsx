
import React from 'react';
import { CartItem } from '@/types/cart';

interface HostingCartItemProps {
  item: CartItem;
}

export const HostingCartItem: React.FC<HostingCartItemProps> = ({ item }) => {
  return (
    <div className="mt-2 text-sm text-gray-600">
      <p>Espaço em disco: {item.details.diskSpace}</p>
      <p>Contas de email: {item.details.emailAccounts}</p>
      <p>Bancos de dados: {item.details.databases}</p>
      <p>Período: {item.details.contractYears} {item.details.contractYears === 1 ? 'ano' : 'anos'}</p>
      <p className="mt-2 text-orange-600">
        Renovação: {item.details.renewalPrice?.toLocaleString('pt-AO')} Kz/ano
      </p>
    </div>
  );
};
