
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

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
  if (!mobileMenuOpen) return null;

  return (
    <div className="lg:hidden absolute w-full bg-background z-50 border-b pb-4">
      <nav className="container mt-4 flex flex-col gap-4">
        <Link to="/" className="px-4 py-2 hover:bg-accent rounded-md" onClick={() => setMobileMenuOpen(false)}>
          Início
        </Link>
        
        <div className="px-4 py-2 font-medium">
          Alojamento Web
          <div className="ml-4">
            {hostingMenuItems.map((item) => (
              <Link 
                key={item.title}
                to={item.href} 
                className="px-4 py-2 hover:bg-accent rounded-md block"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
        
        <div className="px-4 py-2 font-medium">
          Domínios
          <div className="ml-4">
            {domainMenuItems.map((item) => (
              <Link 
                key={item.title}
                to={item.href} 
                className="px-4 py-2 hover:bg-accent rounded-md block"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
        
        <div className="px-4 py-2 font-medium">
          Email Corporativo
          <div className="ml-4">
            {emailMenuItems.map((item) => (
              <Link 
                key={item.title}
                to={item.href} 
                className="px-4 py-2 hover:bg-accent rounded-md block"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
        
        <div className="mt-4 flex flex-col gap-2">
          <Link to="/carrinho" onClick={() => setMobileMenuOpen(false)}>
            <Button variant="outline" className="w-full">Carrinho</Button>
          </Link>
          {isAuthenticated ? (
            <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full">Painel do Cliente</Button>
            </Link>
          ) : (
            <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full">Área do Cliente</Button>
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
};
