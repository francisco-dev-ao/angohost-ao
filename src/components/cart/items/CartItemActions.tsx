
import React from 'react';
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { toast } from 'sonner';

interface CartItemActionsProps {
  price: number;
  period: string;
  onRemove: () => void;
}

export const CartItemActions: React.FC<CartItemActionsProps> = ({ price, period, onRemove }) => {
  return (
    <div className="flex flex-col md:items-end mt-4 md:mt-0">
      <span className="font-semibold text-lg">
        {price.toLocaleString('pt-AO')} Kz
        {period === 'monthly' ? '/mês' : ' total'}
      </span>
      <Button 
        variant="ghost" 
        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-0 h-8 mt-2"
        onClick={() => {
          onRemove();
          toast.success('Item removido do carrinho!');
        }}
      >
        <Trash className="h-4 w-4 mr-2" />
        Remover
      </Button>
    </div>
  );
};
