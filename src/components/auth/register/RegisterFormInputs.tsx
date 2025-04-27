
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, User, Mail, Key, Building, MapPin, Phone } from 'lucide-react';
import { RegisterFormData } from '@/hooks/useRegisterForm';

interface RegisterFormInputsProps {
  formData: RegisterFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  isNifLoading: boolean;
  nifError: string | null;
  handleNifBlur: () => void;
}

export const RegisterFormInputs: React.FC<RegisterFormInputsProps> = ({
  formData,
  handleChange,
  showPassword,
  setShowPassword,
  isNifLoading,
  nifError,
  handleNifBlur
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="register-nif">NIF ou B.I*</Label>
        <div className="relative">
          <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="register-nif"
            name="nif"
            placeholder="NIF ou Bilhete de Identidade"
            className="pl-10"
            value={formData.nif}
            onChange={handleChange}
            onBlur={handleNifBlur}
            maxLength={14}
            required
          />
        </div>
        <p className="text-xs text-gray-500">
          Ao informar o NIF, preencheremos alguns campos automaticamente.
        </p>
        
        {isNifLoading && (
          <div className="flex items-center gap-2 mt-2">
            <div className="h-3 w-3 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
            <span className="text-xs text-gray-500">Consultando seus dados...</span>
          </div>
        )}
        
        {nifError && (
          <p className="text-xs text-red-500">{nifError}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="register-email">Email*</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="register-email"
              name="email"
              type="email"
              placeholder="nome@exemplo.ao"
              className="pl-10"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="register-password">Senha*</Label>
          <div className="relative">
            <Key className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="register-password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Crie uma senha"
              className="pl-10 pr-10"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button 
              type="button"
              className="absolute right-3 top-3 text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="register-name">Nome Fiscal*</Label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="register-name"
              name="name"
              placeholder="Nome completo ou nome da empresa"
              className="pl-10"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="register-phone">Telefone*</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="register-phone"
              name="phone"
              placeholder="Telefone"
              className="pl-10"
              value={formData.phone}
              onChange={handleChange}
              pattern="9[0-9]{8}"
              maxLength={9}
              title="O número deve ter 9 dígitos e começar com 9"
              required
            />
          </div>
          <p className="text-xs text-gray-500">
            O número deve ter 9 dígitos e começar com 9
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="register-address">Endereço*</Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="register-address"
            name="billingAddress"
            placeholder="Seu endereço completo"
            className="pl-10"
            value={formData.billingAddress}
            onChange={handleChange}
            required
          />
        </div>
      </div>
    </div>
  );
};
