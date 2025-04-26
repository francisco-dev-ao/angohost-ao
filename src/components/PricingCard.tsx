
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PricingCardProps {
  title: string;
  price: number;
  period?: string;
  features: string[];
  isPopular?: boolean;
  buttonText?: string;
  type: 'hosting' | 'vps' | 'email';
  id: string;
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  period = '/mês',
  features,
  isPopular = false,
  buttonText = 'Selecionar',
  type,
  id
}) => {
  const navigate = useNavigate();
  
  const handleSelect = () => {
    // In a real app, you would add the selected plan to the cart
    // For now, let's navigate to the cart
    navigate(`/carrinho?type=${type}&plan=${id}`);
  };

  return (
    <div className={`pricing-card relative rounded-xl border ${isPopular ? 'border-angohost-500 shadow-lg' : 'border-gray-200'} bg-white p-6 transition-all duration-300`}>
      {isPopular && (
        <span className="plan-badge">Popular</span>
      )}

      <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      
      <div className="mt-4 flex items-baseline text-gray-900">
        <span className="text-3xl font-extrabold tracking-tight">{price.toLocaleString('pt-AO')} Kz</span>
        <span className="ml-1 text-xl font-semibold">{period}</span>
      </div>

      <ul className="mt-6 space-y-4">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <div className="flex-shrink-0">
              <Check className="h-5 w-5 text-green-500" />
            </div>
            <p className="ml-3 text-sm text-gray-700">{feature}</p>
          </li>
        ))}
      </ul>

      <Button 
        className={`mt-8 w-full ${isPopular ? 'bg-orange-500 hover:bg-orange-600' : ''}`}
        onClick={handleSelect}
      >
        {buttonText}
      </Button>
    </div>
  );
};

export default PricingCard;
