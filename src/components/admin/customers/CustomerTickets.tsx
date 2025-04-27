
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { simulateDbOperation } from '@/integrations/postgres/client';
import { toast } from 'sonner';
import { RefreshCcw, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Ticket {
  id: string;
  subject: string;
  description: string;
  status: 'open' | 'pending' | 'closed' | 'answered';
  priority: 'low' | 'medium' | 'high';
  date: string;
  lastUpdate: string;
}

interface CustomerTicketsProps {
  customerId: string | null;
}

export const CustomerTickets: React.FC<CustomerTicketsProps> = ({ customerId }) => {
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  
  useEffect(() => {
    const fetchTickets = async () => {
      if (!customerId) return;
      
      try {
        setLoading(true);
        
        // Simular busca de tickets no banco de dados
        const { success, data, error } = await simulateDbOperation('get_customer_tickets', { customerId });
        
        if (!success || error) {
          throw new Error(error || 'Falha ao buscar tickets');
        }
        
        // Dados fictícios para demonstração
        const mockTickets: Ticket[] = [
          {
            id: 'TIC-001',
            subject: 'Problema com acesso ao cPanel',
            description: 'Não consigo acessar o cPanel com minhas credenciais.',
            status: 'open',
            priority: 'high',
            date: '2023-10-10T15:30:00Z',
            lastUpdate: '2023-10-10T16:45:00Z'
          },
          {
            id: 'TIC-002',
            subject: 'Dúvida sobre renovação de domínio',
            description: 'Gostaria de saber como proceder para renovar meu domínio que expira no próximo mês.',
            status: 'answered',
            priority: 'medium',
            date: '2023-10-15T09:20:00Z',
            lastUpdate: '2023-10-15T14:10:00Z'
          },
          {
            id: 'TIC-003',
            subject: 'Email não está enviando',
            description: 'As mensagens enviadas pelo meu email profissional estão retornando.',
            status: 'pending',
            priority: 'high',
            date: '2023-10-20T11:05:00Z',
            lastUpdate: '2023-10-21T08:30:00Z'
          }
        ];
        
        setTickets(mockTickets);
      } catch (error) {
        console.error('Erro ao buscar tickets:', error);
        toast.error('Erro ao carregar tickets de suporte');
      } finally {
        setLoading(false);
      }
    };
    
    fetchTickets();
  }, [customerId]);
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return <Badge className="bg-blue-500">Aberto</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500">Pendente</Badge>;
      case 'closed':
        return <Badge className="bg-gray-500">Fechado</Badge>;
      case 'answered':
        return <Badge className="bg-green-500">Respondido</Badge>;
      default:
        return <Badge>Desconhecido</Badge>;
    }
  };
  
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'low':
        return <Badge variant="outline" className="border-green-500 text-green-500">Baixa</Badge>;
      case 'medium':
        return <Badge variant="outline" className="border-yellow-500 text-yellow-500">Média</Badge>;
      case 'high':
        return <Badge variant="outline" className="border-red-500 text-red-500">Alta</Badge>;
      default:
        return <Badge variant="outline">Desconhecida</Badge>;
    }
  };
  
  const handleViewTicket = (ticketId: string) => {
    toast.success(`Visualizando ticket ${ticketId}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tickets de Suporte</CardTitle>
        <CardDescription>Todos os tickets de suporte abertos pelo cliente</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex flex-col items-center justify-center py-8">
            <RefreshCcw className="h-8 w-8 animate-spin text-primary" />
            <p className="mt-4 text-muted-foreground">Carregando tickets de suporte...</p>
          </div>
        ) : tickets.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Assunto</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Prioridade</TableHead>
                <TableHead>Data de Abertura</TableHead>
                <TableHead>Última Atualização</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell className="font-medium">{ticket.id}</TableCell>
                  <TableCell className="max-w-[200px] truncate">{ticket.subject}</TableCell>
                  <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                  <TableCell>{getPriorityBadge(ticket.priority)}</TableCell>
                  <TableCell>{new Date(ticket.date).toLocaleDateString('pt-AO')}</TableCell>
                  <TableCell>{new Date(ticket.lastUpdate).toLocaleDateString('pt-AO')}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleViewTicket(ticket.id)}
                      title="Ver ticket"
                    >
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            Este cliente não possui tickets de suporte.
          </div>
        )}
      </CardContent>
    </Card>
  );
};
