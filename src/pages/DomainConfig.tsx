
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { useCart } from '@/context/CartContext';
import { NifSearch } from '@/components/domain/NifSearch';
import { DomainPricingDisplay } from '@/components/domain/DomainPricingDisplay';
import { ClientDetailsForm } from '@/components/domain/ClientDetailsForm';
import { calculateDomainPrice } from '@/utils/domainPricing';

const DomainConfig = () => {
  const [domainName, setDomainName] = useState('');
  const [domainExtension, setDomainExtension] = useState('.co.ao');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<string>("1");
  const [useExistingProfile, setUseExistingProfile] = useState<boolean>(false);
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(null);
  
  const [clientDetails, setClientDetails] = useState({
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
  const { addItem, addContactProfile, getContactProfiles, contactProfiles } = useCart();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const domain = searchParams.get('domain');
    const extension = searchParams.get('ext');
    
    if (domain) setDomainName(domain);
    if (extension) setDomainExtension(extension);
  }, []);

  useEffect(() => {
    if (selectedProfileId && useExistingProfile) {
      const profile = contactProfiles.find(p => p.id === selectedProfileId);
      if (profile) {
        setClientDetails({
          ...clientDetails,
          name: profile.name || '',
          nif: profile.nif || '',
          city: profile.city || '',
          address: profile.billingAddress || '',
          postalCode: profile.postalCode || '',
          email: profile.email || '',
          phone: profile.phone || '',
          idNumber: profile.idNumber || '',
        });
      }
    }
  }, [selectedProfileId, contactProfiles, useExistingProfile]);

  const handleInputChange = (field: keyof typeof clientDetails, value: string) => {
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

    try {
      setTimeout(() => {
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
          setClientDetails(prev => ({
            ...prev,
            name: mockResponse.data.name,
            responsibleName: mockResponse.data.responsibleName,
            province: mockResponse.data.province,
            city: mockResponse.data.city,
            address: mockResponse.data.address,
            postalCode: mockResponse.data.postalCode,
          }));
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
    
    const requiredFields: Array<keyof typeof clientDetails> = ['name', 'email', 'phone', 'idNumber'];
    const missingFields = requiredFields.filter(field => !clientDetails[field]);
    
    if (missingFields.length > 0) {
      toast.error('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    
    const years = parseInt(selectedPeriod);
    const pricing = calculateDomainPrice(domainName, domainExtension, years);
    
    let newProfile;
    if (!useExistingProfile) {
      newProfile = {
        id: `profile-${Date.now()}`,
        name: clientDetails.name,
        email: clientDetails.email,
        phone: clientDetails.phone,
        nif: clientDetails.nif,
        billingAddress: clientDetails.address,
        city: clientDetails.city,
        postalCode: clientDetails.postalCode,
        idNumber: clientDetails.idNumber
      };
      
      addContactProfile(newProfile);
    }
    
    addItem({
      id: `domain-${domainName}${domainExtension}-${Date.now()}`,
      type: 'domain',
      name: `Domínio ${domainName}${domainExtension}`,
      price: pricing.totalPrice,
      period: 'yearly',
      details: {
        domainName: `${domainName}${domainExtension}`,
        registrationPeriod: `${years} ${years === 1 ? 'ano' : 'anos'}`,
        ownerDetails: clientDetails,
        contractYears: years,
        contactProfileId: useExistingProfile ? selectedProfileId : newProfile?.id,
        renewalPrice: pricing.basePrice
      }
    });
    
    toast.success(`Domínio ${domainName}${domainExtension} adicionado ao carrinho!`);
    navigate('/carrinho');
  };

  const domainPeriods = [
    { value: "1", label: "1 ano" },
    { value: "2", label: "2 anos (10% desconto)" },
    { value: "3", label: "3 anos (15% desconto)" },
    { value: "4", label: "4 anos (20% desconto)" },
    { value: "5", label: "5 anos (20% desconto)" }
  ];

  const pricing = calculateDomainPrice(domainName, domainExtension, parseInt(selectedPeriod));

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
                <div className="grid grid-cols-1 gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                    <div>
                      <Label htmlFor="period">Período</Label>
                      <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                        <SelectTrigger id="period">
                          <SelectValue placeholder="Selecione o período" />
                        </SelectTrigger>
                        <SelectContent>
                          {domainPeriods.map((period) => (
                            <SelectItem key={period.value} value={period.value}>
                              {period.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <DomainPricingDisplay 
                    pricing={{
                      ...pricing,
                      selectedPeriod
                    }}
                  />
                </div>
              </div>
              
              <Separator className="my-8" />
              
              <div>
                <h2 className="text-xl font-semibold mb-4">Contato do Titular</h2>
                
                {contactProfiles.length > 0 && (
                  <div className="mb-6">
                    <div className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        id="useExistingProfile"
                        checked={useExistingProfile}
                        onChange={(e) => setUseExistingProfile(e.target.checked)}
                        className="mr-2"
                      />
                      <Label htmlFor="useExistingProfile">Usar perfil de contato existente</Label>
                    </div>
                    
                    {useExistingProfile && (
                      <Select value={selectedProfileId || ''} onValueChange={setSelectedProfileId}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um perfil de contato" />
                        </SelectTrigger>
                        <SelectContent>
                          {contactProfiles.map((profile) => (
                            <SelectItem key={profile.id} value={profile.id}>
                              {profile.name} ({profile.email})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                )}
                
                {(!useExistingProfile || contactProfiles.length === 0) && (
                  <>
                    <NifSearch
                      nif={clientDetails.nif}
                      onNifChange={(value) => handleInputChange('nif', value)}
                      onSearch={handleNifSearch}
                      isLoading={isLoading}
                    />
                    
                    <ClientDetailsForm
                      details={clientDetails}
                      onInputChange={handleInputChange}
                    />
                  </>
                )}
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
