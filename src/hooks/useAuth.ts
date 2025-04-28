
import { useState, useEffect, useCallback } from 'react';
import AuthService, { AuthUser } from '@/services/AuthService';
import { useToast } from '@/hooks/use-toast';

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Verificar autenticação ao carregar o componente
  useEffect(() => {
    const session = AuthService.getSession();
    setUser(session?.user || null);
    setLoading(false);
  }, []);

  // Login
  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    try {
      const { user, error } = await AuthService.login(email, password);
      
      if (error || !user) {
        toast({
          title: "Erro no login",
          description: error || "Credenciais inválidas",
          variant: "destructive"
        });
        setUser(null);
        return false;
      }
      
      setUser(user);
      toast({
        title: "Login bem-sucedido",
        description: `Bem-vindo, ${user.name}!`
      });
      return true;
    } catch (err: any) {
      toast({
        title: "Erro no login",
        description: err.message || "Ocorreu um problema durante o login",
        variant: "destructive"
      });
      return false;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  // Registro
  const register = useCallback(async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      const { user, error } = await AuthService.register(name, email, password);
      
      if (error || !user) {
        toast({
          title: "Erro no registro",
          description: error || "Não foi possível criar sua conta",
          variant: "destructive"
        });
        return false;
      }
      
      setUser(user);
      toast({
        title: "Registro bem-sucedido",
        description: `Bem-vindo, ${user.name}!`
      });
      return true;
    } catch (err: any) {
      toast({
        title: "Erro no registro",
        description: err.message || "Ocorreu um problema durante o registro",
        variant: "destructive"
      });
      return false;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  // Logout
  const logout = useCallback(() => {
    AuthService.logout();
    setUser(null);
    toast({
      title: "Logout realizado",
      description: "Você saiu da sua conta"
    });
  }, [toast]);

  // Atualizar dados do usuário
  const updateUser = useCallback(async (data: Partial<AuthUser>) => {
    if (!user) return false;
    
    try {
      const { success, error } = await AuthService.updateUser(user.id, data);
      
      if (!success) {
        toast({
          title: "Erro na atualização",
          description: error || "Não foi possível atualizar os dados",
          variant: "destructive"
        });
        return false;
      }
      
      // Atualizar estado do usuário
      setUser(prev => prev ? { ...prev, ...data } : null);
      
      toast({
        title: "Dados atualizados",
        description: "Suas informações foram atualizadas com sucesso"
      });
      
      return true;
    } catch (err: any) {
      toast({
        title: "Erro na atualização",
        description: err.message || "Ocorreu um problema ao atualizar os dados",
        variant: "destructive"
      });
      return false;
    }
  }, [user, toast]);

  return {
    user,
    loading,
    login,
    register,
    logout,
    updateUser,
    isAuthenticated: !!user
  };
}

export default useAuth;
