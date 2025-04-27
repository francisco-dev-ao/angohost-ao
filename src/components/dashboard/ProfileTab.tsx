
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User as SupabaseUser } from '@supabase/supabase-js';
import { ContactProfilesList } from '../client-panel/ContactProfilesList';
import { PasswordChangeTab } from './PasswordChangeTab';
import { UserDataDisplay } from './profile/UserDataDisplay';
import { UserDataForm } from './profile/UserDataForm';
import { PaymentMethodsCard } from './profile/PaymentMethodsCard';

interface ProfileTabProps {
  user: SupabaseUser | null;
}

export const ProfileTab = ({ user }: ProfileTabProps) => {
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    fullName: user?.user_metadata?.full_name || '',
    phone: user?.user_metadata?.phone || '',
    address: user?.user_metadata?.billing_address || '',
    city: user?.user_metadata?.city || '',
    nif: user?.user_metadata?.nif || ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      // Implement update logic here
      setEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Meus Dados</CardTitle>
              <CardDescription>Gerencie suas informações pessoais</CardDescription>
            </div>
            {!editing ? (
              <Button variant="outline" onClick={() => setEditing(true)}>
                Editar Perfil
              </Button>
            ) : (
              <Button variant="outline" onClick={() => setEditing(false)}>
                Cancelar
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {!editing ? (
            <UserDataDisplay user={user} />
          ) : (
            <UserDataForm 
              userData={userData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              loading={loading}
            />
          )}
        </CardContent>
      </Card>
      
      <div className="space-y-6">
        <PaymentMethodsCard />
        <PasswordChangeTab />
      </div>

      <div className="md:col-span-2">
        <ContactProfilesList />
      </div>
    </div>
  );
};
