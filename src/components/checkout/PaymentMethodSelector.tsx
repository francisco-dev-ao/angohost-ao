
import React from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from '@/components/ui/label';
import { CreditCard, Building, ArrowRightLeft, Wallet } from 'lucide-react';

interface PaymentMethodSelectorProps {
  selected: string | null;
  onSelect: (method: string) => void;
  showAccountBalance?: boolean;
  accountBalance?: number;
}

export const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  selected,
  onSelect,
  showAccountBalance = true,
  accountBalance = 0
}) => {
  const paymentMethods = [
    {
      id: 'emis',
      name: 'Multicaixa Express',
      icon: <CreditCard className="h-5 w-5 text-blue-600" />,
      description: 'Pagamento instantâneo via aplicativo do seu banco',
    },
    {
      id: 'bank-transfer',
      name: 'Transferência Bancária',
      icon: <Building className="h-5 w-5 text-green-600" />,
      description: 'Instrução de transferência será enviada por email',
    },
    {
      id: 'credit-card',
      name: 'Cartão de Crédito',
      icon: <ArrowRightLeft className="h-5 w-5 text-purple-600" />,
      description: 'Pagamento seguro com cartão de crédito',
    }
  ];

  // Add account balance option if available
  if (showAccountBalance) {
    paymentMethods.push({
      id: 'account_balance',
      name: 'Saldo da Conta',
      icon: <Wallet className="h-5 w-5 text-amber-600" />,
      description: `Saldo disponível: ${accountBalance.toLocaleString('pt-AO')} Kz`,
    });
  }

  return (
    <RadioGroup 
      value={selected || ""} 
      onValueChange={onSelect}
      className="space-y-4"
    >
      {paymentMethods.map((method) => (
        <div key={method.id} className="flex items-start space-x-3">
          <RadioGroupItem 
            value={method.id} 
            id={`payment-${method.id}`} 
            className="mt-1"
            disabled={method.id === 'account_balance' && accountBalance <= 0}
          />
          <Label 
            htmlFor={`payment-${method.id}`}
            className={`flex-1 p-4 bg-white rounded-md border cursor-pointer hover:bg-gray-50 ${
              method.id === 'account_balance' && accountBalance <= 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <div className="flex items-center">
              <div className="mr-3">
                {method.icon}
              </div>
              <div>
                <div className="font-medium">{method.name}</div>
                <div className="text-sm text-gray-500">{method.description}</div>
              </div>
            </div>
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
};
