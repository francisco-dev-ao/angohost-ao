
import { toast } from "sonner";

interface EmisPaymentOptions {
  reference: string;
  amount: number;
  callbackUrl: string;
}

const API_URL = {
  TOKEN: 'https://deve.angohost.ao/api/payment/pagar.php',
  FRAME: '/payment-frame'
};

// Get a payment token from the server
export async function getEmisPaymentToken(options: EmisPaymentOptions): Promise<string | null> {
  try {
    console.log("Payment request initiated:", options);
    
    // Make real API call to backend
    const response = await fetch(API_URL.TOKEN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        reference: options.reference,
        amount: options.amount,
        callbackUrl: `https://deve.angohost.ao/payment/callback`
      })
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Payment API error:", errorText);
      throw new Error(`Payment service error: ${response.status}`);
    }
    
    const data = await response.json();
    if (!data.token) {
      throw new Error('Invalid token response');
    }
    
    console.log("Payment token received from backend");
    return data.token;
  } catch (error) {
    console.error("EMIS payment error:", error);
    toast.error("Falha ao conectar com o serviço de pagamento. Tente novamente mais tarde.");
    return null;
  }
}

// Setup event listener for EMIS postMessage
export function setupEmisMessageListener(onSuccess: (transactionId: string) => void): () => void {
  const listener = (event: MessageEvent) => {
    // Verify the origin - include production domain
    const allowedOrigins = [
      'https://pagamentonline.emis.co.ao', 
      'https://deve.angohost.ao',
      window.location.origin
    ];
    
    if (!allowedOrigins.includes(event.origin)) {
      console.warn('Rejected message from untrusted origin:', event.origin);
      return;
    }
    
    console.log('Payment message received:', event.data);
    
    if (event.data && event.data.status === "SUCCESS") {
      onSuccess(event.data.transactionId || 'unknown-transaction');
    }
  };
  
  window.addEventListener('message', listener);
  
  return () => {
    window.removeEventListener('message', listener);
  };
}
