
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

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

// New Pages
import HostingPage from "./pages/HostingPage";
import DomainsPage from "./pages/DomainsPage";
import DomainTransferPage from "./pages/DomainTransferPage";
import ProfessionalEmailPage from "./pages/ProfessionalEmailPage";
import Office365Page from "./pages/Office365Page";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
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
                
                {/* New Routes */}
                <Route path="/hospedagem-de-sites" element={<HostingPage />} />
                <Route path="/hospedagem/cpanel" element={<HostingPage />} />
                <Route path="/hospedagem/wordpress" element={<HostingPage />} />
                <Route path="/dominios" element={<DomainsPage />} />
                <Route path="/transferencia_de_dominios" element={<DomainTransferPage />} />
                <Route path="/dominios/transferir" element={<DomainTransferPage />} />
                <Route path="/Email-profissional" element={<ProfessionalEmailPage />} />
                <Route path="/email-office-365" element={<Office365Page />} />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
