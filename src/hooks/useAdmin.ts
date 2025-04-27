
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const useAdmin = () => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        setLoading(true);
        // Verificar se o usuário está autenticado
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          // Salvar rota atual para redirecionamento após login
          sessionStorage.setItem('redirect_after_login', '/admin');
          toast.error('Você precisa estar autenticado para acessar a área administrativa');
          navigate('/auth');
          return;
        }
        
        setUser(user);
        
        // Verificar se o usuário é administrador
        const { data, error } = await supabase.rpc('is_admin');
        
        if (error) {
          console.error('Erro ao verificar status de administrador:', error);
          setIsAdmin(false);
          toast.error('Erro ao verificar permissões de administrador');
          navigate('/dashboard');
        } else {
          setIsAdmin(data);
          
          // Redirecionar se não for administrador
          if (!data) {
            toast.error('Acesso restrito a administradores');
            navigate('/dashboard');
          }
        }
      } catch (error) {
        console.error('Erro ao verificar permissões:', error);
        setIsAdmin(false);
        toast.error('Erro ao verificar permissões de administrador');
        navigate('/dashboard');
      } finally {
        setLoading(false);
      }
    };

    checkAdminStatus();
    
    // Escutar mudanças na autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event) => {
        if (event === 'SIGNED_OUT') {
          setIsAdmin(false);
          setUser(null);
          navigate('/auth');
        } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          // Revalidar status de admin
          checkAdminStatus();
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate]);

  return { isAdmin, loading, user };
};
