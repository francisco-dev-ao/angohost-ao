
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Save } from 'lucide-react';
import { BasicInfoSection } from './personal-data/BasicInfoSection';
import { ContactSection } from './personal-data/ContactSection';
import { IdentificationSection } from './personal-data/IdentificationSection';
import { AddressSection } from './personal-data/AddressSection';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface PersonalDataTabProps {
  userData: any;
}

export const PersonalDataTab = ({ userData }: PersonalDataTabProps) => {
  const [userFormData, setUserFormData] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    if (userData) {
      setUserFormData({
        ...userData?.user_metadata,
        email: userData?.email
      });
    }
  }, [userData]);
  
  const handleInputChange = (field: string, value: string) => {
    setUserFormData({
      ...userFormData,
      [field]: value
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Update user metadata
      const { error: updateError } = await supabase.auth.updateUser({
        email: userFormData.email,
        data: {
          full_name: userFormData.full_name,
          phone: userFormData.phone,
          nif: userFormData.nif,
          id_number: userFormData.id_number,
          billing_address: userFormData.billing_address,
          city: userFormData.city,
          country: userFormData.country || 'Angola',
        }
      });
      
      if (updateError) throw updateError;
      
      // Update customer information in the database
      const { data: customerData } = await supabase
        .from('customers')
        .select('id')
        .eq('user_id', userData.id)
        .single();
      
      if (customerData) {
        const { error: customerUpdateError } = await supabase
          .from('customers')
          .update({
            name: userFormData.full_name,
            email: userFormData.email,
            phone: userFormData.phone,
            nif: userFormData.nif,
            id_number: userFormData.id_number,
            billing_address: userFormData.billing_address,
            city: userFormData.city,
            country: userFormData.country || 'Angola'
          })
          .eq('id', customerData.id);
          
        if (customerUpdateError) throw customerUpdateError;
      }
      
      toast.success('Dados atualizados com sucesso!');
    } catch (error) {
      console.error('Error updating user data:', error);
      toast.error('Erro ao atualizar dados. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dados Pessoais</CardTitle>
        <CardDescription>Atualize suas informações pessoais</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <BasicInfoSection 
            userData={userData} 
            formData={userFormData}
            onInputChange={handleInputChange}
          />
          <ContactSection 
            userData={userData}
            formData={userFormData}
            onInputChange={handleInputChange}
          />
          <IdentificationSection 
            userData={userData}
            formData={userFormData}
            onInputChange={handleInputChange}
          />
          <AddressSection 
            userData={userData}
            formData={userFormData}
            onInputChange={handleInputChange}
          />
          
          <Button type="submit" disabled={isLoading}>
            <Save className="h-4 w-4 mr-2" />
            {isLoading ? 'Salvando...' : 'Salvar Alterações'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
