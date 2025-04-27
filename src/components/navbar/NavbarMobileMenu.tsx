
import React from 'react';
import { Link } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, User, ChevronRight, LogOut, Key } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { useUser } from '@/hooks/useUser';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface NavbarMobileMenuProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  hostingMenuItems?: { title: string; href: string }[];
  domainMenuItems?: { title: string; href: string }[];
  emailMenuItems?: { title: string; href: string }[];
}

export function NavbarMobileMenu({
  mobileMenuOpen,
  setMobileMenuOpen,
  hostingMenuItems,
  domainMenuItems,
  emailMenuItems
}: NavbarMobileMenuProps) {
  const { user, isAdmin } = useUser();
  const [isOpen, setIsOpen] = React.useState(false);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success('Sessão encerrada com sucesso');
      setIsOpen(false);
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Erro ao encerrar sessão');
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon" aria-label="Menu">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[80%] sm:w-[350px] flex flex-col">
        <div className="flex-1 overflow-auto">
          <div className="space-y-4 py-4">
            <div className="px-3 py-2">
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                Menu Principal
              </h2>
              <div className="space-y-1">
                <Button asChild variant="ghost" className="w-full justify-start" onClick={() => setIsOpen(false)}>
                  <Link to="/">Home</Link>
                </Button>
              </div>
            </div>
            <Separator />
            <div className="px-3 py-2">
              <Accordion type="multiple" className="w-full">
                <AccordionItem value="dominios">
                  <AccordionTrigger className="px-4 text-sm">Domínios</AccordionTrigger>
                  <AccordionContent>
                    <div className="pl-4 pt-1 space-y-1">
                      <Button asChild variant="ghost" size="sm" className="w-full justify-start" onClick={() => setIsOpen(false)}>
                        <Link to="/dominios/registrar">Registrar Domínio</Link>
                      </Button>
                      <Button asChild variant="ghost" size="sm" className="w-full justify-start" onClick={() => setIsOpen(false)}>
                        <Link to="/dominios/transferir">Transferir Domínio</Link>
                      </Button>
                      <Button asChild variant="ghost" size="sm" className="w-full justify-start" onClick={() => setIsOpen(false)}>
                        <Link to="/dominios">Gerenciar Domínios</Link>
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="hospedagem">
                  <AccordionTrigger className="px-4 text-sm">Hospedagem</AccordionTrigger>
                  <AccordionContent>
                    <div className="pl-4 pt-1 space-y-1">
                      <Button asChild variant="ghost" size="sm" className="w-full justify-start" onClick={() => setIsOpen(false)}>
                        <Link to="/hosting">Hosting Web</Link>
                      </Button>
                      <Button asChild variant="ghost" size="sm" className="w-full justify-start" onClick={() => setIsOpen(false)}>
                        <Link to="/servidores-dedicados">Servidores Dedicados</Link>
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="email">
                  <AccordionTrigger className="px-4 text-sm">Email</AccordionTrigger>
                  <AccordionContent>
                    <div className="pl-4 pt-1 space-y-1">
                      <Button asChild variant="ghost" size="sm" className="w-full justify-start" onClick={() => setIsOpen(false)}>
                        <Link to="/email/profissional">Email Profissional</Link>
                      </Button>
                      <Button asChild variant="ghost" size="sm" className="w-full justify-start" onClick={() => setIsOpen(false)}>
                        <Link to="/office365">Microsoft 365</Link>
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <div className="mt-4 space-y-1">
                <Button asChild variant="ghost" className="w-full justify-start" onClick={() => setIsOpen(false)}>
                  <Link to="/carrinho">Carrinho</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t py-4 px-3">
          {user ? (
            <div className="space-y-3">
              <div className="flex items-center gap-3 px-4">
                <User className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm font-medium">{user.email}</span>
              </div>
              <Separator className="my-2" />
              <div className="space-y-1">
                <Button asChild variant="ghost" size="sm" className="w-full justify-between" onClick={() => setIsOpen(false)}>
                  <Link to="/dashboard">
                    <span>Dashboard</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="ghost" size="sm" className="w-full justify-between" onClick={() => setIsOpen(false)}>
                  <Link to="/painel-cliente">
                    <span>Painel do Cliente</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="ghost" size="sm" className="w-full justify-between" onClick={() => setIsOpen(false)}>
                  <Link to="/alterar-senha">
                    <div className="flex items-center">
                      <Key className="h-4 w-4 mr-2" />
                      <span>Alterar Senha</span>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
                {isAdmin && (
                  <Button asChild variant="ghost" size="sm" className="w-full justify-between" onClick={() => setIsOpen(false)}>
                    <Link to="/admin">
                      <span>Painel Administrativo</span>
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </Button>
                )}
                <Button 
                  variant="destructive" 
                  size="sm" 
                  className="w-full justify-start mt-2"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  <span>Sair</span>
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <Button asChild className="w-full" onClick={() => setIsOpen(false)}>
                <Link to="/auth">Fazer Login</Link>
              </Button>
              <Button asChild variant="outline" className="w-full" onClick={() => setIsOpen(false)}>
                <Link to="/auth?mode=register">Criar Conta</Link>
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
