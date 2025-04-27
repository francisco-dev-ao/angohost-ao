
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, User, UserPlus } from 'lucide-react';
import { ContactProfile } from '@/context/CartContext';

interface ContactProfilesListProps {
  contactProfiles: ContactProfile[];
  onEditProfile: (profile: ContactProfile) => void;
  onDeleteProfile: (profileId: string) => void;
  onNewProfile: () => void;
}

export const ContactProfilesList = ({
  contactProfiles,
  onEditProfile,
  onDeleteProfile,
  onNewProfile
}: ContactProfilesListProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Perfis de Contato</CardTitle>
          <CardDescription>
            Gerencie seus perfis de contato para registro de domínios
          </CardDescription>
        </div>
        <Button className="flex items-center" onClick={onNewProfile}>
          <UserPlus className="h-4 w-4 mr-2" />
          Novo Perfil
        </Button>
      </CardHeader>
      
      <CardContent>
        {contactProfiles.length === 0 ? (
          <div className="flex items-center justify-center p-12">
            <div className="text-center">
              <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium">Nenhum perfil de contato</h3>
              <p className="text-gray-600 mt-2 mb-6">
                Você ainda não tem perfis de contato cadastrados.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {contactProfiles.map((profile) => (
              <Card key={profile.id} className="overflow-hidden">
                <CardHeader className="p-4 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{profile.name}</CardTitle>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" onClick={() => onEditProfile(profile)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-red-500" onClick={() => onDeleteProfile(profile.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="text-sm space-y-1">
                    <p><span className="font-medium">Email:</span> {profile.email}</p>
                    <p><span className="font-medium">Telefone:</span> {profile.phone || 'Não informado'}</p>
                    <p><span className="font-medium">NIF:</span> {profile.nif || 'Não informado'}</p>
                    <p><span className="font-medium">Cidade:</span> {profile.city || 'Não informado'}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
