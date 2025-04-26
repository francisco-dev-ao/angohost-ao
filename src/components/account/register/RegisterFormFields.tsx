
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Building, User, Mail, Key, MapPin, Phone } from 'lucide-react';
import { Customer } from '@/types/cart';

interface RegisterFormFieldsProps {
  registerData: Customer & { password: string };
  handleRegisterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const RegisterFormFields: React.FC<RegisterFormFieldsProps> = ({
  registerData,
  handleRegisterChange,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label htmlFor="register-nif">NIF (Número de Contribuinte)*</Label>
        <div className="relative">
          <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input 
            id="register-nif" 
            name="nif" 
            placeholder="Insira seu NIF" 
            className="pl-10"
            value={registerData.nif}
            onChange={handleRegisterChange}
            required
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="register-name">Nome Completo*</Label>
        <div className="relative">
          <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input 
            id="register-name" 
            name="name" 
            placeholder="Seu nome completo" 
            className="pl-10"
            value={registerData.name}
            onChange={handleRegisterChange}
            required
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="register-email">Email*</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input 
            id="register-email" 
            name="email" 
            type="email" 
            placeholder="seu.email@exemplo.com" 
            className="pl-10"
            value={registerData.email}
            onChange={handleRegisterChange}
            required
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="register-phone">Telefone*</Label>
        <div className="relative">
          <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input 
            id="register-phone" 
            name="phone" 
            placeholder="Seu número de telefone" 
            className="pl-10"
            value={registerData.phone}
            onChange={handleRegisterChange}
            required
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="register-idnumber">Nº de Bilhete de Identidade</Label>
        <Input 
          id="register-idnumber" 
          name="idNumber" 
          placeholder="Seu BI" 
          value={registerData.idNumber}
          onChange={handleRegisterChange}
        />
      </div>
      
      <div>
        <Label htmlFor="register-city">Cidade*</Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input 
            id="register-city" 
            name="city" 
            placeholder="Sua cidade" 
            className="pl-10"
            value={registerData.city}
            onChange={handleRegisterChange}
            required
          />
        </div>
      </div>
      
      <div className="md:col-span-2">
        <Label htmlFor="register-address">Endereço*</Label>
        <Input 
          id="register-address" 
          name="billingAddress" 
          placeholder="Seu endereço completo" 
          value={registerData.billingAddress}
          onChange={handleRegisterChange}
          required
        />
      </div>
      
      <div>
        <Label htmlFor="register-password">Senha*</Label>
        <div className="relative">
          <Key className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input 
            id="register-password" 
            name="password" 
            type="password" 
            placeholder="Crie uma senha" 
            className="pl-10"
            value={registerData.password}
            onChange={handleRegisterChange}
            required
          />
        </div>
      </div>
    </div>
  );
};
