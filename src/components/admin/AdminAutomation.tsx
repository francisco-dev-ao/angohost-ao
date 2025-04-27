
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Clock, Play, Pause, Check, AlertTriangle, CheckCircle2, 
  XCircle, RefreshCw, PlusCircle, FileCode, RefreshCcw
} from 'lucide-react';
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const AdminAutomation = () => {
  const [activeTab, setActiveTab] = useState('cron');
  
  // Sample cron jobs
  const cronJobs = [
    {
      id: 1,
      name: 'Geração de Faturas',
      schedule: '0 0 * * *', // Todo dia à meia-noite
      lastRun: '2023-06-15 00:00:00',
      nextRun: '2023-06-16 00:00:00',
      status: 'active',
      lastRunStatus: 'success',
    },
    {
      id: 2,
      name: 'Lembretes de Vencimento',
      schedule: '0 9 * * *', // Todo dia às 9h
      lastRun: '2023-06-15 09:00:00',
      nextRun: '2023-06-16 09:00:00',
      status: 'active',
      lastRunStatus: 'success',
    },
    {
      id: 3,
      name: 'Suspensão Automática',
      schedule: '0 3 * * *', // Todo dia às 3h
      lastRun: '2023-06-15 03:00:00',
      nextRun: '2023-06-16 03:00:00',
      status: 'active',
      lastRunStatus: 'success',
    },
    {
      id: 4,
      name: 'Backup do Banco de Dados',
      schedule: '0 2 * * *', // Todo dia às 2h
      lastRun: '2023-06-15 02:00:00',
      nextRun: '2023-06-16 02:00:00',
      status: 'active',
      lastRunStatus: 'success',
    },
    {
      id: 5,
      name: 'Verificação de Domínios Expirando',
      schedule: '0 10 * * *', // Todo dia às 10h
      lastRun: '2023-06-15 10:00:00',
      nextRun: '2023-06-16 10:00:00',
      status: 'active',
      lastRunStatus: 'warning',
    }
  ];
  
  // Sample automation logs
  const automationLogs = [
    {
      id: 1,
      job: 'Geração de Faturas',
      timestamp: '2023-06-15 00:00:05',
      message: '38 faturas geradas com sucesso',
      status: 'success',
    },
    {
      id: 2,
      job: 'Lembretes de Vencimento',
      timestamp: '2023-06-15 09:00:12',
      message: '15 emails de lembrete enviados',
      status: 'success',
    },
    {
      id: 3,
      job: 'Verificação de Domínios Expirando',
      timestamp: '2023-06-15 10:00:08',
      message: 'Aviso: 3 domínios não puderam ser verificados',
      status: 'warning',
    },
    {
      id: 4,
      job: 'Backup do Banco de Dados',
      timestamp: '2023-06-15 02:00:15',
      message: 'Backup completo: 256MB',
      status: 'success',
    },
    {
      id: 5,
      job: 'Backup do Banco de Dados',
      timestamp: '2023-06-14 02:00:20',
      message: 'Backup completo: 252MB',
      status: 'success',
    },
    {
      id: 6,
      job: 'Suspensão Automática',
      timestamp: '2023-06-14 03:00:10',
      message: '5 serviços suspensos por falta de pagamento',
      status: 'success',
    },
    {
      id: 7,
      job: 'Verificação de Servidores',
      timestamp: '2023-06-13 01:15:00',
      message: 'Erro: Timeout ao conectar ao servidor de backup',
      status: 'error',
    },
  ];
  
  // Sample hooks
  const webhooks = [
    {
      id: 1,
      name: 'Notificação de Pagamento',
      url: 'https://angohost.ao/api/webhooks/payment',
      events: ['payment.success', 'payment.failed'],
      status: 'active',
      created: '2023-05-10',
    },
    {
      id: 2,
      name: 'Integração CRM',
      url: 'https://crm.example.com/api/angohost',
      events: ['customer.created', 'customer.updated'],
      status: 'active',
      created: '2023-04-15',
    },
    {
      id: 3,
      name: 'Slack Notifications',
      url: 'https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX',
      events: ['ticket.created', 'ticket.replied'],
      status: 'inactive',
      created: '2023-03-22',
    },
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Automação e Integrações</h2>
          <p className="text-muted-foreground">Gerencie tarefas automáticas e webhooks</p>
        </div>
      </div>
      
      <Tabs defaultValue="cron" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="cron" className="px-4">
            <Clock className="h-4 w-4 mr-2" />
            Tarefas Agendadas
          </TabsTrigger>
          <TabsTrigger value="logs" className="px-4">
            <FileCode className="h-4 w-4 mr-2" />
            Logs de Execução
          </TabsTrigger>
          <TabsTrigger value="webhooks" className="px-4">
            <RefreshCw className="h-4 w-4 mr-2" />
            Webhooks
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="cron" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Tarefas Agendadas (Cron Jobs)</CardTitle>
                <CardDescription>Gerenciamento de tarefas automáticas recorrentes</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Nova Tarefa
                </Button>
                <Button variant="outline">
                  <RefreshCcw className="h-4 w-4 mr-2" />
                  Atualizar Status
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tarefa</TableHead>
                    <TableHead>Agendamento</TableHead>
                    <TableHead>Última Execução</TableHead>
                    <TableHead>Próxima Execução</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Última Execução</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cronJobs.map(job => (
                    <TableRow key={job.id}>
                      <TableCell className="font-medium">{job.name}</TableCell>
                      <TableCell>
                        <code className="bg-muted px-1 py-0.5 rounded text-xs">
                          {job.schedule}
                        </code>
                      </TableCell>
                      <TableCell>{job.lastRun}</TableCell>
                      <TableCell>{job.nextRun}</TableCell>
                      <TableCell>
                        {job.status === 'active' ? (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                            Ativo
                          </Badge>
                        ) : (
                          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">
                            Inativo
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {job.lastRunStatus === 'success' ? (
                          <span className="flex items-center text-green-600">
                            <CheckCircle2 className="h-4 w-4 mr-1" />
                            Sucesso
                          </span>
                        ) : job.lastRunStatus === 'warning' ? (
                          <span className="flex items-center text-amber-600">
                            <AlertTriangle className="h-4 w-4 mr-1" />
                            Aviso
                          </span>
                        ) : (
                          <span className="flex items-center text-red-600">
                            <XCircle className="h-4 w-4 mr-1" />
                            Erro
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Executar Agora">
                          <Play className="h-4 w-4" />
                        </Button>
                        {job.status === 'active' ? (
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Pausar">
                            <Pause className="h-4 w-4" />
                          </Button>
                        ) : (
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Ativar">
                            <Play className="h-4 w-4" />
                          </Button>
                        )}
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Editar">
                          <Check className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Adicionar Nova Tarefa</CardTitle>
              <CardDescription>Configure uma nova tarefa automática</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="task-name">
                      Nome da Tarefa
                    </label>
                    <Input id="task-name" placeholder="Ex: Geração de Relatório Diário" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="task-schedule">
                      Agendamento (Cron)
                    </label>
                    <Input 
                      id="task-schedule" 
                      placeholder="Ex: 0 9 * * *"
                      className="font-mono"
                    />
                    <p className="text-xs text-muted-foreground">
                      Formato: minuto hora dia-do-mês mês dia-da-semana
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="task-command">
                    Comando ou Script
                  </label>
                  <Input 
                    id="task-command" 
                    placeholder="Ex: /scripts/generate-report.php" 
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="task-description">
                    Descrição
                  </label>
                  <textarea
                    id="task-description"
                    className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Descreva o propósito desta tarefa"
                  />
                </div>
                
                <div className="flex gap-2 pt-4">
                  <Button type="submit" className="flex-1">Adicionar Tarefa</Button>
                  <Button type="button" variant="outline" className="flex-1">Cancelar</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="logs" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Logs de Automação</CardTitle>
                <CardDescription>Histórico de execução das tarefas automáticas</CardDescription>
              </div>
              <div className="flex gap-2">
                <div className="relative">
                  <Input placeholder="Buscar logs..." className="w-[250px]" />
                </div>
                <Button variant="outline">
                  <RefreshCcw className="h-4 w-4 mr-2" />
                  Atualizar
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data/Hora</TableHead>
                    <TableHead>Tarefa</TableHead>
                    <TableHead>Mensagem</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {automationLogs.map(log => (
                    <TableRow key={log.id}>
                      <TableCell className="font-mono text-sm">
                        {log.timestamp}
                      </TableCell>
                      <TableCell>{log.job}</TableCell>
                      <TableCell>{log.message}</TableCell>
                      <TableCell>
                        {log.status === 'success' ? (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                            Sucesso
                          </Badge>
                        ) : log.status === 'warning' ? (
                          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">
                            Aviso
                          </Badge>
                        ) : (
                          <Badge className="bg-red-100 text-red-800 hover:bg-red-200">
                            Erro
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="webhooks" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Webhooks</CardTitle>
                <CardDescription>Configurar integrações externas via webhooks</CardDescription>
              </div>
              <Button>
                <PlusCircle className="h-4 w-4 mr-2" />
                Novo Webhook
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>URL</TableHead>
                    <TableHead>Eventos</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Criado em</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {webhooks.map(webhook => (
                    <TableRow key={webhook.id}>
                      <TableCell className="font-medium">{webhook.name}</TableCell>
                      <TableCell className="font-mono text-xs">
                        {webhook.url.length > 40
                          ? `${webhook.url.substring(0, 40)}...`
                          : webhook.url}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {webhook.events.map((event, i) => (
                            <code key={i} className="bg-muted px-1 py-0.5 rounded text-xs">
                              {event}
                            </code>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        {webhook.status === 'active' ? (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                            Ativo
                          </Badge>
                        ) : (
                          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">
                            Inativo
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>{webhook.created}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          Testar
                        </Button>
                        <Button variant="ghost" size="sm">
                          Editar
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600">
                          Excluir
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Adicionar Novo Webhook</CardTitle>
              <CardDescription>Configure uma nova integração via webhook</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="webhook-name">
                      Nome do Webhook
                    </label>
                    <Input id="webhook-name" placeholder="Ex: Integração CRM" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="webhook-url">
                      URL de Destino
                    </label>
                    <Input 
                      id="webhook-url" 
                      placeholder="https://"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Eventos
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="event-payment-success" className="form-checkbox" />
                      <label htmlFor="event-payment-success" className="text-sm">
                        payment.success
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="event-payment-failed" className="form-checkbox" />
                      <label htmlFor="event-payment-failed" className="text-sm">
                        payment.failed
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="event-invoice-created" className="form-checkbox" />
                      <label htmlFor="event-invoice-created" className="text-sm">
                        invoice.created
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="event-invoice-paid" className="form-checkbox" />
                      <label htmlFor="event-invoice-paid" className="text-sm">
                        invoice.paid
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="event-customer-created" className="form-checkbox" />
                      <label htmlFor="event-customer-created" className="text-sm">
                        customer.created
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="event-customer-updated" className="form-checkbox" />
                      <label htmlFor="event-customer-updated" className="text-sm">
                        customer.updated
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="webhook-secret">
                    Chave Secreta (opcional)
                  </label>
                  <Input 
                    id="webhook-secret" 
                    type="password"
                    placeholder="Chave para validar a autenticidade do webhook" 
                  />
                  <p className="text-xs text-muted-foreground">
                    Esta chave será usada para assinar as requisições e garantir a autenticidade.
                  </p>
                </div>
                
                <div className="flex gap-2 pt-4">
                  <Button type="submit" className="flex-1">Adicionar Webhook</Button>
                  <Button type="button" variant="outline" className="flex-1">Cancelar</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
