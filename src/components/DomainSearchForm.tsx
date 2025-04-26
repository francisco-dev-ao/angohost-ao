
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { Loader2 } from 'lucide-react';
import { DomainSearchInput } from './domain/DomainSearchInput';
import { DomainSearchResult } from './domain/DomainSearchResult';

interface DomainSearchFormProps {
  variant?: 'default' | 'hero' | 'sidebar';
}

const extensionOptions = [
  { value: '.co.ao', label: '.co.ao', price: 35000 },
  { value: '.ao', label: '.ao', price: 25000 },
  { value: '.it.ao', label: '.it.ao', price: 35000 },
  { value: '.edu.ao', label: '.edu.ao', price: 35000 },
  { value: '.com', label: '.com', price: 15000 },
];

const DomainSearchForm: React.FC<DomainSearchFormProps> = ({ variant = 'default' }) => {
  const [domainName, setDomainName] = useState('');
  const [extension, setExtension] = useState('.co.ao');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<null | { available: boolean, price?: number }>(null);
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);
  const registerButtonRef = useRef<HTMLButtonElement>(null);
  
  const navigate = useNavigate();
  const { addItem } = useCart();

  useEffect(() => {
    const pendingEmailPlan = sessionStorage.getItem('pendingEmailPlan');
    if (pendingEmailPlan) {
      toast.info('Selecione um domínio para o seu plano de email');
    }
  }, []);

  const getPrice = () => {
    const selectedExt = extensionOptions.find(ext => ext.value === extension);
    return domainName.length <= 3 ? 300000 : (selectedExt?.price || 0);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!domainName) {
      toast.error('Por favor, insira um nome de domínio.');
      return;
    }
    
    setIsSearching(true);
    setSearchResult(null);
    
    setTimeout(() => {
      const randomAvailable = Math.random() > 0.3;
      const price = getPrice();
      
      setSearchResult({
        available: randomAvailable,
        price: price,
      });
      
      setIsSearching(false);
      
      if (randomAvailable) {
        toast.success(`O domínio ${domainName}${extension} está disponível!`);
        setTimeout(() => {
          registerButtonRef.current?.focus();
        }, 100);
      } else {
        toast.error(`O domínio ${domainName}${extension} não está disponível.`);
      }
    }, 1500);
  };

  const handleAddToCart = () => {
    setIsProcessingOrder(true);

    setTimeout(() => {
      const price = getPrice();

      addItem({
        id: `domain-${domainName}${extension}-${Date.now()}`,
        type: 'domain',
        name: `Domínio ${domainName}${extension}`,
        price: price,
        period: 'yearly',
        details: {
          domain: `${domainName}${extension}`,
          period: '1 ano',
          renewalPrice: price,
          privacyProtection: 'Incluída',
          domainName: `${domainName}${extension}`
        }
      });

      toast.success(`Domínio ${domainName}${extension} adicionado ao carrinho!`);
      setIsProcessingOrder(false);

      const pendingEmailPlan = sessionStorage.getItem('pendingEmailPlan');
      if (pendingEmailPlan) {
        try {
          const emailPlan = JSON.parse(pendingEmailPlan);
          addItem({
            id: `${emailPlan.id}-${Date.now()}`,
            type: 'email',
            name: `${emailPlan.title} (${emailPlan.quantity} contas)`,
            price: emailPlan.price * emailPlan.quantity,
            period: 'monthly',
            details: {
              storage: emailPlan.storage,
              antispam: emailPlan.id === 'email-start' ? 'Básico' : (emailPlan.id === 'email-business' ? 'Avançado' : 'Premium'),
              quantity: emailPlan.quantity,
              domainName: `${domainName}${extension}`,
              renewalPrice: emailPlan.price * emailPlan.quantity
            }
          });
          sessionStorage.removeItem('pendingEmailPlan');
          toast.success(`Plano de email adicionado ao carrinho!`);
        } catch (e) {
          console.error('Failed to parse pending email plan', e);
        }
      }
      navigate('/carrinho');
    }, 1500);
  };

  const formClasses = {
    default: 'flex flex-col space-y-4 max-w-3xl mx-auto',
    hero: 'flex flex-col md:flex-row items-center gap-3 w-full max-w-4xl mx-auto',
    sidebar: 'flex flex-col space-y-4'
  };

  return (
    <div className={variant === 'hero' ? 'w-full' : ''}>
      <form onSubmit={handleSearch} className={formClasses[variant]}>
        <DomainSearchInput
          domainName={domainName}
          extension={extension}
          onDomainNameChange={setDomainName}
          onExtensionChange={setExtension}
          variant={variant}
        />
        
        <Button 
          type="submit" 
          disabled={isSearching}
          className={`${
            variant === 'hero' ? 'w-full md:w-auto' : ''
          } h-14 px-8 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300`}
        >
          {isSearching ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              A verificar...
            </>
          ) : 'Verificar Disponibilidade'}
        </Button>
      </form>
      
      {searchResult && (
        <div className="mt-6 text-center">
          <DomainSearchResult
            domainName={domainName}
            extension={extension}
            searchResult={searchResult}
            onRegister={handleAddToCart}
            registerButtonRef={registerButtonRef}
          />
        </div>
      )}
    </div>
  );
};

export default DomainSearchForm;
