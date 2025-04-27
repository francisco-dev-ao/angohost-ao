
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Package, Search, ExternalLink, Settings, RefreshCcw, 
  ArrowUpRight, ServerCog, Shield, Database, BarChart4
} from 'lucide-react';
import { ServicesPanelProps } from './dashboard/types';

export const ServicesPanel = ({ services = [] }: ServicesPanelProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const services = [
    {
      id: '1',
      name: 'Hospedagem cPanel',
      plan: 'Plano Profissional',
      status: 'active',
      domain: 'exemplo.ao',
      expiryDate: '20/12/2025',
      serverName: 'server01.angohost.ao',
      username: 'cliente1',
    },
    {
      id: '2',
      name: 'Hospedagem WordPress',
      plan: 'Plano Básico',
      status: 'active',
      domain: 'outrosite.ao',
      expiryDate: '15/10/2025',
      serverName: 'wp01.angohost.ao',
      username: 'cliente1_wp',
    }
  ];
  
  const filteredServices = services.filter(service => 
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    service.domain.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500">Ativo</Badge>;
      case 'pending':
        return <Badge variant="outline" className="text-yellow-600 border-yellow-300">Pendente</Badge>;
      case 'suspended':
        return <Badge className="bg-red-500">Suspenso</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Gerenciamento de Serviços</CardTitle>
          <CardDescription>Gerencie seus produtos e serviços ativos</CardDescription>
        </div>
        <div className="space-x-2">
          <Button variant="outline" size="sm">
            <RefreshCcw className="h-4 w-4 mr-2" />
            Atualizar
          </Button>
          <Button size="sm">
            <Package className="h-4 w-4 mr-2" />
            Adquirir Novo Serviço
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
            <TabsList>
              <TabsTrigger value="all">Todos Serviços</TabsTrigger>
              <TabsTrigger value="hosting">Hospedagem Web</TabsTrigger>
              <TabsTrigger value="email">Email</TabsTrigger>
              <TabsTrigger value="vps">Servidores VPS</TabsTrigger>
              <TabsTrigger value="dedicated">Servidores Dedicados</TabsTrigger>
            </TabsList>
            
            <div className="relative w-full md:max-w-xs">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar serviços..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <TabsContent value="all" className="m-0">
            {filteredServices.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                <Package className="h-12 w-12 mx-auto mb-3 text-muted-foreground/60" />
                <p>Nenhum serviço encontrado</p>
                <Button variant="outline" size="sm" className="mt-4">
                  Adquirir Serviço
                </Button>
              </div>
            ) : (
              <div className="rounded-md border overflow-hidden">
                <div className="grid grid-cols-7 p-4 font-medium border-b bg-muted/50">
                  <div className="col-span-2">Produto/Serviço</div>
                  <div>Domínio</div>
                  <div>Data Expiração</div>
                  <div>Status</div>
                  <div className="col-span-2 text-right">Ações</div>
                </div>
                
                {filteredServices.map(service => (
                  <div key={service.id} className="grid grid-cols-7 p-4 items-center border-b hover:bg-muted/50">
                    <div className="col-span-2">
                      <p className="font-medium">{service.name}</p>
                      <p className="text-sm text-muted-foreground">{service.plan}</p>
                    </div>
                    <div>{service.domain}</div>
                    <div>{service.expiryDate}</div>
                    <div>{getStatusBadge(service.status)}</div>
                    <div className="col-span-2 text-right space-x-1">
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-4 w-4 mr-1" />
                        cPanel
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4 mr-1" />
                        Gerenciar
                      </Button>
                      <Button variant="outline" size="sm">
                        <ArrowUpRight className="h-4 w-4 mr-1" />
                        Upgrade
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="hosting" className="m-0">
            <div className="rounded-md border mb-6">
              <div className="grid grid-cols-7 p-4 font-medium border-b bg-muted/50">
                <div className="col-span-2">Produto/Serviço</div>
                <div>Domínio</div>
                <div>Data Expiração</div>
                <div>Status</div>
                <div className="col-span-2 text-right">Ações</div>
              </div>
              
              {filteredServices.map(service => (
                <div key={service.id} className="grid grid-cols-7 p-4 items-center border-b hover:bg-muted/50">
                  <div className="col-span-2">
                    <p className="font-medium">{service.name}</p>
                    <p className="text-sm text-muted-foreground">{service.plan}</p>
                  </div>
                  <div>{service.domain}</div>
                  <div>{service.expiryDate}</div>
                  <div>{getStatusBadge(service.status)}</div>
                  <div className="col-span-2 text-right space-x-1">
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      cPanel
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4 mr-1" />
                      Gerenciar
                    </Button>
                    <Button variant="outline" size="sm">
                      <ArrowUpRight className="h-4 w-4 mr-1" />
                      Upgrade
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Dados da Hospedagem</CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Servidor:</dt>
                      <dd className="font-medium">server01.angohost.ao</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Usuário:</dt>
                      <dd className="font-medium">cliente1</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Domínio Principal:</dt>
                      <dd className="font-medium">exemplo.ao</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">IP do Servidor:</dt>
                      <dd className="font-medium">198.51.100.42</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Nameservers:</dt>
                      <dd className="font-medium text-right">
                        <div>ns1.angohost.ao</div>
                        <div>ns2.angohost.ao</div>
                      </dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Acessos Rápidos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <ServerCog className="h-4 w-4 mr-2" />
                    cPanel Login
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Database className="h-4 w-4 mr-2" />
                    phpMyAdmin
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Shield className="h-4 w-4 mr-2" />
                    SSL/TLS
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <BarChart4 className="h-4 w-4 mr-2" />
                    Estatísticas
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="col-span-1 md:col-span-2">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Uso de Recursos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Espaço em Disco</span>
                        <span>2.1 GB / 20 GB</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '10%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Banda</span>
                        <span>45 GB / 200 GB</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '22%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Contas de Email</span>
                        <span>3 / 10</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Bancos de Dados</span>
                        <span>2 / 10</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-amber-500 h-2 rounded-full" style={{ width: '20%' }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="email" className="m-0">
            <div className="p-8 text-center text-muted-foreground">
              <Package className="h-12 w-12 mx-auto mb-3 text-muted-foreground/60" />
              <p>Nenhum serviço de email encontrado</p>
              <Button variant="outline" size="sm" className="mt-4">
                Adquirir Email Profissional
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="vps" className="m-0">
            <div className="p-8 text-center text-muted-foreground">
              <Package className="h-12 w-12 mx-auto mb-3 text-muted-foreground/60" />
              <p>Nenhum servidor VPS encontrado</p>
              <Button variant="outline" size="sm" className="mt-4">
                Adquirir Servidor VPS
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="dedicated" className="m-0">
            <div className="p-8 text-center text-muted-foreground">
              <Package className="h-12 w-12 mx-auto mb-3 text-muted-foreground/60" />
              <p>Nenhum servidor dedicado encontrado</p>
              <Button variant="outline" size="sm" className="mt-4">
                Adquirir Servidor Dedicado
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
