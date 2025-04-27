
import { useCart } from '@/context/CartContext';

export const useCheckoutValidation = () => {
  const { items } = useCart();
  
  const hasDomain = items.some(item => item.type === 'domain');
  const hasOnlyHostingWithoutDomain = items.length === 1 && 
    items[0].type === 'hosting' && 
    items[0].details.existingDomain === true;

  return {
    hasDomain,
    hasOnlyHostingWithoutDomain
  };
};
