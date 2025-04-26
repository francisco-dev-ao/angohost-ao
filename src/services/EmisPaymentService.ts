
import { toast } from "sonner";

interface EmisPaymentOptions {
  reference: string;
  amount: number;
  callbackUrl: string;
}

interface EmisTokenResponse {
  token: string;
  success: boolean;
  errorCode?: string;
  errorMessage?: string;
}

const EMIS_CONFIG = {
  FRAME_TOKEN: 'a53787fd-b49e-4469-a6ab-fa6acf19db48',
  API_URL: 'https://pagamentonline.emis.co.ao/online-payment-gateway/portal/frameToken',
  CSS_URL: 'https://pagamentonline.emis.co.ao/gpoconfig/qr_code_mobile_v2.css'
};

// In a production environment, this should be handled by a real backend service
// This is a client-side workaround for demo purposes
export async function getEmisPaymentToken(options: EmisPaymentOptions): Promise<string | null> {
  try {
    console.log("Payment request initiated:", options);
    
    // DEMO MODE: For demonstration purposes, we're generating a mock token
    // In production, this should be replaced with an actual backend API call
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generate a random token for demo purposes
    const mockToken = `demo-${Math.random().toString(36).substring(2, 15)}-${Date.now()}`;
    
    console.log("Generated demo payment token:", mockToken);
    
    // Log what would have been sent to the EMIS API
    console.log("In production, would send to EMIS API:", {
      reference: options.reference,
      amount: options.amount,
      token: EMIS_CONFIG.FRAME_TOKEN,
      mobile: "PAYMENT",
      card: "AUTHORIZATION",
      cssUrl: EMIS_CONFIG.CSS_URL,
      callbackUrl: options.callbackUrl,
    });

    // Return simulated successful response
    return mockToken;
  } catch (error) {
    console.error("EMIS payment error:", error);
    toast.error("Falha ao conectar com o serviço de pagamento. Tente novamente mais tarde.");
    return null;
  }
}

// Setup event listener for EMIS postMessage
export function setupEmisMessageListener(onSuccess: (transactionId: string) => void): () => void {
  const listener = (event: MessageEvent) => {
    // In demo mode, we'll accept messages from any origin
    console.log('Payment message received:', event.data);
    
    // In production, we would verify the origin:
    // if (event.origin !== 'https://pagamentonline.emis.co.ao') return;
    
    if (event.data && event.data.status === "SUCCESS") {
      onSuccess(event.data.transactionId || 'demo-transaction');
    }
  };
  
  window.addEventListener('message', listener);
  
  // Return a function to remove the listener when no longer needed
  return () => {
    window.removeEventListener('message', listener);
  };
}

// Simulate payment for demo purposes
export function simulatePaymentSuccess(onSuccess: (transactionId: string) => void): void {
  setTimeout(() => {
    const mockTransactionId = `tx-${Math.random().toString(36).substring(2, 10)}-${Date.now()}`;
    
    // Simulate a postMessage from the payment provider
    window.postMessage({
      status: "SUCCESS",
      transactionId: mockTransactionId
    }, window.location.origin);
    
    console.log("Payment simulation completed:", mockTransactionId);
  }, 3000); // Simulate payment completion after 3 seconds
}
