import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { CartItemsList } from '@/components/cart/CartItemsList';
import { EmailPlansSection } from '@/components/cart/EmailPlansSection';
import { OrderSummary } from '@/components/checkout/OrderSummary';
import { EmptyCart } from '@/components/cart/EmptyCart';
import { CartHeader } from '@/components/cart/CartHeader';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { ContactProfileSelector } from '@/components/domain/ContactProfileSelector';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, LogIn, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const ShoppingCart = () => {
  const { 
    items, 
    removeItem, 
    getTotalPrice, 
    getContactProfiles, 
    addItem,
    selectedContactProfileId,
    setSelectedContactProfile
  } = useCart();
  const navigate = useNavigate();
  const contactProfiles = getContactProfiles();
  
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [profileAssigned, setProfileAssigned] = useState(false);
  
  const hasDomain = items.some(item => item.type === 'domain');
  const hasEmailPlan = items.some(item => item.type === 'email');
  const hasOnlyHostingWithoutDomain = items.length === 1 && items[0].type === 'hosting' && items[0].details.existingDomain === true;
  
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
  
  const getContactProfileById = (id: string) => {
    return contactProfiles.find(profile => profile.id === id);
  };
  
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

  if (loading) {
    return <div className="min-h-screen bg-gray-50 py-12 px-4 flex items-center justify-center">
      <p>Carregando...</p>
    </div>;
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
              
              {!user && (
                <Card className="mt-8 border-2 border-blue-200">
                  <CardHeader className="bg-blue-50">
                    <CardTitle className="flex items-center">
                      <LogIn className="h-5 w-5 mr-2 text-blue-500" />
                      Autenticação Necessária
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 pb-6">
                    <Alert variant="default" className="mb-4">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Atenção</AlertTitle>
                      <AlertDescription>
                        É necessário fazer login ou criar uma conta para finalizar a compra.
                      </AlertDescription>
                    </Alert>
                    
                    <div className="flex justify-center space-x-4">
                      <Button 
                        variant="outline" 
                        className="w-full" 
                        onClick={() => {
                          sessionStorage.setItem('redirect_after_login', '/carrinho');
                          navigate('/auth');
                        }}
                      >
                        <LogIn className="mr-2 h-4 w-4" /> Fazer Login
                      </Button>
                      
                      <Button 
                        className="w-full" 
                        onClick={() => {
                          sessionStorage.setItem('redirect_after_login', '/carrinho');
                          navigate('/auth?mode=register');
                        }}
                      >
                        <User className="mr-2 h-4 w-4" /> Criar Conta
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {user && hasDomain && !hasOnlyHostingWithoutDomain && (
                <Card className="mt-8 border-2 border-green-200">
                  <CardHeader className="bg-green-50">
                    <CardTitle className="flex items-center">
                      <User className="h-5 w-5 mr-2 text-green-500" />
                      Perfil de Contato para Domínio
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 pb-6">
                    <p className="mb-4 text-gray-600">
                      Selecione um perfil de contato para seus domínios ou crie um novo perfil.
                    </p>
                    
                    <ContactProfileSelector 
                      profiles={contactProfiles}
                      selectedProfileId={selectedContactProfileId}
                      onSelectProfile={setSelectedContactProfile}
                      onCreateProfile={(profile) => {
                        // Esta função é implementada em ContactProfileSelector
                      }}
                    />
                  </CardContent>
                </Card>
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
