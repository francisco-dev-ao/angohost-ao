
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

export const EmptyCart = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-8 text-center">
      <div className="flex justify-center mb-4">
        <ShoppingCart className="w-16 h-16 text-gray-400" />
      </div>
      <h2 className="text-2xl font-semibold mb-4">Seu carrinho está vazio</h2>
      <p className="text-gray-600 mb-8">
        Adicione produtos ao seu carrinho para continuar.
      </p>
      <Button asChild>
        <Link to="/">Continuar Comprando</Link>
      </Button>
    </div>
  );
};
