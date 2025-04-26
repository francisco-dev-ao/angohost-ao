
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  
  const menuRef = useRef<HTMLDivElement>(null);
  
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
    
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
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

        <div className="hidden lg:block">
          <NavigationMenu>
            <NavigationMenuList className="gap-6">
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link 
                    to="/"
                    className={cn(
                      "group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                    )}
                  >
                    Início
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger>Alojamento Web</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[220px] gap-3 p-4">
                    {hostingMenuItems.map((item) => (
                      <li key={item.title}>
                        <NavigationMenuLink asChild>
                          <Link 
                            to={item.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">{item.title}</div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Domínios</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[220px] gap-3 p-4">
                    {domainMenuItems.map((item) => (
                      <li key={item.title}>
                        <NavigationMenuLink asChild>
                          <Link 
                            to={item.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">{item.title}</div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger>Email Corporativo</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[220px] gap-3 p-4">
                    {emailMenuItems.map((item) => (
                      <li key={item.title}>
                        <NavigationMenuLink asChild>
                          <Link 
                            to={item.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">{item.title}</div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

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

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div ref={menuRef} className="lg:hidden absolute w-full bg-background z-50 border-b pb-4">
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
      )}
    </header>
  );
};

export default Navbar;
