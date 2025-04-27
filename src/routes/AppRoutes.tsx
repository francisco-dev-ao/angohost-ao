
import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

// Layouts
import MainLayout from "@/layouts/MainLayout";
import ClientPanelLayout from "@/layouts/ClientPanelLayout";

// Page Components
const Home = lazy(() => import("@/pages/Home/index"));
const Services = lazy(() => import("@/pages/Services/index"));
const Domains = lazy(() => import("@/pages/Domains/index"));
const About = lazy(() => import("@/pages/About/index"));
const Contact = lazy(() => import("@/pages/Contact/index"));
const DomainCheck = lazy(() => import("@/pages/DomainCheck/index"));
const DomainRegistration = lazy(() => import("@/pages/DomainRegistration/index"));
const HostingPlans = lazy(() => import("@/pages/HostingPlans/index"));
const HostingConfig = lazy(() => import("@/pages/HostingConfig/index"));
const Cart = lazy(() => import("@/pages/Cart/index"));
const Checkout = lazy(() => import("@/pages/Checkout"));
const PaymentSuccess = lazy(() => import("@/pages/PaymentSuccess"));
const PaymentInstructions = lazy(() => import("@/pages/PaymentInstructions"));
const Auth = lazy(() => import("@/pages/Auth"));

// Client Panel Components
const DashboardOverview = lazy(() => import("@/components/client-panel/DashboardOverview").then(module => ({ default: module.DashboardOverview })));
const ServicesPanel = lazy(() => import("@/components/client-panel/ServicesPanel").then(module => ({ default: module.ServicesPanel })));
const DomainsPanel = lazy(() => import("@/components/client-panel/DomainsPanel").then(module => ({ default: module.DomainsPanel })));
const InvoicesPanel = lazy(() => import("@/components/client-panel/InvoicesPanel").then(module => ({ default: module.InvoicesPanel })));
const ProfilePanel = lazy(() => import("@/components/client-panel/ProfilePanel").then(module => ({ default: module.ProfilePanel })));
const AffiliatePanel = lazy(() => import("@/components/client-panel/AffiliatePanel").then(module => ({ default: module.AffiliatePanel })));

const LoadingFallback = () => (
  <div className="flex h-screen items-center justify-center">
    <Loader2 className="h-10 w-10 animate-spin text-primary" />
  </div>
);

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {/* Main Public Routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/servicos" element={<Services />} />
          <Route path="/dominios" element={<Domains />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/contato" element={<Contact />} />
          <Route path="/verificar-dominio" element={<DomainCheck />} />
          <Route path="/registrar-dominio" element={<DomainRegistration />} />
          <Route path="/planos-hospedagem" element={<HostingPlans />} />
          <Route path="/planos-hospedagem/:id/configurar" element={<HostingConfig />} />
          <Route path="/carrinho" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment/success" element={<PaymentSuccess />} />
          <Route path="/payment/instructions" element={<PaymentInstructions />} />
          <Route path="/auth" element={<Auth />} />
        </Route>
        
        {/* Client Panel Routes */}
        <Route path="/painel-cliente" element={<ClientPanelLayout />}>
          <Route index element={<Navigate to="/painel-cliente/visao-geral" replace />} />
          <Route path="visao-geral" element={<DashboardOverview />} />
          <Route path="servicos" element={<ServicesPanel />} />
          <Route path="dominios" element={<DomainsPanel />} />
          <Route path="faturas" element={<InvoicesPanel />} />
          <Route path="perfil" element={<ProfilePanel />} />
          <Route path="afiliados" element={<AffiliatePanel />} />
        </Route>

        {/* Not Found / 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
