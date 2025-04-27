
import React from 'react';
import { Link } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { useUser } from '@/hooks/useUser';
import { NavbarAuthButtons } from './NavbarAuthButtons';

export function NavbarDesktopMenu() {
  const { user, isAdmin } = useUser();

  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link to="/" className={navigationMenuTriggerStyle()}>
            Home
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Domínios</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-primary/10 to-primary/5 p-6 no-underline outline-none focus:shadow-md"
                    to="/dominios"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Domínios
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Registre, transfira e gerencie seus domínios com facilidade.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <ListItem href="/dominios/registrar" title="Registrar Domínio">
                Registre um novo nome de domínio para seu site ou empresa.
              </ListItem>
              <ListItem href="/dominios/transferir" title="Transferir Domínio">
                Transfira um domínio existente para sua conta.
              </ListItem>
              <ListItem href="/dominios" title="Gerenciar Domínios">
                Gerencie seus domínios registrados.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Hospedagem</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-amber-100 to-amber-50 p-6 no-underline outline-none focus:shadow-md"
                    to="/hosting"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Soluções de Hospedagem
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Hospede seu site com desempenho e confiabilidade garantidos.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <ListItem href="/hosting" title="Hosting Web">
                Hospedagem compartilhada com recursos gerenciados.
              </ListItem>
              <ListItem href="/servidores-dedicados" title="Servidores Dedicados">
                Desempenho e controle total com servidores exclusivos.
              </ListItem>
              <ListItem href="/hosting" title="Hospedagem WordPress">
                Otimizado para sites WordPress com desempenho superior.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Email</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-blue-100 to-blue-50 p-6 no-underline outline-none focus:shadow-md"
                    to="/email/profissional"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Soluções de Email
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Email profissional para sua empresa ou projeto.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <ListItem href="/email/profissional" title="Email Profissional">
                Email com seu próprio domínio para uma presença profissional.
              </ListItem>
              <ListItem href="/office365" title="Microsoft 365">
                Ferramentas de produtividade com o pacote completo do Microsoft 365.
              </ListItem>
              <ListItem href="/email/profissional" title="Email Marketing">
                Soluções para campanhas de email marketing eficazes.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link to="/carrinho" className={navigationMenuTriggerStyle()}>
            Carrinho
          </Link>
        </NavigationMenuItem>

        {user && (
          <NavigationMenuItem>
            <NavigationMenuTrigger>Minha Conta</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[240px]">
                <ListItem href="/dashboard" title="Dashboard">
                  Visão geral da sua conta
                </ListItem>
                <ListItem href="/painel-cliente" title="Painel do Cliente">
                  Gerenciar serviços contratados
                </ListItem>
                <ListItem href="/alterar-senha" title="Alterar Senha">
                  Atualize sua senha de acesso
                </ListItem>
                {isAdmin && (
                  <ListItem href="/admin" title="Painel Administrativo">
                    Gerenciar sistema (admin)
                  </ListItem>
                )}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        )}
      </NavigationMenuList>

      <NavbarAuthButtons />
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { title: string }
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          to={href || "/"}
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
