
import React from 'react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { EmailPlan } from '@/data/emailPlans';
import { EmailPlanPriceSummary } from './EmailPlanPriceSummary';

interface EmailPlanConfigProps {
  selectedPlan: EmailPlan | null;
  emailAccounts: number;
  selectedPeriod: string;
  onAccountsChange: (value: number) => void;
  onPeriodChange: (value: string) => void;
  onCancel: () => void;
  onAdd: () => void;
  getDiscountedPrice: (basePrice: number, years: number) => number;
}

export const EmailPlanConfig: React.FC<EmailPlanConfigProps> = ({
  selectedPlan,
  emailAccounts,
  selectedPeriod,
  onAccountsChange,
  onPeriodChange,
  onCancel,
  onAdd,
  getDiscountedPrice,
}) => {
  if (!selectedPlan) return null;

  return (
    <div className="mt-6 border-t pt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Quantidade de contas</label>
          <Input 
            type="number" 
            min="1" 
            value={emailAccounts} 
            onChange={(e) => onAccountsChange(parseInt(e.target.value) || 1)} 
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Período de contratação</label>
          <Select value={selectedPeriod} onValueChange={onPeriodChange}>
            <SelectTrigger id="period">
              <SelectValue placeholder="Selecione o período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 ano</SelectItem>
              <SelectItem value="2">2 anos (10% desconto)</SelectItem>
              <SelectItem value="3">3 anos (20% desconto)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <EmailPlanPriceSummary
        selectedPlan={selectedPlan}
        emailAccounts={emailAccounts}
        selectedPeriod={selectedPeriod}
        getDiscountedPrice={getDiscountedPrice}
      />
      
      <div className="mt-6 flex justify-end">
        <Button 
          variant="outline" 
          className="mr-2"
          onClick={onCancel}
        >
          <X className="h-4 w-4 mr-1" />
          Cancelar
        </Button>
        <Button 
          className="bg-orange-500 hover:bg-orange-600"
          onClick={onAdd}
        >
          <Plus className="h-4 w-4 mr-1" />
          Adicionar ao Carrinho
        </Button>
      </div>
    </div>
  );
};
