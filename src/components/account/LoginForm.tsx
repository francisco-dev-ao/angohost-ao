
import React, { useState } from 'react';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Loader2, Mail, Key } from 'lucide-react';

interface LoginFormProps {
  onSuccess?: (mode: 'login') => void;
}

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Login realizado com sucesso!');
      
      if (onSuccess) {
        onSuccess('login');
      }
    }, 1500);
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <div>
        <Label htmlFor="login-email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input 
            id="login-email" 
            name="email" 
            type="email" 
            placeholder="seu.email@exemplo.com" 
            className="pl-10"
            value={loginData.email}
            onChange={handleLoginChange}
            required
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="login-password">Senha</Label>
        <div className="relative">
          <Key className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input 
            id="login-password" 
            name="password" 
            type="password" 
            placeholder="Sua senha" 
            className="pl-10"
            value={loginData.password}
            onChange={handleLoginChange}
            required
          />
        </div>
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-primary hover:bg-primary/90" 
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processando...
          </>
        ) : 'Entrar'}
      </Button>
    </form>
  );
};
