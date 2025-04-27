
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { User, Search, Check, X, RefreshCcw, Shield } from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  nif: string | null;
  city: string | null;
  created_at: string;
  is_admin?: boolean;
}

export const AdminUsers = () => {
  const [users, setUsers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Customer | null>(null);
  
  const fetchUsers = async () => {
    try {
      setLoading(true);
      
      // Buscar clientes com seus respectivos perfis para verificar status de admin
      const { data, error } = await supabase
        .from('customers')
        .select(`
          *,
          profiles:profiles(is_admin)
        `)
        .order('created_at', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      // Formatar os dados para incluir o status de admin
      const formattedUsers = data.map((user: any) => ({
        ...user,
        is_admin: user.profiles?.is_admin || false
      }));
      
      setUsers(formattedUsers);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      toast.error('Erro ao carregar a lista de usuários');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchUsers();
  }, []);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const filteredUsers = users.filter((user) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      user.name?.toLowerCase().includes(searchLower) ||
      user.email?.toLowerCase().includes(searchLower) ||
      user.phone?.toLowerCase().includes(searchLower) ||
      user.nif?.toLowerCase().includes(searchLower)
    );
  });
  
  const handleEditUser = (user: Customer) => {
    setSelectedUser(user);
    setIsDialogOpen(true);
  };
  
  const handleToggleAdmin = async (userId: string, isCurrentlyAdmin: boolean) => {
    try {
      const { error } = await supabase.rpc('set_admin_status', {
        user_id: userId,
        is_admin_status: !isCurrentlyAdmin
      });
      
      if (error) throw error;
      
      toast.success(`Usuário ${isCurrentlyAdmin ? 'removido dos' : 'adicionado aos'} administradores`);
      fetchUsers(); // Recarregar a lista
    } catch (error) {
      console.error('Erro ao alterar status de administrador:', error);
      toast.error('Erro ao alterar permissões de administrador');
    }
  };
  
  return (
    <div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between px-6">
          <div>
            <CardTitle>Gerenciamento de Usuários</CardTitle>
            <CardDescription>Visualize e gerencie todos os usuários do sistema</CardDescription>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input 
                placeholder="Buscar usuário..." 
                className="pl-8 w-[250px]" 
                value={searchQuery} 
                onChange={handleSearch} 
              />
            </div>
            <Button 
              variant="outline" 
              size="icon"
              onClick={fetchUsers}
              title="Atualizar lista"
            >
              <RefreshCcw className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="px-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>NIF</TableHead>
                <TableHead>Cidade</TableHead>
                <TableHead>Data de Cadastro</TableHead>
                <TableHead className="text-center">Admin</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-10">
                    <RefreshCcw className="h-6 w-6 animate-spin mx-auto" />
                    <p className="mt-2">Carregando usuários...</p>
                  </TableCell>
                </TableRow>
              ) : filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2 text-gray-400" />
                        {user.name || 'N/A'}
                      </div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone || 'N/A'}</TableCell>
                    <TableCell>{user.nif || 'N/A'}</TableCell>
                    <TableCell>{user.city || 'N/A'}</TableCell>
                    <TableCell>
                      {new Date(user.created_at).toLocaleDateString('pt-AO')}
                    </TableCell>
                    <TableCell className="text-center">
                      {user.is_admin ? (
                        <Check className="h-5 w-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-gray-300 mx-auto" />
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleToggleAdmin(user.id, !!user.is_admin)}
                          title={user.is_admin ? "Remover privilégios de admin" : "Tornar administrador"}
                        >
                          <Shield className={`h-4 w-4 ${user.is_admin ? 'text-amber-500' : 'text-gray-400'}`} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleEditUser(user)}
                        >
                          <span className="sr-only">Editar</span>
                          ✏️
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-10">
                    <p className="text-gray-500">Nenhum usuário encontrado</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/* Diálogo de Edição de Usuário */}
      {selectedUser && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar Usuário</DialogTitle>
              <DialogDescription>
                Atualize as informações do usuário {selectedUser.name}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nome</Label>
                <Input id="name" defaultValue={selectedUser.name} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" defaultValue={selectedUser.email} disabled />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input id="phone" defaultValue={selectedUser.phone || ''} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="nif">NIF</Label>
                  <Input id="nif" defaultValue={selectedUser.nif || ''} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="city">Cidade</Label>
                  <Input id="city" defaultValue={selectedUser.city || ''} />
                </div>
              </div>
              <div className="flex items-center space-x-2 pt-2">
                <Checkbox 
                  id="isAdmin" 
                  checked={selectedUser.is_admin}
                  onCheckedChange={() => handleToggleAdmin(selectedUser.id, !!selectedUser.is_admin)}
                />
                <Label htmlFor="isAdmin" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Administrador do Sistema
                </Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit">Salvar Alterações</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
