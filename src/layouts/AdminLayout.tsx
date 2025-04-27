
import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { useAdminStatus } from '@/hooks/useAdminStatus';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const AdminLayout = () => {
  const { isAdmin, loading } = useAdminStatus();
  const navigate = useNavigate();
  const [userData, setUserData] = React.useState<any>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const { data } = await supabase.auth.getUser();
      setUserData(data.user);
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (!loading && !isAdmin) {
      navigate('/painel-cliente');
    }
  }, [isAdmin, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
        <span>Verificando permissões administrativas...</span>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader userData={userData} />
      <div className="container mx-auto px-4 py-8">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
