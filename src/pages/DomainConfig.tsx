
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useCart } from '@/context/CartContext';
import { DomainSearchInput } from '@/components/domain/DomainSearchInput';
import { DomainSearchResult } from '@/components/domain/DomainSearchResult';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { calculateDomainPrice } from '@/utils/domainPricing';

const DomainConfig = () => {
  const [domainName, setDomainName] = useState('');
  const [domainExtension, setDomainExtension] = useState('.co.ao');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<null | { available: boolean, price?: number }>(null);
  const navigate = useNavigate();
  const { addItem } = useCart();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const domain = searchParams.get('domain');
    const extension = searchParams.get('ext');
    
    if (domain) setDomainName(domain);
    if (extension) setDomainExtension(extension);
  }, []);

  const getPrice = () => {
    return calculateDomainPrice(domainName, domainExtension, 1).totalPrice;
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
        toast.success(`O domínio ${domainName}${domainExtension} está disponível!`);
      } else {
        toast.error(`O domínio ${domainName}${domainExtension} não está disponível.`);
      }
    }, 1500);
  };

  const handleAddToCart = () => {
    const price = getPrice();

    addItem({
      id: `domain-${domainName}${domainExtension}-${Date.now()}`,
      type: 'domain',
      name: `Domínio ${domainName}${domainExtension}`,
      price: price,
      period: 'yearly',
      details: {
        domain: `${domainName}${domainExtension}`,
        period: '1 ano',
        renewalPrice: price,
        privacyProtection: 'Incluída',
        domainName: `${domainName}${domainExtension}`,
        requiresTitularity: true
      }
    });

    toast.success(`Domínio ${domainName}${domainExtension} adicionado ao carrinho!`);
    navigate('/carrinho');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="container max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Verificar Disponibilidade de Domínio</h1>
        <p className="text-gray-600 mb-8">
          Digite o nome do domínio que deseja registrar
        </p>
        
        <Card className="p-6">
          <form onSubmit={handleSearch} className="flex flex-col space-y-4">
            <DomainSearchInput
              domainName={domainName}
              extension={domainExtension}
              onDomainNameChange={setDomainName}
              onExtensionChange={setDomainExtension}
              variant="default"
            />
            
            <div className="flex justify-end">
              <Button 
                type="submit" 
                disabled={isSearching}
                className="w-full md:w-auto h-14 px-8"
              >
                {isSearching ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    A verificar...
                  </>
                ) : 'Verificar Disponibilidade'}
              </Button>
            </div>
          </form>
          
          {searchResult && (
            <div className="mt-6">
              <DomainSearchResult
                domainName={domainName}
                extension={domainExtension}
                searchResult={searchResult}
                onRegister={handleAddToCart}
              />
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default DomainConfig;
