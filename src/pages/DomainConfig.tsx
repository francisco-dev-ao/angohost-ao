
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { useCart } from '@/context/CartContext';

interface ClientDetails {
  name: string;
  nif: string;
  responsibleName: string;
  province: string;
  city: string;
  address: string;
  postalCode: string;
  email: string;
  phone: string;
  idNumber: string;
}

const DomainConfig = () => {
  const [domainName, setDomainName] = useState('');
  const [domainExtension, setDomainExtension] = useState('.co.ao');
  const [isLoading, setIsLoading] = useState(false);
  
  const [clientDetails, setClientDetails] = useState<ClientDetails>({
    name: '',
    nif: '',
    responsibleName: '',
    province: '',
    city: '',
    address: '',
    postalCode: '',
    email: '',
    phone: '',
    idNumber: '',
  });

  const navigate = useNavigate();
  const { addItem } = useCart();
  
  useEffect(() => {
    // Get domain details from URL params or localStorage
    const searchParams = new URLSearchParams(window.location.search);
    const domain = searchParams.get('domain');
    const extension = searchParams.get('ext');
    
    if (domain) setDomainName(domain);
    if (extension) setDomainExtension(extension);
  }, []);

  const handleInputChange = (field: keyof ClientDetails, value: string) => {
    setClientDetails({
      ...clientDetails,
      [field]: value
    });
  };

  const handleNifSearch = async () => {
    if (!clientDetails.nif || clientDetails.nif.length < 6) {
      toast.error('Por favor, insira um NIF válido.');
      return;
    }

    setIsLoading(true);

    // Simulating API call to http://consulta.edgarsingui.ao/public/consultar-por-nif/
    try {
      // In a real app, this would be a fetch call to the API
      setTimeout(() => {
        // Mock response for demonstration
        const mockResponse = {
          success: true,
          data: {
            name: 'Empresa Exemplo Lda',
            responsibleName: 'João Silva',
            province: 'Luanda',
            city: 'Luanda',
            address: 'Rua 21 de Janeiro, nº 23',
            postalCode: '1000-001',
          }
        };

        if (mockResponse.success) {
          setClientDetails({
            ...clientDetails,
            name: mockResponse.data.name,
            responsibleName: mockResponse.data.responsibleName,
            province: mockResponse.data.province,
            city: mockResponse.data.city,
            address: mockResponse.data.address,
            postalCode: mockResponse.data.postalCode,
          });
          toast.success('Informações do NIF carregadas com sucesso!');
        } else {
          toast.error('NIF não encontrado. Por favor, preencha os dados manualmente.');
        }

        setIsLoading(false);
      }, 1500);
    } catch (error) {
      toast.error('Erro ao consultar NIF. Por favor, tente novamente.');
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const requiredFields: Array<keyof ClientDetails> = ['name', 'email', 'phone', 'idNumber'];
    const missingFields = requiredFields.filter(field => !clientDetails[field]);
    
    if (missingFields.length > 0) {
      toast.error('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    
    // In a real app, you'd submit this to your backend
    // For now, we'll just add it to the cart
    
    // Calculate price based on domain name and extension
    let price = 35000; // Default price for .co.ao domains
    
    if (domainExtension === '.ao') {
      price = 25000;
    }
    
    if (domainName.length <= 3) {
      price = 300000; // Special price for 3-letter domains
    }
    
    // Add domain to cart
    addItem({
      id: `domain-${domainName}${domainExtension}-${Date.now()}`,
      type: 'domain',
      name: `Domínio ${domainName}${domainExtension}`,
      price: price,
      period: 'yearly',
      details: {
        domainName: `${domainName}${domainExtension}`,
        registrationPeriod: '1 ano',
        ownerDetails: clientDetails
      }
    });
    
    toast.success(`Domínio ${domainName}${domainExtension} adicionado ao carrinho!`);
    navigate('/carrinho');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="container max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Configuração do Domínio</h1>
        <p className="text-gray-600 mb-8">
          Preencha os detalhes de contato para o registro do domínio {domainName || 'seu-domínio'}{domainExtension || '.co.ao'}
        </p>
        
        <Card>
          <form onSubmit={handleSubmit}>
            <CardContent className="p-6">
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Detalhes do Domínio</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="domainName">Nome do Domínio</Label>
                    <Input
                      id="domainName"
                      value={domainName}
                      onChange={(e) => setDomainName(e.target.value)}
                      placeholder="exemplo"
                      readOnly={!!domainName}
                      className={domainName ? 'bg-gray-50' : ''}
                    />
                  </div>
                  <div>
                    <Label htmlFor="domainExtension">Extensão</Label>
                    <Input
                      id="domainExtension"
                      value={domainExtension}
                      className="bg-gray-50"
                      readOnly
                    />
                  </div>
                </div>
              </div>
              
              <Separator className="my-8" />
              
              <div>
                <h2 className="text-xl font-semibold mb-4">Contato do Titular</h2>
                
                <div className="mb-6">
                  <Label htmlFor="nif">NIF (Número de Identificação Fiscal)</Label>
                  <div className="flex gap-2">
                    <Input
                      id="nif"
                      value={clientDetails.nif}
                      onChange={(e) => handleInputChange('nif', e.target.value)}
                      placeholder="Digite o NIF"
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleNifSearch}
                      disabled={isLoading}
                    >
                      {isLoading ? 'Consultando...' : 'Consultar'}
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Digite o NIF para preencher automaticamente os dados da empresa.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="name">Nome do Perfil</Label>
                    <Input
                      id="name"
                      value={clientDetails.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Nome da empresa ou pessoa física"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="responsibleName">Nome do Responsável</Label>
                      <Input
                        id="responsibleName"
                        value={clientDetails.responsibleName}
                        onChange={(e) => handleInputChange('responsibleName', e.target.value)}
                        placeholder="Nome do responsável"
                      />
                    </div>
                    <div>
                      <Label htmlFor="idNumber">Nº de Bilhete de Identidade</Label>
                      <Input
                        id="idNumber"
                        value={clientDetails.idNumber}
                        onChange={(e) => handleInputChange('idNumber', e.target.value)}
                        placeholder="Número do BI"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="province">Província</Label>
                      <Input
                        id="province"
                        value={clientDetails.province}
                        onChange={(e) => handleInputChange('province', e.target.value)}
                        placeholder="Província"
                      />
                    </div>
                    <div>
                      <Label htmlFor="city">Cidade</Label>
                      <Input
                        id="city"
                        value={clientDetails.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        placeholder="Cidade"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="address">Endereço</Label>
                      <Input
                        id="address"
                        value={clientDetails.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        placeholder="Endereço completo"
                      />
                    </div>
                    <div>
                      <Label htmlFor="postalCode">Código Postal</Label>
                      <Input
                        id="postalCode"
                        value={clientDetails.postalCode}
                        onChange={(e) => handleInputChange('postalCode', e.target.value)}
                        placeholder="Código postal"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={clientDetails.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="Email de contato"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Telemóvel</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={clientDetails.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="Número de telemóvel"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-between border-t p-6 bg-gray-50">
              <Button variant="outline" type="button" onClick={() => navigate(-1)}>
                Voltar
              </Button>
              <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
                Adicionar ao Carrinho
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default DomainConfig;
