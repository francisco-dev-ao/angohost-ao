
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
  const [isAdmin, setIsAdmin] = useState(false);
  
  useEffect(() => {
    // Check if user is authenticated and has items in cart
    const checkCartAndAuth = async () => {
      if (isAuthenticated) {
        // Check if user is admin
        const { data: adminData } = await supabase.rpc('is_admin');
        setIsAdmin(!!adminData);
        
        // If has items in cart and not an admin, show cart notification
        if (cartItemCount > 0 && !adminData && 
            location.pathname !== '/carrinho' && 
            location.pathname !== '/checkout') {
          // Show toast to redirect to cart
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
      }
    };
    
    checkCartAndAuth();
  }, [isAuthenticated, cartItemCount, location.pathname, navigate]);
  
  const handleAuthClick = () => {
    // Store current path for redirect after login
    const currentPath = location.pathname + location.search;
    sessionStorage.setItem('redirect_after_login', currentPath);
    console.log('NavbarAuthButtons: Saving redirect after login:', currentPath);
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
        <Link to={isAdmin ? "/admin" : "/painel-cliente"}>
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
