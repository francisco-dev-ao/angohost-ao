import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  AlertCircle, RefreshCcw, Search, Ticket, Plus, MessageSquare,
  Clock, CheckCircle, PaperclipIcon, Send, User
} from 'lucide-react';
import { Textarea } from "@/components/ui/textarea";

export const TicketsPanel = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [newTicketOpen, setNewTicketOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  
  // In a real app, these would be fetched from the database
  const tickets: any[] = [];
  
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'open':
      case 'aberto':
        return <Badge variant="outline" className="text-blue-600 border-blue-300">Aberto</Badge>;
      case 'in_progress':
      case 'em_progresso':
        return <Badge variant="outline" className="text-yellow-600 border-yellow-300">Em Andamento</Badge>;
      case 'answered':
      case 'respondido':
        return <Badge className="bg-green-500">Respondido</Badge>;
      case 'closed':
      case 'fechado':
        return <Badge variant="secondary">Fechado</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  const getPriorityBadge = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'low':
      case 'baixa':
        return <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">Baixa</Badge>;
      case 'medium':
      case 'média':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-600 border-yellow-200">Média</Badge>;
      case 'high':
      case 'alta':
        return <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">Alta</Badge>;
      case 'critical':
      case 'crítica':
        return <Badge className="bg-red-500">Crítica</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Sistema de Tickets de Suporte</CardTitle>
          <CardDescription>Gerencie seus tickets de suporte</CardDescription>
        </div>
        <div className="space-x-2">
          <Button variant="outline" size="sm">
            <RefreshCcw className="h-4 w-4 mr-2" />
            Atualizar
          </Button>
          <Button size="sm" onClick={() => setNewTicketOpen(true)}>
            <AlertCircle className="h-4 w-4 mr-2" />
            Abrir Ticket
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {newTicketOpen ? (
          <Card>
            <CardHeader>
              <CardTitle>Novo Ticket de Suporte</CardTitle>
              <CardDescription>Preencha os detalhes para abrir um novo ticket de suporte</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Departamento</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>Suporte Técnico</option>
                    <option>Faturamento</option>
                    <option>Vendas</option>
                    <option>Geral</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Prioridade</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>Baixa</option>
                    <option>Média</option>
                    <option>Alta</option>
                    <option>Crítica</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Assunto</label>
                  <Input placeholder="Digite o assunto do ticket" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Mensagem</label>
                  <Textarea 
                    placeholder="Descreva detalhadamente o problema ou dúvida..." 
                    rows={6}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Anexos (opcional)</label>
                  <div className="flex items-center gap-2">
                    <Input type="file" className="max-w-md" />
                    <Button type="button" variant="outline" size="icon">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button type="submit">
                    <Send className="h-4 w-4 mr-2" />
                    Enviar Ticket
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setNewTicketOpen(false)}>
                    Cancelar
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        ) : selectedTicket ? (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium">Ticket #{selectedTicket.id} - {selectedTicket.subject}</h3>
                <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                  <span>Aberto em: {selectedTicket.created_at}</span>
                  <span>•</span>
                  <span>Departamento: {selectedTicket.department}</span>
                  <span>•</span>
                  <span>Prioridade: {getPriorityBadge(selectedTicket.priority)}</span>
                </div>
              </div>
              <div className="flex gap-2">
                {getStatusBadge(selectedTicket.status)}
                <Button variant="outline" size="sm" onClick={() => setSelectedTicket(null)}>
                  Voltar à Lista
                </Button>
              </div>
            </div>
            
            <div className="space-y-4">
              {/* Mensagens do ticket */}
              <div className="bg-muted p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 rounded-full p-2 text-blue-600">
                    <User className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="font-medium">Você</h4>
                      <span className="text-xs text-muted-foreground">15/04/2025 10:30</span>
                    </div>
                    <p className="text-sm">
                      Gostaria de solicitar ajuda para configurar o meu domínio. 
                      Estou enfrentando dificuldades para apontar para o meu servidor.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 rounded-full p-2 text-green-600">
                    <User className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="font-medium">Suporte AngoHost</h4>
                      <span className="text-xs text-muted-foreground">15/04/2025 10:45</span>
                    </div>
                    <p className="text-sm">
                      Olá! Para configurar o seu domínio corretamente, você precisa apontar os seguintes nameservers:
                      <br /><br />
                      ns1.angohost.ao<br />
                      ns2.angohost.ao
                      <br /><br />
                      Você precisará fazer isso no seu provedor de registro de domínio. 
                      Posso ajudar com algo mais específico?
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Responder ao ticket */}
              <div className="border rounded-md p-4">
                <h4 className="font-medium mb-2">Responder ao Ticket</h4>
                <div className="space-y-4">
                  <Textarea 
                    placeholder="Digite sua resposta..." 
                    rows={4}
                  />
                  
                  <div className="flex items-center gap-2">
                    <Button type="button" variant="outline" size="sm">
                      <PaperclipIcon className="h-4 w-4 mr-1" />
                      Anexar Arquivo
                    </Button>
                    <Button type="submit" size="sm">
                      <Send className="h-4 w-4 mr-1" />
                      Enviar Resposta
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Tabs defaultValue="all">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
              <TabsList>
                <TabsTrigger value="all">Todos Tickets</TabsTrigger>
                <TabsTrigger value="open">Abertos</TabsTrigger>
                <TabsTrigger value="answered">Respondidos</TabsTrigger>
                <TabsTrigger value="closed">Fechados</TabsTrigger>
              </TabsList>
              
              <div className="relative w-full md:max-w-xs">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar tickets..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <TabsContent value="all" className="m-0">
              <div className="rounded-md border">
                <div className="grid grid-cols-5 p-4 font-medium border-b bg-muted/50">
                  <div>Assunto</div>
                  <div>Data</div>
                  <div>Status</div>
                  <div>Prioridade</div>
                  <div className="text-right">Ações</div>
                </div>
                
                {tickets.length === 0 ? (
                  <div className="p-8 text-center text-muted-foreground">
                    <CheckCircle className="h-12 w-12 mx-auto mb-3 text-muted-foreground/60" />
                    <p>Nenhum ticket de suporte aberto</p>
                    <Button onClick={() => setNewTicketOpen(true)} variant="outline" size="sm" className="mt-4">
                      Abrir Novo Ticket
                    </Button>
                  </div>
                ) : (
                  tickets.map((ticket) => (
                    <div key={ticket.id} className="grid grid-cols-5 p-4 items-center border-b hover:bg-muted/50">
                      <div>{ticket.subject}</div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span>{ticket.created_at}</span>
                      </div>
                      <div>{getStatusBadge(ticket.status)}</div>
                      <div>{getPriorityBadge(ticket.priority)}</div>
                      <div className="text-right space-x-1">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedTicket(ticket)}
                        >
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Ver Ticket
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </TabsContent>
            
            {/* Other tab contents would be similar to "all" but filtered by status */}
            <TabsContent value="open" className="m-0">
              <div className="p-8 text-center text-muted-foreground">
                <CheckCircle className="h-12 w-12 mx-auto mb-3 text-muted-foreground/60" />
                <p>Nenhum ticket aberto</p>
                <Button onClick={() => setNewTicketOpen(true)} variant="outline" size="sm" className="mt-4">
                  Abrir Novo Ticket
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="answered" className="m-0">
              <div className="p-8 text-center text-muted-foreground">
                <CheckCircle className="h-12 w-12 mx-auto mb-3 text-muted-foreground/60" />
                <p>Nenhum ticket respondido</p>
              </div>
            </TabsContent>
            
            <TabsContent value="closed" className="m-0">
              <div className="p-8 text-center text-muted-foreground">
                <CheckCircle className="h-12 w-12 mx-auto mb-3 text-muted-foreground/60" />
                <p>Nenhum ticket fechado</p>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
};
