
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, User, Mail, Key, Building, MapPin, Phone } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useNifSearch } from '@/hooks/useNifSearch';
import { Customer } from '@/types/cart';

export const RegisterFormEnhanced = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<Customer & { password: string }>({
    name: '',
    email: '',
    phone: '',
    nif: '',
    idNumber: '',
    billingAddress: '',
    city: '',
    country: 'Angola',
    postalCode: '',
    password: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const { isLoading: isNifLoading, error: nifError, fetchNifData } = useNifSearch(setFormData);
  
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar formulário
    if (!formData.nif.trim()) {
      toast.error("O NIF ou BI é obrigatório para criar uma conta");
      return;
    }
    
    if (!formData.email || !formData.password) {
      toast.error("Email e senha são obrigatórios");
      return;
    }
    
    if (formData.phone && !/^9\d{8}$/.test(formData.phone)) {
      toast.error("Número de telefone inválido. Deve ter 9 dígitos e começar com 9");
      return;
    }
    
    try {
      setLoading(true);
      
      // Cadastro com Supabase
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.name,
            nif: formData.nif,
            phone: formData.phone,
            address: formData.billingAddress,
          },
        },
      });
      
      if (error) throw error;
      
      toast.success('Conta criada com sucesso! Verifique seu email.');
    } catch (error: any) {
      toast.error(error.message || 'Erro ao criar conta');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Para validação de telefone
    if (name === 'phone') {
      // Remove caracteres não numéricos
      const numericValue = value.replace(/\D/g, '');
      // Limita a 9 dígitos
      const trimmedValue = numericValue.slice(0, 9);
      setFormData(prev => ({ ...prev, [name]: trimmedValue }));
      return;
    }
    
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Consulta NIF quando preenchido
    if (name === 'nif' && value.trim().length >= 8) {
      fetchNifData(value);
    }
  };
  
  const handleNifBlur = () => {
    if (formData.nif.trim().length >= 8) {
      fetchNifData(formData.nif);
    }
  };

  return (
    <form onSubmit={handleSignUp} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="register-nif">NIF ou BI*</Label>
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

      <div className="space-y-2">
        <Label htmlFor="register-name">Nome Completo*</Label>
        <div className="relative">
          <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="register-name"
            name="name"
            placeholder="Seu nome completo"
            className="pl-10"
            value={formData.name}
            onChange={handleChange}
            readOnly={isNifLoading}
            required
          />
        </div>
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

        <div className="space-y-2">
          <Label htmlFor="register-city">Cidade</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="register-city"
              name="city"
              placeholder="Sua cidade"
              className="pl-10"
              value={formData.city}
              onChange={handleChange}
              readOnly={isNifLoading}
            />
          </div>
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
            readOnly={isNifLoading}
            required
          />
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-primary hover:bg-primary/90 h-12"
        disabled={loading || isNifLoading}
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
            <span>Criando conta...</span>
          </div>
        ) : 'Criar nova conta'}
      </Button>
    </form>
  );
};
