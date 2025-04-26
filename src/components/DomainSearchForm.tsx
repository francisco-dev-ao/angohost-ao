
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from '@/components/ui/select';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { Search, Loader2 } from 'lucide-react';

interface DomainSearchFormProps {
  variant?: 'default' | 'hero' | 'sidebar';
}

const DomainSearchForm: React.FC<DomainSearchFormProps> = ({ variant = 'default' }) => {
  const [domainName, setDomainName] = useState('');
  const [extension, setExtension] = useState('.co.ao');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<null | { available: boolean, price?: number }>(null);
  
  const navigate = useNavigate();
  const { addItem } = useCart();

  const extensionOptions = [
    { value: '.co.ao', label: '.co.ao', price: 35000 },
    { value: '.ao', label: '.ao', price: 25000 },
    { value: '.it.ao', label: '.it.ao', price: 35000 },
    { value: '.edu.ao', label: '.edu.ao', price: 35000 },
    { value: '.com', label: '.com', price: 15000 },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!domainName) {
      toast.error('Por favor, insira um nome de domínio.');
      return;
    }
    
    setIsSearching(true);
    setSearchResult(null);
    
    // Simulating API call - in a real application, this would be an actual API call
    setTimeout(() => {
      // For demo purposes, let's assume most domains are available
      const randomAvailable = Math.random() > 0.3;
      
      // Find the price of the selected extension
      const selectedExt = extensionOptions.find(ext => ext.value === extension);
      
      setSearchResult({
        available: randomAvailable,
        price: selectedExt?.price,
      });
      
      setIsSearching(false);
      
      if (randomAvailable) {
        toast.success(`O domínio ${domainName}${extension} está disponível!`);
      } else {
        toast.error(`O domínio ${domainName}${extension} não está disponível.`);
      }
    }, 1500);
  };

  const addToCart = () => {
    // Add domain to cart
    const price = getPrice();
    
    addItem({
      id: `domain-${domainName}${extension}-${Date.now()}`,
      type: 'domain',
      name: `${domainName}${extension}`,
      price: price,
      period: 'yearly',
      details: {
        domain: `${domainName}${extension}`,
        period: '1 ano',
        renewalPrice: price,
        privacyProtection: 'Incluída'
      }
    });
    
    toast.success(`Domínio ${domainName}${extension} adicionado ao carrinho!`);
    navigate('/carrinho'); // Navigate to cart immediately after adding
  };

  const getPrice = () => {
    const selectedExt = extensionOptions.find(ext => ext.value === extension);
    const basePrice = selectedExt?.price || 0;
    
    // Apply different pricing for special cases
    if (domainName.length <= 3) {
      return 300000; // Special price for 3-letter domains
    }
    
    return basePrice;
  };

  const formClasses = {
    default: 'flex flex-col space-y-4 max-w-2xl mx-auto',
    hero: 'flex flex-col md:flex-row items-center gap-2 w-full max-w-3xl mx-auto',
    sidebar: 'flex flex-col space-y-4'
  };

  return (
    <div className={variant === 'hero' ? 'w-full' : ''}>
      <form onSubmit={handleSearch} className={formClasses[variant]}>
        <div className={`flex flex-1 ${variant === 'hero' ? 'flex-col md:flex-row w-full' : ''}`}>
          <div className="relative flex-grow">
            <Input
              type="text"
              placeholder="Digite o nome do domínio"
              value={domainName}
              onChange={(e) => setDomainName(e.target.value)}
              className={`${variant === 'hero' ? 'md:rounded-r-none text-base md:text-lg' : 'text-base'} bg-white text-black pl-10 border-primary focus:border-primary focus:ring-primary`}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
          
          <Select value={extension} onValueChange={setExtension}>
            <SelectTrigger className={`${variant === 'hero' ? 'md:w-32 md:rounded-l-none' : 'w-full'} bg-white text-black text-base md:text-lg border-primary focus:border-primary`}>
              <SelectValue placeholder=".co.ao" />
            </SelectTrigger>
            <SelectContent>
              {extensionOptions.map((ext) => (
                <SelectItem key={ext.value} value={ext.value}>{ext.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <Button 
          type="submit" 
          disabled={isSearching}
          className={`${variant === 'hero' ? 'w-full md:w-auto' : ''} bg-primary hover:bg-primary/90`}
        >
          {isSearching ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              A verificar...
            </>
          ) : 'Verificar Disponibilidade'}
        </Button>
      </form>
      
      {searchResult && (
        <div className="mt-6 text-center">
          {searchResult.available ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex flex-col items-center">
              <h4 className="text-green-800 text-lg font-medium">
                {domainName}{extension} está disponível!
              </h4>
              <p className="text-gray-600 mt-2">
                Preço: {getPrice().toLocaleString('pt-AO')} Kz por ano
              </p>
              <p className="text-gray-600 text-sm">
                Renovação: {getPrice().toLocaleString('pt-AO')} Kz por ano
              </p>
              <Button 
                onClick={addToCart} 
                className="mt-4 bg-primary hover:bg-primary/90"
              >
                Adicionar ao Carrinho
              </Button>
            </div>
          ) : (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="text-red-800 text-lg font-medium">
                {domainName}{extension} não está disponível
              </h4>
              <p className="text-gray-600 mt-2">
                Tente outro nome ou extensão diferente.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DomainSearchForm;
