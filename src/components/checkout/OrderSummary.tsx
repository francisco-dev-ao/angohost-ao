
import React from 'react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CartItem } from '@/types/cart';

interface OrderSummaryProps {
  items: CartItem[];
  getTotalPrice: () => number;
  onCheckout?: () => void;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({ 
  items, 
  getTotalPrice,
  onCheckout 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
      <h2 className="text-xl font-semibold mb-4">Resumo do Pedido</h2>
      
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between">
            <span className="text-gray-600">{item.name}</span>
            <span>
              {item.price.toLocaleString('pt-AO')} Kz
              {item.period === 'monthly' ? '/mês' : '/ano'}
            </span>
          </div>
        ))}
      </div>
      
      <Separator className="my-6" />
      
      <div className="flex justify-between font-semibold text-lg">
        <span>Total</span>
        <span>{getTotalPrice().toLocaleString('pt-AO')} Kz</span>
      </div>
      
      {onCheckout && (
        <Button 
          onClick={onCheckout}
          className="w-full mt-6"
        >
          Finalizar Compra
        </Button>
      )}
      
      <div className="mt-6 bg-blue-50 p-4 rounded-md border border-blue-100">
        <h3 className="font-medium text-primary mb-2">Informações Importantes</h3>
        <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
          <li>Sua compra será processada imediatamente após a confirmação do pagamento</li>
          <li>A fatura será enviada para o email fornecido</li>
          <li>Suporte técnico disponível 24/7</li>
        </ul>
      </div>
    </div>
  );
};
