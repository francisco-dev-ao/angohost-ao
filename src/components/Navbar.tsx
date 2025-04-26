
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
import { Menu, X, ChevronRight } from 'lucide-react';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const hostingMenuItems = [
    { title: 'Hospedagem cPanel', href: '/hospedagem/cpanel' },
    { title: 'Hospedagem WordPress', href: '/hospedagem/wordpress' },
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

  // Close menu when clicking outside
  const menuRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle submenu on mobile
  const toggleMobileSubmenu = (menuName: string) => {
    if (activeMenu === menuName) {
      setActiveMenu(null);
    } else {
      setActiveMenu(menuName);
    }
  };

  const handleMenuItemClick = () => {
    setMobileMenuOpen(false);
    setActiveMenu(null);
  };

  return (
    <header className="py-4 border-b sticky top-0 bg-background/95 backdrop-blur-sm z-50">
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-poppins font-bold text-2xl text-angohost-700">
            ANGO<span className="text-orange-500">HOST</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:block">
          <NavigationMenu>
            <NavigationMenuList>
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
                    <li>
                      <NavigationMenuLink asChild>
                        <Link 
                          to="/servidores-dedicados"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Servidores Dedicados</div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link 
                          to="/servidores-vps"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Servidores VPS</div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
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
          <Link to="/login">
            <Button>Área do Cliente</Button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="lg:hidden">
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div ref={menuRef} className="lg:hidden absolute w-full bg-background z-50 border-b pb-4">
          <nav className="container mt-4 flex flex-col gap-4">
            <Link to="/" className="px-4 py-2 hover:bg-accent rounded-md" onClick={handleMenuItemClick}>
              Início
            </Link>
            
            <div className="px-4 py-2 font-medium flex justify-between items-center cursor-pointer" onClick={() => toggleMobileSubmenu('hosting')}>
              <span>Alojamento Web</span>
              <ChevronRight className={`w-4 h-4 transition-transform ${activeMenu === 'hosting' ? 'rotate-90' : ''}`} />
            </div>
            {activeMenu === 'hosting' && (
              <div className="ml-4">
                {hostingMenuItems.map((item) => (
                  <Link 
                    key={item.title}
                    to={item.href} 
                    className="px-4 py-2 hover:bg-accent rounded-md block"
                    onClick={handleMenuItemClick}
                  >
                    {item.title}
                  </Link>
                ))}
                <Link to="/servidores-dedicados" className="px-4 py-2 hover:bg-accent rounded-md block" onClick={handleMenuItemClick}>
                  Servidores Dedicados
                </Link>
                <Link to="/servidores-vps" className="px-4 py-2 hover:bg-accent rounded-md block" onClick={handleMenuItemClick}>
                  Servidores VPS
                </Link>
              </div>
            )}
            
            <div className="px-4 py-2 font-medium flex justify-between items-center cursor-pointer" onClick={() => toggleMobileSubmenu('domains')}>
              <span>Domínios</span>
              <ChevronRight className={`w-4 h-4 transition-transform ${activeMenu === 'domains' ? 'rotate-90' : ''}`} />
            </div>
            {activeMenu === 'domains' && (
              <div className="ml-4">
                {domainMenuItems.map((item) => (
                  <Link 
                    key={item.title}
                    to={item.href} 
                    className="px-4 py-2 hover:bg-accent rounded-md block"
                    onClick={handleMenuItemClick}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            )}
            
            <div className="px-4 py-2 font-medium flex justify-between items-center cursor-pointer" onClick={() => toggleMobileSubmenu('email')}>
              <span>Email Corporativo</span>
              <ChevronRight className={`w-4 h-4 transition-transform ${activeMenu === 'email' ? 'rotate-90' : ''}`} />
            </div>
            {activeMenu === 'email' && (
              <div className="ml-4">
                {emailMenuItems.map((item) => (
                  <Link 
                    key={item.title}
                    to={item.href} 
                    className="px-4 py-2 hover:bg-accent rounded-md block"
                    onClick={handleMenuItemClick}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            )}
            
            <div className="mt-4 flex flex-col gap-2">
              <Link to="/carrinho" onClick={handleMenuItemClick}>
                <Button variant="outline" className="w-full">Carrinho</Button>
              </Link>
              <Link to="/login" onClick={handleMenuItemClick}>
                <Button className="w-full">Área do Cliente</Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
