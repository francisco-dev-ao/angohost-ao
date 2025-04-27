
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Home, Server, Globe, Mail, ShoppingCart, User, ShieldCheck } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface NavbarMobileMenuProps {
  isAuthenticated: boolean;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  hostingMenuItems: Array<{ title: string; href: string; }>;
  domainMenuItems: Array<{ title: string; href: string; }>;
  emailMenuItems: Array<{ title: string; href: string; }>;
}

export const NavbarMobileMenu = ({
  isAuthenticated,
  mobileMenuOpen,
  setMobileMenuOpen,
  hostingMenuItems,
  domainMenuItems,
  emailMenuItems
}: NavbarMobileMenuProps) => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        if (!isAuthenticated) {
          setIsAdmin(false);
          return;
        }
        
        const { data } = await supabase.rpc('is_admin');
        setIsAdmin(data === true);
      } catch (error) {
        console.error('Error checking admin status:', error);
      }
    };
    
    checkAdminStatus();
  }, [isAuthenticated]);

  if (!mobileMenuOpen) return null;

  return (
    <div className="lg:hidden fixed inset-0 z-50 bg-background/95 backdrop-blur-sm pt-16">
      <nav className="container mt-4 flex flex-col gap-4 pb-20 max-h-[calc(100vh-4rem)] overflow-y-auto">
       
        <div className="px-4 py-2">
          <div className="flex items-center gap-2 font-medium text-lg mb-2">
            <Server className="h-5 w-5 text-primary" />
            <span>Alojamento Web</span>
          </div>
          <div className="ml-7 space-y-1">
            {hostingMenuItems.map((item) => (
              <Link 
                key={item.title}
                to={item.href} 
                className="px-3 py-2 hover:bg-accent rounded-md block transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
        
        <div className="px-4 py-2">
          <div className="flex items-center gap-2 font-medium text-lg mb-2">
            <Globe className="h-5 w-5 text-primary" />
            <span>Domínios</span>
          </div>
          <div className="ml-7 space-y-1">
            {domainMenuItems.map((item) => (
              <Link 
                key={item.title}
                to={item.href} 
                className="px-3 py-2 hover:bg-accent rounded-md block transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
        
        <div className="px-4 py-2">
          <div className="flex items-center gap-2 font-medium text-lg mb-2">
            <Mail className="h-5 w-5 text-primary" />
            <span>Email Corporativo</span>
          </div>
          <div className="ml-7 space-y-1">
            {emailMenuItems.map((item) => (
              <Link 
                key={item.title}
                to={item.href} 
                className="px-3 py-2 hover:bg-accent rounded-md block transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
        
        <div className="mt-4 px-4 flex flex-col gap-3">
          <Link to="/carrinho" onClick={() => setMobileMenuOpen(false)}>
            <Button variant="outline" className="w-full flex items-center justify-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              <span>Carrinho</span>
            </Button>
          </Link>
          {isAuthenticated ? (
            <>
              {isAdmin && (
                <Link to="/admin" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="destructive" className="w-full flex items-center justify-center gap-2">
                    <ShieldCheck className="h-5 w-5" />
                    <span>Painel Admin</span>
                  </Button>
                </Link>
              )}
              <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full flex items-center justify-center gap-2">
                  <User className="h-5 w-5" />
                  <span>Painel do Cliente</span>
                </Button>
              </Link>
            </>
          ) : (
            <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full flex items-center justify-center gap-2">
                <User className="h-5 w-5" />
                <span>Área do Cliente</span>
              </Button>
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
};
