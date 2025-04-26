
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart as CartIcon } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { TitularityForm } from '@/components/domain/TitularityForm';
import { CartItem, ContactProfile } from '@/types/cart';
import { CartItemsList } from '@/components/cart/CartItemsList';
import { EmailPlansSection } from '@/components/cart/EmailPlansSection';
import { OrderSummary } from '@/components/checkout/OrderSummary';
import { toast } from 'sonner';

const ShoppingCart = () => {
  const { 
    items, 
    removeItem, 
    getTotalPrice, 
    getContactProfiles, 
    addItem, 
    updateItem 
  } = useCart();
  const navigate = useNavigate();
  const contactProfiles = getContactProfiles();
  const [showTitularityForm, setShowTitularityForm] = useState(false);
  const [currentDomainItem, setCurrentDomainItem] = useState<CartItem | null>(null);
  const [isProcessingTitularity, setIsProcessingTitularity] = useState(false);

  const hasDomain = items.some(item => item.type === 'domain');
  const hasEmailPlan = items.some(item => item.type === 'email');
  
  const getContactProfileById = (id: string): ContactProfile | undefined => {
    return contactProfiles.find(profile => profile.id === id);
  };
  
  const handleCheckout = () => {
    const domainsNeedingTitularity = items.filter(
      item => item.type === 'domain' && item.details.requiresTitularity
    );

    if (domainsNeedingTitularity.length > 0) {
      setCurrentDomainItem(domainsNeedingTitularity[0]);
      setShowTitularityForm(true);
      return;
    }

    if (items.length === 0) {
      toast.error('Seu carrinho está vazio!');
      return;
    }
    navigate('/checkout');
  };

  const getDomainNames = (): string[] => {
    return items
      .filter(item => item.type === 'domain')
      .map(item => item.details.domainName as string);
  };

  const handleTitularitySubmit = async (values: any) => {
    setIsProcessingTitularity(true);
    
    setTimeout(() => {
      if (currentDomainItem) {
        const updatedItem = {
          ...currentDomainItem,
          details: {
            ...currentDomainItem.details,
            ownerName: values.ownerName,
            ownerNif: values.ownerNif,
            ownerContact: values.ownerContact,
            ownerEmail: values.ownerEmail,
            organizationName: values.organizationName || "",
            contactProfileId: values.useExistingProfile ? values.selectedProfileId : undefined,
            requiresTitularity: false
          }
        };
        updateItem(currentDomainItem.id, updatedItem);
        
        toast.success('Dados de titularidade salvos com sucesso!');
        setShowTitularityForm(false);
        setCurrentDomainItem(null);
      }
      setIsProcessingTitularity(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="container max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Carrinho de Compras</h1>
        
        {items.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="flex justify-center mb-4">
              <CartIcon className="w-16 h-16 text-gray-400" />
            </div>
            <h2 className="text-2xl font-semibold mb-4">Seu carrinho está vazio</h2>
            <p className="text-gray-600 mb-8">
              Adicione produtos ao seu carrinho para continuar.
            </p>
            <Button asChild>
              <Link to="/">Continuar Comprando</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <CartItemsList 
                items={items}
                onRemoveItem={removeItem}
                getContactProfileById={getContactProfileById}
              />
              
              <EmailPlansSection
                onAddPlan={addItem}
                hasDomain={hasDomain}
                hasEmailPlan={hasEmailPlan}
                getDomainNames={getDomainNames}
              />
            </div>
            
            <div className="lg:col-span-1">
              <OrderSummary 
                items={items}
                getTotalPrice={getTotalPrice}
              />
            </div>
          </div>
        )}
      </div>
      
      {currentDomainItem && (
        <TitularityForm
          open={showTitularityForm}
          onOpenChange={setShowTitularityForm}
          onSubmit={handleTitularitySubmit}
          isProcessing={isProcessingTitularity}
          domainName={currentDomainItem.details.domainName?.split('.')[0] || ''}
          extension={`.${currentDomainItem.details.domainName?.split('.').slice(1).join('.')}` || ''}
        />
      )}
    </div>
  );
};

export default ShoppingCart;
