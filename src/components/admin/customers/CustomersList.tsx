
import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { simulateDbOperation } from '@/integrations/postgres/client';
import { toast } from "sonner";
import { User, Search, RefreshCcw, PencilLine, History, Ticket, Lock, RotateCw } from "lucide-react";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  nif: string | null;
  city: string | null;
  country: string | null;
  created_at: string;
}

interface CustomersListProps {
  onEdit: (customerId: string) => void;
  onViewHistory: (customerId: string) => void;
  onViewTickets: (customerId: string) => void;
}

export const CustomersList: React.FC<CustomersListProps> = ({ onEdit, onViewHistory, onViewTickets }) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  const fetchCustomers = async () => {
    try {
      setLoading(true);
      
      // Simular busca de clientes no banco de dados
      const { success, data, error } = await simulateDbOperation('get_customers', {});
      
      if (!success || error) {
        throw new Error(error || 'Falha ao buscar clientes');
      }
      
      // Normalmente o data seria os dados reais do cliente
      // Para demonstração, vamos criar alguns dados fictícios
      const mockCustomers: Customer[] = [
        {
          id: '1',
          name: 'Carlos Silva',
          email: 'carlos.silva@example.com',
          phone: '+244 923 456 789',
          nif: '12345678',
          city: 'Luanda',
          country: 'Angola',
          created_at: '2023-05-15T10:30:00Z'
        },
        {
          id: '2',
          name: 'Maria Santos',
          email: 'maria.santos@example.com',
          phone: '+244 912 345 678',
          nif: '87654321',
          city: 'Benguela',
          country: 'Angola',
          created_at: '2023-06-20T14:45:00Z'
        },
        {
          id: '3',
          name: 'João Pereira',
          email: 'joao.pereira@example.com',
          phone: '+244 934 567 890',
          nif: '23456789',
          city: 'Huambo',
          country: 'Angola',
          created_at: '2023-07-10T09:15:00Z'
        },
        {
          id: '4',
          name: 'Ana Costa',
          email: 'ana.costa@example.com',
          phone: '+244 956 789 012',
          nif: '34567890',
          city: 'Lubango',
          country: 'Angola',
          created_at: '2023-08-05T16:20:00Z'
        },
        {
          id: '5',
          name: 'Pedro Nunes',
          email: 'pedro.nunes@example.com',
          phone: '+244 978 901 234',
          nif: '45678901',
          city: 'Namibe',
          country: 'Angola',
          created_at: '2023-09-12T11:40:00Z'
        }
      ];
      
      setCustomers(mockCustomers);
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
      toast.error('Erro ao carregar a lista de clientes');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchCustomers();
  }, []);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const handleResetPassword = async (customerId: string) => {
    try {
      toast.promise(
        simulateDbOperation('reset_customer_password', { customerId }),
        {
          loading: 'Redefinindo senha...',
          success: 'Senha redefinida com sucesso! Um e-mail foi enviado ao cliente.',
          error: 'Erro ao redefinir senha'
        }
      );
    } catch (error) {
      console.error('Erro ao redefinir senha:', error);
    }
  };
  
  const handleReset2FA = async (customerId: string) => {
    try {
      toast.promise(
        simulateDbOperation('reset_customer_2fa', { customerId }),
        {
          loading: 'Redefinindo 2FA...',
          success: '2FA redefinido com sucesso! Um e-mail foi enviado ao cliente.',
          error: 'Erro ao redefinir 2FA'
        }
      );
    } catch (error) {
      console.error('Erro ao redefinir 2FA:', error);
    }
  };
  
  const filteredCustomers = customers.filter(customer => {
    const query = searchQuery.toLowerCase();
    return (
      customer.name.toLowerCase().includes(query) ||
      customer.email.toLowerCase().includes(query) ||
      customer.phone?.toLowerCase().includes(query) ||
      customer.nif?.toLowerCase().includes(query) ||
      customer.city?.toLowerCase().includes(query)
    );
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Buscar cliente..."
            className="pl-8 w-full"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => fetchCustomers()}
          className="ml-2"
          title="Atualizar lista"
        >
          <RefreshCcw className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>NIF</TableHead>
              <TableHead>Cidade</TableHead>
              <TableHead>Data de Cadastro</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  <RefreshCcw className="h-5 w-5 mx-auto animate-spin" />
                  <div className="mt-2">Carregando clientes...</div>
                </TableCell>
              </TableRow>
            ) : filteredCustomers.length > 0 ? (
              filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-400" />
                      {customer.name}
                    </div>
                  </TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.phone || 'N/A'}</TableCell>
                  <TableCell>{customer.nif || 'N/A'}</TableCell>
                  <TableCell>{customer.city || 'N/A'}</TableCell>
                  <TableCell>
                    {new Date(customer.created_at).toLocaleDateString('pt-AO')}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEdit(customer.id)}
                        title="Editar cliente"
                      >
                        <PencilLine className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleResetPassword(customer.id)}
                        title="Redefinir senha"
                      >
                        <Lock className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleReset2FA(customer.id)}
                        title="Resetar 2FA"
                      >
                        <RotateCw className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onViewHistory(customer.id)}
                        title="Ver histórico de compras"
                      >
                        <History className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onViewTickets(customer.id)}
                        title="Ver tickets de suporte"
                      >
                        <Ticket className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  Nenhum cliente encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
