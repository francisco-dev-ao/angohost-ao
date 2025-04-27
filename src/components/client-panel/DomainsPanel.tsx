
import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Globe, RefreshCw, Lock, Settings, ExternalLink } from "lucide-react";
import { toast } from 'sonner';

type ClientPanelContext = {
  userData: any;
  services: any[];
  domains: any[];
  invoices: any[];
};

export const DomainsPanel = () => {
  const { domains = [] } = useOutletContext<ClientPanelContext>();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  const getStatusColor = (status: string) => {
    switch(status.toLowerCase()) {
      case 'active':
      case 'ativo':
        return 'bg-green-100 text-green-800';
      case 'pending':
      case 'pendente':
        return 'bg-yellow-100 text-yellow-800';
      case 'expired':
      case 'expirado':
        return 'bg-red-100 text-red-800';
      case 'transferring':
      case 'transferindo':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Default domains if none are available
  const mockDomains = [
    {
      id: '1',
      name: 'exemplo',
      tld: '.ao',
      status: 'active',
      registration_date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      expiry_date: new Date(Date.now() + 335 * 24 * 60 * 60 * 1000).toISOString(),
      auto_renew: true,
      ns1: 'ns1.angohost.ao',
      ns2: 'ns2.angohost.ao',
    },
    {
      id: '2',
      name: 'meusite',
      tld: '.ao',
      status: 'pending',
      registration_date: new Date().toISOString(),
      expiry_date: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      auto_renew: true,
      ns1: 'ns1.angohost.ao',
      ns2: 'ns2.angohost.ao',
    }
  ];
  
  const allDomains = domains.length > 0 ? domains : mockDomains;
  
  const filteredDomains = allDomains.filter(domain => {
    const fullDomainName = `${domain.name}${domain.tld}`;
    const matchesSearch = fullDomainName.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'active') return matchesSearch && (domain.status === 'active' || domain.status === 'ativo');
    if (activeTab === 'pending') return matchesSearch && (domain.status === 'pending' || domain.status === 'pendente');
    if (activeTab === 'expired') return matchesSearch && (domain.status === 'expired' || domain.status === 'expirado');
    
    return matchesSearch;
  });
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };
  
  const handleDomainAction = (action: string, domainId: string, domainName: string) => {
    switch(action) {
      case 'dns':
        toast.info(`Redirecionando para configuração de DNS de ${domainName}...`);
        break;
      case 'nameservers':
        toast.info(`Redirecionando para configuração de nameservers de ${domainName}...`);
        break;
      case 'renew':
        toast.info(`Redirecionando para renovação de ${domainName}...`);
        break;
      default:
        break;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center">
          <Globe className="mr-2 h-5 w-5 text-primary" />
          Gerenciamento de Domínios
        </CardTitle>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Atualizar
          </Button>
          <Button size="sm">
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
              <TabsTrigger value="pending">Pendentes</TabsTrigger>
              <TabsTrigger value="expired">Expirados</TabsTrigger>
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
                      <TableHead>Registro</TableHead>
                      <TableHead>Expiração</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Renovação</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDomains.map((domain) => (
                      <TableRow key={domain.id}>
                        <TableCell className="font-medium">
                          {domain.name}{domain.tld}
                        </TableCell>
                        <TableCell>{formatDate(domain.registration_date)}</TableCell>
                        <TableCell>{formatDate(domain.expiry_date)}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(domain.status)}>
                            {domain.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {domain.auto_renew ? (
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                              Auto
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                              Manual
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleDomainAction('dns', domain.id, `${domain.name}${domain.tld}`)}
                            >
                              DNS
                            </Button>
                            <Button 
                              size="icon" 
                              variant="ghost"
                              onClick={() => handleDomainAction('nameservers', domain.id, `${domain.name}${domain.tld}`)}
                            >
                              <Settings className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="icon" 
                              variant="ghost"
                              onClick={() => window.open(`http://${domain.name}${domain.tld}`, '_blank')}
                            >
                              <ExternalLink className="h-4 w-4" />
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
                  Não existem domínios correspondentes aos seus critérios de busca.
                </p>
                <div className="mt-6">
                  <Button>
                    Registrar Novo Domínio
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="active" className="m-0">
            {/* Same table structure for active domains */}
          </TabsContent>
          
          <TabsContent value="pending" className="m-0">
            {/* Same table structure for pending domains */}
          </TabsContent>
          
          <TabsContent value="expired" className="m-0">
            {/* Same table structure for expired domains */}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
