
import React, { useEffect, useState } from 'react';
import { useUser } from '@/hooks/useUser';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  UserCircle, KeyRound, Bell, Shield, CreditCard, Loader2
} from "lucide-react";
import { toast } from 'sonner';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  nif: string | null;
  billing_address: string | null;
  city: string | null;
  postal_code: string | null;
  country: string | null;
}

interface PasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const ClientSettings = ({ user }: { user: any }) => {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [passwordData, setPasswordData] = useState<PasswordData>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  useEffect(() => {
    const fetchCustomerData = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        
        const { data, error } = await supabase
          .from('customers')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();
          
        if (error) throw error;
        
        if (data) {
          setCustomer(data);
        } else {
          // If no customer record exists, create a default one
          const { data: newCustomer, error: createError } = await supabase
            .from('customers')
            .insert({
              user_id: user.id,
              name: user.email.split('@')[0],
              email: user.email
            })
            .select()
            .single();
            
          if (createError) throw createError;
          
          setCustomer(newCustomer);
        }
      } catch (error) {
        console.error('Error fetching customer data:', error);
        toast.error('Erro ao carregar dados do cliente');
      } finally {
        setLoading(false);
      }
    };
    
    fetchCustomerData();
  }, [user]);
  
  const handleCustomerUpdate = async () => {
    if (!customer) return;
    
    try {
      setSaving(true);
      
      const { error } = await supabase
        .from('customers')
        .update({
          name: customer.name,
          phone: customer.phone,
          nif: customer.nif,
          billing_address: customer.billing_address,
          city: customer.city,
          postal_code: customer.postal_code,
          country: customer.country
        })
        .eq('id', customer.id);
        
      if (error) throw error;
      
      toast.success('Perfil atualizado com sucesso');
    } catch (error) {
      console.error('Error updating customer:', error);
      toast.error('Erro ao atualizar perfil');
    } finally {
      setSaving(false);
    }
  };
  
  const handlePasswordChange = async () => {
    const { currentPassword, newPassword, confirmPassword } = passwordData;
    
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error('Todos os campos de senha são obrigatórios');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      toast.error('As novas senhas não correspondem');
      return;
    }
    
    if (newPassword.length < 6) {
      toast.error('A nova senha deve ter pelo menos 6 caracteres');
      return;
    }
    
    try {
      setSaving(true);
      
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });
      
      if (error) throw error;
      
      toast.success('Senha alterada com sucesso');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error: any) {
      console.error('Error changing password:', error);
      toast.error(`Erro ao alterar senha: ${error.message || 'Tente novamente mais tarde'}`);
    } finally {
      setSaving(false);
    }
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Meu Perfil</h1>
      
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="profile" className="flex items-center">
            <UserCircle className="mr-2 h-4 w-4" /> Dados Pessoais
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center">
            <KeyRound className="mr-2 h-4 w-4" /> Segurança
          </TabsTrigger>
          <TabsTrigger value="payment" className="flex items-center">
            <CreditCard className="mr-2 h-4 w-4" /> Pagamento
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center">
            <Bell className="mr-2 h-4 w-4" /> Notificações
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          {customer && (
            <Card>
              <CardHeader>
                <CardTitle>Detalhes da Conta</CardTitle>
                <CardDescription>
                  Atualize suas informações pessoais e dados de contato.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome Completo</Label>
                    <Input
                      id="name"
                      placeholder="Seu nome completo"
                      value={customer.name}
                      onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={customer.email}
                      disabled
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input
                      id="phone"
                      placeholder="+244 XXX XXX XXX"
                      value={customer.phone || ''}
                      onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="nif">NIF</Label>
                    <Input
                      id="nif"
                      placeholder="Seu número de NIF"
                      value={customer.nif || ''}
                      onChange={(e) => setCustomer({ ...customer, nif: e.target.value })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Endereço</Label>
                    <Input
                      id="address"
                      placeholder="Seu endereço"
                      value={customer.billing_address || ''}
                      onChange={(e) => setCustomer({ ...customer, billing_address: e.target.value })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="city">Cidade</Label>
                    <Input
                      id="city"
                      placeholder="Sua cidade"
                      value={customer.city || ''}
                      onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">Código Postal</Label>
                    <Input
                      id="postalCode"
                      placeholder="Seu código postal"
                      value={customer.postal_code || ''}
                      onChange={(e) => setCustomer({ ...customer, postal_code: e.target.value })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="country">País</Label>
                    <Input
                      id="country"
                      placeholder="Seu país"
                      value={customer.country || 'Angola'}
                      onChange={(e) => setCustomer({ ...customer, country: e.target.value })}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleCustomerUpdate} disabled={saving}>
                  {saving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Salvando...
                    </>
                  ) : (
                    'Salvar Alterações'
                  )}
                </Button>
              </CardFooter>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Segurança da Conta</CardTitle>
              <CardDescription>
                Altere sua senha e gerencie as opções de segurança.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Senha Atual</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  placeholder="Digite sua senha atual"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="newPassword">Nova Senha</Label>
                <Input
                  id="newPassword"
                  type="password"
                  placeholder="Digite sua nova senha"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirme sua nova senha"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handlePasswordChange} disabled={saving}>
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Alterando...
                  </>
                ) : (
                  'Alterar Senha'
                )}
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Autenticação de Dois Fatores</CardTitle>
              <CardDescription>
                Adicione uma camada extra de segurança à sua conta.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Autenticação via SMS</h3>
                  <p className="text-sm text-gray-500">Receba um código por SMS ao fazer login</p>
                </div>
                <Button variant="outline">Configurar</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="payment">
          <Card>
            <CardHeader>
              <CardTitle>Métodos de Pagamento</CardTitle>
              <CardDescription>
                Gerencie seus cartões de crédito e outras formas de pagamento.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-8 text-center">
                <CreditCard className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-4 text-lg font-medium">Nenhum método de pagamento</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Você ainda não adicionou nenhum método de pagamento à sua conta.
                </p>
                <Button className="mt-4">Adicionar Método de Pagamento</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Preferências de Notificação</CardTitle>
              <CardDescription>
                Escolha como e quando deseja ser notificado.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <h3 className="font-medium">Notificações por Email</h3>
                    <p className="text-sm text-gray-500">Receba atualizações importantes por email</p>
                  </div>
                  <Button variant="outline">Ativado</Button>
                </div>
                
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <h3 className="font-medium">Notificações por SMS</h3>
                    <p className="text-sm text-gray-500">Receba alertas de segurança por SMS</p>
                  </div>
                  <Button variant="outline">Desativado</Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Alertas de Fatura</h3>
                    <p className="text-sm text-gray-500">Seja notificado sobre faturas pendentes</p>
                  </div>
                  <Button variant="outline">Ativado</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
