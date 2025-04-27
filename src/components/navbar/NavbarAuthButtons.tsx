
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ShoppingCart, User, ShieldCheck } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface NavbarAuthButtonsProps {
  isAuthenticated: boolean;
}

export const NavbarAuthButtons = ({ isAuthenticated }: NavbarAuthButtonsProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { getItemCount } = useCart();
  const cartItemCount = getItemCount();
  const [isAdmin, setIsAdmin] = useState(false);
  
  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const { data } = await supabase.rpc('is_admin');
        setIsAdmin(data === true);
      } catch (error) {
        console.error('Error checking admin status:', error);
      }
    };
    
    if (isAuthenticated) {
      checkAdminStatus();
    } else {
      setIsAdmin(false);
    }
  }, [isAuthenticated]);

  const handleAuthClick = () => {
    const currentPath = location.pathname + location.search;
    sessionStorage.setItem('redirect_after_login', currentPath);
  };
  
  return (
    <div className="hidden lg:flex items-center gap-4">
      <Link to="/carrinho">
        <Button variant="outline" className="flex items-center gap-2 relative">
          <ShoppingCart className="h-4 w-4" />
          <span>Carrinho</span>
          {cartItemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartItemCount}
            </span>
          )}
        </Button>
      </Link>
      {isAuthenticated ? (
        <div className="flex gap-3">
          {isAdmin && (
            <Link to="/admin">
              <Button variant="destructive" className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" />
                <span>Painel Admin</span>
              </Button>
            </Link>
          )}
          <Link to="/dashboard">
            <Button className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>Painel do Cliente</span>
            </Button>
          </Link>
        </div>
      ) : (
        <Link to="/auth" onClick={handleAuthClick}>
          <Button className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>Área do Cliente</span>
          </Button>
        </Link>
      )}
    </div>
  );
};
