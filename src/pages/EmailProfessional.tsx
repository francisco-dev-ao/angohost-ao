
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';
import { EmailPlan, DomainOption } from '@/types/email';
import { EmailPlanSelection } from '@/components/email/EmailPlanSelection';
import { EmailQuantityDialog } from '@/components/email/EmailQuantityDialog';
import { EmailDomainDialog } from '@/components/email/EmailDomainDialog';
import { Loader2 } from 'lucide-react';

const EmailProfessional = () => {
  const navigate = useNavigate();
  const { addItem, getDomainNames } = useCart();
  
  const [selectedPlan, setSelectedPlan] = useState<EmailPlan | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isQuantityDialogOpen, setIsQuantityDialogOpen] = useState(false);
  const [isDomainDialogOpen, setIsDomainDialogOpen] = useState(false);
  const [domainOption, setDomainOption] = useState<DomainOption>({ type: 'new' });
  const [existingDomain, setExistingDomain] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState("1");
  
  const domainsInCart = getDomainNames();

  const getDiscountedPrice = (basePrice: number, years: number) => {
    let discount = 0;
    if (years === 2) discount = 0.10;
    if (years === 3) discount = 0.20;
    return Math.round(basePrice * years * (1 - discount));
  };

  const handlePlanSelect = (plan: EmailPlan) => {
    setSelectedPlan(plan);
    setQuantity(plan.minQuantity);
    setIsQuantityDialogOpen(true);
  };

  const handleQuantityChange = (newValue: number) => {
    if (!selectedPlan) return;
    
    if (newValue < selectedPlan.minQuantity) {
      setQuantity(selectedPlan.minQuantity);
    } else if (newValue > selectedPlan.maxQuantity) {
      setQuantity(selectedPlan.maxQuantity);
    } else {
      setQuantity(newValue);
    }
  };
  
  const handleQuantityConfirm = () => {
    setIsQuantityDialogOpen(false);
    setIsDomainDialogOpen(true);
  };
  
  const handleDomainOptionConfirm = () => {
    setIsDomainDialogOpen(false);
    
    if (domainOption.type === 'new') {
      if (selectedPlan) {
        sessionStorage.setItem('pendingEmailPlan', JSON.stringify({
          id: selectedPlan.id,
          title: selectedPlan.title,
          price: selectedPlan.price,
          storage: selectedPlan.storage,
          quantity: quantity
        }));
        
        navigate('/dominios/registrar');
      }
    } else {
      handleAddToCart();
    }
  };
  
  const handleAddToCart = () => {
    if (!selectedPlan) return;
    
    setIsLoading(true);
    
    const years = parseInt(selectedPeriod);
    const totalPrice = getDiscountedPrice(selectedPlan.price * quantity, years);
    
    setTimeout(() => {
      const newItem = {
        id: `${selectedPlan.id}-${Date.now()}`,
        type: 'email',
        name: `${selectedPlan.title} (${quantity} contas)`,
        price: totalPrice,
        period: 'yearly',
        details: {
          storage: selectedPlan.storage,
          antispam: selectedPlan.id === 'email-premium' ? 'Básico' : (selectedPlan.id === 'email-pro' ? 'Avançado' : 'Básico'),
          quantity: quantity,
          domainName: domainOption.type === 'existing' ? existingDomain : undefined,
          contractYears: years,
          renewalPrice: selectedPlan.price * quantity
        }
      };
      
      addItem(newItem as any);
      toast.success(`${newItem.name} adicionado ao carrinho!`);
      setIsLoading(false);
      navigate('/carrinho');
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="container max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Email Profissional</h1>
        <p className="text-gray-600 mb-8">
          Soluções completas de email corporativo para empresas angolanas.
        </p>
        
        <EmailPlanSelection 
          selectedPlan={selectedPlan}
          onPlanSelect={handlePlanSelect}
        />
        
        <EmailQuantityDialog
          isOpen={isQuantityDialogOpen}
          onOpenChange={setIsQuantityDialogOpen}
          selectedPlan={selectedPlan}
          quantity={quantity}
          selectedPeriod={selectedPeriod}
          onQuantityChange={handleQuantityChange}
          onPeriodChange={setSelectedPeriod}
          onConfirm={handleQuantityConfirm}
          getDiscountedPrice={getDiscountedPrice}
        />
        
        <EmailDomainDialog
          isOpen={isDomainDialogOpen}
          onOpenChange={setIsDomainDialogOpen}
          domainOption={domainOption}
          setDomainOption={setDomainOption}
          existingDomain={existingDomain}
          setExistingDomain={setExistingDomain}
          domainsInCart={domainsInCart}
          onConfirm={handleDomainOptionConfirm}
        />
        
        {/* Loading Overlay */}
        {isLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg flex flex-col items-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
              <p className="text-lg font-medium">Processando...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailProfessional;
