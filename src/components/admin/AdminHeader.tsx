
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogOut, Settings, User } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface AdminHeaderProps {
  userData: any;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ userData }) => {
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success('Sessão encerrada com sucesso');
  };

  return (
    <header className="bg-primary text-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/admin" className="text-xl font-bold">
            AngoHost Admin
          </Link>
          <nav className="hidden md:flex ml-8">
            <ul className="flex space-x-6">
              <li>
                <Link to="/admin" className="hover:underline">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/admin/clientes" className="hover:underline">
                  Clientes
                </Link>
              </li>
              <li>
                <Link to="/admin/pedidos" className="hover:underline">
                  Pedidos
                </Link>
              </li>
              <li>
                <Link to="/admin/dominios" className="hover:underline">
                  Domínios
                </Link>
              </li>
              <li>
                <Link to="/admin/hospedagem" className="hover:underline">
                  Hospedagem
                </Link>
              </li>
              <li>
                <Link to="/admin/faturas" className="hover:underline">
                  Faturas
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center">
            <User className="h-4 w-4 mr-2" />
            <span>{userData?.user_metadata?.full_name || userData?.email}</span>
          </div>
          <Link to="/admin/configuracoes">
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </Link>
          <Button variant="ghost" size="icon" onClick={handleSignOut}>
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};
