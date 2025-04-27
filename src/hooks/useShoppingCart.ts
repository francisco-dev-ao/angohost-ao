
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useCart } from '@/context/CartContext';
import { supabase } from '@/integrations/supabase/client';

export const useShoppingCart = () => {
  const navigate = useNavigate();
  const {
    items,
    getTotalPrice,
    paymentInfo,
    selectedContactProfileId,
    contactProfiles,
  } = useCart();
  
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  
  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      const session = data.session;
      
      if (session) {
        setUser(session.user);
      }
      
      setLoading(false);
    };
    
    checkAuth();
    
    if (items.length === 0) {
      navigate('/carrinho');
      toast.error('Seu carrinho está vazio!');
    }
    
    if (paymentInfo?.status === 'completed') {
      navigate('/payment/success');
    }
  }, [items, navigate, paymentInfo]);

  const hasDomain = items.some(item => item.type === 'domain');
  const hasEmailPlan = items.some(item => item.type === 'email');
  const hasOnlyHostingWithoutDomain = items.length === 1 && 
    items[0].type === 'hosting' && 
    items[0].details.existingDomain === true;
  const profileAssigned = hasDomain ? !!selectedContactProfileId : true;

  const handleCheckout = () => {
    // Only require login at checkout time, not for browsing the cart
    if (!user) {
      toast.info('É necessário fazer login para finalizar a compra');
      navigate('/auth', { state: { returnTo: '/checkout' } });
      return;
    }
    
    if (hasDomain && !hasOnlyHostingWithoutDomain && !selectedContactProfileId) {
      toast.error('É necessário selecionar um perfil de contato para seus domínios');
      navigate('/carrinho');
      return;
    }
    
    navigate('/checkout');
  };

  return {
    user,
    loading,
    hasDomain,
    hasEmailPlan,
    hasOnlyHostingWithoutDomain,
    profileAssigned,
    contactProfiles,
    handleCheckout
  };
};
