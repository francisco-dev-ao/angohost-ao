
import React, { useEffect, useState } from 'react';
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
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { InfoIcon } from 'lucide-react';

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
  
  const [carregando, setCarregando] = useState(true);
  
  const {
    user,
    isAdmin,
    loading,
    hasDomain,
    hasEmailPlan,
    hasOnlyHostingWithoutDomain,
    profileAssigned,
    contactProfiles,
    handleCheckout
  } = useShoppingCart();
  
  const getContactProfileById = (id: string) => {
    const profiles = contactProfiles || [];
    return profiles.find(profile => profile.id === id);
  };

  // Garantir que os dados do carrinho estejam carregados
  useEffect(() => {
    const timer = setTimeout(() => {
      setCarregando(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Check if hosting plans need domain configuration
  useEffect(() => {
    if (!items || !Array.isArray(items)) return;
    
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

  if (loading || carregando) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="container max-w-6xl mx-auto">
          <CartHeader />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Carregando Carrinho...</h2>
                <div className="space-y-4 mt-8">
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-16 w-full" />
                </div>
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <Skeleton className="h-8 w-3/4 mb-4" />
                <Skeleton className="h-6 w-full mb-2" />
                <Skeleton className="h-6 w-full mb-2" />
                <Skeleton className="h-6 w-full mb-4" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const safeItems = Array.isArray(items) ? items : [];
  
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <CartHeader />
          {isAdmin && (
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 flex items-center gap-1">
                <InfoIcon className="h-3 w-3" />
                Modo Administrador
              </Badge>
            </div>
          )}
        </div>
        
        {(!safeItems.length) ? (
          <EmptyCart />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <CartItemsList 
                items={safeItems}
                onRemoveItem={removeItem}
                getContactProfileById={getContactProfileById}
                isAdmin={isAdmin}
              />
              
              {!user && <AuthenticationCard />}
              
              {user && hasDomain && !hasOnlyHostingWithoutDomain && (
                <ContactProfileCard
                  profiles={contactProfiles || []}
                  selectedProfileId={selectedContactProfileId}
                  onSelectProfile={setSelectedContactProfile}
                />
              )}
              
              <EmailPlansSection
                onAddPlan={addItem}
                hasDomain={hasDomain}
                hasEmailPlan={hasEmailPlan}
                getDomainNames={() => safeItems
                  .filter(item => item.type === 'domain')
                  .map(item => item.details.domainName as string)}
              />
            </div>
            
            <div className="lg:col-span-1">
              <OrderSummary 
                items={safeItems}
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
                showNextStepLink={safeItems.length > 0 && user && (!hasDomain || hasOnlyHostingWithoutDomain || profileAssigned)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;
