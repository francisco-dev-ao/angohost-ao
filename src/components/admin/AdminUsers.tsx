
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, RefreshCcw } from 'lucide-react';
import { UsersTable } from './users/UsersTable';
import { UserEditDialog } from './users/UserEditDialog';
import { useAdminUsers } from '@/hooks/useAdminUsers';

export const AdminUsers = () => {
  const {
    users,
    loading,
    searchQuery,
    setSearchQuery,
    isDialogOpen,
    setIsDialogOpen,
    selectedUser,
    setSelectedUser,
    handleToggleAdmin,
    fetchUsers
  } = useAdminUsers();
  
  const handleEditUser = (user: any) => {
    setSelectedUser(user);
    setIsDialogOpen(true);
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
                onChange={(e) => setSearchQuery(e.target.value)} 
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
          <UsersTable 
            users={users}
            loading={loading}
            onEditUser={handleEditUser}
            onToggleAdmin={handleToggleAdmin}
          />
        </CardContent>
      </Card>
      
      <UserEditDialog 
        user={selectedUser}
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onToggleAdmin={handleToggleAdmin}
      />
    </div>
  );
};
