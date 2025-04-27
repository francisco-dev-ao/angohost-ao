
import React, { useEffect } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { AuthContainer } from '@/components/auth/AuthContainer';
import { AuthTabs } from '@/components/auth/AuthTabs';
import { toast } from 'sonner';
import { useCart } from '@/context/CartContext';

const Auth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { items } = useCart();
  const defaultMode = searchParams.get('mode') === 'register' ? 'register' : 'login';
  
  useEffect(() => {
    // Salvar o caminho atual se não tiver um redirecionamento já definido e tiver state.from
    if (!sessionStorage.getItem('redirect_after_login') && location.state?.from) {
      sessionStorage.setItem('redirect_after_login', location.state.from);
      console.log('Auth: Salvando redirecionamento da navegação:', location.state.from);
    }
    
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        // Verificar se é administrador
        const { data: isAdmin } = await supabase.rpc('is_admin');
        
        // Obtém o URL de redirecionamento armazenado
        const redirectUrl = sessionStorage.getItem('redirect_after_login');
        console.log('Auth: Redirecionando após login para:', redirectUrl);
        
        // Verificar se tem itens no carrinho
        const hasItemsInCart = items && items.length > 0;
        
        sessionStorage.removeItem('redirect_after_login');
        
        if (isAdmin) {
          // Administradores sempre vão para o painel admin
          navigate('/admin');
          toast.success('Bem-vindo ao painel administrativo!');
        } else {
          // Para clientes regulares
          if (redirectUrl && redirectUrl !== '/admin') {
            // Se houver um redirecionamento específico (exceto admin), use-o
            navigate(redirectUrl);
          } else if (hasItemsInCart) {
            // Se tiver itens no carrinho, redirecione para finalizar a compra
            toast.info("Você tem itens no carrinho! Redirecionando para finalizar sua compra.");
            navigate('/carrinho');
          } else {
            // Caso contrário, vá para o painel do cliente
            navigate('/painel-cliente');
          }
        }
      }
    };
    
    checkSession();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          // Verificar se é administrador
          const { data: isAdmin } = await supabase.rpc('is_admin');
          
          // Obtém o URL de redirecionamento armazenado
          const redirectUrl = sessionStorage.getItem('redirect_after_login');
          console.log('Auth: Redirecionamento após mudança de auth state para:', redirectUrl);
          
          // Verificar se tem itens no carrinho
          const hasItemsInCart = items && items.length > 0;
          
          sessionStorage.removeItem('redirect_after_login');
          
          if (isAdmin) {
            // Administradores sempre vão para o painel admin
            navigate('/admin');
            toast.success('Bem-vindo ao painel administrativo!');
          } else {
            // Para clientes regulares
            if (redirectUrl && redirectUrl !== '/admin') {
              // Se houver um redirecionamento específico (exceto admin), use-o
              navigate(redirectUrl);
            } else if (hasItemsInCart) {
              // Se tiver itens no carrinho, redirecione para finalizar a compra
              toast.info("Você tem itens no carrinho! Redirecionando para finalizar sua compra.");
              navigate('/carrinho');
            } else {
              // Caso contrário, vá para o painel do cliente
              navigate('/painel-cliente');
            }
          }
        }
      }
    );
    
    return () => subscription.unsubscribe();
  }, [navigate, location, items]);
  
  return (
    <AuthContainer>
      <AuthTabs defaultMode={defaultMode} />
    </AuthContainer>
  );
};

export default Auth;
