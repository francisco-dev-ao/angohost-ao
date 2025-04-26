
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PricingCardProps {
  title: string;
  price: number;
  renewalPrice?: number;
  period?: string;
  features: string[];
  isPopular?: boolean;
  buttonText?: string;
  type: 'hosting' | 'vps' | 'email' | 'office365';
  id: string;
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  renewalPrice,
  period = '/ano',
  features,
  isPopular = false,
  buttonText = 'Selecionar',
  type,
  id
}) => {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [selectedPeriod, setSelectedPeriod] = React.useState<string>("1");
  
  const getPeriodText = (period: string) => {
    switch (period) {
      case "1": return "1 ano";
      case "2": return "2 anos (10% desconto)";
      case "3": return "3 anos (15% desconto)";
      default: return "1 ano";
    }
  };
  
  const calculateTotalPrice = (basePrice: number, period: string): number => {
    const years = parseInt(period);
    let discount = 0;
    
    if (years === 2) discount = 0.1; // 10% discount
    if (years === 3) discount = 0.15; // 15% discount
    
    const yearlyPrice = basePrice;
    const totalBeforeDiscount = yearlyPrice * years;
    return Math.round(totalBeforeDiscount * (1 - discount));
  };
  
  const handleSelect = () => {
    if (type === 'email') {
      // For email plans, navigate to the email page to select quantity
      navigate('/email/profissional');
      return;
    }
    
    let newItem = null;
    const years = parseInt(selectedPeriod);
    const totalPrice = calculateTotalPrice(price, selectedPeriod);
    const yearlyRenewalPrice = renewalPrice || price;
    
    if (type === 'hosting') {
      if (id === 'basic') {
        newItem = {
          id: `hosting-${id}-${Date.now()}`,
          type: 'hosting',
          name: 'Plano Básico de Hospedagem',
          price: totalPrice,
          period: 'yearly',
          details: {
            diskSpace: '5GB',
            emailAccounts: '10',
            databases: 'Ilimitado',
            renewalPrice: yearlyRenewalPrice,
            contractYears: years
          }
        };
      } else if (id === 'professional') {
        newItem = {
          id: `hosting-${id}-${Date.now()}`,
          type: 'hosting',
          name: 'Plano Profissional de Hospedagem',
          price: totalPrice,
          period: 'yearly',
          details: {
            diskSpace: '20GB',
            emailAccounts: '30',
            databases: 'Ilimitado',
            renewalPrice: yearlyRenewalPrice,
            contractYears: years
          }
        };
      } else if (id === 'enterprise') {
        newItem = {
          id: `hosting-${id}-${Date.now()}`,
          type: 'hosting',
          name: 'Plano Empresarial de Hospedagem',
          price: totalPrice,
          period: 'yearly',
          details: {
            diskSpace: '50GB',
            emailAccounts: 'Ilimitado',
            databases: 'Ilimitado',
            renewalPrice: yearlyRenewalPrice,
            contractYears: years
          }
        };
      } else if (id === 'dedicated-basic') {
        newItem = {
          id: `dedicated-${id}-${Date.now()}`,
          type: 'hosting',
          name: 'Servidor Dedicado Básico',
          price: totalPrice,
          period: 'yearly',
          details: {
            cpu: '4 Cores',
            ram: '8GB',
            storage: '1TB HDD',
            bandwidth: 'Ilimitado',
            ips: '1 IP Dedicado',
            renewalPrice: yearlyRenewalPrice,
            contractYears: years
          }
        };
      } else if (id === 'dedicated-pro') {
        newItem = {
          id: `dedicated-${id}-${Date.now()}`,
          type: 'hosting',
          name: 'Servidor Dedicado Pro',
          price: totalPrice,
          period: 'yearly',
          details: {
            cpu: '8 Cores',
            ram: '16GB',
            storage: '2TB HDD',
            bandwidth: 'Ilimitado',
            ips: '2 IPs Dedicados',
            renewalPrice: yearlyRenewalPrice,
            contractYears: years
          }
        };
      } else if (id === 'dedicated-enterprise') {
        newItem = {
          id: `dedicated-${id}-${Date.now()}`,
          type: 'hosting',
          name: 'Servidor Dedicado Enterprise',
          price: totalPrice,
          period: 'yearly',
          details: {
            cpu: '16 Cores',
            ram: '32GB',
            storage: '4TB HDD',
            bandwidth: 'Ilimitado',
            ips: '4 IPs Dedicados',
            renewalPrice: yearlyRenewalPrice,
            contractYears: years
          }
        };
      }
    }
    
    // Handle Office 365 plans
    if (type === 'office365') {
      if (id === 'o365-basic') {
        newItem = {
          id: `office365-${id}-${Date.now()}`,
          type: 'office365',
          name: 'Office 365 Business Basic',
          price: totalPrice,
          period: 'yearly',
          details: {
            users: 1,
            renewalPrice: yearlyRenewalPrice,
            contractYears: years
          }
        };
      } else if (id === 'o365-standard') {
        newItem = {
          id: `office365-${id}-${Date.now()}`,
          type: 'office365',
          name: 'Office 365 Business Standard',
          price: totalPrice,
          period: 'yearly',
          details: {
            users: 1,
            renewalPrice: yearlyRenewalPrice,
            contractYears: years
          }
        };
      } else if (id === 'o365-premium') {
        newItem = {
          id: `office365-${id}-${Date.now()}`,
          type: 'office365',
          name: 'Office 365 Business Premium',
          price: totalPrice,
          period: 'yearly',
          details: {
            users: 1,
            renewalPrice: yearlyRenewalPrice,
            contractYears: years
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

  // Calculate the price to display based on selected period
  const displayPrice = calculateTotalPrice(price, selectedPeriod);

  return (
    <div className={`pricing-card relative rounded-xl border ${isPopular ? 'border-primary shadow-lg' : 'border-gray-200'} bg-white p-6 transition-all duration-300 hover:shadow-md`}>
      {isPopular && (
        <span className="absolute top-0 right-0 bg-orange-500 text-white text-xs px-3 py-1 rounded-bl-lg rounded-tr-lg font-medium">Popular</span>
      )}

      <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      
      <div className="mt-4 flex items-baseline text-gray-900">
        <span className="text-3xl font-extrabold tracking-tight">{displayPrice.toLocaleString('pt-AO')} Kz</span>
        <span className="ml-1 text-xl font-semibold">{period}</span>
      </div>
      
      <div className="mt-4">
        <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Periodo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">{getPeriodText("1")}</SelectItem>
            <SelectItem value="2">{getPeriodText("2")}</SelectItem>
            <SelectItem value="3">{getPeriodText("3")}</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {renewalPrice && renewalPrice !== price && (
        <div className="mt-1 text-sm text-gray-500">
          Renovação: {renewalPrice.toLocaleString('pt-AO')} Kz/ano
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
