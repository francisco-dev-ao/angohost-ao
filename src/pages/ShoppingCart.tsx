
import React from 'react';
import { useCart } from '@/context/CartContext';
import { CartItemsList } from '@/components/cart/CartItemsList';
import { EmailPlansSection } from '@/components/cart/EmailPlansSection';
import { OrderSummary } from '@/components/checkout/OrderSummary';
import { EmptyCart } from '@/components/cart/EmptyCart';
import { CartHeader } from '@/components/cart/CartHeader';
import { AuthenticationCard } from '@/components/cart/AuthenticationCard';
import { ContactProfileCard } from '@/components/cart/ContactProfileCard';
import { useShoppingCart } from '@/hooks/useShoppingCart';

const ShoppingCart = () => {
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
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;
