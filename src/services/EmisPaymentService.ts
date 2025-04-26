
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

export async function getEmisPaymentToken(options: EmisPaymentOptions): Promise<string | null> {
  try {
    const response = await fetch(EMIS_CONFIG.API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reference: options.reference,
        amount: options.amount, // Amount in cents
        token: EMIS_CONFIG.FRAME_TOKEN,
        mobile: "PAYMENT",
        card: "AUTHORIZATION",
        cssUrl: EMIS_CONFIG.CSS_URL,
        callbackUrl: options.callbackUrl,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("EMIS payment API error:", errorText);
      toast.error("Erro ao conectar com o serviço de pagamento. Por favor tente novamente.");
      return null;
    }

    const data: EmisTokenResponse = await response.json();

    if (data.success) {
      return data.token;
    } else {
      // Map error codes to user-friendly messages
      let errorMessage = data.errorMessage || "Erro desconhecido";
      switch(data.errorCode) {
        case "100":
          errorMessage = "Referência do pagamento é obrigatória";
          break;
        case "101":
          errorMessage = "Referência duplicada. Por favor, tente novamente";
          break;
        case "102":
          errorMessage = "Valor do pagamento inválido";
          break;
        case "104":
          errorMessage = "Token de autenticação inválido";
          break;
        case "105":
          errorMessage = "URL de CSS inválida";
          break;
        case "107":
          errorMessage = "Métodos de pagamento não disponíveis";
          break;
      }
      
      console.error("EMIS payment token error:", errorMessage);
      toast.error(`Erro ao gerar token de pagamento: ${errorMessage}`);
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
    // Verify message origin for security
    if (event.origin !== 'https://pagamentonline.emis.co.ao') return;
    
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

