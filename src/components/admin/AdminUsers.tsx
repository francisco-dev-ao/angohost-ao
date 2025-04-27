
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Customer } from '@/types/user';
import { UsersSearchHeader } from './users/UsersSearchHeader';
import { UsersTable } from './users/UsersTable';
import { EditUserDialog } from './users/EditUserDialog';

export const AdminUsers = () => {
  const [users, setUsers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Customer | null>(null);
  
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('customers')
        .select(`
          *,
          profiles:profiles(is_admin)
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
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
      fetchUsers();
    } catch (error) {
      console.error('Erro ao alterar status de administrador:', error);
      toast.error('Erro ao alterar permissões de administrador');
    }
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

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between px-6">
        <div>
          <CardTitle>Gerenciamento de Usuários</CardTitle>
          <CardDescription>Visualize e gerencie todos os usuários do sistema</CardDescription>
        </div>
        <UsersSearchHeader 
          searchQuery={searchQuery}
          onSearchChange={handleSearch}
          onRefresh={fetchUsers}
        />
      </CardHeader>
      <CardContent className="px-6">
        <UsersTable 
          users={filteredUsers}
          loading={loading}
          onEditUser={handleEditUser}
          onToggleAdmin={handleToggleAdmin}
        />
      </CardContent>

      <EditUserDialog
        user={selectedUser}
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onToggleAdmin={handleToggleAdmin}
      />
    </Card>
  );
};
