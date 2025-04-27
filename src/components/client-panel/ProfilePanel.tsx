
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, Lock, Bell, UserPlus, ShieldCheck, Save, Users
} from 'lucide-react';
import { Switch } from "@/components/ui/switch";

interface ProfilePanelProps {
  userData: any;
}

export const ProfilePanel = ({ userData }: ProfilePanelProps) => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState({
    invoices: true,
    support: true,
    marketing: false,
    productUpdates: true,
    expiringServices: true
  });

  return (
    <Tabs defaultValue="personal">
      <TabsList className="mb-6 flex flex-wrap">
        <TabsTrigger value="personal">Dados Pessoais</TabsTrigger>
        <TabsTrigger value="security">Segurança</TabsTrigger>
        <TabsTrigger value="notifications">Notificações</TabsTrigger>
        <TabsTrigger value="subaccounts">Sub-Contas</TabsTrigger>
      </TabsList>
      
      <TabsContent value="personal" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Dados Pessoais</CardTitle>
            <CardDescription>Atualize suas informações pessoais</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Nome Completo</label>
                  <Input defaultValue={userData?.user_metadata?.full_name || ""} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input defaultValue={userData?.email || ""} readOnly disabled />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Telefone</label>
                  <Input defaultValue={userData?.user_metadata?.phone || ""} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">NIF</label>
                  <Input defaultValue={userData?.user_metadata?.nif || ""} />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Número de Identificação</label>
                  <Input defaultValue={userData?.user_metadata?.id_number || ""} />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Endereço</label>
                <Input defaultValue={userData?.user_metadata?.billing_address || ""} />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Cidade</label>
                  <Input defaultValue={userData?.user_metadata?.city || ""} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Código Postal</label>
                  <Input defaultValue={userData?.user_metadata?.postal_code || ""} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">País</label>
                  <Input defaultValue="Angola" readOnly />
                </div>
              </div>
              
              <Button>
                <Save className="h-4 w-4 mr-2" />
                Salvar Alterações
              </Button>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="security" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Alterar Senha</CardTitle>
            <CardDescription>Atualize sua senha de acesso</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Senha Atual</label>
                <Input type="password" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Nova Senha</label>
                <Input type="password" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Confirmar Nova Senha</label>
                <Input type="password" />
              </div>
              <Button>
                <Lock className="h-4 w-4 mr-2" />
                Atualizar Senha
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Autenticação em Dois Fatores</CardTitle>
            <CardDescription>Aumente a segurança da sua conta</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h4 className="font-medium">Ativar Autenticação em Dois Fatores</h4>
                <p className="text-sm text-muted-foreground">
                  Proteja sua conta com uma camada extra de segurança
                </p>
              </div>
              <Switch 
                checked={twoFactorEnabled} 
                onCheckedChange={setTwoFactorEnabled} 
              />
            </div>
            
            {twoFactorEnabled && (
              <div className="mt-4 space-y-4">
                <div className="p-4 bg-muted rounded-md flex items-center gap-4">
                  <ShieldCheck className="h-10 w-10 text-green-500" />
                  <div>
                    <h4 className="font-medium mb-1">Configuração necessária</h4>
                    <p className="text-sm text-muted-foreground">
                      Para configurar a autenticação em dois fatores, você precisará escanear um 
                      código QR usando um aplicativo como Google Authenticator ou Authy.
                    </p>
                    <Button size="sm" variant="outline" className="mt-2">
                      Configurar 2FA
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="notifications" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Preferências de Notificação</CardTitle>
            <CardDescription>Configure como deseja receber notificações</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h4 className="font-medium">Faturas e Pagamentos</h4>
                  <p className="text-sm text-muted-foreground">
                    Notificações sobre novas faturas e lembretes de pagamento
                  </p>
                </div>
                <Switch 
                  checked={emailNotifications.invoices} 
                  onCheckedChange={(checked) => 
                    setEmailNotifications({...emailNotifications, invoices: checked})
                  } 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h4 className="font-medium">Tickets de Suporte</h4>
                  <p className="text-sm text-muted-foreground">
                    Atualizações sobre seus tickets de suporte
                  </p>
                </div>
                <Switch 
                  checked={emailNotifications.support} 
                  onCheckedChange={(checked) => 
                    setEmailNotifications({...emailNotifications, support: checked})
                  } 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h4 className="font-medium">Atualização de Produtos</h4>
                  <p className="text-sm text-muted-foreground">
                    Informações sobre atualizações de serviços contratados
                  </p>
                </div>
                <Switch 
                  checked={emailNotifications.productUpdates} 
                  onCheckedChange={(checked) => 
                    setEmailNotifications({...emailNotifications, productUpdates: checked})
                  } 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h4 className="font-medium">Serviços Expirando</h4>
                  <p className="text-sm text-muted-foreground">
                    Alertas sobre serviços prestes a expirar
                  </p>
                </div>
                <Switch 
                  checked={emailNotifications.expiringServices} 
                  onCheckedChange={(checked) => 
                    setEmailNotifications({...emailNotifications, expiringServices: checked})
                  } 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h4 className="font-medium">Marketing</h4>
                  <p className="text-sm text-muted-foreground">
                    Promoções, novidades e comunicados da AngoHost
                  </p>
                </div>
                <Switch 
                  checked={emailNotifications.marketing} 
                  onCheckedChange={(checked) => 
                    setEmailNotifications({...emailNotifications, marketing: checked})
                  } 
                />
              </div>
              
              <Button>
                <Bell className="h-4 w-4 mr-2" />
                Salvar Preferências
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="subaccounts" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Sub-Contas</CardTitle>
            <CardDescription>Gerencie as contas secundárias com acesso ao seu painel</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex justify-between items-center">
              <p className="text-sm text-muted-foreground">
                As sub-contas permitem que você dê acesso ao seu painel para outros usuários com permissões específicas.
              </p>
              <Button>
                <UserPlus className="h-4 w-4 mr-2" />
                Adicionar Sub-Conta
              </Button>
            </div>
            
            <div className="rounded-md border">
              <div className="grid grid-cols-4 p-4 font-medium border-b bg-muted/50">
                <div>Nome</div>
                <div>Email</div>
                <div>Tipo</div>
                <div className="text-right">Ações</div>
              </div>
              
              <div className="p-8 text-center text-muted-foreground">
                <Users className="h-12 w-12 mx-auto mb-3 text-muted-foreground/60" />
                <p>Nenhuma sub-conta adicionada</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
