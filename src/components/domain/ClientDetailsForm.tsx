
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ClientDetails {
  name: string;
  responsibleName: string;
  idNumber: string;
  province: string;
  city: string;
  address: string;
  postalCode: string;
  email: string;
  phone: string;
}

interface ClientDetailsFormProps {
  details: ClientDetails;
  onInputChange: (field: keyof ClientDetails, value: string) => void;
}

export const ClientDetailsForm: React.FC<ClientDetailsFormProps> = ({
  details,
  onInputChange,
}) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      <div>
        <Label htmlFor="name">Nome do Perfil</Label>
        <Input
          id="name"
          value={details.name}
          onChange={(e) => onInputChange('name', e.target.value)}
          placeholder="Nome da empresa ou pessoa física"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="responsibleName">Nome do Responsável</Label>
          <Input
            id="responsibleName"
            value={details.responsibleName}
            onChange={(e) => onInputChange('responsibleName', e.target.value)}
            placeholder="Nome do responsável"
          />
        </div>
        <div>
          <Label htmlFor="idNumber">Nº de Bilhete de Identidade</Label>
          <Input
            id="idNumber"
            value={details.idNumber}
            onChange={(e) => onInputChange('idNumber', e.target.value)}
            placeholder="Número do BI"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="province">Província</Label>
          <Input
            id="province"
            value={details.province}
            onChange={(e) => onInputChange('province', e.target.value)}
            placeholder="Província"
          />
        </div>
        <div>
          <Label htmlFor="city">Cidade</Label>
          <Input
            id="city"
            value={details.city}
            onChange={(e) => onInputChange('city', e.target.value)}
            placeholder="Cidade"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="address">Endereço</Label>
          <Input
            id="address"
            value={details.address}
            onChange={(e) => onInputChange('address', e.target.value)}
            placeholder="Endereço completo"
          />
        </div>
        <div>
          <Label htmlFor="postalCode">Código Postal</Label>
          <Input
            id="postalCode"
            value={details.postalCode}
            onChange={(e) => onInputChange('postalCode', e.target.value)}
            placeholder="Código postal"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={details.email}
            onChange={(e) => onInputChange('email', e.target.value)}
            placeholder="Email de contato"
          />
        </div>
        <div>
          <Label htmlFor="phone">Telemóvel</Label>
          <Input
            id="phone"
            type="tel"
            value={details.phone}
            onChange={(e) => onInputChange('phone', e.target.value)}
            placeholder="Número de telemóvel"
          />
        </div>
      </div>
    </div>
  );
};
