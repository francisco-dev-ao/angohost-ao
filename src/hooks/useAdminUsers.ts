
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Customer } from '@/types/admin';
import { toast } from 'sonner';

export const useAdminUsers = () => {
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

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      user.name?.toLowerCase().includes(searchLower) ||
      user.email?.toLowerCase().includes(searchLower) ||
      user.phone?.toLowerCase().includes(searchLower) ||
      user.nif?.toLowerCase().includes(searchLower)
    );
  });

  return {
    users: filteredUsers,
    loading,
    searchQuery,
    setSearchQuery,
    isDialogOpen,
    setIsDialogOpen,
    selectedUser,
    setSelectedUser,
    handleToggleAdmin,
    fetchUsers
  };
};
