
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const useAdmin = () => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        setLoading(true);
        // Verificar se o usuário está autenticado
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          navigate('/auth');
          return;
        }
        
        // Verificar se o usuário é administrador
        const { data, error } = await supabase.rpc('is_admin');
        
        if (error) {
          console.error('Erro ao verificar status de administrador:', error);
          setIsAdmin(false);
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
      } finally {
        setLoading(false);
      }
    };

    checkAdminStatus();
  }, [navigate]);

  return { isAdmin, loading };
};
