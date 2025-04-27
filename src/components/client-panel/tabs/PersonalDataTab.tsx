
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Save } from 'lucide-react';
import { BasicInfoSection } from './personal-data/BasicInfoSection';
import { ContactSection } from './personal-data/ContactSection';
import { IdentificationSection } from './personal-data/IdentificationSection';
import { AddressSection } from './personal-data/AddressSection';

interface PersonalDataTabProps {
  userData: any;
}

export const PersonalDataTab = ({ userData }: PersonalDataTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Dados Pessoais</CardTitle>
        <CardDescription>Atualize suas informações pessoais</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <BasicInfoSection userData={userData} />
          <ContactSection userData={userData} />
          <IdentificationSection userData={userData} />
          <AddressSection userData={userData} />
          
          <Button>
            <Save className="h-4 w-4 mr-2" />
            Salvar Alterações
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
