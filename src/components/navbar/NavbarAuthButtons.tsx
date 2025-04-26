
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ShoppingCart, User } from 'lucide-react';

interface NavbarAuthButtonsProps {
  isAuthenticated: boolean;
}

export const NavbarAuthButtons = ({ isAuthenticated }: NavbarAuthButtonsProps) => {
  const location = useLocation();
  
  const handleAuthClick = () => {
    // Guarda o caminho atual completo, incluindo a rota e query params
    sessionStorage.setItem('redirect_after_login', location.pathname + location.search);
    console.log('Salvando redirecionamento após login:', location.pathname + location.search);
  };
  
  return (
    <div className="hidden lg:flex items-center gap-4">
      <Link to="/carrinho">
        <Button variant="outline" className="flex items-center gap-2">
          <ShoppingCart className="h-4 w-4" />
          <span>Carrinho</span>
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
