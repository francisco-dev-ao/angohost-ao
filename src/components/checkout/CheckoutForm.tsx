
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CircleDollarSign, CreditCard, Building, Loader2 } from 'lucide-react';
import { PaymentMethod } from '@/types/payment';
import { useAccountBalance } from '@/hooks/useAccountBalance';

interface CheckoutFormProps {
  paymentMethod: PaymentMethod | null;
  isLoading: boolean;
  onSelectPaymentMethod: (method: PaymentMethod) => void;
  onProcessPayment: () => void;
  totalAmount?: number;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({
  paymentMethod,
  isLoading,
  onSelectPaymentMethod,
  onProcessPayment,
  totalAmount = 0
}) => {
  const { balance, loading: balanceLoading } = useAccountBalance();
  const hasEnoughBalance = (balance || 0) >= totalAmount;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Método de Pagamento</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={paymentMethod || undefined}
          onValueChange={(value) => onSelectPaymentMethod(value as PaymentMethod)}
          className="space-y-4"
        >
          <div className={`flex items-center space-x-2 rounded-md border p-4 ${paymentMethod === 'account_balance' ? 'border-primary' : ''}`}>
            <RadioGroupItem value="account_balance" id="account_balance" disabled={balanceLoading || !hasEnoughBalance} />
            <Label
              htmlFor="account_balance"
              className={`flex flex-1 items-center justify-between ${balanceLoading || !hasEnoughBalance ? 'opacity-50' : ''}`}
            >
              <div className="flex items-center gap-2">
                <CircleDollarSign className="h-5 w-5" />
                <div>
                  <p className="font-medium">Saldo da Conta</p>
                  <p className="text-xs text-muted-foreground">Use seu saldo disponível</p>
                </div>
              </div>
              <div>
                {balanceLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <span className={`font-medium ${hasEnoughBalance ? 'text-green-600' : 'text-red-600'}`}>
                    {new Intl.NumberFormat('pt-AO', {
                      style: 'currency',
                      currency: 'AOA',
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }).format(balance || 0)}
                  </span>
                )}
              </div>
            </Label>
          </div>

          <div className={`flex items-center space-x-2 rounded-md border p-4 ${paymentMethod === 'emis' ? 'border-primary' : ''}`}>
            <RadioGroupItem value="emis" id="emis" />
            <Label htmlFor="emis" className="flex flex-1 gap-2">
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                <div>
                  <p className="font-medium">EMIS</p>
                  <p className="text-xs text-muted-foreground">Pagamento com cartão de débito Multicaixa</p>
                </div>
              </div>
            </Label>
          </div>

          <div className={`flex items-center space-x-2 rounded-md border p-4 ${paymentMethod === 'bank-transfer' ? 'border-primary' : ''}`}>
            <RadioGroupItem value="bank-transfer" id="bank-transfer" />
            <Label htmlFor="bank-transfer" className="flex flex-1 gap-2">
              <div className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                <div>
                  <p className="font-medium">Transferência Bancária</p>
                  <p className="text-xs text-muted-foreground">Transferência para a nossa conta bancária</p>
                </div>
              </div>
            </Label>
          </div>
        </RadioGroup>

        <Button 
          onClick={onProcessPayment}
          disabled={!paymentMethod || isLoading}
          className="w-full mt-6"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processando...
            </>
          ) : (
            <>Finalizar Pagamento</>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};
