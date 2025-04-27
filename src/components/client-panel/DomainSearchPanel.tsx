
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Loader2 } from "lucide-react";

export const DomainSearchPanel = () => {
  const [domainName, setDomainName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!domainName || domainName.trim() === '') {
      toast.error('Por favor, digite um nome de domínio');
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API search
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // Redirect to domain search page with the domain name
      navigate(`/dominios/registrar?domain=${encodeURIComponent(domainName)}`);
    } catch (error) {
      console.error('Erro ao pesquisar domínio:', error);
      toast.error('Erro ao pesquisar domínio. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-6">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Pesquisar um novo domínio</h2>
          
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="text"
                placeholder="Digite o nome do domínio desejado..."
                className="pl-10"
                value={domainName}
                onChange={(e) => setDomainName(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <Button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-white px-6"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Pesquisando...
                </>
              ) : (
                'Pesquisar'
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
