
import React, { useState } from 'react';
import { ContactProfile } from '@/types/cart';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from 'sonner';
import { useCart } from '@/context/CartContext';
import { useNifValidation } from '@/hooks/useNifValidation';
import { PlusCircle } from 'lucide-react';
import { ProfileList } from './contact/ProfileList';
import { ProfileForm } from './contact/ProfileForm';

interface ContactProfileSelectorProps {
  profiles: ContactProfile[];
  selectedProfileId: string | null;
  onSelectProfile: (id: string) => void;
}

export const ContactProfileSelector: React.FC<ContactProfileSelectorProps> = ({
  profiles,
  selectedProfileId,
  onSelectProfile,
}) => {
  const { addContactProfile } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [nif, setNif] = useState('');
  const [newProfile, setNewProfile] = useState<Omit<ContactProfile, 'id'>>({
    profileName: '',
    name: '',
    email: '',
    phone: '',
    nif: '',
    billingAddress: '',
    city: '',
    country: 'Angola'
  });

  const { isLoading: isNifLoading, error: nifError, validateNif } = useNifValidation();

  const handleNifSearch = async () => {
    const data = await validateNif(nif);
    if (data) {
      setNewProfile(prev => ({
        ...prev,
        profileName: `${data.nome.substring(0, 20)}...`,
        name: data.nome,
        phone: data.numero_contacto || '',
        nif: nif,
        billingAddress: data.endereco || '',
      }));
    }
  };

  const handleInputChange = (field: keyof Omit<ContactProfile, 'id'>, value: string) => {
    setNewProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleCreateProfile = () => {
    const requiredFields = ['profileName', 'name', 'email', 'phone', 'nif', 'billingAddress', 'city'] as const;
    const missingFields = requiredFields.filter(field => !newProfile[field]);
    
    if (missingFields.length > 0) {
      toast.error(`Por favor, preencha todos os campos obrigatórios: ${missingFields.join(', ')}`);
      return;
    }
    
    if (!newProfile.profileName) {
      setNewProfile(prev => ({
        ...prev,
        profileName: prev.name.substring(0, 30)
      }));
    }
    
    const profileId = addContactProfile(newProfile as ContactProfile);
    onSelectProfile(profileId);
    setIsOpen(false);
    toast.success('Perfil de contato criado com sucesso!');
  };

  return (
    <div className="space-y-4">
      <ProfileList 
        profiles={profiles}
        selectedProfileId={selectedProfileId}
        onSelectProfile={onSelectProfile}
      />
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full mt-2">
            <PlusCircle className="mr-2 h-4 w-4" />
            Criar Novo Perfil de Contato
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Criar Perfil de Contato</DialogTitle>
          </DialogHeader>
          
          <ProfileForm
            nif={nif}
            onNifChange={setNif}
            onNifSearch={handleNifSearch}
            isNifLoading={isNifLoading}
            nifError={nifError}
            newProfile={newProfile}
            onInputChange={handleInputChange}
            onCreateProfile={handleCreateProfile}
            onCancel={() => setIsOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};
