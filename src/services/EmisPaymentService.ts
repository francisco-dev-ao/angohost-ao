
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

// This would normally be stored in a secure environment variable
const EMIS_FRAME_TOKEN = "YOUR_FRAME_TOKEN_HERE"; 

export async function getEmisPaymentToken(options: EmisPaymentOptions): Promise<string | null> {
  try {
    // In a real implementation, this request would be made server-side for security
    // This is a client-side simulation for demonstration purposes
    
    const response = await fetch("https://gpo.emis.co.ao/gpoportal/frameToken", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reference: options.reference,
        amount: options.amount, // Amount in cents
        token: EMIS_FRAME_TOKEN,
        mobile: "PAYMENT",
        card: "AUTHORIZATION",
        cssUrl: "https://pagamentonline.emis.co.ao/gpoconfig/qr_code_mobile_v2.css",
        callbackUrl: options.callbackUrl,
      }),
    });

    const data: EmisTokenResponse = await response.json();

    if (data.success) {
      return data.token;
    } else {
      console.error("EMIS payment token error:", data.errorMessage);
      toast.error(`Erro ao gerar token de pagamento: ${data.errorMessage || "Erro desconhecido"}`);
      return null;
    }
  } catch (error) {
    console.error("EMIS payment error:", error);
    toast.error("Falha ao conectar com o serviço de pagamento. Tente novamente mais tarde.");
    return null;
  }
}

// Setup event listener for EMIS postMessage
export function setupEmisMessageListener(onSuccess: (transactionId: string) => void): () => void {
  const listener = (event: MessageEvent) => {
    if (event.origin !== 'https://gpo.emis.co.ao') return;
    
    console.log('Payment message received:', event.data);
    
    if (event.data && event.data.status === "SUCCESS") {
      onSuccess(event.data.transactionId);
    }
  };
  
  window.addEventListener('message', listener);
  
  // Return a function to remove the listener when no longer needed
  return () => {
    window.removeEventListener('message', listener);
  };
}
