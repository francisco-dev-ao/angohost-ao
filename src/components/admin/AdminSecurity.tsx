
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  UserPlus2, Lock, Shield, History, UserX, RefreshCw, 
  MailWarning, Key, ShieldAlert, Smartphone
} from 'lucide-react';
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Badge as UIBadge } from "@/components/ui/badge";

export const AdminSecurity = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Sample login logs
  const loginLogs = [
    { id: 1, user: 'admin@angohost.ao', ip: '102.218.85.30', status: 'success', time: '2023-06-15 10:30:45', location: 'Luanda, Angola' },
    { id: 2, user: 'joao@cliente.ao', ip: '102.218.86.45', status: 'success', time: '2023-06-15 09:15:22', location: 'Luanda, Angola' },
    { id: 3, user: 'admin@angohost.ao', ip: '102.218.85.30', status: 'success', time: '2023-06-14 16:45:30', location: 'Luanda, Angola' },
    { id: 4, user: 'maria@cliente.ao', ip: '41.222.55.128', status: 'success', time: '2023-06-14 14:20:15', location: 'Benguela, Angola' },
    { id: 5, user: 'desconhecido', ip: '185.143.223.45', status: 'failed', time: '2023-06-14 03:45:12', location: 'Kyiv, Ukraine' },
    { id: 6, user: 'desconhecido', ip: '185.143.223.45', status: 'failed', time: '2023-06-14 03:44:10', location: 'Kyiv, Ukraine' },
    { id: 7, user: 'desconhecido', ip: '185.143.223.45', status: 'failed', time: '2023-06-14 03:43:05', location: 'Kyiv, Ukraine' },
    { id: 8, user: 'carlos@cliente.ao', ip: '102.223.15.87', status: 'success', time: '2023-06-13 18:30:22', location: 'Lubango, Angola' },
  ];
  
  // Sample user sessions
  const userSessions = [
    { id: 1, user: 'admin@angohost.ao', role: 'Admin', ip: '102.218.85.30', lastActive: '2 minutos atrás', browser: 'Chrome 114.0', os: 'Windows 11' },
    { id: 2, user: 'joao@cliente.ao', role: 'Cliente', ip: '102.218.86.45', lastActive: '15 minutos atrás', browser: 'Firefox 113.0', os: 'macOS 13.4' },
    { id: 3, user: 'suporte@angohost.ao', role: 'Suporte', ip: '102.218.85.32', lastActive: '1 hora atrás', browser: 'Chrome 114.0', os: 'Windows 10' },
  ];
  
  // Sample admin users (for "Role Management" tab)
  const adminUsers = [
    { id: 1, name: 'Admin Principal', email: 'admin@angohost.ao', role: 'Super Admin', twofactor: true, lastLogin: '2023-06-15 10:30:45' },
    { id: 2, name: 'João Suporte', email: 'suporte@angohost.ao', role: 'Support', twofactor: true, lastLogin: '2023-06-14 15:22:10' },
    { id: 3, name: 'Maria Financeiro', email: 'financeiro@angohost.ao', role: 'Billing', twofactor: false, lastLogin: '2023-06-13 09:15:30' },
    { id: 4, name: 'Carlos Vendas', email: 'vendas@angohost.ao', role: 'Sales', twofactor: true, lastLogin: '2023-06-15 08:45:12' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Segurança</h2>
          <p className="text-muted-foreground">Controle de acesso, sessões e auditoria</p>
        </div>
      </div>
      
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="overview" className="px-4">
            <Shield className="h-4 w-4 mr-2" />
            Visão Geral
          </TabsTrigger>
          <TabsTrigger value="audit" className="px-4">
            <History className="h-4 w-4 mr-2" />
            Logs de Acesso
          </TabsTrigger>
          <TabsTrigger value="sessions" className="px-4">
            <UserX className="h-4 w-4 mr-2" />
            Sessões Ativas
          </TabsTrigger>
          <TabsTrigger value="roles" className="px-4">
            <UserPlus2 className="h-4 w-4 mr-2" />
            Gerenciamento de Funções
          </TabsTrigger>
          <TabsTrigger value="settings" className="px-4">
            <Lock className="h-4 w-4 mr-2" />
            Configurações
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          {/* Security Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Usuários com 2FA</p>
                    <div className="flex items-baseline gap-2">
                      <h3 className="text-2xl font-bold">75%</h3>
                      <p className="text-xs text-amber-600">3 de 4 administradores</p>
                    </div>
                  </div>
                  <div className="bg-amber-100 p-2 rounded-full text-amber-700">
                    <Smartphone className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Tentativas de Login Falhas (24h)</p>
                    <div className="flex items-baseline gap-2">
                      <h3 className="text-2xl font-bold">12</h3>
                      <p className="text-xs text-red-600">5 IP bloqueados</p>
                    </div>
                  </div>
                  <div className="bg-red-100 p-2 rounded-full text-red-700">
                    <MailWarning className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Senhas Redefinidas (30d)</p>
                    <div className="flex items-baseline gap-2">
                      <h3 className="text-2xl font-bold">8</h3>
                      <p className="text-xs text-blue-600">2 administradores, 6 clientes</p>
                    </div>
                  </div>
                  <div className="bg-blue-100 p-2 rounded-full text-blue-700">
                    <Key className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Security Alerts */}
          <Card>
            <CardHeader>
              <CardTitle>Alertas de Segurança</CardTitle>
              <CardDescription>Alertas e notificações de segurança recentes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="bg-red-100 p-2 rounded-full text-red-700">
                    <ShieldAlert className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-red-800">Múltiplas tentativas de login falhas</h4>
                    <p className="text-sm text-red-700 mt-1">
                      Detectamos 3 tentativas de login falhas consecutivas do IP 185.143.223.45.
                      Este IP foi temporariamente bloqueado por segurança.
                    </p>
                    <p className="text-xs text-red-600 mt-2">14/06/2023 - 03:45:12</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="bg-amber-100 p-2 rounded-full text-amber-700">
                    <RefreshCw className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-amber-800">Senhas de usuários não alteradas</h4>
                    <p className="text-sm text-amber-700 mt-1">
                      1 administrador e 5 membros da equipe não alteraram suas senhas nos últimos 90 dias.
                      Recomenda-se a alteração regular de senhas.
                    </p>
                    <p className="text-xs text-amber-600 mt-2">12/06/2023 - 08:00:00</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Atividade Recente</CardTitle>
              <CardDescription>Últimos logins e ações no sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Usuário</TableHead>
                    <TableHead>IP</TableHead>
                    <TableHead>Ação</TableHead>
                    <TableHead>Data/Hora</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>admin@angohost.ao</TableCell>
                    <TableCell>102.218.85.30</TableCell>
                    <TableCell>Login</TableCell>
                    <TableCell>2023-06-15 10:30:45</TableCell>
                    <TableCell>
                      <Badge variant="success">Sucesso</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>admin@angohost.ao</TableCell>
                    <TableCell>102.218.85.30</TableCell>
                    <TableCell>Alteração de Configurações</TableCell>
                    <TableCell>2023-06-15 10:35:12</TableCell>
                    <TableCell>
                      <Badge variant="success">Sucesso</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>joao@cliente.ao</TableCell>
                    <TableCell>102.218.86.45</TableCell>
                    <TableCell>Login</TableCell>
                    <TableCell>2023-06-15 09:15:22</TableCell>
                    <TableCell>
                      <Badge variant="success">Sucesso</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>desconhecido</TableCell>
                    <TableCell>185.143.223.45</TableCell>
                    <TableCell>Tentativa de Login</TableCell>
                    <TableCell>2023-06-14 03:45:12</TableCell>
                    <TableCell>
                      <Badge variant="destructive">Falha</Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="audit">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Logs de Autenticação</CardTitle>
                <CardDescription>Histórico completo de tentativas de login</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Input placeholder="Buscar logs..." className="w-[200px]" />
                </div>
                <Button variant="outline">
                  Exportar Logs
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data/Hora</TableHead>
                    <TableHead>Usuário</TableHead>
                    <TableHead>Endereço IP</TableHead>
                    <TableHead>Localização</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loginLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell>{log.time}</TableCell>
                      <TableCell>{log.user}</TableCell>
                      <TableCell>{log.ip}</TableCell>
                      <TableCell>{log.location}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={log.status === 'success' ? 'success' : 'destructive'}
                          className="capitalize"
                        >
                          {log.status === 'success' ? 'Sucesso' : 'Falha'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="sessions">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Sessões Ativas</CardTitle>
                <CardDescription>Usuários atualmente logados no sistema</CardDescription>
              </div>
              <Button variant="destructive">
                Finalizar Todas as Sessões
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Usuário</TableHead>
                    <TableHead>Função</TableHead>
                    <TableHead>Endereço IP</TableHead>
                    <TableHead>Navegador/SO</TableHead>
                    <TableHead>Última Atividade</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userSessions.map((session) => (
                    <TableRow key={session.id}>
                      <TableCell>{session.user}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            session.role === 'Admin' ? 'default' : 
                            session.role === 'Cliente' ? 'secondary' : 
                            'outline'
                          }
                        >
                          {session.role}
                        </Badge>
                      </TableCell>
                      <TableCell>{session.ip}</TableCell>
                      <TableCell>
                        {session.browser} • {session.os}
                      </TableCell>
                      <TableCell>{session.lastActive}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          Detalhes
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600">
                          Finalizar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="roles">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Usuários Administrativos</CardTitle>
                    <CardDescription>Gerenciar usuários com acesso administrativo</CardDescription>
                  </div>
                  <Button>
                    <UserPlus2 className="h-4 w-4 mr-2" />
                    Novo Usuário
                  </Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Função</TableHead>
                        <TableHead>2FA</TableHead>
                        <TableHead>Último Login</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {adminUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Badge 
                              variant={
                                user.role === 'Super Admin' ? 'default' : 
                                user.role === 'Support' ? 'secondary' : 
                                user.role === 'Billing' ? 'outline' : 
                                'default'
                              }
                            >
                              {user.role}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant={user.twofactor ? 'success' : 'destructive'}
                            >
                              {user.twofactor ? 'Ativado' : 'Desativado'}
                            </Badge>
                          </TableCell>
                          <TableCell>{user.lastLogin}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              Editar
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600">
                              Desativar
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Funções Disponíveis</CardTitle>
                  <CardDescription>Permissões por função</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium">Super Admin</h4>
                    <p className="text-xs text-muted-foreground mt-1 mb-2">
                      Acesso completo a todas as funcionalidades
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      Gerenciar Permissões
                    </Button>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium">Support</h4>
                    <p className="text-xs text-muted-foreground mt-1 mb-2">
                      Acesso a tickets de suporte e base de conhecimento
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      Gerenciar Permissões
                    </Button>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium">Billing</h4>
                    <p className="text-xs text-muted-foreground mt-1 mb-2">
                      Acesso a faturas e informações financeiras
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      Gerenciar Permissões
                    </Button>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium">Sales</h4>
                    <p className="text-xs text-muted-foreground mt-1 mb-2">
                      Acesso a pedidos e gerenciamento de produtos
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      Gerenciar Permissões
                    </Button>
                  </div>
                  
                  <Button className="w-full">
                    Criar Nova Função
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Segurança</CardTitle>
              <CardDescription>Configurar políticas de segurança do sistema</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Política de Senhas</h3>
                
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <h4 className="font-medium">Comprimento mínimo da senha</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Defina o número mínimo de caracteres para senhas
                    </p>
                  </div>
                  <div>
                    <select className="p-2 border rounded-md">
                      <option value="8">8 caracteres</option>
                      <option value="10">10 caracteres</option>
                      <option value="12" selected>12 caracteres</option>
                      <option value="14">14 caracteres</option>
                      <option value="16">16 caracteres</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <h4 className="font-medium">Exigir letras maiúsculas</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Senhas devem conter pelo menos uma letra maiúscula
                    </p>
                  </div>
                  <div>
                    <Switch id="uppercase" checked={true} />
                  </div>
                </div>
                
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <h4 className="font-medium">Exigir números</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Senhas devem conter pelo menos um número
                    </p>
                  </div>
                  <div>
                    <Switch id="numbers" checked={true} />
                  </div>
                </div>
                
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <h4 className="font-medium">Exigir caracteres especiais</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Senhas devem conter pelo menos um caractere especial (ex: !@#$%^&*)
                    </p>
                  </div>
                  <div>
                    <Switch id="special-chars" checked={true} />
                  </div>
                </div>
                
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <h4 className="font-medium">Período de expiração de senha</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Tempo após o qual os usuários devem alterar suas senhas
                    </p>
                  </div>
                  <div>
                    <select className="p-2 border rounded-md">
                      <option value="0">Nunca</option>
                      <option value="30">30 dias</option>
                      <option value="60">60 dias</option>
                      <option value="90" selected>90 dias</option>
                      <option value="180">180 dias</option>
                      <option value="365">365 dias</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 pt-2">
                <h3 className="text-lg font-medium">Autenticação</h3>
                
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <h4 className="font-medium">2FA obrigatório para administradores</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Todos os usuários com perfil administrativo devem configurar 2FA
                    </p>
                  </div>
                  <div>
                    <Switch id="admin-2fa" checked={true} />
                  </div>
                </div>
                
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <h4 className="font-medium">2FA obrigatório para todos os usuários</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Todos os usuários, incluindo clientes, devem configurar 2FA
                    </p>
                  </div>
                  <div>
                    <Switch id="all-2fa" checked={false} />
                  </div>
                </div>
                
                <div className="flex items-center justify-between pb-4">
                  <div>
                    <h4 className="font-medium">Tentativas de login antes do bloqueio</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Número de tentativas falhas antes que uma conta seja temporariamente bloqueada
                    </p>
                  </div>
                  <div>
                    <select className="p-2 border rounded-md">
                      <option value="3">3 tentativas</option>
                      <option value="5" selected>5 tentativas</option>
                      <option value="10">10 tentativas</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <Button className="w-full">
                Salvar Configurações
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Badge component with additional variants
const Badge = ({ children, variant = "default", className = "" }) => {
  const styles = {
    default: "bg-primary/80 hover:bg-primary text-primary-foreground",
    secondary: "bg-secondary hover:bg-secondary/80 text-secondary-foreground",
    destructive: "bg-red-100 text-red-800 hover:bg-red-200",
    success: "bg-green-100 text-green-800 hover:bg-green-200",
    outline: "bg-background hover:bg-accent hover:text-accent-foreground border-border"
  };

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${styles[variant]} ${className}`}>
      {children}
    </span>
  );
};
