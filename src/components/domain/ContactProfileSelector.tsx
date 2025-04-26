
import React, { useState } from 'react';
import { ContactProfile } from '@/types/cart';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ClientDetailsForm } from './ClientDetailsForm';
import { toast } from 'sonner';
import { useCart } from '@/context/CartContext';
import { PlusCircle, UserCircle } from 'lucide-react';

interface ContactProfileSelectorProps {
  profiles: ContactProfile[];
  selectedProfileId: string | null;
  onSelectProfile: (id: string) => void;
  onCreateProfile?: (profile: ContactProfile) => void;
}

export const ContactProfileSelector: React.FC<ContactProfileSelectorProps> = ({
  profiles,
  selectedProfileId,
  onSelectProfile,
  onCreateProfile
}) => {
  const { addContactProfile } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [newProfile, setNewProfile] = useState<Omit<ContactProfile, 'id'>>({
    name: '',
    email: '',
    phone: '',
    nif: '',
    billingAddress: '',
    city: '',
    country: 'Angola'
  });

  const handleInputChange = (field: keyof Omit<ContactProfile, 'id'>, value: string) => {
    setNewProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleCreateProfile = () => {
    // Validação básica
    const requiredFields = ['name', 'email', 'phone', 'nif', 'billingAddress', 'city'] as const;
    const missingFields = requiredFields.filter(field => !newProfile[field]);
    
    if (missingFields.length > 0) {
      toast.error(`Por favor, preencha todos os campos obrigatórios: ${missingFields.join(', ')}`);
      return;
    }
    
    // Adicionar ao contexto
    const profileId = addContactProfile(newProfile as ContactProfile);
    
    // Selecionar o novo perfil
    onSelectProfile(profileId);
    
    // Fechar o diálogo
    setIsOpen(false);
    
    // Feedback
    toast.success('Perfil de contato criado com sucesso!');
  };

  return (
    <div className="space-y-6">
      {profiles.length > 0 ? (
        <RadioGroup 
          value={selectedProfileId || ""} 
          onValueChange={onSelectProfile}
          className="space-y-4"
        >
          {profiles.map((profile) => (
            <div key={profile.id} className="flex items-start space-x-3">
              <RadioGroupItem value={profile.id} id={`profile-${profile.id}`} className="mt-1" />
              <Label 
                htmlFor={`profile-${profile.id}`} 
                className="flex-1 p-3 bg-white rounded-md border cursor-pointer hover:bg-gray-50"
              >
                <div className="font-medium mb-1">{profile.name}</div>
                <div className="text-sm text-gray-500">
                  {profile.email} • {profile.phone}
                </div>
                <div className="text-sm text-gray-500">
                  NIF: {profile.nif} • {profile.city}, {profile.country}
                </div>
                <div className="text-sm text-gray-500">
                  {profile.billingAddress}
                </div>
              </Label>
            </div>
          ))}
        </RadioGroup>
      ) : (
        <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-md border border-dashed">
          <UserCircle className="h-12 w-12 text-gray-400 mb-3" />
          <p className="text-gray-500 mb-4">Você ainda não tem perfis de contato cadastrados</p>
        </div>
      )}
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full">
            <PlusCircle className="mr-2 h-4 w-4" />
            Criar Novo Perfil de Contato
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Criar Perfil de Contato</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <ClientDetailsForm
              details={{
                name: newProfile.name,
                responsibleName: newProfile.name,
                idNumber: '',
                province: '',
                city: newProfile.city,
                address: newProfile.billingAddress,
                postalCode: '',
                email: newProfile.email,
                phone: newProfile.phone
              }}
              onInputChange={(field, value) => {
                // Mapeamento dos campos
                if (field === 'name') handleInputChange('name', value);
                if (field === 'email') handleInputChange('email', value);
                if (field === 'phone') handleInputChange('phone', value);
                if (field === 'address') handleInputChange('billingAddress', value);
                if (field === 'city') handleInputChange('city', value);
              }}
            />
            
            <div className="mt-6 flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleCreateProfile}>
                Criar Perfil
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
