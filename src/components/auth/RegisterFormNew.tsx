
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, User, Mail, Key, Building, MapPin, Phone } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useNifSearch } from '@/hooks/useNifSearch';
import { Customer } from '@/types/cart';
import { Card, CardContent } from '@/components/ui/card';

interface RegisterFormData extends Customer {
  password: string;
}

export const RegisterFormNew = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [formData, setFormData] = useState<RegisterFormData>({
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
  const [companyName, setCompanyName] = useState('');
  
  const { isLoading: isNifLoading, error: nifError, fetchNifData } = useNifSearch((data) => {
    if (data) {
      setFormData(prev => ({
        ...prev,
        name: data.name || data.nome || prev.name,
        billingAddress: data.address || data.endereco || prev.billingAddress,
      }));
      setCompanyName(data.name || data.nome || companyName);
    }
  });

  // Get redirect URL from session storage
  useEffect(() => {
    const getRedirectUrl = () => {
      return sessionStorage.getItem('redirect_after_login') || '/dashboard';
    };

    console.log('Redirect URL after login will be:', getRedirectUrl());
  }, []);

  // Check for existing account
  const checkExistingAccount = async (field: string, value: string): Promise<boolean> => {
    try {
      if (field === 'email') {
        const { data } = await supabase.auth.signInWithOtp({
          email: value,
          options: { shouldCreateUser: false }
        });
        return !!data.session;
      } else {
        const { data } = await supabase
          .from('customers')
          .select('id')
          .eq(field, value)
          .limit(1);
        return !!data && data.length > 0;
      }
    } catch (error) {
      console.error(`Error checking existing ${field}:`, error);
      return false;
    }
  };
  
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
      
      // Check for duplicate email
      const emailExists = await checkExistingAccount('email', formData.email);
      if (emailExists) {
        toast.error("Este email já está registrado no sistema");
        setLoading(false);
        return;
      }

      // Check for duplicate phone
      const phoneExists = await checkExistingAccount('phone', formData.phone);
      if (phoneExists) {
        toast.error("Este número de telefone já está registrado no sistema");
        setLoading(false);
        return;
      }

      // Check for duplicate NIF
      const nifExists = await checkExistingAccount('nif', formData.nif);
      if (nifExists) {
        toast.error("Este NIF já está registrado no sistema");
        setLoading(false);
        return;
      }
      
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
            company_name: companyName
          },
        },
      });
      
      if (error) throw error;
      
      toast.success('Conta criada com sucesso! Verifique seu email.');
      
      // Redirecionar para a página anterior (carrinho se estiver)
      const redirectUrl = sessionStorage.getItem('redirect_after_login');
      if (redirectUrl) {
        console.log('Redirecionando após registro para:', redirectUrl);
        navigate(redirectUrl);
        sessionStorage.removeItem('redirect_after_login');
      } else {
        navigate('/dashboard');
      }
      
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
  };
  
  const handleNifBlur = () => {
    if (formData.nif.trim().length >= 8) {
      fetchNifData(formData.nif);
    }
  };

  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-8">
        <h4 className="text-xl font-bold mb-2">Criar nova conta</h4>
        <p className="mb-6 text-gray-500 text-sm">Por favor, insira seus dados</p>

        <form onSubmit={handleSignUp} className="space-y-4">
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
                  readOnly={isNifLoading}
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
                readOnly={isNifLoading}
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-4 mt-6">
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
            
            <Button 
              type="button" 
              variant="outline"
              className="w-full h-12"
              onClick={() => navigate('/auth?mode=login')}
            >
              Entrar na minha conta
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
