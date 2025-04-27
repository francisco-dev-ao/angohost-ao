
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2, CreditCard, BanknoteIcon, ArrowRight } from "lucide-react";
import { PaymentMethod } from '@/types/payment';
import { useCart } from '@/context/CartContext';

interface CheckoutFormProps {
  paymentMethod: PaymentMethod | null;
  isLoading: boolean;
  onSelectPaymentMethod: (method: PaymentMethod) => void;
  onProcessPayment: () => void;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({
  paymentMethod,
  isLoading,
  onSelectPaymentMethod,
  onProcessPayment
}) => {
  const { customer } = useCart();
  const hasAccountBalance = customer?.account_balance && customer.account_balance > 0;

  return (
    <Card className="transition-all duration-300">
      <CardHeader>
        <CardTitle>Método de Pagamento</CardTitle>
        <CardDescription>
          Escolha como você deseja fazer o pagamento
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={e => {
          e.preventDefault();
          onProcessPayment();
        }}>
          <RadioGroup
            value={paymentMethod || ''}
            onValueChange={(value) => onSelectPaymentMethod(value as PaymentMethod)}
            className="space-y-4 mb-6"
          >
            <div className="flex items-center space-x-2 p-4 border rounded-lg transition-all hover:bg-gray-50 cursor-pointer">
              <RadioGroupItem value="emis" id="emis" />
              <Label htmlFor="emis" className="flex items-center cursor-pointer">
                <img src="/multicaixa-express-logo.png" alt="Multicaixa Express" className="h-6 w-auto mr-2" />
                <div>
                  <div>Multicaixa Express</div>
                  <div className="text-sm text-gray-500">Pagamento instantâneo pelo app Multicaixa Express</div>
                </div>
              </Label>
            </div>
            
            <div className="flex items-center space-x-2 p-4 border rounded-lg transition-all hover:bg-gray-50 cursor-pointer">
              <RadioGroupItem value="bank-transfer" id="bank-transfer" />
              <Label htmlFor="bank-transfer" className="flex items-center cursor-pointer">
                <BanknoteIcon className="h-5 w-5 mr-2 text-indigo-600" />
                <div>
                  <div>Transferência Bancária</div>
                  <div className="text-sm text-gray-500">Faça uma transferência para nossa conta bancária</div>
                </div>
              </Label>
            </div>
            
            <div className="flex items-center space-x-2 p-4 border rounded-lg transition-all hover:bg-gray-50 cursor-pointer">
              <RadioGroupItem value="credit-card" id="credit-card" />
              <Label htmlFor="credit-card" className="flex items-center cursor-pointer">
                <CreditCard className="h-5 w-5 mr-2 text-blue-600" />
                <div>
                  <div>Cartão de Crédito</div>
                  <div className="text-sm text-gray-500">Pagamento seguro com cartão de crédito</div>
                </div>
              </Label>
            </div>

            {hasAccountBalance && (
              <div className="flex items-center space-x-2 p-4 border rounded-lg transition-all hover:bg-gray-50 cursor-pointer">
                <RadioGroupItem value="account_balance" id="account_balance" />
                <Label htmlFor="account_balance" className="flex items-center cursor-pointer">
                  <BanknoteIcon className="h-5 w-5 mr-2 text-green-600" />
                  <div>
                    <div>Saldo da Conta</div>
                    <div className="text-sm text-gray-500">
                      Usar saldo disponível: {customer?.account_balance?.toLocaleString('pt-AO')} Kz
                    </div>
                  </div>
                </Label>
              </div>
            )}
          </RadioGroup>
          
          <Button 
            type="submit"
            className="w-full"
            disabled={!paymentMethod || isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processando...
              </>
            ) : (
              <>
                Prosseguir para pagamento
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
