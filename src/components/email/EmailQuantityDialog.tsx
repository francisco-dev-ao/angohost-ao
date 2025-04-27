
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
import { Input } from "@/components/ui/input";
import { Minus, Plus } from 'lucide-react';
import { QuantityDialogProps } from '@/types/email';

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

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Selecione a Quantidade</DialogTitle>
          <DialogDescription>
            Configure o número de contas para o {selectedPlan.title}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
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
            
            <div className="w-full border-t border-gray-200 pt-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Período:</span>
                <div className="space-x-2">
                  <Button 
                    variant={selectedPeriod === "1" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => onPeriodChange("1")}
                  >
                    1 ano
                  </Button>
                  <Button 
                    variant={selectedPeriod === "2" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => onPeriodChange("2")}
                  >
                    2 anos (10% desc.)
                  </Button>
                  <Button 
                    variant={selectedPeriod === "3" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => onPeriodChange("3")}
                  >
                    3 anos (20% desc.)
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="w-full border-t border-gray-200 pt-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Preço por conta:</span>
                <span>{selectedPlan.price.toLocaleString('pt-AO')} Kz/ano</span>
              </div>
              {parseInt(selectedPeriod) > 1 && (
                <div className="flex justify-between text-green-600 mb-2">
                  <span>Desconto:</span>
                  <span>{selectedPeriod === "2" ? "10%" : "20%"}</span>
                </div>
              )}
              <div className="flex justify-between font-medium text-lg">
                <span>Total:</span>
                <span>
                  {getDiscountedPrice(
                    selectedPlan.price * quantity,
                    parseInt(selectedPeriod)
                  ).toLocaleString('pt-AO')} Kz
                </span>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter className="sm:justify-between">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button type="button" onClick={onConfirm}>
            Continuar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
