
import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Search } from 'lucide-react';
import { ContactProfileSelector } from '@/components/domain/ContactProfileSelector';
import { ContactProfile } from '@/types/cart';
import { NifSearch } from '@/components/domain/NifSearch';
import { toast } from 'sonner';

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
  const [nif, setNif] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleNifSearch = async () => {
    if (!nif || nif.length < 9) {
      toast.error("Por favor, digite um NIF válido.");
      return;
    }
    
    setIsLoading(true);
    try {
      // URL corrigida com base no exemplo fornecido
      const response = await fetch(`https://consulta.edgarsingui.ao/consultar-por-nif/${nif}`);
      
      if (!response.ok) {
        throw new Error('Falha ao consultar o NIF');
      }
      
      const result = await response.json();
      
      // Verificar se a resposta possui o campo "data" com "success" igual a true
      if (result && result.data && result.data.success === true) {
        const data = result.data;
        
        // Find profile with matching NIF or create new one
        const profileWithNif = profiles.find(p => p.nif === nif);
        
        if (profileWithNif) {
          onSelectProfile(profileWithNif.id);
          toast.success("Perfil de contato selecionado automaticamente.");
        } else {
          // In a real implementation, you would create a new profile here
          toast.info(`Dados encontrados para ${data.nome}! Crie um novo perfil com estes dados.`);
        }
      } else {
        toast.error("NIF não encontrado ou sem dados associados.");
      }
    } catch (error) {
      console.error("Error fetching NIF data:", error);
      toast.error("Erro ao consultar o NIF. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="mt-8 border-2 border-green-200">
      <CardHeader className="bg-green-50">
        <CardTitle className="flex items-center">
          <User className="h-5 w-5 mr-2 text-green-500" />
          Perfil de Contato para Domínio
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <NifSearch 
          nif={nif}
          onNifChange={setNif}
          onSearch={handleNifSearch}
          isLoading={isLoading}
        />
        
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
