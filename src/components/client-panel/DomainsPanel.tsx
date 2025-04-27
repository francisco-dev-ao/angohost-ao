import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Globe, Search, RefreshCw, ArrowRightLeft, PlusCircle, Settings, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

type ClientPanelContext = {
  userData: any;
  services: any[];
  domains: any[];
  invoices: any[];
};

export const DomainsPanel = () => {
  const { domains } = useOutletContext<ClientPanelContext>();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const navigate = useNavigate();
  
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
      case 'ativo':
        return 'bg-green-100 text-green-800';
      case 'expired':
      case 'expirado':
        return 'bg-red-100 text-red-800';
      case 'pending':
      case 'pendente':
        return 'bg-amber-100 text-amber-800';
      case 'transferring':
      case 'transferindo':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const mockDomains = [
    {
      id: '1',
      name: 'meusite',
      tld: 'ao',
      registration_date: '2023-04-01T10:00:00Z',
      expiry_date: '2024-04-01T10:00:00Z',
      auto_renew: true,
      status: 'ativo',
      nameservers: ['ns1.angohost.ao', 'ns2.angohost.ao']
    },
    {
      id: '2',
      name: 'minhaempresa',
      tld: 'co.ao',
      registration_date: '2023-05-15T14:30:00Z',
      expiry_date: '2024-05-15T14:30:00Z',
      auto_renew: false,
      status: 'ativo',
      nameservers: ['ns1.angohost.ao', 'ns2.angohost.ao']
    },
    {
      id: '3',
      name: 'meudominio',
      tld: 'com',
      registration_date: '2022-11-10T09:15:00Z',
      expiry_date: '2023-11-10T09:15:00Z',
      auto_renew: true,
      status: 'expirado',
      nameservers: ['ns1.angohost.ao', 'ns2.angohost.ao']
    }
  ];

  const allDomains = domains.length > 0 ? domains : mockDomains;

  const filteredDomains = allDomains.filter(domain => {
    const fullDomainName = `${domain.name}.${domain.tld}`.toLowerCase();
    const matchesSearch = fullDomainName.includes(searchTerm.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'active') return matchesSearch && (domain.status === 'ativo' || domain.status === 'active');
    if (activeTab === 'expired') return matchesSearch && (domain.status === 'expirado' || domain.status === 'expired');
    if (activeTab === 'pending') return matchesSearch && (domain.status === 'pendente' || domain.status === 'pending');
    
    return matchesSearch;
  });
  
  const handleRenewDomain = (domain: any) => {
    navigate('/checkout', { 
      state: { 
        paymentType: 'domain_renewal', 
        domainId: domain.id,
        domainName: `${domain.name}.${domain.tld}`,
      } 
    });
  };
  
  const handleTransferDomain = () => {
    navigate('/dominios/transferir');
  };
  
  const handleRegisterDomain = () => {
    navigate('/dominios/registrar');
  };
  
  const handleManageDomain = (domain: any) => {
    navigate('/dominios/configurar', { 
      state: { 
        domainId: domain.id,
        domainName: `${domain.name}.${domain.tld}`,
      } 
    });
  };
  
  const handleManageDNS = (domain: any) => {
    toast.info(`Abrindo gerenciador de DNS para ${domain.name}.${domain.tld}...`);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };
  
  const getDaysUntilExpiry = (expiryDateString: string) => {
    const today = new Date();
    const expiryDate = new Date(expiryDateString);
    const diffTime = expiryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center">
          <Globe className="mr-2 h-5 w-5 text-primary" />
          Gerenciamento de Domínios
        </CardTitle>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={handleTransferDomain}>
            <ArrowRightLeft className="mr-2 h-4 w-4" />
            Transferir Domínio
          </Button>
          <Button size="sm" onClick={handleRegisterDomain}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Registrar Novo Domínio
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
            <TabsList>
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="active">Ativos</TabsTrigger>
              <TabsTrigger value="expired">Expirados</TabsTrigger>
              <TabsTrigger value="pending">Pendentes</TabsTrigger>
            </TabsList>
            
            <div className="relative w-full md:max-w-xs">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar domínios..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <TabsContent value="all" className="m-0">
            {filteredDomains.length > 0 ? (
              <div className="border rounded-md overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Domínio</TableHead>
                      <TableHead>Data de Registro</TableHead>
                      <TableHead>Expira em</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Auto-Renovação</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDomains.map((domain) => (
                      <TableRow key={domain.id}>
                        <TableCell className="font-medium">
                          {domain.name}.{domain.tld}
                        </TableCell>
                        <TableCell>{formatDate(domain.registration_date)}</TableCell>
                        <TableCell>
                          {formatDate(domain.expiry_date)}
                          {domain.status !== 'expirado' && domain.status !== 'expired' && (
                            <div className="text-xs text-gray-500 mt-1">
                              {getDaysUntilExpiry(domain.expiry_date)} dias restantes
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(domain.status)}>
                            {domain.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {domain.auto_renew ? (
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                              Ativada
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                              Desativada
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            {(domain.status === 'expirado' || domain.status === 'expired') && (
                              <Button 
                                size="sm" 
                                onClick={() => handleRenewDomain(domain)}
                              >
                                <RefreshCw className="h-4 w-4 mr-1" />
                                Renovar
                              </Button>
                            )}
                            <Button 
                              size="icon" 
                              variant="ghost"
                              onClick={() => handleManageDNS(domain)}
                            >
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="icon" 
                              variant="ghost" 
                              onClick={() => handleManageDomain(domain)}
                            >
                              <Settings className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-12">
                <Globe className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">Nenhum domínio encontrado</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Você não possui nenhum domínio registrado no momento.
                </p>
                <Button 
                  className="mt-4" 
                  onClick={handleRegisterDomain}
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Registrar Novo Domínio
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="active" className="m-0">
            {/* Same table structure for active domains */}
          </TabsContent>
          
          <TabsContent value="expired" className="m-0">
            {/* Same table structure for expired domains */}
          </TabsContent>
          
          <TabsContent value="pending" className="m-0">
            {/* Same table structure for pending domains */}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
