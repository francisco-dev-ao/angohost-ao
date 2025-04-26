
import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Search, Plus } from 'lucide-react';
import { ContactProfileSelector } from '@/components/domain/ContactProfileSelector';
import { ContactProfile } from '@/types/cart';
import { NifSearch } from '@/components/domain/NifSearch';
import { toast } from 'sonner';
import { useCart } from '@/context/CartContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ProfileForm } from '@/components/domain/contact/ProfileForm';

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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newProfile, setNewProfile] = useState<Omit<ContactProfile, 'id'>>({
    name: '',
    email: '',
    phone: '',
    nif: '',
    billingAddress: '',
    city: '',
  });
  
  const { addContactProfile } = useCart();

  const handleInputChange = (field: keyof Omit<ContactProfile, 'id'>, value: string) => {
    setNewProfile(prev => ({ ...prev, [field]: value }));
  };
  
  const handleCreateProfile = () => {
    if (!newProfile.name || !newProfile.email || !newProfile.nif) {
      toast.error("Por favor, preencha todos os campos obrigatórios");
      return;
    }
    
    const profileId = addContactProfile(newProfile);
    onSelectProfile(profileId);
    setIsDialogOpen(false);
    toast.success("Perfil de contato criado com sucesso!");
  };
  
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
          // Criar um novo perfil
          setNewProfile({
            name: data.nome || '',
            email: '',
            phone: data.numero_contacto || '',
            nif: nif,
            billingAddress: data.endereco || '',
            city: data.provincia || '',
          });
          setIsDialogOpen(true);
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
          error={error}
        />
        
        <ContactProfileSelector 
          profiles={profiles}
          selectedProfileId={selectedProfileId}
          onSelectProfile={onSelectProfile}
        />
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="mt-4 w-full" onClick={() => setIsDialogOpen(true)}>
              <Plus size={16} className="mr-2" />
              Criar Novo Perfil de Contato
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Criar Novo Perfil de Contato</DialogTitle>
            </DialogHeader>
            <ProfileForm
              nif={nif}
              onNifChange={setNif}
              onNifSearch={handleNifSearch}
              isNifLoading={isLoading}
              nifError={error}
              newProfile={newProfile}
              onInputChange={handleInputChange}
              onCreateProfile={handleCreateProfile}
              onCancel={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};
