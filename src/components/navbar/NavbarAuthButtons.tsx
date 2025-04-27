
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ShoppingCart, User } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useUser } from '@/hooks/useUser';

export const NavbarAuthButtons = () => {
  const location = useLocation();
  const { getItemCount } = useCart();
  const { user, isAdmin } = useUser();
  const cartItemCount = getItemCount();
  
  const handleAuthClick = () => {
    const currentPath = location.pathname + location.search;
    sessionStorage.setItem('redirect_after_login', currentPath);
  };
  
  const getPanelRoute = () => {
    return isAdmin ? '/admin' : '/painel-cliente';
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
      {user ? (
        <Link to={getPanelRoute()}>
          <Button className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>{isAdmin ? 'Painel Admin' : 'Painel do Cliente'}</span>
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
