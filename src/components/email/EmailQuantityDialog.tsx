
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { QuantityDialogProps } from '@/types/email';
import { QuantitySelector } from './dialog/QuantitySelector';
import { PeriodSelector } from './dialog/PeriodSelector';
import { EmailPlanPriceSummary } from '@/components/cart/EmailPlanPriceSummary';

export const EmailQuantityDialog: React.FC<QuantityDialogProps> = ({
  isOpen,
  onOpenChange,
  selectedPlan,
  quantity,
  selectedPeriod,
  onQuantityChange,
  onPeriodChange,
  onConfirm,
  getDiscountedPrice,
}) => {
  if (!selectedPlan) return null;

  const showDomainDiscount = quantity >= 20 && 
    (selectedPlan.id === 'email-pro' || selectedPlan.id === 'email-business');

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader className="space-y-2">
          <DialogTitle>{selectedPlan.title}</DialogTitle>
          <DialogDescription className="text-sm">
            Selecione a quantidade de contas
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-3 space-y-4">
          <QuantitySelector
            quantity={quantity}
            selectedPlan={selectedPlan}
            onQuantityChange={onQuantityChange}
          />
          
          <PeriodSelector
            selectedPeriod={selectedPeriod}
            onPeriodChange={onPeriodChange}
          />
          
          <EmailPlanPriceSummary
            planName={selectedPlan.title}
            basePrice={selectedPlan.price}
            quantity={quantity}
            years={parseInt(selectedPeriod)}
            getDiscountedPrice={getDiscountedPrice}
            showDomainDiscount={showDomainDiscount}
          />
        </div>

        <DialogFooter className="flex justify-between">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={onConfirm}>
            Continuar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
