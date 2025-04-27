
interface EmisPaymentConfig {
  frameToken: string;
  callbackUrl: string;
  successUrl: string;
  errorUrl: string;
}

const config: EmisPaymentConfig = {
  frameToken: 'a53787fd-b49e-4469-a6ab-fa6acf19db48',
  callbackUrl: `${window.location.origin}/payment/callback`,
  successUrl: `${window.location.origin}/payment/success`,
  errorUrl: `${window.location.origin}/payment/failed`
};

interface EmisPaymentRequest {
  reference: string;
  amount: number;
  items: Array<{
    name: string;
    price: number;
    fname: string;
    lname: string;
    email: string;
  }>;
}

interface EmisPaymentResponse {
  id?: string;
  message?: string;
  status?: string;
  error?: string;
}

// Função para realizar o pagamento via PHP bridge
const useFallbackPhp = async (data: EmisPaymentRequest): Promise<EmisPaymentResponse> => {
  try {
    const phpEndpoint = `${window.location.origin}/api/emis-payment.php`;
    console.log('Iniciando pagamento via PHP bridge:', phpEndpoint);
    
    const response = await fetch(phpEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        reference: data.reference,
        amount: data.amount,
        token: config.frameToken,
        callbackUrl: config.callbackUrl,
        // Importante: Não enviar dados do cliente para que o EMIS solicite no iframe
        mobile: 'PAYMENT',  // Forçar solicitação manual do número
        card: 'DISABLED',
        qrCode: 'PAYMENT'
      })
    });
    
    if (!response.ok) {
      throw new Error(`Erro no script PHP: ${response.status}`);
    }
    
    const result = await response.json();
    console.log('Resposta do EMIS via PHP:', result);
    return result;
  } catch (error) {
    console.error('Erro fatal no gateway de pagamento:', error);
    throw error;
  }
};

export async function createEmisPayment(data: EmisPaymentRequest): Promise<EmisPaymentResponse> {
  console.log('Iniciando pagamento EMIS com referência:', data.reference);
  
  try {
    // Usar sempre o PHP bridge seguindo as regras do EMIS para "Compra a um tempo"
    return await useFallbackPhp(data);
  } catch (error) {
    console.error('Erro fatal no pagamento:', error);
    throw error;
  }
}

export function generateOrderReference(orderId: string): string {
  return `${orderId}-AH-${Math.random().toString(36).substring(2).toUpperCase()}`;
}

export function getEmisFrameUrl(token: string): string {
  return `https://pagamentonline.emis.co.ao/online-payment-gateway/portal/frame?token=${token}`;
}

export async function checkPhpAvailability(): Promise<boolean> {
  try {
    // Tentar acessar o arquivo de teste PHP com timestamp para evitar cache
    const timestamp = new Date().getTime();
    const response = await fetch(`${window.location.origin}/api/php-check.php?t=${timestamp}`, {
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache, no-store'
      },
      cache: 'no-store'
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('PHP disponível, versão:', data.php_version);
      return true;
    }
    
    console.log('PHP não disponível, status:', response.status);
    return false;
  } catch (error) {
    console.log('PHP não disponível:', error);
    return false;
  }
}
