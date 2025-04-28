
import { useState, useCallback, useEffect } from 'react';
import { useCartStorage } from './useCartStorage';
import { useAuth } from './useAuth';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { ContactProfile } from '@/types/cart';

export const useShoppingCart = () => {
  const { items, addItem, updateItem, removeItem, clearItems, contactProfiles, selectedContactProfileId, setSelectedContactProfileId } = useCartStorage();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth?.() || { user: null };
  
  // Alias for addItem to maintain compatibility with both naming conventions
  const addToCart = useCallback((item: any) => {
    addItem(item);
  }, [addItem]);

  // Check if cart has domain
  const hasDomain = items.some(item => item.type === 'domain');
  
  // Check if cart has email plan
  const hasEmailPlan = items.some(item => item.type === 'email');
  
  // Check if cart only has hosting without domain
  const hasOnlyHostingWithoutDomain = items.some(item => 
    item.type === 'hosting' && item.details?.allowNoDomain === true
  );
  
  // Check if profile is assigned when needed
  const profileAssigned = selectedContactProfileId !== null;
  
  // Handle checkout logic
  const handleCheckout = useCallback(() => {
    if (!user) {
      toast.error('É necessário fazer login para continuar');
      return;
    }
    
    if (hasDomain && !hasOnlyHostingWithoutDomain && !profileAssigned) {
      toast.error('É necessário selecionar um perfil de contato');
      return;
    }
    
    navigate('/checkout');
  }, [user, hasDomain, hasOnlyHostingWithoutDomain, profileAssigned, navigate]);

  return {
    items,
    addItem,
    addToCart,
    updateItem,
    removeItem,
    clearItems,
    cartCount: items?.length || 0,
    hasItems: (items?.length || 0) > 0,
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
