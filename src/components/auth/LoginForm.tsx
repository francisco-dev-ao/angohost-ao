
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Mail, Key } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [resetPassword, setResetPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      toast.success('Login realizado com sucesso!');
      const redirectUrl = sessionStorage.getItem('redirect_after_login') || '/dashboard';
      sessionStorage.removeItem('redirect_after_login');
      navigate(redirectUrl);
    } catch (error: any) {
      toast.error(error.message || 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) throw error;
      
      toast.success('Instruções para redefinir sua senha foram enviadas para seu email');
      setResetPassword(false);
    } catch (error: any) {
      toast.error(error.message || 'Erro ao solicitar redefinição de senha');
    } finally {
      setLoading(false);
    }
  };

  if (resetPassword) {
    return (
      <form onSubmit={handleResetPassword} className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="reset-email">Email</Label>
            <Button 
              type="button" 
              variant="link" 
              size="sm" 
              className="p-0 h-auto font-normal"
              onClick={() => setResetPassword(false)}
            >
              Voltar ao Login
            </Button>
          </div>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="reset-email"
              placeholder="seu.email@exemplo.com"
              type="email"
              className="pl-10"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>
        
        <Button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90 h-12"
          disabled={loading}
        >
          {loading ? 'Processando...' : 'Enviar instruções de redefinição'}
        </Button>
        
        <p className="text-sm text-center text-muted-foreground">
          Enviaremos um link para redefinir sua senha para o email fornecido.
        </p>
      </form>
    );
  }

  return (
    <form onSubmit={handleLogin} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="login-email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="login-email"
            placeholder="seu.email@exemplo.com"
            type="email"
            className="pl-10"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="login-password">Senha</Label>
          <Button 
            type="button" 
            variant="link" 
            size="sm" 
            className="p-0 h-auto font-normal"
            onClick={() => setResetPassword(true)}
          >
            Esqueceu a senha?
          </Button>
        </div>
        <div className="relative">
          <Key className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="login-password"
            placeholder="********"
            type={showPassword ? "text" : "password"}
            className="pl-10 pr-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
      
      <Button
        type="submit"
        className="w-full bg-primary hover:bg-primary/90 h-12"
        disabled={loading}
      >
        {loading ? 'Entrando...' : 'Entrar na minha conta'}
      </Button>
    </form>
  );
};
