
import React from 'react';
import { Button } from '@/components/ui/button';
import { Minus, Plus } from 'lucide-react';
import { EmailPlan } from '@/types/email';

interface QuantitySelectorProps {
  quantity: number;
  selectedPlan: EmailPlan;
  onQuantityChange: (value: number) => void;
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  selectedPlan,
  onQuantityChange,
}) => {
  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="text-center">
        <p className="mb-2 text-sm">Quantidade de contas de email:</p>
        <div className="flex items-center justify-center">
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => onQuantityChange(quantity - 1)}
            disabled={quantity <= selectedPlan.minQuantity}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="mx-6 text-xl font-medium">{quantity}</span>
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => onQuantityChange(quantity + 1)}
            disabled={quantity >= selectedPlan.maxQuantity}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Min: {selectedPlan.minQuantity} / Max: {selectedPlan.maxQuantity} contas
        </p>
      </div>
    </div>
  );
};
