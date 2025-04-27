
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useContactProfile } from '@/context/ContactProfileContext';

export const ContactProfileDialogs = () => {
  const {
    isNewProfileDialogOpen,
    setIsNewProfileDialogOpen,
    isEditProfileDialogOpen,
    setIsEditProfileDialogOpen,
    newProfile,
    handleProfileFormChange,
    handleCreateProfile,
    handleUpdateProfile
  } = useContactProfile();

  return (
    <>
      <Dialog open={isNewProfileDialogOpen} onOpenChange={setIsNewProfileDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Criar Novo Perfil de Contato</DialogTitle>
            <DialogDescription>
              Preencha as informações para criar um novo perfil de contato
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Nome *</Label>
                <Input 
                  id="name" 
                  value={newProfile.name} 
                  onChange={(e) => handleProfileFormChange('name', e.target.value)}
                  placeholder="Nome completo ou empresa"
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={newProfile.email} 
                  onChange={(e) => handleProfileFormChange('email', e.target.value)}
                  placeholder="email@exemplo.com"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Telefone</Label>
                <Input 
                  id="phone" 
                  value={newProfile.phone} 
                  onChange={(e) => handleProfileFormChange('phone', e.target.value)}
                  placeholder="Número de telefone"
                />
              </div>
              <div>
                <Label htmlFor="nif">NIF</Label>
                <Input 
                  id="nif" 
                  value={newProfile.nif} 
                  onChange={(e) => handleProfileFormChange('nif', e.target.value)}
                  placeholder="Número de NIF"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="billingAddress">Endereço</Label>
              <Input 
                id="billingAddress" 
                value={newProfile.billingAddress} 
                onChange={(e) => handleProfileFormChange('billingAddress', e.target.value)}
                placeholder="Endereço completo"
              />
            </div>
            <div>
              <Label htmlFor="city">Cidade</Label>
              <Input 
                id="city" 
                value={newProfile.city} 
                onChange={(e) => handleProfileFormChange('city', e.target.value)}
                placeholder="Cidade"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleCreateProfile}>Criar Perfil</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditProfileDialogOpen} onOpenChange={setIsEditProfileDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Perfil de Contato</DialogTitle>
            <DialogDescription>
              Atualize as informações do perfil de contato
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-name">Nome *</Label>
                <Input 
                  id="edit-name" 
                  value={newProfile.name} 
                  onChange={(e) => handleProfileFormChange('name', e.target.value)}
                  placeholder="Nome completo ou empresa"
                />
              </div>
              <div>
                <Label htmlFor="edit-email">Email *</Label>
                <Input 
                  id="edit-email" 
                  type="email" 
                  value={newProfile.email} 
                  onChange={(e) => handleProfileFormChange('email', e.target.value)}
                  placeholder="email@exemplo.com"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-phone">Telefone</Label>
                <Input 
                  id="edit-phone" 
                  value={newProfile.phone} 
                  onChange={(e) => handleProfileFormChange('phone', e.target.value)}
                  placeholder="Número de telefone"
                />
              </div>
              <div>
                <Label htmlFor="edit-nif">NIF</Label>
                <Input 
                  id="edit-nif" 
                  value={newProfile.nif} 
                  onChange={(e) => handleProfileFormChange('nif', e.target.value)}
                  placeholder="Número de NIF"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="edit-address">Endereço</Label>
              <Input 
                id="edit-address" 
                value={newProfile.billingAddress} 
                onChange={(e) => handleProfileFormChange('billingAddress', e.target.value)}
                placeholder="Endereço completo"
              />
            </div>
            <div>
              <Label htmlFor="edit-city">Cidade</Label>
              <Input 
                id="edit-city" 
                value={newProfile.city} 
                onChange={(e) => handleProfileFormChange('city', e.target.value)}
                placeholder="Cidade"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleUpdateProfile}>Atualizar Perfil</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
