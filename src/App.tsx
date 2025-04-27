
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from '@/pages/Index';
import Checkout from '@/pages/Checkout';
import PaymentSuccess from '@/pages/PaymentSuccess';
import PaymentCallback from '@/pages/PaymentCallback';
import ShoppingCart from '@/pages/ShoppingCart';
import Auth from '@/pages/Auth';
import NotFound from '@/pages/NotFound';
import Dashboard from '@/pages/Dashboard';
import ClientPanel from '@/pages/ClientPanel';
import DomainsPage from '@/pages/DomainsPage';
import HostingPage from '@/pages/HostingPage';
import DomainConfig from '@/pages/DomainConfig';
import RegisterDomain from '@/pages/RegisterDomain';
import DomainTransferPage from '@/pages/DomainTransferPage';
import ProfessionalEmailPage from '@/pages/ProfessionalEmailPage';
import EmailConfig from '@/pages/EmailConfig';
import Office365Page from '@/pages/Office365Page';
import DedicatedServersPage from '@/pages/DedicatedServersPage';
import AdminDashboard from '@/pages/AdminDashboard';
import ChangePassword from '@/pages/ChangePassword';
import { CartProvider } from '@/context/CartContext';
import { Toaster } from '@/components/ui/toaster';
import './App.css';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment/success" element={<PaymentSuccess />} />
          <Route path="/payment/callback" element={<PaymentCallback />} />
          <Route path="/carrinho" element={<ShoppingCart />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/painel-cliente" element={<ClientPanel />} />
          <Route path="/dominios" element={<DomainsPage />} />
          <Route path="/hosting" element={<HostingPage />} />
          <Route path="/dominios/config/:id" element={<DomainConfig />} />
          <Route path="/dominios/registrar" element={<RegisterDomain />} />
          <Route path="/dominios/transferir" element={<DomainTransferPage />} />
          <Route path="/email/profissional" element={<ProfessionalEmailPage />} />
          <Route path="/email/config/:id" element={<EmailConfig />} />
          <Route path="/office365" element={<Office365Page />} />
          <Route path="/servidores-dedicados" element={<DedicatedServersPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/alterar-senha" element={<ChangePassword />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      
      <Toaster />
    </CartProvider>
  );
}

export default App;
