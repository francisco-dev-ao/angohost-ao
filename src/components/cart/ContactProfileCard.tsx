
import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Search } from 'lucide-react';
import { ContactProfileSelector } from '@/components/domain/ContactProfileSelector';
import { ContactProfile } from '@/types/cart';
import { NifSearch } from '@/components/domain/NifSearch';
import { toast } from 'sonner';
import { useCart } from '@/context/CartContext';

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
  const [error, setError] = useState<string | null>(null);
  
  const handleNifSearch = async () => {
    if (!nif || nif.length < 8) {
      setError("Por favor, digite um NIF válido.");
      toast.error("Por favor, digite um NIF válido.");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      toast.info("Consultando dados do NIF...");
      
      const response = await fetch(`https://consulta.edgarsingui.ao/public/consultar-por-nif/${nif}`);
      
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
          // Redirect to the ContactProfileSelector for creating a new profile
          toast.info(`Dados encontrados para ${data.nome}! Complete o perfil.`);
        }
        setError(null);
      } else {
        setError("NIF não encontrado ou sem dados associados.");
        toast.error("NIF não encontrado ou sem dados associados.");
      }
    } catch (error) {
      console.error("Error fetching NIF data:", error);
      setError("Erro ao consultar o NIF. Tente novamente.");
      toast.error("Erro ao consultar o NIF. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="mt-6 border-2 border-green-200">
      <CardHeader className="bg-green-50 py-3">
        <CardTitle className="flex items-center text-base">
          <User className="h-4 w-4 mr-2 text-green-500" />
          Perfil de Contato para Domínio
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <NifSearch 
          nif={nif}
          onNifChange={setNif}
          onSearch={handleNifSearch}
          isLoading={isLoading}
          error={error}
        />
        
        <ContactProfileSelector 
          profiles={profiles}
          selectedProfileId={selectedProfileId}
          onSelectProfile={onSelectProfile}
        />
      </CardContent>
    </Card>
  );
};
