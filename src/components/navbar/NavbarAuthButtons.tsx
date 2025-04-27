
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ShoppingCart, User } from 'lucide-react';
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
  const [shouldRedirect, setShouldRedirect] = useState(false);
  
  useEffect(() => {
    // Verificar se o usuário está autenticado e tem itens no carrinho
    const checkCartAndAuth = async () => {
      if (isAuthenticated && cartItemCount > 0 && location.pathname !== '/carrinho' && location.pathname !== '/checkout') {
        // Exibir toast para redirecionar ao carrinho
        toast.info(
          "Você tem itens no carrinho! Finalize sua compra.",
          {
            action: {
              label: "Ir para carrinho",
              onClick: () => navigate('/carrinho')
            },
            duration: 5000,
          }
        );
        
        setShouldRedirect(true);
      }
    };
    
    checkCartAndAuth();
  }, [isAuthenticated, cartItemCount, location.pathname, navigate]);
  
  const handleAuthClick = () => {
    // Guarda o caminho atual completo, incluindo a rota e query params
    const currentPath = location.pathname + location.search;
    sessionStorage.setItem('redirect_after_login', currentPath);
    console.log('NavbarAuthButtons: Salvando redirecionamento após login:', currentPath);
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
        <Link to="/dashboard">
          <Button className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>Painel do Cliente</span>
          </Button>
        </Link>
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
