
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, RefreshCcw, Filter, Clock, CheckCircle2, 
  AlertCircle, UserCheck, MessageSquare 
} from 'lucide-react';
import { 
  Select, SelectContent, SelectGroup, SelectItem, 
  SelectLabel, SelectTrigger, SelectValue 
} from "@/components/ui/select";

export const AdminTickets = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [selectedTicket, setSelectedTicket] = useState<number | null>(null);
  
  // Sample tickets data
  const tickets = [
    {
      id: 1,
      subject: 'Meu site está fora do ar',
      customer: 'João Silva',
      status: 'open',
      priority: 'high',
      department: 'technical',
      createdAt: '2023-06-15T10:30:00Z',
      lastReply: '2023-06-15T11:45:00Z',
      messages: [
        {
          id: 1,
          author: 'João Silva',
          content: 'Olá, meu site está fora do ar desde esta manhã. Preciso de ajuda urgente!',
          date: '2023-06-15T10:30:00Z',
          isStaff: false,
        },
        {
          id: 2,
          author: 'Suporte Técnico',
          content: 'Olá João, estamos verificando o problema. Você consegue acessar o cPanel?',
          date: '2023-06-15T11:45:00Z',
          isStaff: true,
        },
      ],
    },
    {
      id: 2,
      subject: 'Problema com email',
      customer: 'Maria Santos',
      status: 'in-progress',
      priority: 'medium',
      department: 'technical',
      createdAt: '2023-06-14T15:20:00Z',
      lastReply: '2023-06-14T16:30:00Z',
      messages: [
        {
          id: 1,
          author: 'Maria Santos',
          content: 'Não estou conseguindo enviar emails pelo Outlook. Recebo uma mensagem de erro.',
          date: '2023-06-14T15:20:00Z',
          isStaff: false,
        },
        {
          id: 2,
          author: 'Suporte Técnico',
          content: 'Olá Maria, qual é a mensagem de erro que você está recebendo?',
          date: '2023-06-14T16:30:00Z',
          isStaff: true,
        },
      ],
    },
    {
      id: 3,
      subject: 'Dúvida sobre fatura',
      customer: 'Pedro Alves',
      status: 'waiting',
      priority: 'low',
      department: 'billing',
      createdAt: '2023-06-13T09:15:00Z',
      lastReply: '2023-06-13T14:20:00Z',
      messages: [
        {
          id: 1,
          author: 'Pedro Alves',
          content: 'Gostaria de saber se posso parcelar minha fatura em mais vezes.',
          date: '2023-06-13T09:15:00Z',
          isStaff: false,
        },
        {
          id: 2,
          author: 'Departamento Financeiro',
          content: 'Olá Pedro, sim, é possível parcelar em até 3x. Precisa de mais informações?',
          date: '2023-06-13T14:20:00Z',
          isStaff: true,
        },
      ],
    },
    {
      id: 4,
      subject: 'Renovação de domínio',
      customer: 'Ana Costa',
      status: 'closed',
      priority: 'medium',
      department: 'domains',
      createdAt: '2023-06-10T11:40:00Z',
      lastReply: '2023-06-11T09:30:00Z',
      messages: [
        {
          id: 1,
          author: 'Ana Costa',
          content: 'Preciso saber quando meu domínio expira e como fazer a renovação.',
          date: '2023-06-10T11:40:00Z',
          isStaff: false,
        },
        {
          id: 2,
          author: 'Suporte de Domínios',
          content: 'Olá Ana, seu domínio vence em 15/07/2023. Você pode renovar pelo painel do cliente.',
          date: '2023-06-10T13:20:00Z',
          isStaff: true,
        },
        {
          id: 3,
          author: 'Ana Costa',
          content: 'Muito obrigada pela informação! Vou fazer a renovação hoje mesmo.',
          date: '2023-06-10T14:45:00Z',
          isStaff: false,
        },
        {
          id: 4,
          author: 'Suporte de Domínios',
          content: 'Perfeito, Ana! Estamos à disposição se precisar de mais alguma ajuda.',
          date: '2023-06-11T09:30:00Z',
          isStaff: true,
        },
      ],
    },
    {
      id: 5,
      subject: 'Solicitação de recurso adicional',
      customer: 'Carlos Mendes',
      status: 'open',
      priority: 'medium',
      department: 'sales',
      createdAt: '2023-06-16T08:25:00Z',
      lastReply: '2023-06-16T08:25:00Z',
      messages: [
        {
          id: 1,
          author: 'Carlos Mendes',
          content: 'Gostaria de adicionar mais contas de email ao meu plano atual. É possível?',
          date: '2023-06-16T08:25:00Z',
          isStaff: false,
        },
      ],
    },
  ];

  const filteredTickets = activeTab === 'all' 
    ? tickets 
    : tickets.filter(ticket => ticket.status === activeTab);
  
  const refreshData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-AO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'in-progress':
        return <Clock className="h-4 w-4 text-amber-500" />;
      case 'waiting':
        return <UserCheck className="h-4 w-4 text-blue-500" />;
      case 'closed':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      default:
        return <MessageSquare className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold">Suporte Técnico</h2>
          <p className="text-muted-foreground">Gerencie tickets de suporte</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input placeholder="Buscar ticket..." className="pl-8 w-[250px]" />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Departamento" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="technical">Técnico</SelectItem>
              <SelectItem value="billing">Financeiro</SelectItem>
              <SelectItem value="domains">Domínios</SelectItem>
              <SelectItem value="sales">Vendas</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" onClick={refreshData} disabled={isLoading}>
            <RefreshCcw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          </Button>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tickets List */}
        <div className="lg:col-span-1">
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="open">Abertos</TabsTrigger>
              <TabsTrigger value="in-progress">Em Progresso</TabsTrigger>
              <TabsTrigger value="waiting">Aguardando</TabsTrigger>
            </TabsList>
            
            <Card className="border rounded-lg overflow-hidden">
              <CardContent className="p-0">
                <div className="max-h-[600px] overflow-y-auto">
                  {filteredTickets.length > 0 ? (
                    filteredTickets.map((ticket) => (
                      <div 
                        key={ticket.id}
                        className={`border-b last:border-b-0 p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900/10 ${
                          selectedTicket === ticket.id ? 'bg-gray-100 dark:bg-gray-900/20' : ''
                        }`}
                        onClick={() => setSelectedTicket(ticket.id)}
                      >
                        <div className="flex items-start gap-3">
                          <div className="mt-1">
                            {getStatusIcon(ticket.status)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm truncate">{ticket.subject}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs text-muted-foreground">
                                {ticket.customer}
                              </span>
                              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">
                                #{ticket.id}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <StatusBadge status={ticket.status} />
                              <PriorityBadge priority={ticket.priority} />
                            </div>
                          </div>
                          <div className="text-xs text-right text-muted-foreground">
                            {formatDate(ticket.lastReply)}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center">
                      <p className="text-muted-foreground">Nenhum ticket encontrado</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </Tabs>
        </div>
        
        {/* Ticket Details */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            {selectedTicket ? (
              <>
                {tickets.filter(t => t.id === selectedTicket).map(ticket => (
                  <div key={ticket.id} className="flex flex-col h-full">
                    <CardHeader className="pb-3 border-b">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-xl">{ticket.subject}</CardTitle>
                          <CardDescription className="mt-1">
                            Aberto por {ticket.customer} • {formatDate(ticket.createdAt)}
                          </CardDescription>
                        </div>
                        <div className="flex gap-2">
                          <Select defaultValue={ticket.status}>
                            <SelectTrigger className="w-[150px]">
                              <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="open">Aberto</SelectItem>
                              <SelectItem value="in-progress">Em Progresso</SelectItem>
                              <SelectItem value="waiting">Aguardando Cliente</SelectItem>
                              <SelectItem value="closed">Fechado</SelectItem>
                            </SelectContent>
                          </Select>
                          
                          <Select defaultValue={ticket.priority}>
                            <SelectTrigger className="w-[120px]">
                              <SelectValue placeholder="Prioridade" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Baixa</SelectItem>
                              <SelectItem value="medium">Média</SelectItem>
                              <SelectItem value="high">Alta</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      {ticket.messages.map(message => (
                        <div 
                          key={message.id}
                          className={`flex ${message.isStaff ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`max-w-[70%] rounded-lg p-3 ${
                            message.isStaff 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-gray-100 dark:bg-gray-800'
                          }`}>
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium text-sm">{message.author}</span>
                              <span className="text-xs">
                                {formatDate(message.date)}
                              </span>
                            </div>
                            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="p-4 border-t mt-auto">
                      <div className="space-y-4">
                        <textarea 
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px]"
                          placeholder="Digite sua resposta..."
                        />
                        <div className="flex items-center justify-between">
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              Anexar Arquivo
                            </Button>
                            <Button variant="outline" size="sm">
                              Inserir Resposta Predefinida
                            </Button>
                          </div>
                          <Button className="px-8">
                            Responder
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className="flex items-center justify-center h-full p-8">
                <div className="text-center">
                  <MessageSquare className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2">Nenhum ticket selecionado</h3>
                  <p className="text-muted-foreground">
                    Selecione um ticket da lista para ver seus detalhes
                  </p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

// Status Badge Component
const StatusBadge = ({ status }: { status: string }) => {
  const styles = {
    open: 'bg-red-100 text-red-800',
    'in-progress': 'bg-amber-100 text-amber-800',
    waiting: 'bg-blue-100 text-blue-800',
    closed: 'bg-green-100 text-green-800'
  };
  
  const labels = {
    open: 'Aberto',
    'in-progress': 'Em Progresso',
    waiting: 'Aguardando',
    closed: 'Fechado'
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${styles[status as keyof typeof styles]}`}>
      {labels[status as keyof typeof labels]}
    </span>
  );
};

// Priority Badge Component
const PriorityBadge = ({ priority }: { priority: string }) => {
  const styles = {
    low: 'bg-gray-100 text-gray-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800'
  };
  
  const labels = {
    low: 'Baixa',
    medium: 'Média',
    high: 'Alta'
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${styles[priority as keyof typeof styles]}`}>
      {labels[priority as keyof typeof labels]}
    </span>
  );
};
