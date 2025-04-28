
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
import Auth from "./pages/Auth";

// New Pages
import HostingPage from "./pages/HostingPage";
import DomainsPage from "./pages/DomainsPage";
import DomainTransferPage from "./pages/DomainTransferPage";
import ProfessionalEmailPage from "./pages/ProfessionalEmailPage";
import Office365Page from "./pages/Office365Page";
import DedicatedServersPage from "./pages/DedicatedServersPage";

const queryClient = new QueryClient();

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const path = location.pathname;
  const [session, setSession] = useState<Session | null>(null);
  
  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    };
    
    getSession();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_, currentSession) => {
        setSession(currentSession);
      }
    );
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  
  const hideNavbarFooter = path === "/auth";
  const hideFooter = hideNavbarFooter || session;
  
  return (
    <>
      {!hideNavbarFooter && <Navbar />}
      <main className="flex-grow">{children}</main>
      {!hideFooter && <Footer />}
    </>
  );
};

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
                    <Route path="/auth" element={<Auth />} />
                    
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
