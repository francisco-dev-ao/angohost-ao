
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { NavbarDesktopMenu } from './navbar/NavbarDesktopMenu';
import { NavbarMobileMenu } from './navbar/NavbarMobileMenu';
import { NavbarAuthButtons } from './navbar/NavbarAuthButtons';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      setIsAuthenticated(!!data.session);
    };
    
    checkAuth();
    
    // Listen for authentication changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setIsAuthenticated(!!session);
      }
    );
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const hostingMenuItems = [
    { title: 'Hospedagem cPanel', href: '/hospedagem/cpanel' },
    { title: 'Hospedagem WordPress', href: '/hospedagem/wordpress' },
    { title: 'Servidores Dedicados', href: '/servidores-dedicados' },
    { title: 'Servidores VPS', href: '/servidores-vps' },
  ];

  const domainMenuItems = [
    { title: 'Registrar Domínio', href: '/dominios/registrar' },
    { title: 'Transferir Domínio', href: '/dominios/transferir' },
  ];

  const emailMenuItems = [
    { title: 'Email Profissional', href: '/email/profissional' },
    { title: 'Exchange 365', href: '/email-office-365' },
    { title: 'Google Workspace', href: '/email/google-workspace' },
  ];

  return (
    <header className="py-4 border-b sticky top-0 bg-background/95 backdrop-blur-sm z-50">
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img 
            src="/public/lovable-uploads/b8702021-42ee-4d88-af7a-590e5dae0e08.png" 
            alt="ANGOHOST" 
            className="h-16 w-auto" 
          />
        </Link>

        <NavbarDesktopMenu 
          hostingMenuItems={hostingMenuItems}
          domainMenuItems={domainMenuItems}
          emailMenuItems={emailMenuItems}
        />

        <NavbarAuthButtons isAuthenticated={isAuthenticated} />

        <div className="lg:hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="relative z-50"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      <NavbarMobileMenu 
        isAuthenticated={isAuthenticated}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        hostingMenuItems={hostingMenuItems}
        domainMenuItems={domainMenuItems}
        emailMenuItems={emailMenuItems}
      />
    </header>
  );
};

export default Navbar;
