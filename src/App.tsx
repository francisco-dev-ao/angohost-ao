
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
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
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";

// New Pages
import HostingPage from "./pages/HostingPage";
import DomainsPage from "./pages/DomainsPage";
import DomainTransferPage from "./pages/DomainTransferPage";
import ProfessionalEmailPage from "./pages/ProfessionalEmailPage";
import Office365Page from "./pages/Office365Page";
import DedicatedServersPage from "./pages/DedicatedServersPage";

// Criando o queryClient fora do componente App
const queryClient = new QueryClient();

// Layout component that decides whether to show or not the navbar/footer
const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const path = location.pathname;
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  
  useEffect(() => {
    // Fetch the session when component mounts
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      
      if (data.session) {
        // Check if user is admin
        try {
          const { data: isAdminData } = await supabase.rpc('is_admin');
          setIsAdmin(!!isAdminData);
        } catch (error) {
          console.error("Error checking admin status:", error);
        }
      }
    };
    
    getSession();
    
    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_, currentSession) => {
        setSession(currentSession);
        
        if (currentSession?.user) {
          // Check if user is admin
          try {
            const { data: isAdminData } = await supabase.rpc('is_admin');
            setIsAdmin(!!isAdminData);
          } catch (error) {
            console.error("Error checking admin status:", error);
          }
        } else {
          setIsAdmin(false);
        }
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
    path.startsWith("/dashboard") ||
    path === "/admin" ||
    path.startsWith("/admin/") ||
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
                    <Route path="/painel-cliente" element={<ClientPanel />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                    
                    {/* Product pages */}
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
