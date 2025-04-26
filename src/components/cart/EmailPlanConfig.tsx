
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { EmailPlanPriceSummary } from './EmailPlanPriceSummary';

interface EmailPlanConfigProps {
  selectedPlan: {
    id: string;
    title: string;
    price: number;
    storage: string;
    features: string[];
  } | null;
  emailAccounts: number;
  selectedPeriod: string;
  selectedDomain?: string | null;
  onAccountsChange: (accounts: number) => void;
  onPeriodChange: (period: string) => void;
  onCancel: () => void;
  onAdd: () => void;
  getDiscountedPrice: (basePrice: number, years: number) => number;
}

export const EmailPlanConfig: React.FC<EmailPlanConfigProps> = ({
  selectedPlan,
  emailAccounts,
  selectedPeriod,
  selectedDomain,
  onAccountsChange,
  onPeriodChange,
  onCancel,
  onAdd,
  getDiscountedPrice
}) => {
  if (!selectedPlan) return null;

  return (
    <Card className="mt-8 p-6 bg-gray-50/50">
      <CardContent className="space-y-6">
        {selectedDomain && (
          <div className="p-3 bg-blue-50 rounded-md border border-blue-200 mb-4">
            <p className="text-sm font-medium text-blue-700">
              Configurando email para: <span className="font-bold">{selectedDomain}</span>
            </p>
          </div>
        )}
        
        <div>
          <Label htmlFor="email-accounts">Quantidade de Contas</Label>
          <div className="flex items-center space-x-4 mt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onAccountsChange(Math.max(1, emailAccounts - 1))}
              disabled={emailAccounts <= 1}
            >
              -
            </Button>
            <Input
              id="email-accounts"
              type="number"
              min="1"
              value={emailAccounts}
              onChange={(e) => onAccountsChange(parseInt(e.target.value) || 1)}
              className="w-24 text-center"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => onAccountsChange(emailAccounts + 1)}
            >
              +
            </Button>
          </div>
        </div>

        <div>
          <Label htmlFor="contract-period">Período de Contrato</Label>
          <Select
            value={selectedPeriod}
            onValueChange={onPeriodChange}
          >
            <SelectTrigger id="contract-period" className="mt-2">
              <SelectValue placeholder="Selecione o período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 Ano</SelectItem>
              <SelectItem value="2">2 Anos (10% desconto)</SelectItem>
              <SelectItem value="3">3 Anos (20% desconto)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <EmailPlanPriceSummary
          planName={selectedPlan.title}
          basePrice={selectedPlan.price}
          quantity={emailAccounts}
          years={parseInt(selectedPeriod)}
          getDiscountedPrice={getDiscountedPrice}
        />
      </CardContent>

      <CardFooter className="flex justify-end space-x-4 pt-4">
        <Button variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button onClick={onAdd}>
          Adicionar ao Carrinho
        </Button>
      </CardFooter>
    </Card>
  );
};
