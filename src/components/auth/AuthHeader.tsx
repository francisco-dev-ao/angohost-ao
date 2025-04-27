
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useCart } from '@/context/CartContext';

export const AuthHeader = () => {
  const location = useLocation();
  const { items } = useCart();
  const redirectPath = sessionStorage.getItem('redirect_after_login') || '';
  const isRedirecting = redirectPath && redirectPath !== '/dashboard';
  const hasItemsInCart = items.length > 0;
  
  return (
    <div className="text-center mb-8">
      <img 
        src="/ANGOHOST-01.png" 
        alt="ANGOHOST" 
        className="h-16 mx-auto mb-6" 
      />
      <h1 className="text-3xl font-bold mb-2">Acesse a sua conta</h1>
      <p className="text-gray-500">Bem-vindo de volta! Por favor, insira seus detalhes</p>
      
      {isRedirecting && (
        <div className="mt-4 text-sm text-blue-600">
          Após o login, você será redirecionado para finalizar sua compra.
        </div>
      )}
      
      {!isRedirecting && hasItemsInCart && (
        <div className="mt-4 text-sm text-blue-600">
          Você tem itens no carrinho! Após o login, você poderá finalizar sua compra.
        </div>
      )}
    </div>
  );
};
