
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { EmailPlanPriceSummary } from './EmailPlanPriceSummary';
import { Check } from 'lucide-react';

interface EmailPlanConfigProps {
  selectedPlan,
  emailAccounts,
  selectedPeriod,
  selectedDomain,
  onAccountsChange,
  onPeriodChange,
  onCancel,
  onAdd,
  getDiscountedPrice
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

  const showDomainDiscount = emailAccounts >= 20 && (selectedPlan.id === 'email-pro' || selectedPlan.id === 'email-business');

  return (
    <Card className="mt-4 p-4 bg-white shadow-lg rounded-xl transition-all duration-300 hover:shadow-xl">
      <CardContent className="space-y-4">
        {selectedDomain && (
          <div className="p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-md border border-blue-200 mb-4">
            <p className="text-sm font-medium text-blue-700">
              Configurando email para: <span className="font-bold">{selectedDomain}</span>
            </p>
          </div>
        )}
        
        <div>
          <Label htmlFor="email-accounts" className="flex items-center justify-between">
            <span>Quantidade de Contas</span>
            <span className="text-sm text-gray-500">Máximo: 1000</span>
          </Label>
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
              max="1000"
              value={emailAccounts}
              onChange={(e) => {
                const value = parseInt(e.target.value) || 1;
                onAccountsChange(Math.min(1000, Math.max(1, value)));
              }}
              className="w-24 text-center"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => onAccountsChange(Math.min(1000, emailAccounts + 1))}
              disabled={emailAccounts >= 1000}
            >
              +
            </Button>
          </div>
        </div>

        <div>
          <Label htmlFor="contract-period">Período de Contrato</Label>
          <div className="grid grid-cols-3 gap-2 mt-2">
            <Button 
              variant={selectedPeriod === "1" ? "default" : "outline"}
              onClick={() => onPeriodChange("1")}
              className="w-full transition-all duration-200 hover:scale-105"
            >
              1 Ano
            </Button>
            <Button 
              variant={selectedPeriod === "2" ? "default" : "outline"}
              onClick={() => onPeriodChange("2")}
              className="w-full transition-all duration-200 hover:scale-105"
            >
              2 Anos (10% desc.)
            </Button>
            <Button 
              variant={selectedPeriod === "3" ? "default" : "outline"}
              onClick={() => onPeriodChange("3")}
              className="w-full transition-all duration-200 hover:scale-105"
            >
              3 Anos (20% desc.)
            </Button>
          </div>
        </div>

        {showDomainDiscount && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg animate-fade-in">
            <div className="flex items-start space-x-2">
              <Check className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <p className="font-medium text-green-700">Bônus Especial!</p>
                <p className="text-sm text-green-600">
                  Por ter selecionado {emailAccounts} contas, você receberá um domínio gratuito com seu plano!
                </p>
              </div>
            </div>
          </div>
        )}

        <EmailPlanPriceSummary
          planName={selectedPlan.title}
          basePrice={selectedPlan.price}
          quantity={emailAccounts}
          years={parseInt(selectedPeriod)}
          getDiscountedPrice={getDiscountedPrice}
          showDomainDiscount={showDomainDiscount}
        />
      </CardContent>

      <CardFooter className="flex justify-end space-x-4 pt-4">
        <Button 
          variant="outline" 
          onClick={onCancel}
          className="transition-all duration-200 hover:bg-gray-100"
        >
          Cancelar
        </Button>
        <Button 
          onClick={onAdd}
          className="bg-orange-500 hover:bg-orange-600 transition-all duration-200"
        >
          Adicionar ao Carrinho
        </Button>
      </CardFooter>
    </Card>
  );
};

