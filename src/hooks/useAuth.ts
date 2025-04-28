
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  avatar_url?: string | null;
};

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Verificar autenticação ao carregar o componente
  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session?.user) {
        setUser({
          id: data.session.user.id,
          email: data.session.user.email || '',
          name: data.session.user.user_metadata?.full_name || '',
          avatar_url: data.session.user.user_metadata?.avatar_url
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    };
    
    checkAuth();

    // Listener para mudanças de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email || '',
          name: session.user.user_metadata?.full_name || '',
          avatar_url: session.user.user_metadata?.avatar_url
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Login
  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error || !data.user) {
        toast({
          title: "Erro no login",
          description: error?.message || "Credenciais inválidas",
          variant: "destructive"
        });
        return false;
      }
      
      toast({
        title: "Login bem-sucedido",
        description: `Bem-vindo!`
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
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name
          }
        }
      });
      
      if (error || !data.user) {
        toast({
          title: "Erro no registro",
          description: error?.message || "Não foi possível criar sua conta",
          variant: "destructive"
        });
        return false;
      }
      
      toast({
        title: "Registro bem-sucedido",
        description: `Conta criada! Por favor, verifique seu email.`
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
  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logout realizado",
      description: "Você saiu da sua conta"
    });
  }, [toast]);

  // Atualizar dados do usuário
  const updateUser = useCallback(async (data: Partial<AuthUser>) => {
    if (!user) return false;
    
    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          full_name: data.name || user.name
        }
      });
      
      if (error) {
        toast({
          title: "Erro na atualização",
          description: error.message || "Não foi possível atualizar os dados",
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
