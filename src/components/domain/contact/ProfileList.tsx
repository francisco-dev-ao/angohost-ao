
import React from 'react';
import { ContactProfile } from '@/types/cart';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from '@/components/ui/label';
import { UserCircle } from 'lucide-react';

interface ProfileListProps {
  profiles: ContactProfile[];
  selectedProfileId: string | null;
  onSelectProfile: (id: string) => void;
}

export const ProfileList: React.FC<ProfileListProps> = ({
  profiles,
  selectedProfileId,
  onSelectProfile,
}) => {
  if (profiles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-md border border-dashed">
        <UserCircle className="h-12 w-12 text-gray-400 mb-3" />
        <p className="text-gray-500 mb-4">Você ainda não tem perfis de contato cadastrados</p>
      </div>
    );
  }

  return (
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
  );
};
