
import React from 'react';
import { Button } from '@/components/ui/button';
import { PeriodSelector } from './pricing/PeriodSelector';
import { FeaturesList } from './pricing/FeaturesList';
import { PopularBadge } from './pricing/PopularBadge';
import { PriceDisplay } from './pricing/PriceDisplay';
import { usePricingCalculator } from '@/hooks/usePricingCalculator';
import { usePlanConfiguration } from '@/hooks/usePlanConfiguration';

interface PricingCardProps {
  title: string;
  price: number;
  renewalPrice?: number;
  period?: string;
  features: string[];
  isPopular?: boolean;
  buttonText?: string;
  type?: 'hosting' | 'vps' | 'email' | 'office365';
  id?: string;
  popular?: boolean;
  description?: string;
  savings?: string;
  onSubscribe?: () => void;
}

const PricingCard = ({
  title,
  price,
  renewalPrice,
  period = '/ano',
  features,
  isPopular = false,
  buttonText = 'Selecionar',
  type = 'hosting',
  id = '',
  popular = false,
  description,
  savings,
  onSubscribe
}: PricingCardProps) => {
  const { 
    selectedPeriod, 
    setSelectedPeriod, 
    getPeriodText, 
    displayPrice 
  } = usePricingCalculator(price, renewalPrice);
  
  const { handlePlanSelection } = usePlanConfiguration();
  
  const handleSelect = () => {
    if (onSubscribe) {
      onSubscribe();
    } else {
      const years = parseInt(selectedPeriod);
      const yearlyRenewalPrice = renewalPrice || price;
      handlePlanSelection(type, id, title, displayPrice, years, yearlyRenewalPrice);
    }
  };

  return (
    <div className={`pricing-card relative rounded-xl border ${(isPopular || popular) ? 'border-primary shadow-lg' : 'border-gray-200'} bg-white p-6 transition-all duration-300 hover:shadow-md`}>
      {(isPopular || popular) && <PopularBadge />}

      <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      
      {description && (
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      )}
      
      <PriceDisplay 
        price={displayPrice} 
        period={period} 
        renewalPrice={renewalPrice} 
      />
      
      {savings && (
        <p className="text-sm text-green-600 font-medium mt-1">{savings}</p>
      )}
      
      <PeriodSelector
        selectedPeriod={selectedPeriod}
        onPeriodChange={setSelectedPeriod}
        getPeriodText={getPeriodText}
      />

      <FeaturesList features={features} />

      <Button 
        className={`mt-8 w-full ${(isPopular || popular) ? 'bg-primary hover:bg-primary/90' : ''}`}
        onClick={handleSelect}
      >
        {buttonText}
      </Button>
    </div>
  );
};

export default PricingCard;
