
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { User } from 'lucide-react';
import { ContactProfileSelector } from '@/components/domain/ContactProfileSelector';
import { ContactProfile } from '@/types/cart';

interface ContactProfileCardProps {
  profiles: ContactProfile[];
  selectedProfileId: string | null;
  onSelectProfile: (id: string | null) => void;
}

export const ContactProfileCard: React.FC<ContactProfileCardProps> = ({
  profiles,
  selectedProfileId,
  onSelectProfile
}) => {
  return (
    <Card className="mt-8 border-2 border-green-200">
      <CardHeader className="bg-green-50">
        <CardTitle className="flex items-center">
          <User className="h-5 w-5 mr-2 text-green-500" />
          Perfil de Contato para Domínio
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 pb-6">
        <p className="mb-4 text-gray-600">
          Selecione um perfil de contato para seus domínios ou crie um novo perfil.
        </p>
        
        <ContactProfileSelector 
          profiles={profiles}
          selectedProfileId={selectedProfileId}
          onSelectProfile={onSelectProfile}
          onCreateProfile={() => {}}
        />
      </CardContent>
    </Card>
  );
};
