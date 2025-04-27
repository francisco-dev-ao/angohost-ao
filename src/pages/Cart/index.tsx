
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { CartHeader } from '@/components/cart/CartHeader';
import { CartItemsList } from '@/components/cart/CartItemsList';
import { OrderSummary } from '@/components/checkout/OrderSummary';
import { EmptyCart } from '@/components/cart/EmptyCart';
import { toast } from 'sonner';
import { AuthenticationCard } from '@/components/cart/AuthenticationCard';
import { ContactProfileCard } from '@/components/cart/ContactProfileCard';
import { supabase } from '@/integrations/supabase/client';
import { useState, useEffect } from 'react';

const Cart = () => {
  const navigate = useNavigate();
  const { 
    items, 
    removeItem, 
    getTotalPrice, 
    generateOrderReference,
    contactProfiles,
    selectedContactProfileId,
    setSelectedContactProfile
  } = useCart();
  
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user || null);
      setLoading(false);
    };
    
    checkAuth();
  }, []);

  const handleCheckout = () => {
    // Validate cart items before proceeding to checkout
    if (items.length === 0) {
      toast.error('Seu carrinho está vazio!');
      return;
    }

    // Check if user is logged in before proceeding to checkout
    if (!user) {
      toast.info('É necessário fazer login para finalizar a compra');
      navigate('/auth', { state: { returnTo: '/checkout' } });
      return;
    }

    // Check if domain items need a contact profile
    const hasDomains = items.some(item => item.type === 'domain');
    const hasOnlyHostingWithExistingDomain = items.length === 1 && 
      items[0].type === 'hosting' && 
      items[0].details.existingDomain === true;

    if (hasDomains && !hasOnlyHostingWithExistingDomain && !selectedContactProfileId) {
      toast.error('Por favor, selecione um perfil de contato para os domínios');
      return;
    }

    // Generate payment details to pass to the checkout page
    const paymentDetails = {
      amount: getTotalPrice(),
      reference: generateOrderReference(),
      description: `Pedido com ${items.length} ${items.length === 1 ? 'item' : 'itens'}`
    };
    
    // Navigate to checkout with payment details
    navigate('/checkout', { state: paymentDetails });
  };

  // Get contact profile by ID
  const getContactProfileById = (id: string) => {
    return contactProfiles.find(profile => profile.id === id);
  };

  if (items.length === 0) {
    return <EmptyCart />;
  }

  // Detect if we have domains in the cart
  const hasDomains = items.some(item => item.type === 'domain');
  const hasOnlyHostingWithExistingDomain = items.length === 1 && 
    items[0].type === 'hosting' && 
    items[0].details.existingDomain === true;
  const showContactProfileCard = user && hasDomains && !hasOnlyHostingWithExistingDomain;

  return (
    <div className="container mx-auto py-12 px-4">
      <CartHeader />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <CartItemsList 
            items={items} 
            onRemoveItem={removeItem} 
            getContactProfileById={getContactProfileById}
          />
          
          {!user && <AuthenticationCard />}
          
          {showContactProfileCard && (
            <ContactProfileCard
              profiles={contactProfiles}
              selectedProfileId={selectedContactProfileId}
              onSelectProfile={setSelectedContactProfile}
            />
          )}
        </div>
        <div>
          <OrderSummary 
            items={items} 
            getTotalPrice={getTotalPrice} 
            onCheckout={handleCheckout}
            buttonDisabled={false} // Allow guests to proceed to authentication during checkout
          />
        </div>
      </div>
    </div>
  );
};

export default Cart;
