
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useCart } from '@/context/CartContext';

export const useShoppingCart = () => {
  const navigate = useNavigate();
  const { 
    items, 
    selectedContactProfileId,
    getContactProfiles 
  } = useCart();
  
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [profileAssigned, setProfileAssigned] = useState(false);
  
  const hasDomain = items.some(item => item.type === 'domain');
  const hasEmailPlan = items.some(item => item.type === 'email');
  const hasOnlyHostingWithoutDomain = items.length === 1 && 
    items[0].type === 'hosting' && 
    items[0].details.existingDomain === true;
  
  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user || null);
      setLoading(false);
    };
    
    checkAuth();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      }
    );
    
    return () => subscription.unsubscribe();
  }, []);
  
  useEffect(() => {
    if (!hasDomain || hasOnlyHostingWithoutDomain) {
      setProfileAssigned(true);
      return;
    }
    
    const hasProfile = selectedContactProfileId !== null;
    setProfileAssigned(hasProfile);
  }, [selectedContactProfileId, hasDomain, hasOnlyHostingWithoutDomain]);
  
  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error('Seu carrinho está vazio!');
      return;
    }
    
    if (!user) {
      toast.error('É necessário fazer login ou criar conta para finalizar a compra!');
      sessionStorage.setItem('redirect_after_login', '/carrinho');
      navigate('/auth');
      return;
    }
    
    if (hasDomain && !hasOnlyHostingWithoutDomain && !profileAssigned) {
      toast.error('É necessário selecionar um perfil de contato para cada domínio!');
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
    contactProfiles: getContactProfiles(),
    handleCheckout
  };
};
