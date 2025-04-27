
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { CartProvider } from '@/context/CartContext';
import { RequireAuth } from '@/components/auth/RequireAuth';
import { AdminRoute } from '@/components/auth/AdminRoute';

// Layouts
import ClientPanelLayout from '@/layouts/ClientPanelLayout';
import AdminLayout from '@/layouts/AdminLayout';

// Pages
import Home from '@/pages/Home';
import Cart from '@/pages/Cart';
import Checkout from '@/pages/Checkout';
import PaymentSuccess from '@/pages/PaymentSuccess';
import PaymentCallback from '@/pages/PaymentCallback';
import ClientPanel from '@/pages/ClientPanel';
import Auth from '@/pages/Auth';
import DomainRegistration from '@/pages/DomainRegistration';
import AdminDashboard from '@/pages/Admin/Dashboard';

// Client panel tabs
import { OverviewTab } from '@/components/client-panel/tabs';
import { InvoicesTab } from '@/components/client-panel/tabs';
import { DomainsTab } from '@/components/client-panel/tabs';
import { NotificationsTab } from '@/components/client-panel/tabs';
import { HostingTab } from '@/components/client-panel/tabs';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/carrinho" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment/success" element={<PaymentSuccess />} />
          <Route path="/payment/callback" element={<PaymentCallback />} />
          <Route path="/dominios/registrar" element={<DomainRegistration />} />

          {/* Client panel - protected routes */}
          <Route path="/painel-cliente" element={
            <RequireAuth>
              <ClientPanel />
            </RequireAuth>
          }>
            <Route path="visao-geral" element={<OverviewTab />} />
            <Route path="faturas" element={<InvoicesTab />} />
            <Route path="dominios" element={<DomainsTab />} />
            <Route path="notificacoes" element={<NotificationsTab />} />
            <Route path="hospedagem" element={<HostingTab />} />
            <Route index element={<Navigate to="visao-geral" replace />} />
          </Route>

          {/* Admin panel - protected routes */}
          <Route path="/admin" element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }>
            <Route index element={<AdminDashboard />} />
            {/* Add other admin routes as needed */}
          </Route>

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster position="top-right" />
      </Router>
    </CartProvider>
  );
}

export default App;
