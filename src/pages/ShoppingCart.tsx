
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { CartItemsList } from '@/components/cart/CartItemsList';
import { EmailPlansSection } from '@/components/cart/EmailPlansSection';
import { OrderSummary } from '@/components/checkout/OrderSummary';
import { EmptyCart } from '@/components/cart/EmptyCart';
import { CartHeader } from '@/components/cart/CartHeader';
import { AuthenticationCard } from '@/components/cart/AuthenticationCard';
import { ContactProfileCard } from '@/components/cart/ContactProfileCard';
import { useShoppingCart } from '@/hooks/useShoppingCart';
import { toast } from 'sonner';

const ShoppingCart = () => {
  const navigate = useNavigate();
  const { 
    items, 
    removeItem, 
    getTotalPrice, 
    addItem,
    selectedContactProfileId,
    setSelectedContactProfile,
    getContactProfiles
  } = useCart();
  
  const {
    user,
    loading,
    hasDomain,
    hasEmailPlan,
    hasOnlyHostingWithoutDomain,
    profileAssigned,
    contactProfiles,
    handleCheckout
  } = useShoppingCart();
  
  const getContactProfileById = (id: string) => {
    return contactProfiles.find(profile => profile.id === id);
  };

  // Check if hosting plans need domain configuration
  useEffect(() => {
    // If we have hosting plans but no domains
    const hasHostingPlans = items.some(item => 
      item.type === 'hosting' && !item.details.existingDomain
    );
    
    const hasWordPressPlans = items.some(item => 
      item.type === 'hosting' && item.details.isWordPress === true
    );
    
    const hasCPanelPlans = items.some(item =>
      item.type === 'hosting' && 
      !item.details.existingDomain && 
      !item.details.cpu // Not a dedicated server
    );
    
    // If we have hosting plans (WordPress or cPanel) that need domains
    if ((hasWordPressPlans || hasCPanelPlans) && !hasDomain && !hasOnlyHostingWithoutDomain) {
      // Redirect to domain registration with a flag indicating we came from hosting
      toast.info('É necessário configurar um domínio para o seu plano de hospedagem.');
      navigate('/dominios/registrar?fromHosting=true');
    }
  }, [items, hasDomain, hasOnlyHostingWithoutDomain, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 flex items-center justify-center">
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="container max-w-6xl mx-auto">
        <CartHeader />
        
        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <CartItemsList 
                items={items}
                onRemoveItem={removeItem}
                getContactProfileById={getContactProfileById}
              />
              
              {!user && <AuthenticationCard />}
              
              {user && hasDomain && !hasOnlyHostingWithoutDomain && (
                <ContactProfileCard
                  profiles={contactProfiles}
                  selectedProfileId={selectedContactProfileId}
                  onSelectProfile={setSelectedContactProfile}
                />
              )}
              
              <EmailPlansSection
                onAddPlan={addItem}
                hasDomain={hasDomain}
                hasEmailPlan={hasEmailPlan}
                getDomainNames={() => items
                  .filter(item => item.type === 'domain')
                  .map(item => item.details.domainName as string)}
              />
            </div>
            
            <div className="lg:col-span-1">
              <OrderSummary 
                items={items}
                getTotalPrice={getTotalPrice}
                onCheckout={handleCheckout}
                buttonDisabled={!user || (hasDomain && !hasOnlyHostingWithoutDomain && !profileAssigned)}
                buttonTooltip={
                  !user 
                    ? "É necessário fazer login para continuar" 
                    : (hasDomain && !hasOnlyHostingWithoutDomain && !profileAssigned) 
                      ? "É necessário selecionar um perfil de contato" 
                      : ""
                }
                showNextStepLink={items.length > 0 && user && (!hasDomain || hasOnlyHostingWithoutDomain || profileAssigned)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;
