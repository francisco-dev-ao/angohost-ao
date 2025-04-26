
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

interface PricingCardProps {
  title: string;
  price: number;
  renewalPrice?: number;
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
  renewalPrice,
  period = '/mês',
  features,
  isPopular = false,
  buttonText = 'Selecionar',
  type,
  id
}) => {
  const navigate = useNavigate();
  const { addItem } = useCart();
  
  const handleSelect = () => {
    let newItem = null;
      
    if (type === 'hosting') {
      if (id === 'basic') {
        newItem = {
          id: `hosting-${id}-${Date.now()}`,
          type: 'hosting',
          name: 'Plano Básico de Hospedagem',
          price: 2500,
          period: 'monthly',
          details: {
            diskSpace: '5GB',
            emailAccounts: '10',
            databases: 'Ilimitado',
            renewalPrice: 2500
          }
        };
      } else if (id === 'professional') {
        newItem = {
          id: `hosting-${id}-${Date.now()}`,
          type: 'hosting',
          name: 'Plano Profissional de Hospedagem',
          price: 4500,
          period: 'monthly',
          details: {
            diskSpace: '20GB',
            emailAccounts: '30',
            databases: 'Ilimitado',
            renewalPrice: 4500
          }
        };
      } else if (id === 'enterprise') {
        newItem = {
          id: `hosting-${id}-${Date.now()}`,
          type: 'hosting',
          name: 'Plano Empresarial de Hospedagem',
          price: 8500,
          period: 'monthly',
          details: {
            diskSpace: '50GB',
            emailAccounts: 'Ilimitado',
            databases: 'Ilimitado',
            renewalPrice: 8500
          }
        };
      }
    } else if (type === 'email') {
      if (id === 'email-start') {
        newItem = {
          id: `email-${id}-${Date.now()}`,
          type: 'email',
          name: 'Plano Start de Email',
          price: 1500,
          period: 'monthly',
          details: {
            storage: '5GB por caixa',
            antispam: 'Básico',
            renewalPrice: 1500
          }
        };
      } else if (id === 'email-business') {
        newItem = {
          id: `email-${id}-${Date.now()}`,
          type: 'email',
          name: 'Plano Business de Email',
          price: 3000,
          period: 'monthly',
          details: {
            storage: '15GB por caixa',
            antispam: 'Avançado',
            renewalPrice: 3000
          }
        };
      } else if (id === 'email-enterprise') {
        newItem = {
          id: `email-${id}-${Date.now()}`,
          type: 'email',
          name: 'Plano Enterprise de Email',
          price: 6000,
          period: 'monthly',
          details: {
            storage: '50GB por caixa',
            antispam: 'Premium',
            renewalPrice: 6000
          }
        };
      }
    }
    
    if (newItem) {
      addItem(newItem);
      toast.success(`${newItem.name} adicionado ao carrinho!`);
      navigate('/carrinho');
    }
  };

  return (
    <div className={`pricing-card relative rounded-xl border ${isPopular ? 'border-primary shadow-lg' : 'border-gray-200'} bg-white p-6 transition-all duration-300`}>
      {isPopular && (
        <span className="absolute top-0 right-0 bg-orange-500 text-white text-xs px-3 py-1 rounded-bl-lg rounded-tr-lg font-medium">Popular</span>
      )}

      <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      
      <div className="mt-4 flex items-baseline text-gray-900">
        <span className="text-3xl font-extrabold tracking-tight">{price.toLocaleString('pt-AO')} Kz</span>
        <span className="ml-1 text-xl font-semibold">{period}</span>
      </div>
      
      {renewalPrice && renewalPrice !== price && (
        <div className="mt-1 text-sm text-gray-500">
          Renovação: {renewalPrice.toLocaleString('pt-AO')} Kz{period}
        </div>
      )}

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
        className={`mt-8 w-full ${isPopular ? 'bg-primary hover:bg-primary/90' : ''}`}
        onClick={handleSelect}
      >
        {buttonText}
      </Button>
    </div>
  );
};

export default PricingCard;
