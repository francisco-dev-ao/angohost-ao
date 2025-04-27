
import React from 'react';
import { User, Mail, Phone, Home, MapPin, FileText } from 'lucide-react';
import { User as SupabaseUser } from '@supabase/supabase-js';

interface UserDataDisplayProps {
  user: SupabaseUser | null;
}

export const UserDataDisplay = ({ user }: UserDataDisplayProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3">
        <User className="h-5 w-5 text-gray-500 mt-0.5" />
        <div>
          <p className="font-medium">Nome Completo</p>
          <p className="text-gray-600">{user?.user_metadata?.full_name || 'Não informado'}</p>
        </div>
      </div>
      <div className="flex items-start gap-3">
        <Mail className="h-5 w-5 text-gray-500 mt-0.5" />
        <div>
          <p className="font-medium">Email</p>
          <p className="text-gray-600">{user?.email}</p>
        </div>
      </div>
      <div className="flex items-start gap-3">
        <Phone className="h-5 w-5 text-gray-500 mt-0.5" />
        <div>
          <p className="font-medium">Telefone</p>
          <p className="text-gray-600">{user?.user_metadata?.phone || 'Não informado'}</p>
        </div>
      </div>
      <div className="flex items-start gap-3">
        <Home className="h-5 w-5 text-gray-500 mt-0.5" />
        <div>
          <p className="font-medium">Endereço de Cobrança</p>
          <p className="text-gray-600">{user?.user_metadata?.billing_address || 'Não informado'}</p>
        </div>
      </div>
      <div className="flex items-start gap-3">
        <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
        <div>
          <p className="font-medium">Cidade</p>
          <p className="text-gray-600">{user?.user_metadata?.city || 'Não informado'}</p>
        </div>
      </div>
      <div className="flex items-start gap-3">
        <FileText className="h-5 w-5 text-gray-500 mt-0.5" />
        <div>
          <p className="font-medium">NIF</p>
          <p className="text-gray-600">{user?.user_metadata?.nif || 'Não informado'}</p>
        </div>
      </div>
    </div>
  );
};
