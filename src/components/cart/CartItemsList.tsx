
import React from 'react';
import { CartItem } from '@/types/cart';
import { HostingCartItem } from './items/HostingCartItem';
import { EmailCartItem } from './items/EmailCartItem';
import { DomainCartItem } from './items/DomainCartItem';
import { Office365CartItem } from './items/Office365CartItem';
import { CartItemActions } from './items/CartItemActions';

interface CartItemsListProps {
  items: CartItem[];
  onRemoveItem: (id: string) => void;
  getContactProfileById: (id: string) => any;
}

export const CartItemsList: React.FC<CartItemsListProps> = ({
  items,
  onRemoveItem,
  getContactProfileById
}) => {
  const renderItemDetails = (item: CartItem) => {
    switch (item.type) {
      case 'hosting':
        return <HostingCartItem item={item} />;
      case 'email':
        return <EmailCartItem item={item} />;
      case 'domain':
        return <DomainCartItem item={item} getContactProfileById={getContactProfileById} />;
      case 'office365':
        return <Office365CartItem item={item} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Itens do Carrinho</h2>
      </div>
      
      <div className="border-t">
        {items.map((item) => (
          <div key={item.id} className="p-6 border-b">
            <div className="flex flex-col md:flex-row justify-between">
              <div>
                <h3 className="font-medium text-lg">{item.name}</h3>
                {renderItemDetails(item)}
              </div>
              <CartItemActions 
                price={item.price}
                period={item.period}
                onRemove={() => onRemoveItem(item.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
