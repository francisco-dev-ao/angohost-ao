import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useState, useEffect } from "react";
import { Session } from "@supabase/supabase-js";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ShoppingCart from "./pages/ShoppingCart";
import RegisterDomain from "./pages/RegisterDomain";
import DomainConfig from "./pages/DomainConfig";
import EmailProfessional from "./pages/EmailProfessional";
import EmailConfig from "./pages/EmailConfig";
import Checkout from "./pages/Checkout";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCallback from "./pages/PaymentCallback";
import ClientPanel from "./pages/ClientPanel";
import Auth from "./pages/Auth";
import AdminDashboard from "./pages/AdminDashboard";

// New Pages
import HostingPage from "./pages/HostingPage";
import DomainsPage from "./pages/DomainsPage";
import DomainTransferPage from "./pages/DomainTransferPage";
import ProfessionalEmailPage from "./pages/ProfessionalEmailPage";
import Office365Page from "./pages/Office365Page";
import DedicatedServersPage from "./pages/DedicatedServersPage";

// Client panel components
import { DashboardOverview } from "./components/client-panel/DashboardOverview";
import { ServicesPanel } from "./components/client-panel/ServicesPanel";
import { DomainsPanel } from "./components/client-panel/DomainsPanel";
import { InvoicesPanel } from "./components/client-panel/InvoicesPanel";
import { TicketsPanel } from "./components/client-panel/TicketsPanel";
import { ProfilePanel } from "./components/client-panel/ProfilePanel";
import { DownloadsPanel } from "./components/client-panel/DownloadsPanel";
import { KnowledgeBasePanel } from "./components/client-panel/KnowledgeBasePanel";
import { NotificationsPanel } from "./components/client-panel/NotificationsPanel";
import { AffiliatePanel } from "./components/client-panel/AffiliatePanel";

// Admin Redirect Component
const AdminRoute = () => {
  return <Navigate to="/admin" replace />;
};

// Creating the queryClient outside of the App component
const queryClient = new QueryClient();

// Layout component that decides whether to show or not the navbar/footer
const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const path = location.pathname;
  const [session, setSession] = useState<Session | null>(null);
  
  useEffect(() => {
    // Fetch the session when component mounts
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    };
    
    getSession();
    
    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_, currentSession) => {
        setSession(currentSession);
      }
    );
    
    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  
  // Hide navbar and footer on authentication pages, dashboard and client panel
  // Also hide footer when user is authenticated
  const hideNavbarFooter = 
    path === "/auth" || 
    path.startsWith("/admin") ||
    path === "/painel-cliente" || 
    path.startsWith("/painel-cliente/");
  
  const hideFooter = hideNavbarFooter || session;
  
  return (
    <>
      {!hideNavbarFooter && <Navbar />}
      <main className="flex-grow">{children}</main>
      {!hideFooter && <Footer />}
    </>
  );
};

// Componente App definido como função React
const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <TooltipProvider>
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/*" element={
                <Layout>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/carrinho" element={<ShoppingCart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/payment/success" element={<PaymentSuccess />} />
                    <Route path="/payment/callback" element={<PaymentCallback />} />
                    <Route path="/dominios/registrar" element={<RegisterDomain />} />
                    <Route path="/dominios/configurar" element={<DomainConfig />} />
                    <Route path="/email/profissional" element={<EmailProfessional />} />
                    <Route path="/email/configurar" element={<EmailConfig />} />
                    
                    {/* Client Panel Routes */}
                    <Route path="/painel-cliente" element={<ClientPanel />}>
                      <Route path="visao-geral" element={<DashboardOverview />} />
                      <Route path="servicos" element={<ServicesPanel />} />
                      <Route path="dominios" element={<DomainsPanel />} />
                      <Route path="faturas" element={<InvoicesPanel />} />
                      <Route path="tickets" element={<TicketsPanel />} />
                      <Route path="perfil" element={<ProfilePanel />} />
                      <Route path="downloads" element={<DownloadsPanel />} />
                      <Route path="knowledge" element={<KnowledgeBasePanel />} />
                      <Route path="notificacoes" element={<NotificationsPanel />} />
                      <Route path="afiliados" element={<AffiliatePanel />} />
                      <Route index element={<Navigate to="/painel-cliente/visao-geral" replace />} />
                    </Route>
                    
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/admin/*" element={<AdminDashboard />} />
                    <Route path="/dashboard" element={<AdminRoute />} />
                    
                    <Route path="/hospedagem-de-sites" element={<HostingPage />} />
                    <Route path="/hospedagem/cpanel" element={<HostingPage />} />
                    <Route path="/hospedagem/wordpress" element={<HostingPage />} />
                    <Route path="/dominios" element={<DomainsPage />} />
                    <Route path="/transferencia_de_dominios" element={<DomainTransferPage />} />
                    <Route path="/dominios/transferir" element={<DomainTransferPage />} />
                    <Route path="/Email-profissional" element={<ProfessionalEmailPage />} />
                    <Route path="/email-office-365" element={<Office365Page />} />
                    <Route path="/servidores-dedicados" element={<DedicatedServersPage />} />
                    
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Layout>
              } />
            </Routes>
          </div>
        </CartProvider>
      </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
