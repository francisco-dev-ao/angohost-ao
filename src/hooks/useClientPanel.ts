
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useClientPanel = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);
  const [accountBalance, setAccountBalance] = useState<number | null>(null);

  useEffect(() => {
    const getUserData = async () => {
      try {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          navigate('/auth');
          return;
        }
        
        setUserData(user);
        
        // Fetch customer data for the user
        const { data: customerData } = await supabase
          .from('customers')
          .select('*')
          .eq('user_id', user.id)
          .single();
          
        if (customerData) {
          // Set account balance
          setAccountBalance(254600); // Example balance in Kwanza
        }
        
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
      } finally {
        setLoading(false);
      }
    };

    getUserData();
    
    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        navigate('/auth');
        setUserData(null);
      } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        setUserData(session?.user || null);
      }
    });
    
    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/auth');
      toast.success('Sessão encerrada com sucesso');
    } catch (error) {
      console.error('Erro ao sair:', error);
      toast.error('Erro ao encerrar sessão');
    }
  };

  const addFunds = async (amount: number) => {
    try {
      // In a real app, this would create a payment transaction
      // For demo purposes, we'll just update the state
      setAccountBalance((prev) => (prev || 0) + amount);
      toast.success(`${amount}kz adicionado à sua conta`);
      return true;
    } catch (error) {
      console.error('Erro ao adicionar fundos:', error);
      toast.error('Erro ao processar a transação');
      return false;
    }
  };

  return {
    loading,
    userData,
    accountBalance,
    handleSignOut,
    addFunds
  };
};
