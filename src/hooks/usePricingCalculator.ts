
import { useState } from 'react';

export const usePricingCalculator = (basePrice: number, renewalPrice?: number) => {
  const [selectedPeriod, setSelectedPeriod] = useState<string>("1");
  
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

  const displayPrice = calculateTotalPrice(basePrice, selectedPeriod);

  return {
    selectedPeriod,
    setSelectedPeriod,
    getPeriodText,
    calculateTotalPrice,
    displayPrice
  };
};
