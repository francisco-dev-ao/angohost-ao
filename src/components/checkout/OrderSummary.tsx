
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CartItem } from '@/types/cart';
import { formatCurrency } from '@/utils/domainPricing';
import { Info, ShoppingCart, ArrowRight } from 'lucide-react';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { Link } from 'react-router-dom';

interface OrderSummaryProps {
  items: CartItem[];
  getTotalPrice: () => number;
  onCheckout?: () => void;
  buttonDisabled?: boolean;
  buttonTooltip?: string;
  showNextStepLink?: boolean;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  items,
  getTotalPrice,
  onCheckout,
  buttonDisabled = false,
  buttonTooltip = '',
  showNextStepLink = false
}) => {
  const domains = items.filter(item => item.type === 'domain');
  const emailPlans = items.filter(item => item.type === 'email');
  
  const totalPrice = getTotalPrice();
  const hasDomain = domains.length > 0;
  const hasEmail = emailPlans.length > 0;
  
  const renderCheckoutButton = () => {
    const button = (
      <Button 
        onClick={onCheckout} 
        disabled={buttonDisabled}
        className="w-full h-12"
      >
        <ShoppingCart className="mr-2 h-4 w-4" />
        {onCheckout ? 'Finalizar Compra' : 'Resumo do Pedido'}
      </Button>
    );
    
    if (buttonTooltip && buttonDisabled) {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              {button}
            </TooltipTrigger>
            <TooltipContent>
              <p>{buttonTooltip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }
    
    return button;
  };
  
  return (
    <Card className="shadow-md">
      <CardHeader className="bg-primary/5">
        <CardTitle className="flex items-center justify-between">
          <span>Resumo do Pedido</span>
          <span className="text-base font-normal bg-primary/10 px-2 py-1 rounded">
            {items.length} {items.length === 1 ? 'item' : 'itens'}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        {/* Item groups */}
        {hasDomain && (
          <div className="mb-4">
            <h3 className="font-medium mb-2">Domínios</h3>
            <ul className="space-y-2">
              {domains.map((item) => (
                <li key={item.id} className="flex justify-between text-sm">
                  <span>{item.details.domainName}</span>
                  <span>{formatCurrency(item.price)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {hasEmail && (
          <div className="mb-4">
            <h3 className="font-medium mb-2">Emails</h3>
            <ul className="space-y-2">
              {emailPlans.map((item) => (
                <li key={item.id} className="flex justify-between text-sm">
                  <span>
                    {item.name}
                    <br />
                    <span className="text-xs text-gray-500">
                      {item.details.domainName}
                    </span>
                  </span>
                  <span>{formatCurrency(item.price)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {items.filter(item => !['domain', 'email'].includes(item.type)).map((item) => (
          <div key={item.id} className="mb-4">
            <h3 className="font-medium mb-2">{item.type === 'hosting' ? 'Hospedagem' : item.type}</h3>
            <div className="flex justify-between text-sm">
              <span>{item.name}</span>
              <span>{formatCurrency(item.price)}</span>
            </div>
          </div>
        ))}
        
        <Separator className="my-4" />
        
        {/* Totals */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="font-medium">Total</span>
            <span className="font-bold text-lg">
              {formatCurrency(totalPrice)}
            </span>
          </div>
        </div>
      </CardContent>
      
      {onCheckout && (
        <CardFooter className="pt-0 flex flex-col gap-2">
          {renderCheckoutButton()}
        </CardFooter>
      )}
      
      {showNextStepLink && !onCheckout && (
        <CardFooter className="pt-0">
          <Link to="/checkout" className="w-full">
            <Button variant="default" className="w-full bg-green-600 hover:bg-green-700">
              Próxima Etapa <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </CardFooter>
      )}
    </Card>
  );
};
