
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Globe, Search, RefreshCcw, RotateCw, Lock, Unlock, 
  Edit, Key, ShieldCheck, Settings
} from 'lucide-react';

export const DomainsPanel = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // In a real app, this would be fetched from the backend
  const domains = [];
  
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
        <Tabs defaultValue="domains">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
            <TabsList>
              <TabsTrigger value="domains">Meus Domínios</TabsTrigger>
              <TabsTrigger value="dns">Gerenciar DNS</TabsTrigger>
              <TabsTrigger value="nameservers">Nameservers</TabsTrigger>
              <TabsTrigger value="transfer">Transferência</TabsTrigger>
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
          
          <TabsContent value="domains" className="m-0">
            <div className="rounded-md border">
              <div className="grid grid-cols-7 p-4 font-medium border-b bg-muted/50">
                <div className="col-span-2">Domínio</div>
                <div>Data de Registro</div>
                <div>Data de Expiração</div>
                <div>Status</div>
                <div className="col-span-2 text-right">Ações</div>
              </div>
              
              {domains.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  <Globe className="h-12 w-12 mx-auto mb-3 text-muted-foreground/60" />
                  <p>Você não tem domínios registrados</p>
                  <Button variant="outline" size="sm" className="mt-4">
                    Registrar Domínio
                  </Button>
                </div>
              ) : (
                domains.map(domain => (
                  <div key={domain.id} className="grid grid-cols-7 p-4 items-center border-b hover:bg-muted/50">
                    <div className="col-span-2 font-medium">{domain.name}</div>
                    <div>{domain.registrationDate}</div>
                    <div>{domain.expiryDate}</div>
                    <div>{getStatusBadge(domain.status)}</div>
                    <div className="col-span-2 text-right space-x-1">
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4 mr-1" />
                        Gerenciar
                      </Button>
                      <Button variant="outline" size="sm">
                        <RotateCw className="h-4 w-4 mr-1" />
                        Renovar
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="dns" className="m-0">
            {domains.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                <Globe className="h-12 w-12 mx-auto mb-3 text-muted-foreground/60" />
                <p>Você não tem domínios registrados</p>
                <Button variant="outline" size="sm" className="mt-4">
                  Registrar Domínio
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Gerenciar DNS para exemplo.ao</h3>
                  <Button size="sm">
                    Adicionar Registro DNS
                  </Button>
                </div>
                
                <div className="rounded-md border">
                  <div className="grid grid-cols-5 p-4 font-medium border-b bg-muted/50">
                    <div>Tipo</div>
                    <div>Nome</div>
                    <div>Valor</div>
                    <div>TTL</div>
                    <div className="text-right">Ações</div>
                  </div>
                  
                  <div className="grid grid-cols-5 p-4 items-center border-b">
                    <div>A</div>
                    <div>exemplo.ao</div>
                    <div>198.51.100.42</div>
                    <div>3600</div>
                    <div className="text-right space-x-1">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-500">
                        <Globe className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-5 p-4 items-center border-b">
                    <div>CNAME</div>
                    <div>www</div>
                    <div>exemplo.ao</div>
                    <div>3600</div>
                    <div className="text-right space-x-1">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-500">
                        <Globe className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-5 p-4 items-center">
                    <div>MX</div>
                    <div>exemplo.ao</div>
                    <div>mail.exemplo.ao</div>
                    <div>3600</div>
                    <div className="text-right space-x-1">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-500">
                        <Globe className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="nameservers" className="m-0">
            {domains.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                <Globe className="h-12 w-12 mx-auto mb-3 text-muted-foreground/60" />
                <p>Você não tem domínios registrados</p>
                <Button variant="outline" size="sm" className="mt-4">
                  Registrar Domínio
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Gerenciar Nameservers para exemplo.ao</h3>
                  <Button size="sm" variant="outline">
                    Salvar Alterações
                  </Button>
                </div>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Nameserver 1</label>
                          <Input defaultValue="ns1.angohost.ao" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Nameserver 2</label>
                          <Input defaultValue="ns2.angohost.ao" />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Nameserver 3 (opcional)</label>
                          <Input defaultValue="ns3.angohost.ao" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Nameserver 4 (opcional)</label>
                          <Input defaultValue="ns4.angohost.ao" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="transfer" className="m-0">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Transferência de Domínio</CardTitle>
                  <CardDescription>Solicite o código EPP para transferir seu domínio para outro registrador</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {domains.length === 0 ? (
                    <div className="p-8 text-center text-muted-foreground">
                      <Globe className="h-12 w-12 mx-auto mb-3 text-muted-foreground/60" />
                      <p>Você não tem domínios registrados</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Selecione o Domínio</label>
                        <select className="w-full p-2 border rounded-md">
                          <option>exemplo.ao</option>
                        </select>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button>
                          <Key className="h-4 w-4 mr-2" />
                          Obter Código EPP
                        </Button>
                        <Button variant="outline">
                          <Lock className="h-4 w-4 mr-2" />
                          Bloquear Domínio
                        </Button>
                        <Button variant="outline">
                          <Unlock className="h-4 w-4 mr-2" />
                          Desbloquear Domínio
                        </Button>
                      </div>
                      
                      <div className="p-4 bg-muted rounded-md">
                        <h4 className="font-medium mb-2">Status de Proteção</h4>
                        <div className="flex space-x-2 items-center">
                          <ShieldCheck className="h-5 w-5 text-green-500" />
                          <span>Este domínio está protegido contra transferências não autorizadas</span>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Transferir Domínio para AngoHost</CardTitle>
                  <CardDescription>Transfira seu domínio de outro registrador para a AngoHost</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button>
                    <Globe className="h-4 w-4 mr-2" />
                    Iniciar Transferência
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
