
import React, { useEffect, useState } from 'react';
import { useUser } from '@/hooks/useUser';
import { supabase } from '@/integrations/supabase/client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { 
  LifeBuoy, MessageSquare, Plus, Send, Eye, CheckCircle, AlertCircle, Clock, XCircle
} from "lucide-react";
import { toast } from 'sonner';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';

interface Ticket {
  id: string;
  subject: string;
  description: string;
  status: string;
  priority: string;
  created_at: string;
  updated_at: string;
  closed_at: string | null;
}

interface TicketMessage {
  id: string;
  ticket_id: string;
  message: string;
  created_at: string;
  is_admin: boolean;
  user_id: string;
}

export const ClientSupport = () => {
  const { user } = useUser();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTicketOpen, setNewTicketOpen] = useState(false);
  const [viewTicket, setViewTicket] = useState<Ticket | null>(null);
  const [ticketMessages, setTicketMessages] = useState<TicketMessage[]>([]);
  const [newTicket, setNewTicket] = useState({
    subject: '',
    description: '',
    priority: 'medium'
  });
  const [newMessage, setNewMessage] = useState('');
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchTickets = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        
        let query = supabase
          .from('tickets')
          .select('*')
          .eq('customer_id', user.id)
          .order('created_at', { ascending: false });
          
        if (statusFilter) {
          query = query.eq('status', statusFilter);
        }
        
        const { data, error } = await query;
        
        if (error) throw error;
        setTickets(data || []);
      } catch (error) {
        console.error('Error fetching tickets:', error);
        toast.error('Erro ao carregar tickets de suporte');
      } finally {
        setLoading(false);
      }
    };
    
    fetchTickets();
  }, [user, statusFilter]);
  
  const fetchTicketMessages = async (ticketId: string) => {
    if (!user) return;
    
    try {
      setLoadingMessages(true);
      
      const { data, error } = await supabase
        .from('ticket_messages')
        .select('*')
        .eq('ticket_id', ticketId)
        .order('created_at', { ascending: true });
        
      if (error) throw error;
      setTicketMessages(data || []);
    } catch (error) {
      console.error('Error fetching ticket messages:', error);
      toast.error('Erro ao carregar mensagens do ticket');
    } finally {
      setLoadingMessages(false);
    }
  };
  
  const handleSubmitTicket = async () => {
    if (!user) return;
    
    if (!newTicket.subject.trim()) {
      toast.error('Por favor, informe um assunto para o ticket');
      return;
    }
    
    if (!newTicket.description.trim()) {
      toast.error('Por favor, descreva seu problema');
      return;
    }
    
    try {
      const { data: ticketData, error: ticketError } = await supabase
        .from('tickets')
        .insert({
          customer_id: user.id,
          subject: newTicket.subject,
          description: newTicket.description,
          priority: newTicket.priority,
          status: 'open'
        })
        .select()
        .single();
        
      if (ticketError) throw ticketError;
      
      // Add the first message which is the description
      if (ticketData) {
        const { error: messageError } = await supabase
          .from('ticket_messages')
          .insert({
            ticket_id: ticketData.id,
            user_id: user.id,
            message: newTicket.description,
            is_admin: false
          });
          
        if (messageError) throw messageError;
        
        // Add to local state
        setTickets([ticketData, ...tickets]);
        
        toast.success('Ticket criado com sucesso');
        setNewTicketOpen(false);
        setNewTicket({
          subject: '',
          description: '',
          priority: 'medium'
        });
      }
    } catch (error) {
      console.error('Error creating ticket:', error);
      toast.error('Erro ao criar ticket');
    }
  };
  
  const handleSendMessage = async () => {
    if (!user || !viewTicket || !newMessage.trim()) return;
    
    try {
      const { data, error } = await supabase
        .from('ticket_messages')
        .insert({
          ticket_id: viewTicket.id,
          user_id: user.id,
          message: newMessage,
          is_admin: false
        })
        .select()
        .single();
        
      if (error) throw error;
      
      // Update local state
      if (data) {
        setTicketMessages([...ticketMessages, data]);
        
        // Also update the ticket updated_at timestamp
        const { error: ticketError } = await supabase
          .from('tickets')
          .update({ updated_at: new Date().toISOString() })
          .eq('id', viewTicket.id);
          
        if (ticketError) throw ticketError;
        
        // Update local state for the ticket
        setTickets(tickets.map(t => 
          t.id === viewTicket.id 
            ? { ...t, updated_at: new Date().toISOString() } 
            : t
        ));
        
        // If ticket was closed, reopen it
        if (viewTicket.status === 'closed') {
          const { error: reopenError } = await supabase
            .from('tickets')
            .update({ 
              status: 'open',
              closed_at: null
            })
            .eq('id', viewTicket.id);
            
          if (reopenError) throw reopenError;
          
          // Update local state
          setTickets(tickets.map(t => 
            t.id === viewTicket.id 
              ? { ...t, status: 'open', closed_at: null } 
              : t
          ));
          setViewTicket({ ...viewTicket, status: 'open', closed_at: null });
        }
      }
      
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Erro ao enviar mensagem');
    }
  };
  
  const handleCloseTicket = async () => {
    if (!viewTicket) return;
    
    try {
      const { error } = await supabase
        .from('tickets')
        .update({ 
          status: 'closed',
          closed_at: new Date().toISOString()
        })
        .eq('id', viewTicket.id);
        
      if (error) throw error;
      
      // Update local state
      setTickets(tickets.map(t => 
        t.id === viewTicket.id 
          ? { ...t, status: 'closed', closed_at: new Date().toISOString() } 
          : t
      ));
      
      if (viewTicket) {
        setViewTicket({ 
          ...viewTicket, 
          status: 'closed',
          closed_at: new Date().toISOString()
        });
      }
      
      toast.success('Ticket fechado com sucesso');
    } catch (error) {
      console.error('Error closing ticket:', error);
      toast.error('Erro ao fechar ticket');
    }
  };
  
  const handleReopenTicket = async () => {
    if (!viewTicket) return;
    
    try {
      const { error } = await supabase
        .from('tickets')
        .update({ 
          status: 'open',
          closed_at: null
        })
        .eq('id', viewTicket.id);
        
      if (error) throw error;
      
      // Update local state
      setTickets(tickets.map(t => 
        t.id === viewTicket.id 
          ? { ...t, status: 'open', closed_at: null } 
          : t
      ));
      
      if (viewTicket) {
        setViewTicket({ 
          ...viewTicket, 
          status: 'open',
          closed_at: null
        });
      }
      
      toast.success('Ticket reaberto com sucesso');
    } catch (error) {
      console.error('Error reopening ticket:', error);
      toast.error('Erro ao reabrir ticket');
    }
  };
  
  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    return format(new Date(dateString), 'dd/MM/yyyy HH:mm', { locale: pt });
  };
  
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'open':
      case 'aberto':
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
            <Clock className="mr-1 h-3 w-3" /> Aberto
          </Badge>
        );
      case 'in_progress':
      case 'em_andamento':
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200">
            <Clock className="mr-1 h-3 w-3" /> Em andamento
          </Badge>
        );
      case 'closed':
      case 'fechado':
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle className="mr-1 h-3 w-3" /> Resolvido
          </Badge>
        );
      case 'cancelled':
      case 'cancelado':
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
            <XCircle className="mr-1 h-3 w-3" /> Cancelado
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary">
            {status}
          </Badge>
        );
    }
  };
  
  const getPriorityBadge = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'low':
      case 'baixa':
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
            Baixa
          </Badge>
        );
      case 'medium':
      case 'media':
      case 'média':
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
            Média
          </Badge>
        );
      case 'high':
      case 'alta':
        return (
          <Badge variant="destructive">
            Alta
          </Badge>
        );
      case 'critical':
      case 'critica':
      case 'crítica':
        return (
          <Badge variant="destructive" className="animate-pulse">
            <AlertCircle className="mr-1 h-3 w-3" /> Crítica
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary">
            {priority}
          </Badge>
        );
    }
  };
  
  const handleViewTicket = (ticket: Ticket) => {
    setViewTicket(ticket);
    fetchTicketMessages(ticket.id);
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Suporte</h1>
          <p className="text-gray-500">Gerencie suas solicitações de suporte</p>
        </div>
        
        <div className="flex gap-4">
          <Select value={statusFilter || ''} onValueChange={(value) => setStatusFilter(value || null)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Todos os status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todos os status</SelectItem>
              <SelectItem value="open">Abertos</SelectItem>
              <SelectItem value="in_progress">Em andamento</SelectItem>
              <SelectItem value="closed">Resolvidos</SelectItem>
            </SelectContent>
          </Select>
          
          <Button onClick={() => setNewTicketOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Novo Ticket
          </Button>
        </div>
      </div>
      
      {tickets.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <div className="rounded-full bg-blue-50 p-3">
              <LifeBuoy className="h-8 w-8 text-blue-500" />
            </div>
            <h3 className="mt-4 text-lg font-medium">Nenhum ticket encontrado</h3>
            <p className="mt-2 text-sm text-gray-500 text-center">
              {statusFilter 
                ? "Não há tickets com o status selecionado." 
                : "Você ainda não abriu nenhum ticket de suporte."}
            </p>
            <Button className="mt-4" onClick={() => setNewTicketOpen(true)}>
              Criar Ticket
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Tickets de Suporte</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Assunto</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Prioridade</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Última Atualização</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tickets.map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell>#{ticket.id.substring(0, 8)}</TableCell>
                    <TableCell className="font-medium">{ticket.subject}</TableCell>
                    <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                    <TableCell>{getPriorityBadge(ticket.priority)}</TableCell>
                    <TableCell>{formatDate(ticket.created_at)}</TableCell>
                    <TableCell>{formatDate(ticket.updated_at)}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" onClick={() => handleViewTicket(ticket)}>
                        <Eye className="h-4 w-4 mr-1" /> Ver
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
      
      {/* New Ticket Dialog */}
      <Dialog open={newTicketOpen} onOpenChange={setNewTicketOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Criar Novo Ticket</DialogTitle>
            <DialogDescription>
              Por favor, forneça os detalhes da sua solicitação de suporte.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-medium">Assunto</label>
              <Input
                id="subject"
                placeholder="Ex: Problema com minha hospedagem"
                value={newTicket.subject}
                onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="priority" className="text-sm font-medium">Prioridade</label>
              <Select 
                value={newTicket.priority} 
                onValueChange={(value) => setNewTicket({ ...newTicket, priority: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a prioridade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Baixa</SelectItem>
                  <SelectItem value="medium">Média</SelectItem>
                  <SelectItem value="high">Alta</SelectItem>
                  <SelectItem value="critical">Crítica</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">Descrição do Problema</label>
              <Textarea
                id="description"
                placeholder="Descreva seu problema em detalhes..."
                rows={6}
                value={newTicket.description}
                onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewTicketOpen(false)}>Cancelar</Button>
            <Button onClick={handleSubmitTicket}>Enviar Ticket</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* View Ticket Dialog */}
      <Dialog open={!!viewTicket} onOpenChange={(open) => !open && setViewTicket(null)}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh]">
          <DialogHeader>
            <div className="flex justify-between items-center">
              <DialogTitle>
                Ticket #{viewTicket?.id.substring(0, 8)} - {viewTicket?.subject}
              </DialogTitle>
              {viewTicket && getStatusBadge(viewTicket.status)}
            </div>
            <DialogDescription className="flex gap-2 items-center">
              <div>Criado em {viewTicket && formatDate(viewTicket.created_at)}</div>
              <span className="px-2">•</span>
              <div>Prioridade: {viewTicket && getPriorityBadge(viewTicket.priority)}</div>
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4 overflow-y-auto max-h-[60vh]">
            {loadingMessages ? (
              <div className="flex items-center justify-center p-4">
                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <>
                {ticketMessages.length === 0 ? (
                  <div className="text-center py-6 text-gray-500">
                    Nenhuma mensagem encontrada
                  </div>
                ) : (
                  <div className="space-y-4">
                    {ticketMessages.map((msg) => (
                      <div 
                        key={msg.id} 
                        className={`flex ${msg.is_admin ? 'justify-start' : 'justify-end'}`}
                      >
                        <div 
                          className={`rounded-lg p-4 max-w-[80%] ${
                            msg.is_admin 
                              ? 'bg-gray-100 text-gray-800' 
                              : 'bg-blue-500 text-white'
                          }`}
                        >
                          <div className="text-sm font-medium mb-1">
                            {msg.is_admin ? 'Suporte' : 'Você'} • {formatDate(msg.created_at)}
                          </div>
                          <div style={{ whiteSpace: 'pre-wrap' }}>{msg.message}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
          
          <div className="border-t pt-4">
            {viewTicket?.status === 'closed' ? (
              <div className="flex flex-col items-center justify-center space-y-2">
                <div className="text-gray-500">Este ticket está fechado.</div>
                <Button onClick={handleReopenTicket}>Reabrir Ticket</Button>
              </div>
            ) : (
              <>
                <div className="flex space-x-4">
                  <Textarea 
                    placeholder="Digite sua mensagem..." 
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="h-auto"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <div className="text-right mt-4">
                  <Button 
                    variant="outline" 
                    onClick={handleCloseTicket}
                    className="text-gray-500"
                  >
                    Fechar Ticket
                  </Button>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
