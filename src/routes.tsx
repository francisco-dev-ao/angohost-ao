
import { createBrowserRouter, Navigate } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import ClientPanel from './pages/ClientPanel';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentCallback from './pages/PaymentCallback';
import PaymentInstructions from './pages/PaymentInstructions';
import { 
  InvoicesTab, 
  OverviewTab, 
  DomainsTab,
  NotificationsTab,
  HostingTab
} from './components/client-panel/tabs';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'carrinho', element: <Cart /> },
      { path: 'checkout', element: <Checkout /> },
      { path: 'payment/success', element: <PaymentSuccess /> },
      { path: 'payment/callback', element: <PaymentCallback /> },
      { path: 'payment/instructions', element: <PaymentInstructions /> },
      {
        path: 'painel-cliente',
        element: <ClientPanel />,
        children: [
          { index: true, element: <Navigate to="/painel-cliente/visao-geral" replace /> },
          { path: 'visao-geral', element: <OverviewTab /> },
          { path: 'faturas', element: <InvoicesTab /> },
          { path: 'dominios', element: <DomainsTab /> },
          { path: 'hospedagem', element: <HostingTab /> },
          { path: 'notificacoes', element: <NotificationsTab /> },
        ],
      },
    ],
  },
]);
