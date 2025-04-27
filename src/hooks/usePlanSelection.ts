
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';
import { CartItem } from '@/types/cart';
import { v4 as uuidv4 } from 'uuid';

export const usePlanSelection = () => {
  const navigate = useNavigate();
  const { addItem } = useCart();
  
  const selectPlan = (plan: CartItem) => {
    // Generate unique ID if not provided
    const planWithId = {
      ...plan,
      id: plan.id || uuidv4()
    };
    
    addItem(planWithId);
    toast.success(`${plan.name} adicionado ao carrinho`);
    
    // Redirect to cart
    navigate('/carrinho');
  };
  
  return {
    selectPlan
  };
};
