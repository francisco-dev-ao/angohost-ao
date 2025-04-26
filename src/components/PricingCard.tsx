import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';
import { PeriodSelector } from './pricing/PeriodSelector';
import { FeaturesList } from './pricing/FeaturesList';
import { usePricingCalculator } from '@/hooks/usePricingCalculator';

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

const PricingCard = ({
  title,
  price,
  renewalPrice,
  period = '/ano',
  features,
  isPopular = false,
  buttonText = 'Selecionar',
  type,
  id
}: PricingCardProps) => {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { 
    selectedPeriod, 
    setSelectedPeriod, 
    getPeriodText, 
    displayPrice 
  } = usePricingCalculator(price, renewalPrice);
  
  const handleSelect = () => {
    // For email plans, navigate to the email page to select quantity
    if (type === 'email') {
      navigate('/email/profissional');
      return;
    }
    
    let newItem = null;
    const years = parseInt(selectedPeriod);
    const totalPrice = displayPrice;
    const yearlyRenewalPrice = renewalPrice || price;
    
    // Create item based on type and ID
    if (type === 'hosting') {
      // Handle different hosting plans
      if (id.includes('basic') || id === 'starter') {
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
      } else if (id.includes('professional') || id === 'business') {
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
      } else if (id.includes('enterprise')) {
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
      } else if (id.includes('dedicated-basic')) {
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
      } else if (id.includes('dedicated-pro')) {
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
      } else if (id.includes('dedicated-enterprise')) {
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
      } else if (id.includes('wp-')) {
        // WordPress specific plans
        const wpPlanNames = {
          'wp-basic': 'WordPress Básico',
          'wp-pro': 'WordPress Pro',
          'wp-agency': 'WordPress Agency'
        };
        
        const wpPlanDetails = {
          'wp-basic': { diskSpace: '10GB', emailAccounts: '15' },
          'wp-pro': { diskSpace: '25GB', emailAccounts: '30' },
          'wp-agency': { diskSpace: '50GB', emailAccounts: 'Ilimitado' }
        };
        
        const planKey = id as keyof typeof wpPlanNames;
        
        newItem = {
          id: `hosting-${id}-${Date.now()}`,
          type: 'hosting',
          name: wpPlanNames[planKey] || title,
          price: totalPrice,
          period: 'yearly',
          details: {
            ...wpPlanDetails[planKey as keyof typeof wpPlanDetails],
            databases: 'Ilimitado',
            renewalPrice: yearlyRenewalPrice,
            contractYears: years,
            isWordPress: true
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
      // Add item to cart and redirect
      addItem(newItem);
      toast.success(`${newItem.name} adicionado ao carrinho!`);
      
      // For hosting plans from cPanel or WordPress pages, redirect to domain config
      const currentPath = window.location.pathname;
      if ((currentPath.includes('/hospedagem/cpanel') || currentPath.includes('/hospedagem/wordpress')) && type === 'hosting') {
        navigate('/dominios/registrar?fromHosting=true');
      } else {
        navigate('/carrinho');
      }
    }
  };

  return (
    <div className={`pricing-card relative rounded-xl border ${isPopular ? 'border-primary shadow-lg' : 'border-gray-200'} bg-white p-6 transition-all duration-300 hover:shadow-md`}>
      {isPopular && (
        <span className="absolute top-0 right-0 bg-orange-500 text-white text-xs px-3 py-1 rounded-bl-lg rounded-tr-lg font-medium">
          Popular
        </span>
      )}

      <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      
      <div className="mt-4 flex items-baseline text-gray-900">
        <span className="text-3xl font-extrabold tracking-tight">
          {displayPrice.toLocaleString('pt-AO')} Kz
        </span>
        <span className="ml-1 text-xl font-semibold">{period}</span>
      </div>
      
      <PeriodSelector
        selectedPeriod={selectedPeriod}
        onPeriodChange={setSelectedPeriod}
        getPeriodText={getPeriodText}
      />
      
      {renewalPrice && renewalPrice !== price && (
        <div className="mt-1 text-sm text-gray-500">
          Renovação: {renewalPrice.toLocaleString('pt-AO')} Kz/ano
        </div>
      )}

      <FeaturesList features={features} />

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
