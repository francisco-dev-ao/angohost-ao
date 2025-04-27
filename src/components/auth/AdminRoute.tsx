
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAdminStatus } from '@/hooks/useAdminStatus';
import { Loader2 } from 'lucide-react';

interface AdminRouteProps {
  children: React.ReactNode;
}

export const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { isAdmin, loading } = useAdminStatus();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
        <span>Verificando permissões...</span>
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/painel-cliente" replace />;
  }

  return <>{children}</>;
};
