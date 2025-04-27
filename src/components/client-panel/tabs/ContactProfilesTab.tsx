
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, UserCircle } from 'lucide-react';
import { useContactProfile } from '@/context/ContactProfileContext';
import { toast } from 'sonner';
import { ContactProfile } from '@/types/cart';

export const ContactProfilesTab = () => {
  const { 
    contactProfiles,
    setIsNewProfileDialogOpen,
    handleSelectProfileToEdit,
    handleDeleteProfile
  } = useContactProfile();

  const confirmDelete = (profile: ContactProfile) => {
    if (confirm(`Tem certeza que deseja excluir o perfil "${profile.profileName || profile.name}"?`)) {
      handleDeleteProfile(profile.id);
      toast.success('Perfil de contato excluído com sucesso');
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Perfis de Contato</CardTitle>
          <CardDescription>Gerencie seus perfis de contato para domínios</CardDescription>
        </div>
        <Button onClick={() => setIsNewProfileDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Perfil
        </Button>
      </CardHeader>
      <CardContent>
        {contactProfiles.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 bg-gray-50 rounded-md border border-dashed">
            <UserCircle className="h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium">Nenhum perfil de contato</h3>
            <p className="text-gray-500 mb-4 text-center">
              Crie perfis de contato para facilitar o registro e renovação de domínios
            </p>
            <Button onClick={() => setIsNewProfileDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Criar Perfil
            </Button>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {contactProfiles.map((profile) => (
              <div 
                key={profile.id}
                className="p-4 border rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">{profile.profileName || profile.name}</h3>
                  <div className="flex gap-2">
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      onClick={() => handleSelectProfileToEdit(profile)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      className="text-red-500"
                      onClick={() => confirmDelete(profile)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  <p>{profile.name}</p>
                  <p>{profile.email}</p>
                  <p>{profile.phone}</p>
                  <p>{profile.nif}</p>
                  <p>{profile.billingAddress}</p>
                  <p>{profile.city}, {profile.country}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
