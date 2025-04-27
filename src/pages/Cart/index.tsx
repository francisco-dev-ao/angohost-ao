
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { CartHeader } from '@/components/cart/CartHeader';
import { CartItemsList } from '@/components/cart/CartItemsList';
import { OrderSummary } from '@/components/checkout/OrderSummary';
import { EmptyCart } from '@/components/cart/EmptyCart';

const Cart = () => {
  const navigate = useNavigate();
  const { items, removeItem, getTotalPrice, generateOrderReference } = useCart();

  const handleCheckout = () => {
    // Generate payment details to pass to the checkout page
    const paymentDetails = {
      amount: getTotalPrice(),
      reference: generateOrderReference(),
      description: `Pedido com ${items.length} ${items.length === 1 ? 'item' : 'itens'}`
    };
    
    // Navigate to checkout with payment details
    navigate('/checkout', { state: paymentDetails });
  };

  // Provide a dummy implementation for getContactProfileById
  const getContactProfileById = (id: string) => {
    return null; // This will be replaced with actual implementation when needed
  };

  if (items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <CartHeader />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <CartItemsList 
            items={items} 
            onRemoveItem={removeItem} 
            getContactProfileById={getContactProfileById}
          />
        </div>
        <div>
          <OrderSummary 
            items={items} 
            getTotalPrice={getTotalPrice} 
            onCheckout={handleCheckout}
          />
        </div>
      </div>
    </div>
  );
};

export default Cart;
