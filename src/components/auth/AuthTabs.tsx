
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';
import { 
  checkEmailExists, 
  checkPhoneExists, 
  validateEmail, 
  validatePhone 
} from '@/services/ValidationService';

interface AuthTabsProps {
  defaultMode?: 'login' | 'register';
}

export const AuthTabs: React.FC<AuthTabsProps> = ({ defaultMode = 'login' }) => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'login' | 'register'>(defaultMode);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phone: '',
    nif: '',
    agreeTerms: false
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast.error('Por favor, preencha todos os campos');
      return;
    }
    
    if (!validateEmail(formData.email)) {
      toast.error('Por favor, insira um email válido');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password
      });
      
      if (error) {
        if (error.message.includes('Invalid login')) {
          toast.error('Email ou senha incorretos');
        } else {
          toast.error(error.message);
        }
      } else if (data.user) {
        toast.success('Login realizado com sucesso!');
      }
    } catch (error: any) {
      toast.error(error.message || 'Erro ao fazer login');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validações
    if (!formData.email || !formData.password || !formData.fullName) {
      toast.error('Por favor, preencha todos os campos obrigatórios');
      return;
    }
    
    if (!validateEmail(formData.email)) {
      toast.error('Por favor, insira um email válido');
      return;
    }
    
    if (formData.password.length < 6) {
      toast.error('A senha deve ter pelo menos 6 caracteres');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('As senhas não coincidem');
      return;
    }
    
    if (formData.phone && !validatePhone(formData.phone)) {
      toast.error('Por favor, insira um número de telefone válido');
      return;
    }
    
    if (!formData.agreeTerms) {
      toast.error('Você precisa aceitar os termos e condições');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Check if email already exists
      const emailExists = await checkEmailExists(formData.email);
      if (emailExists) {
        toast.error('Este email já está em uso');
        setIsLoading(false);
        return;
      }
      
      // Check if phone already exists (if provided)
      if (formData.phone) {
        const phoneExists = await checkPhoneExists(formData.phone);
        if (phoneExists) {
          toast.error('Este número de telefone já está em uso');
          setIsLoading(false);
          return;
        }
      }
      
      // Register user
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            phone: formData.phone,
            nif: formData.nif
          }
        }
      });
      
      if (error) {
        toast.error(error.message);
      } else {
        toast.success('Conta criada com sucesso!');
      }
    } catch (error: any) {
      toast.error(error.message || 'Erro ao criar conta');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Tabs value={mode} onValueChange={(value) => setMode(value as 'login' | 'register')} className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="register">Criar Conta</TabsTrigger>
      </TabsList>
      
      <TabsContent value="login">
        <form onSubmit={handleLogin} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="login-email">Email</Label>
            <Input
              id="login-email"
              name="email"
              type="email"
              placeholder="seu@email.com"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="login-password">Senha</Label>
              <a href="#" className="text-sm text-primary hover:underline">
                Esqueceu a senha?
              </a>
            </div>
            <Input
              id="login-password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Entrando...
              </>
            ) : (
              'Entrar'
            )}
          </Button>
        </form>
      </TabsContent>
      
      <TabsContent value="register">
        <form onSubmit={handleRegister} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="register-name">Nome Completo <span className="text-red-500">*</span></Label>
            <Input
              id="register-name"
              name="fullName"
              type="text"
              placeholder="Seu nome completo"
              value={formData.fullName}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="register-email">Email <span className="text-red-500">*</span></Label>
            <Input
              id="register-email"
              name="email"
              type="email"
              placeholder="seu@email.com"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="register-phone">Telefone</Label>
            <Input
              id="register-phone"
              name="phone"
              type="tel"
              placeholder="+244 923 456 789"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="register-nif">NIF</Label>
            <Input
              id="register-nif"
              name="nif"
              type="text"
              placeholder="Número de Identificação Fiscal"
              value={formData.nif}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="register-password">Senha <span className="text-red-500">*</span></Label>
            <Input
              id="register-password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="register-confirm-password">Confirmar Senha <span className="text-red-500">*</span></Label>
            <Input
              id="register-confirm-password"
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="terms" 
              name="agreeTerms"
              checked={formData.agreeTerms}
              onCheckedChange={(checked) => setFormData(prev => ({
                ...prev,
                agreeTerms: checked === true
              }))}
            />
            <Label htmlFor="terms" className="text-sm">
              Eu concordo com os{' '}
              <a href="#" className="text-primary hover:underline">
                Termos e Condições
              </a>
            </Label>
          </div>
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Criando conta...
              </>
            ) : (
              'Criar Conta'
            )}
          </Button>
        </form>
      </TabsContent>
    </Tabs>
  );
};
