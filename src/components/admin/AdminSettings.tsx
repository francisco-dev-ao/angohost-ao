
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Settings, Globe, Mail, CreditCard, RefreshCcw, 
  Server, Smartphone, PiggyBank, Bell 
} from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [loading, setLoading] = useState(false);
  
  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Configurações</h2>
          <p className="text-muted-foreground">Gerenciar configurações do sistema</p>
        </div>
      </div>
      
      <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="general" className="px-4">
            <Settings className="h-4 w-4 mr-2" />
            Geral
          </TabsTrigger>
          <TabsTrigger value="payment" className="px-4">
            <CreditCard className="h-4 w-4 mr-2" />
            Pagamentos
          </TabsTrigger>
          <TabsTrigger value="automation" className="px-4">
            <RefreshCcw className="h-4 w-4 mr-2" />
            Automação
          </TabsTrigger>
          <TabsTrigger value="domains" className="px-4">
            <Globe className="h-4 w-4 mr-2" />
            Domínios
          </TabsTrigger>
          <TabsTrigger value="email" className="px-4">
            <Mail className="h-4 w-4 mr-2" />
            Email
          </TabsTrigger>
          <TabsTrigger value="servers" className="px-4">
            <Server className="h-4 w-4 mr-2" />
            Servidores
          </TabsTrigger>
          <TabsTrigger value="integration" className="px-4">
            <Smartphone className="h-4 w-4 mr-2" />
            Integrações
          </TabsTrigger>
          <TabsTrigger value="tax" className="px-4">
            <PiggyBank className="h-4 w-4 mr-2" />
            Impostos
          </TabsTrigger>
          <TabsTrigger value="notifications" className="px-4">
            <Bell className="h-4 w-4 mr-2" />
            Notificações
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Configurações Gerais</CardTitle>
              <CardDescription>Configurações básicas do sistema</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Nome da Empresa</Label>
                  <Input id="company-name" defaultValue="AngoHost" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="system-url">URL do Sistema</Label>
                  <Input id="system-url" defaultValue="https://angohost.ao" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-email">Email Administrativo</Label>
                  <Input id="admin-email" defaultValue="admin@angohost.ao" type="email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="support-email">Email de Suporte</Label>
                  <Input id="support-email" defaultValue="suporte@angohost.ao" type="email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input id="phone" defaultValue="+244 923 456 789" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Endereço</Label>
                  <Input id="address" defaultValue="Rua Principal, Luanda, Angola" />
                </div>
              </div>
              
              <div className="space-y-4 border-t pt-6">
                <h3 className="text-lg font-medium">Opções da Interface</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="maintenance-mode">Modo de Manutenção</Label>
                      <p className="text-sm text-muted-foreground">
                        Ativar o modo de manutenção para todo o sistema
                      </p>
                    </div>
                    <Switch id="maintenance-mode" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="debug-mode">Modo de Depuração</Label>
                      <p className="text-sm text-muted-foreground">
                        Exibir informações detalhadas de depuração para administradores
                      </p>
                    </div>
                    <Switch id="debug-mode" />
                  </div>
                </div>
              </div>
              
              <div className="pt-4">
                <Button onClick={handleSave} disabled={loading} className="mr-2">
                  {loading ? 'Salvando...' : 'Salvar Alterações'}
                </Button>
                <Button variant="ghost">
                  Cancelar
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="payment" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Pagamento</CardTitle>
              <CardDescription>Gerenciar métodos e opções de pagamento</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Métodos de Pagamento</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-2 rounded-md">
                          <CreditCard className="h-5 w-5 text-blue-700" />
                        </div>
                        <div>
                          <h4 className="font-medium">Cartão de Crédito/Débito</h4>
                          <p className="text-xs text-muted-foreground">Aceitar pagamentos com cartão</p>
                        </div>
                      </div>
                      <Switch id="credit-card-method" checked={true} />
                    </div>
                    <div className="mt-4 pt-4 border-t text-sm">
                      <Button variant="link" size="sm" className="h-auto p-0">
                        Configurar Gateway
                      </Button>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-green-100 p-2 rounded-md">
                          <Globe className="h-5 w-5 text-green-700" />
                        </div>
                        <div>
                          <h4 className="font-medium">Multicaixa Express</h4>
                          <p className="text-xs text-muted-foreground">Pagamentos via Multicaixa</p>
                        </div>
                      </div>
                      <Switch id="multicaixa-method" checked={true} />
                    </div>
                    <div className="mt-4 pt-4 border-t text-sm">
                      <Button variant="link" size="sm" className="h-auto p-0">
                        Configurar Gateway
                      </Button>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-purple-100 p-2 rounded-md">
                          <CreditCard className="h-5 w-5 text-purple-700" />
                        </div>
                        <div>
                          <h4 className="font-medium">PayPal</h4>
                          <p className="text-xs text-muted-foreground">Pagamentos internacionais</p>
                        </div>
                      </div>
                      <Switch id="paypal-method" checked={false} />
                    </div>
                    <div className="mt-4 pt-4 border-t text-sm">
                      <Button variant="link" size="sm" className="h-auto p-0">
                        Configurar Gateway
                      </Button>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-amber-100 p-2 rounded-md">
                          <CreditCard className="h-5 w-5 text-amber-700" />
                        </div>
                        <div>
                          <h4 className="font-medium">Transferência Bancária</h4>
                          <p className="text-xs text-muted-foreground">Instruções para transferência</p>
                        </div>
                      </div>
                      <Switch id="bank-transfer-method" checked={true} />
                    </div>
                    <div className="mt-4 pt-4 border-t text-sm">
                      <Button variant="link" size="sm" className="h-auto p-0">
                        Configurar Detalhes
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 border-t pt-6">
                <h3 className="text-lg font-medium">Opções de Faturamento</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="invoice-prefix">Prefixo de Fatura</Label>
                    <Input id="invoice-prefix" defaultValue="INV-" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="invoice-start">Número Inicial</Label>
                    <Input id="invoice-start" defaultValue="1000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="payment-due">Prazo de Pagamento (dias)</Label>
                    <Input id="payment-due" defaultValue="15" type="number" min="1" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="late-fee">Multa por Atraso (%)</Label>
                    <Input id="late-fee" defaultValue="2" type="number" min="0" step="0.1" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="auto-reminders">Lembretes Automáticos</Label>
                      <p className="text-sm text-muted-foreground">
                        Enviar lembretes de faturas pendentes automaticamente
                      </p>
                    </div>
                    <Switch id="auto-reminders" checked={true} />
                  </div>
                </div>
              </div>
              
              <div className="pt-4">
                <Button onClick={handleSave} disabled={loading} className="mr-2">
                  {loading ? 'Salvando...' : 'Salvar Alterações'}
                </Button>
                <Button variant="ghost">
                  Cancelar
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="automation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Automação</CardTitle>
              <CardDescription>Configurar tarefas automatizadas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Tarefas Programadas</h3>
                
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Geração de Faturas</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Gerar faturas automaticamente para serviços recorrentes
                        </p>
                      </div>
                      <div>
                        <select className="p-2 border rounded-md">
                          <option value="daily">Diariamente</option>
                          <option value="weekly">Semanalmente</option>
                          <option value="monthly" selected>Mensalmente</option>
                        </select>
                      </div>
                    </div>
                    <div className="pt-2 mt-2 border-t">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Dias antes do vencimento</span>
                        <span className="text-xs font-medium">15 dias</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Lembretes de Vencimento</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Enviar lembretes antes do vencimento de faturas e serviços
                        </p>
                      </div>
                      <Switch id="expiry-reminders" checked={true} />
                    </div>
                    <div className="space-y-2 pt-4 mt-4 border-t">
                      <div className="flex items-center justify-between">
                        <span className="text-xs">Primeiro lembrete:</span>
                        <span className="text-xs font-medium">7 dias antes</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs">Segundo lembrete:</span>
                        <span className="text-xs font-medium">3 dias antes</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs">Lembrete final:</span>
                        <span className="text-xs font-medium">1 dia antes</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Suspensão Automática</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Suspender serviços com faturas em atraso
                        </p>
                      </div>
                      <Switch id="auto-suspension" checked={true} />
                    </div>
                    <div className="pt-2 mt-2 border-t">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Dias após o vencimento</span>
                        <span className="text-xs font-medium">7 dias</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Terminação Automática</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Terminar serviços com faturas em atraso prolongado
                        </p>
                      </div>
                      <Switch id="auto-termination" checked={false} />
                    </div>
                    <div className="pt-2 mt-2 border-t">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Dias após a suspensão</span>
                        <span className="text-xs font-medium">30 dias</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-4">
                <Button onClick={handleSave} disabled={loading} className="mr-2">
                  {loading ? 'Salvando...' : 'Salvar Alterações'}
                </Button>
                <Button variant="ghost">
                  Cancelar
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="domains">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Domínio</CardTitle>
              <CardDescription>Gerenciar registradores e configurações de domínio</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Registradores de Domínio</h3>
                
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-2 rounded-md">
                          <Globe className="h-5 w-5 text-blue-700" />
                        </div>
                        <div>
                          <h4 className="font-medium">ResellerClub</h4>
                          <p className="text-xs text-muted-foreground">API v2 - Domínios Internacionais</p>
                        </div>
                      </div>
                      <Switch id="resellerclub-api" checked={true} />
                    </div>
                    <div className="mt-4 pt-4 border-t text-right">
                      <Button variant="outline" size="sm">
                        Configurar API
                      </Button>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-green-100 p-2 rounded-md">
                          <Globe className="h-5 w-5 text-green-700" />
                        </div>
                        <div>
                          <h4 className="font-medium">AngoNIC</h4>
                          <p className="text-xs text-muted-foreground">API para domínios .AO</p>
                        </div>
                      </div>
                      <Switch id="angonic-api" checked={true} />
                    </div>
                    <div className="mt-4 pt-4 border-t text-right">
                      <Button variant="outline" size="sm">
                        Configurar API
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 border-t pt-6">
                <h3 className="text-lg font-medium">Servidores DNS</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="ns1">Nameserver 1</Label>
                    <Input id="ns1" defaultValue="ns1.angohost.ao" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ns2">Nameserver 2</Label>
                    <Input id="ns2" defaultValue="ns2.angohost.ao" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ns3">Nameserver 3</Label>
                    <Input id="ns3" defaultValue="ns3.angohost.ao" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ns4">Nameserver 4</Label>
                    <Input id="ns4" defaultValue="ns4.angohost.ao" />
                  </div>
                </div>
              </div>
              
              <div className="pt-4">
                <Button onClick={handleSave} disabled={loading} className="mr-2">
                  {loading ? 'Salvando...' : 'Salvar Alterações'}
                </Button>
                <Button variant="ghost">
                  Cancelar
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Email</CardTitle>
              <CardDescription>Configurar envio de emails do sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="mail-from">Email de Envio</Label>
                    <Input id="mail-from" defaultValue="no-reply@angohost.ao" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mail-name">Nome de Exibição</Label>
                    <Input id="mail-name" defaultValue="AngoHost" />
                  </div>
                </div>
                
                <div className="space-y-4 border-t pt-6">
                  <h3 className="text-lg font-medium">Configurações SMTP</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="smtp-host">Servidor SMTP</Label>
                      <Input id="smtp-host" defaultValue="smtp.angohost.ao" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="smtp-port">Porta</Label>
                      <Input id="smtp-port" defaultValue="587" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="smtp-user">Usuário</Label>
                      <Input id="smtp-user" defaultValue="no-reply@angohost.ao" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="smtp-password">Senha</Label>
                      <Input id="smtp-password" type="password" defaultValue="********" />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="smtp-ssl">Usar SSL</Label>
                        <p className="text-sm text-muted-foreground">
                          Conexão segura com o servidor SMTP
                        </p>
                      </div>
                      <Switch id="smtp-ssl" checked={true} />
                    </div>
                  </div>
                  
                  <Button variant="secondary">
                    Testar Configurações de Email
                  </Button>
                </div>
                
                <div className="space-y-4 border-t pt-6">
                  <h3 className="text-lg font-medium">Templates de Email</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium">Boas-vindas</h4>
                      <p className="text-xs text-muted-foreground mt-1 mb-4">
                        Email enviado quando um cliente se registra
                      </p>
                      <Button variant="outline" size="sm" className="w-full">
                        Editar Template
                      </Button>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium">Fatura Criada</h4>
                      <p className="text-xs text-muted-foreground mt-1 mb-4">
                        Email enviado quando uma nova fatura é gerada
                      </p>
                      <Button variant="outline" size="sm" className="w-full">
                        Editar Template
                      </Button>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium">Lembrete de Pagamento</h4>
                      <p className="text-xs text-muted-foreground mt-1 mb-4">
                        Email enviado para lembrar sobre faturas pendentes
                      </p>
                      <Button variant="outline" size="sm" className="w-full">
                        Editar Template
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button onClick={handleSave} disabled={loading} className="mr-2">
                    {loading ? 'Salvando...' : 'Salvar Alterações'}
                  </Button>
                  <Button variant="ghost">
                    Cancelar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="servers">
          <p className="text-center text-muted-foreground py-12">
            Configurações de servidores em desenvolvimento...
          </p>
        </TabsContent>
        
        <TabsContent value="integration">
          <p className="text-center text-muted-foreground py-12">
            Configurações de integrações em desenvolvimento...
          </p>
        </TabsContent>
        
        <TabsContent value="tax">
          <p className="text-center text-muted-foreground py-12">
            Configurações de impostos em desenvolvimento...
          </p>
        </TabsContent>
        
        <TabsContent value="notifications">
          <p className="text-center text-muted-foreground py-12">
            Configurações de notificações em desenvolvimento...
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
};
