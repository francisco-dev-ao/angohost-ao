
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { User, LogOut, ShoppingCart } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useCart } from '@/context/CartContext';

interface NavbarAuthButtonsProps {
  isAuthenticated: boolean;
}

export const NavbarAuthButtons: React.FC<NavbarAuthButtonsProps> = ({ isAuthenticated }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const { items } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      const checkAdminStatus = async () => {
        const { data, error } = await supabase.rpc('is_admin');
        if (!error && data === true) {
          setIsAdmin(true);
        }
      };
      
      checkAdminStatus();
    } else {
      setIsAdmin(false);
    }
  }, [isAuthenticated]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <div className="hidden md:flex items-center gap-2">
      <Link to="/carrinho">
        <Button variant="outline" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {items.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {items.length}
            </span>
          )}
        </Button>
      </Link>

      {!isAuthenticated ? (
        <Button asChild>
          <Link to="/auth">Entrar</Link>
        </Button>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <User className="h-4 w-4" />
              <span>Minha Conta</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link to={isAdmin ? '/admin' : '/painel-cliente'}>
                {isAdmin ? 'Painel Admin' : 'Painel Cliente'}
              </Link>
            </DropdownMenuItem>
            {isAdmin && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/admin">Administração</Link>
                </DropdownMenuItem>
              </>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut} className="text-red-600 cursor-pointer">
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};
