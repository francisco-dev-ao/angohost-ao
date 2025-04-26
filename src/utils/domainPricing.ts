
export const calculateDomainPrice = (domainName: string, extension: string, years: number) => {
  let basePrice = 35000;
  
  if (extension === '.ao') {
    basePrice = 25000;
  }
  
  if (domainName.length <= 3) {
    basePrice = 300000;
  }
  
  // Apply discount for multi-year registrations
  let discount = 0;
  if (years === 2) discount = 0.10; // 10% discount for 2 years
  if (years === 3) discount = 0.15; // 15% discount for 3 years
  if (years >= 4) discount = 0.20; // 20% discount for 4 or 5 years
  
  const totalPrice = basePrice * years * (1 - discount);
  const annualPrice = totalPrice / years;
  
  return { 
    totalPrice, 
    annualPrice,
    discount,
    basePrice,
    saving: discount > 0 ? (basePrice * years) - totalPrice : 0
  };
};

// Add the missing formatCurrency function
export const formatCurrency = (amount: number): string => {
  return amount.toLocaleString('pt-AO') + ' Kz';
};
