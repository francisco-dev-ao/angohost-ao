
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  LifeBuoy, 
  MessageSquare, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Loader2,
  PlusCircle
} from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { formatDate } from '@/utils/format';
import { supabase } from '@/integrations/supabase/client';

const SupportTicketsTab = () => {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState<string>('all');
  const [showTicketForm, setShowTicketForm] = useState(false);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setError('Usuário não autenticado');
        return;
      }

      const { data: customerData, error: customerError } = await supabase
        .from('customers')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (customerError || !customerData) {
        setError('Não foi possível encontrar dados do cliente');
        return;
      }

      const { data, error } = await supabase
        .from('support_tickets')
        .select('*, ticket_messages(count)')
        .eq('customer_id', customerData.id)
        .order('updated_at', { ascending: false });

      if (error) {
        console.error('Erro ao buscar tickets:', error);
        setError('Erro ao carregar tickets de suporte');
        return;
      }

      setTickets(data || []);
    } catch (error) {
      console.error('Erro ao buscar tickets:', error);
      setError('Erro ao carregar tickets de suporte');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
            <Clock className="h-3 w-3 mr-1" />
            Aberto
          </Badge>
        );
      case 'waiting':
        return (
          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">
            <Clock className="h-3 w-3 mr-1" />
            Aguardando Resposta
          </Badge>
        );
      case 'closed':
        return (
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Fechado
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">{status}</Badge>
        );
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Alta</Badge>;
      case 'medium':
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">Média</Badge>;
      case 'low':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Baixa</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  const filterTickets = () => {
    if (selectedTab === 'all') {
      return tickets;
    } else {
      return tickets.filter(ticket => ticket.status === selectedTab);
    }
  };

  const filteredTickets = filterTickets();
  const openTicketsCount = tickets.filter(ticket => ticket.status === 'open' || ticket.status === 'waiting').length;
  const closedTicketsCount = tickets.filter(ticket => ticket.status === 'closed').length;

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap justify-between items-start gap-4">
          <div>
            <CardTitle className="flex items-center">
              <LifeBuoy className="mr-2 h-5 w-5" />
              Meus Tickets de Suporte
            </CardTitle>
            <CardDescription>Gerencie suas solicitações de suporte</CardDescription>
          </div>
          <Button onClick={() => setShowTicketForm(true)}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Abrir Novo Ticket
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2">Carregando tickets de suporte...</span>
          </div>
        ) : error ? (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Erro</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : (
          <>
            {showTicketForm ? (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Abrir Novo Ticket de Suporte</h3>
                <p className="text-sm text-gray-500">Funcionalidade em implementação. Por favor, tente novamente mais tarde.</p>
                <Button variant="outline" onClick={() => setShowTicketForm(false)}>
                  Voltar para Tickets
                </Button>
              </div>
            ) : (
              <>
                <Tabs defaultValue="all" onValueChange={setSelectedTab}>
                  <TabsList className="mb-6">
                    <TabsTrigger value="all">
                      Todos ({tickets.length})
                    </TabsTrigger>
                    <TabsTrigger value="open">
                      Abertos ({openTicketsCount})
                    </TabsTrigger>
                    <TabsTrigger value="closed">
                      Fechados ({closedTicketsCount})
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="all" className="pt-2">
                    {tickets.length === 0 && (
                      <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Nenhum ticket encontrado</AlertTitle>
                        <AlertDescription>
                          Você ainda não possui tickets de suporte. Clique em "Abrir Novo Ticket" para criar uma solicitação.
                        </AlertDescription>
                      </Alert>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="open" className="pt-2">
                    {openTicketsCount === 0 && (
                      <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Nenhum ticket aberto</AlertTitle>
                        <AlertDescription>
                          Você não possui tickets de suporte abertos no momento.
                        </AlertDescription>
                      </Alert>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="closed" className="pt-2">
                    {closedTicketsCount === 0 && (
                      <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Nenhum ticket fechado</AlertTitle>
                        <AlertDescription>
                          Você não possui tickets de suporte fechados no momento.
                        </AlertDescription>
                      </Alert>
                    )}
                  </TabsContent>
                </Tabs>
                
                {filteredTickets.length > 0 && (
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID do Ticket</TableHead>
                          <TableHead>Assunto</TableHead>
                          <TableHead>Última Atualização</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Prioridade</TableHead>
                          <TableHead>Mensagens</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredTickets.map((ticket) => (
                          <TableRow key={ticket.id}>
                            <TableCell className="font-mono text-xs">
                              #{ticket.id.substr(0, 8)}
                            </TableCell>
                            <TableCell className="font-medium">{ticket.subject}</TableCell>
                            <TableCell>{formatDate(ticket.updated_at)}</TableCell>
                            <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                            <TableCell>{getPriorityBadge(ticket.priority)}</TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <MessageSquare className="h-4 w-4 mr-1 text-gray-500" />
                                <span>{ticket.ticket_messages[0]?.count || 0}</span>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default SupportTicketsTab;
