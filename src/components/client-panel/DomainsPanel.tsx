
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Globe, Search, Settings, RefreshCw, Lock } from "lucide-react";
import { toast } from "sonner";

interface DomainsPanelProps {
  domains?: any[];
}

export const DomainsPanel = ({ domains = [] }: DomainsPanelProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
      case 'ativo':
        return 'bg-green-100 text-green-800';
      case 'pending':
      case 'pendente':
        return 'bg-amber-100 text-amber-800';
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

  // Sample mockup data if no domains are provided
  const mockDomains = [
    {
      id: '1',
      name: 'exemplo',
      tld: 'ao',
      status: 'ativo',
      registration_date: '2024-01-15T10:00:00Z',
      expiry_date: '2025-01-15T10:00:00Z',
      auto_renew: true
    },
    {
      id: '2',
      name: 'meusite',
      tld: 'com',
      status: 'pendente',
      registration_date: '2025-04-10T14:30:00Z',
      expiry_date: '2026-04-10T14:30:00Z',
      auto_renew: false
    },
    {
      id: '3',
      name: 'minhaempresa',
      tld: 'co.ao',
      status: 'ativo',
      registration_date: '2023-11-05T09:15:00Z',
      expiry_date: '2025-11-05T09:15:00Z',
      auto_renew: true
    },
    {
      id: '4',
      name: 'antigoportal',
      tld: 'net',
      status: 'expirado',
      registration_date: '2022-05-20T16:45:00Z',
      expiry_date: '2024-05-20T16:45:00Z',
      auto_renew: false
    }
  ];
  
  // Use mockup data if no real data is available
  const allDomains = domains && domains.length > 0 ? domains : mockDomains;

  const filteredDomains = allDomains.filter(domain => {
    const fullDomainName = `${domain.name}.${domain.tld}`.toLowerCase();
    
    // Filter by search term
    const matchesSearch = fullDomainName.includes(searchTerm.toLowerCase());
    
    // Filter by tab
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'active') return matchesSearch && (domain.status === 'ativo' || domain.status === 'active');
    if (activeTab === 'pending') return matchesSearch && (domain.status === 'pendente' || domain.status === 'pending');
    if (activeTab === 'expired') return matchesSearch && (domain.status === 'expirado' || domain.status === 'expired');
    
    return matchesSearch;
  });
  
  const handleRenewDomain = (domainId: string, domainName: string) => {
    toast.info(`Iniciando renovação para ${domainName}...`);
    // In a real app, navigate to checkout or renewal page
  };
  
  const handleUpdateNameservers = (domainId: string, domainName: string) => {
    toast.info(`Abrindo configuração de nameservers para ${domainName}`);
    // In a real app, open a dialog or navigate to nameserver config page
  };
  
  const handleToggleAutoRenew = (domain: any) => {
    const newState = !domain.auto_renew;
    toast.success(`Renovação automática ${newState ? 'ativada' : 'desativada'} para ${domain.name}.${domain.tld}`);
    // In a real app, update the domain in the database
  };
  
  const handleManageDNS = (domainId: string, domainName: string) => {
    toast.info(`Abrindo gerenciamento de DNS para ${domainName}`);
    // In a real app, navigate to DNS management page
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };
  
  const getDaysUntilExpiry = (expiryDateString: string) => {
    const today = new Date();
    const expiryDate = new Date(expiryDateString);
    const differenceInTime = expiryDate.getTime() - today.getTime();
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
    return differenceInDays;
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center">
          <Globe className="mr-2 h-5 w-5 text-primary" />
          Gerenciamento de Domínios
        </CardTitle>
        <div className="flex items-center space-x-2">
          <Button>
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
                      <TableHead>Data de Registro</TableHead>
                      <TableHead>Expiração</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Auto-Renovação</TableHead>
                      <TableHead>Ações</TableHead>
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
                          <Badge variant={domain.auto_renew ? "default" : "outline"}>
                            {domain.auto_renew ? "Ativada" : "Desativada"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            {(domain.status === 'ativo' || domain.status === 'active') && (
                              <>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => handleManageDNS(domain.id, `${domain.name}.${domain.tld}`)}
                                >
                                  <Settings className="h-4 w-4 mr-1" />
                                  DNS
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => handleUpdateNameservers(domain.id, `${domain.name}.${domain.tld}`)}
                                >
                                  <Lock className="h-4 w-4 mr-1" />
                                  NS
                                </Button>
                              </>
                            )}
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={() => handleToggleAutoRenew(domain)}
                            >
                              <RefreshCw className="h-4 w-4" />
                            </Button>
                            {(domain.status === 'expirado' || domain.status === 'expired' ||
                              getDaysUntilExpiry(domain.expiry_date) < 30) && (
                              <Button 
                                size="sm"
                                onClick={() => handleRenewDomain(domain.id, `${domain.name}.${domain.tld}`)}
                              >
                                Renovar
                              </Button>
                            )}
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
