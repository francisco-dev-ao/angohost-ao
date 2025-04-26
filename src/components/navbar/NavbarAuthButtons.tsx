
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

interface NavbarAuthButtonsProps {
  isAuthenticated: boolean;
}

export const NavbarAuthButtons = ({ isAuthenticated }: NavbarAuthButtonsProps) => {
  return (
    <div className="hidden lg:flex items-center gap-4">
      <Link to="/carrinho">
        <Button variant="outline">Carrinho</Button>
      </Link>
      {isAuthenticated ? (
        <Link to="/dashboard">
          <Button>Painel do Cliente</Button>
        </Link>
      ) : (
        <Link to="/auth">
          <Button>Área do Cliente</Button>
        </Link>
      )}
    </div>
  );
};
