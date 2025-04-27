import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Globe, Search, ExternalLink, Settings, RefreshCcw, 
  ArrowUpRight, ServerCog, Shield, Database, BarChart4
} from 'lucide-react';
import { DomainsPanelProps } from './dashboard/types';

export const DomainsPanel = ({ domains = [] }: DomainsPanelProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredDomains = domains.filter(domain => 
    `${domain.name}.${domain.tld}`.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500">Ativo</Badge>;
      case 'pending':
        return <Badge variant="outline" className="text-yellow-600 border-yellow-300">Pendente</Badge>;
      case 'expired':
        return <Badge className="bg-red-500">Expirado</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Gerenciamento de Domínios</CardTitle>
          <CardDescription>Gerencie seus domínios registrados</CardDescription>
        </div>
        <div className="space-x-2">
          <Button variant="outline" size="sm">
            <RefreshCcw className="h-4 w-4 mr-2" />
            Atualizar
          </Button>
          <Button size="sm">
            <Globe className="h-4 w-4 mr-2" />
            Registrar Novo Domínio
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
            <TabsList>
              <TabsTrigger value="all">Todos Domínios</TabsTrigger>
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
            {filteredDomains.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                <Globe className="h-12 w-12 mx-auto mb-3 text-muted-foreground/60" />
                <p>Nenhum domínio encontrado</p>
                <Button variant="outline" size="sm" className="mt-4">
                  Registrar Domínio
                </Button>
              </div>
            ) : (
              <div className="rounded-md border overflow-hidden">
                <div className="grid grid-cols-6 p-4 font-medium border-b bg-muted/50">
                  <div className="col-span-2">Domínio</div>
                  <div>Data Registro</div>
                  <div>Data Expiração</div>
                  <div>Status</div>
                  <div className="text-right">Ações</div>
                </div>
                
                {filteredDomains.map(domain => (
                  <div key={domain.id} className="grid grid-cols-6 p-4 items-center border-b hover:bg-muted/50">
                    <div className="col-span-2 font-medium">
                      {domain.name}.{domain.tld}
                    </div>
                    <div>{new Date(domain.created_at || Date.now()).toLocaleDateString()}</div>
                    <div>{new Date(domain.expiry_date || Date.now()).toLocaleDateString()}</div>
                    <div>{getStatusBadge(domain.status)}</div>
                    <div className="text-right space-x-1">
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4 mr-1" />
                        DNS
                      </Button>
                      <Button variant="outline" size="sm">
                        <ArrowUpRight className="h-4 w-4 mr-1" />
                        Renovar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="active" className="m-0">
            <div className="rounded-md border overflow-hidden">
              <div className="grid grid-cols-6 p-4 font-medium border-b bg-muted/50">
                <div className="col-span-2">Domínio</div>
                <div>Data Registro</div>
                <div>Data Expiração</div>
                <div>Status</div>
                <div className="text-right">Ações</div>
              </div>
              
              {filteredDomains
                .filter(domain => domain.status === 'active')
                .map(domain => (
                  <div key={domain.id} className="grid grid-cols-6 p-4 items-center border-b hover:bg-muted/50">
                    <div className="col-span-2 font-medium">
                      {domain.name}.{domain.tld}
                    </div>
                    <div>{new Date(domain.created_at || Date.now()).toLocaleDateString()}</div>
                    <div>{new Date(domain.expiry_date || Date.now()).toLocaleDateString()}</div>
                    <div>{getStatusBadge(domain.status)}</div>
                    <div className="text-right space-x-1">
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4 mr-1" />
                        DNS
                      </Button>
                      <Button variant="outline" size="sm">
                        <ArrowUpRight className="h-4 w-4 mr-1" />
                        Renovar
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </TabsContent>
          
          <TabsContent value="pending" className="m-0">
            <div className="rounded-md border overflow-hidden">
              <div className="grid grid-cols-6 p-4 font-medium border-b bg-muted/50">
                <div className="col-span-2">Domínio</div>
                <div>Data Registro</div>
                <div>Data Expiração</div>
                <div>Status</div>
                <div className="text-right">Ações</div>
              </div>
              
              {filteredDomains
                .filter(domain => domain.status === 'pending')
                .map(domain => (
                  <div key={domain.id} className="grid grid-cols-6 p-4 items-center border-b hover:bg-muted/50">
                    <div className="col-span-2 font-medium">
                      {domain.name}.{domain.tld}
                    </div>
                    <div>{new Date(domain.created_at || Date.now()).toLocaleDateString()}</div>
                    <div>{new Date(domain.expiry_date || Date.now()).toLocaleDateString()}</div>
                    <div>{getStatusBadge(domain.status)}</div>
                    <div className="text-right space-x-1">
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4 mr-1" />
                        Detalhes
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </TabsContent>
          
          <TabsContent value="expired" className="m-0">
            <div className="rounded-md border overflow-hidden">
              <div className="grid grid-cols-6 p-4 font-medium border-b bg-muted/50">
                <div className="col-span-2">Domínio</div>
                <div>Data Registro</div>
                <div>Data Expiração</div>
                <div>Status</div>
                <div className="text-right">Ações</div>
              </div>
              
              {filteredDomains
                .filter(domain => domain.status === 'expired')
                .map(domain => (
                  <div key={domain.id} className="grid grid-cols-6 p-4 items-center border-b hover:bg-muted/50">
                    <div className="col-span-2 font-medium">
                      {domain.name}.{domain.tld}
                    </div>
                    <div>{new Date(domain.created_at || Date.now()).toLocaleDateString()}</div>
                    <div>{new Date(domain.expiry_date || Date.now()).toLocaleDateString()}</div>
                    <div>{getStatusBadge(domain.status)}</div>
                    <div className="text-right space-x-1">
                      <Button variant="outline" size="sm">
                        <ArrowUpRight className="h-4 w-4 mr-1" />
                        Renovar
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
