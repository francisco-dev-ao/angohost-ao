
import React from 'react';
import { 
  Dialog, DialogContent, DialogDescription, DialogHeader, 
  DialogTitle, DialogFooter 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Customer } from '@/types/user';

interface EditUserDialogProps {
  user: Customer | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onToggleAdmin: (userId: string, isCurrentlyAdmin: boolean) => void;
}

export const EditUserDialog = ({ 
  user, 
  isOpen, 
  onOpenChange,
  onToggleAdmin 
}: EditUserDialogProps) => {
  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Usuário</DialogTitle>
          <DialogDescription>
            Atualize as informações do usuário {user.name}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Nome</Label>
            <Input id="name" defaultValue={user.name} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" defaultValue={user.email} disabled />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Telefone</Label>
            <Input id="phone" defaultValue={user.phone || ''} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="nif">NIF</Label>
              <Input id="nif" defaultValue={user.nif || ''} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="city">Cidade</Label>
              <Input id="city" defaultValue={user.city || ''} />
            </div>
          </div>
          <div className="flex items-center space-x-2 pt-2">
            <Checkbox 
              id="isAdmin" 
              checked={user.is_admin}
              onCheckedChange={() => onToggleAdmin(user.id, !!user.is_admin)}
            />
            <Label htmlFor="isAdmin" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Administrador do Sistema
            </Label>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button type="submit">Salvar Alterações</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
