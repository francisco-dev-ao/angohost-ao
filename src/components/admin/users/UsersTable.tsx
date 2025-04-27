
import React from 'react';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { User, Check, X, Shield } from 'lucide-react';
import { Customer } from '@/types/user';
import { RefreshCcw } from 'lucide-react';

interface UsersTableProps {
  users: Customer[];
  loading: boolean;
  onEditUser: (user: Customer) => void;
  onToggleAdmin: (userId: string, isCurrentlyAdmin: boolean) => void;
}

export const UsersTable = ({ users, loading, onEditUser, onToggleAdmin }: UsersTableProps) => {
  if (loading) {
    return (
      <TableRow>
        <TableCell colSpan={8} className="text-center py-10">
          <RefreshCcw className="h-6 w-6 animate-spin mx-auto" />
          <p className="mt-2">Carregando usuários...</p>
        </TableCell>
      </TableRow>
    );
  }

  if (users.length === 0) {
    return (
      <TableRow>
        <TableCell colSpan={8} className="text-center py-10">
          <p className="text-gray-500">Nenhum usuário encontrado</p>
        </TableCell>
      </TableRow>
    );
  }

  return (
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
        {users.map((user) => (
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
                  onClick={() => onToggleAdmin(user.id, !!user.is_admin)}
                  title={user.is_admin ? "Remover privilégios de admin" : "Tornar administrador"}
                >
                  <Shield className={`h-4 w-4 ${user.is_admin ? 'text-amber-500' : 'text-gray-400'}`} />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => onEditUser(user)}
                >
                  <span className="sr-only">Editar</span>
                  ✏️
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
