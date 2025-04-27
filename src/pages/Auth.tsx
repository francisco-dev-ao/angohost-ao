
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { AuthContainer } from '@/components/auth/AuthContainer';
import { AuthTabs } from '@/components/auth/AuthTabs';
import { toast } from 'sonner';
import { useCart } from '@/context/CartContext';

const Auth = () => {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
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
      try {
        const { data } = await supabase.auth.getSession();
        if (data.session) {
          // Check if user is admin
          const { data: adminData, error: adminError } = await supabase.rpc('is_admin');
          const isAdmin = !adminError && adminData === true;
          
          // Obtém o URL de redirecionamento armazenado ou usa o painel do cliente como fallback
          const redirectUrl = sessionStorage.getItem('redirect_after_login') || (isAdmin ? '/admin' : '/painel-cliente');
          console.log('Auth: Redirecionando após login para:', redirectUrl);
          
          // Verificar se tem itens no carrinho para redirecionar para o carrinho
          const hasItemsInCart = items && items.length > 0;
          
          sessionStorage.removeItem('redirect_after_login');
          
          if ((redirectUrl === '/painel-cliente' || redirectUrl === '/dashboard') && hasItemsInCart) {
            toast.info("Você tem itens no carrinho! Redirecionando para finalizar sua compra.");
            navigate('/carrinho');
          } else if (isAdmin && (redirectUrl === '/painel-cliente' || redirectUrl === '/dashboard')) {
            navigate('/admin'); // Redirect admins to admin dashboard
          } else if (!isAdmin && redirectUrl === '/admin') {
            navigate('/painel-cliente'); // Redirect non-admins away from admin
          } else {
            navigate(redirectUrl);
          }
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error checking session:', error);
        setIsLoading(false);
      }
    };
    
    checkSession();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          // Check if user is admin
          const { data: adminData, error: adminError } = await supabase.rpc('is_admin');
          const isAdmin = !adminError && adminData === true;
          
          // Obtém o URL de redirecionamento armazenado ou usa o painel do cliente como fallback
          const redirectUrl = sessionStorage.getItem('redirect_after_login') || (isAdmin ? '/admin' : '/painel-cliente');
          console.log('Auth: Redirecionamento após mudança de auth state para:', redirectUrl);
          
          // Verificar se tem itens no carrinho para redirecionar para o carrinho
          const hasItemsInCart = items && items.length > 0;
          
          sessionStorage.removeItem('redirect_after_login');
          
          if ((redirectUrl === '/painel-cliente' || redirectUrl === '/dashboard') && hasItemsInCart) {
            toast.info("Você tem itens no carrinho! Redirecionando para finalizar sua compra.");
            navigate('/carrinho');
          } else if (isAdmin && (redirectUrl === '/painel-cliente' || redirectUrl === '/dashboard')) {
            navigate('/admin'); // Redirect admins to admin dashboard
          } else if (!isAdmin && redirectUrl === '/admin') {
            navigate('/painel-cliente'); // Redirect non-admins away from admin
          } else {
            navigate(redirectUrl);
          }
        }
      }
    );
    
    return () => subscription.unsubscribe();
  }, [navigate, location, items]);
  
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Carregando...</div>;
  }
  
  return (
    <AuthContainer>
      <AuthTabs defaultMode={defaultMode} />
    </AuthContainer>
  );
};

export default Auth;
