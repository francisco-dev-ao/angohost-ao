
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

// Retentativas e timeout para solicitações
const MAX_RETRIES = 2;
const RETRY_DELAY = 2000; // 2 segundos
const REQUEST_TIMEOUT = 15000; // 15 segundos

// Função para realizar o pagamento via PHP bridge com retentativas
const useFallbackPhp = async (data: EmisPaymentRequest): Promise<EmisPaymentResponse> => {
  let retries = 0;
  
  while (retries <= MAX_RETRIES) {
    try {
      const phpEndpoint = `${window.location.origin}/api/emis-payment.php`;
      console.log(`Tentativa ${retries + 1}: Iniciando pagamento via PHP bridge:`, phpEndpoint);
      
      // Criar uma promessa com timeout
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('Tempo limite esgotado')), REQUEST_TIMEOUT);
      });
      
      // Fazer a requisição com fetch
      const fetchPromise = fetch(phpEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate'
        },
        body: JSON.stringify({
          reference: data.reference,
          amount: data.amount,
          token: config.frameToken,
          callbackUrl: config.callbackUrl,
          mobile: 'PAYMENT',
          card: 'DISABLED',
          qrCode: 'PAYMENT'
        })
      });
      
      // Aguardar a primeira promessa a resolver (fetch ou timeout)
      const response = await Promise.race([fetchPromise, timeoutPromise]);
      
      if (!response.ok) {
        const statusText = response.statusText;
        const errorText = await response.text().catch(() => 'Sem detalhes do erro');
        throw new Error(`Erro no script PHP: ${response.status} ${statusText}. ${errorText}`);
      }
      
      const result = await response.json();
      console.log('Resposta do EMIS via PHP:', result);
      return result;
    } catch (error) {
      console.error(`Tentativa ${retries + 1} falhou:`, error);
      
      retries++;
      
      if (retries <= MAX_RETRIES) {
        console.log(`Aguardando ${RETRY_DELAY}ms antes da próxima tentativa...`);
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      } else {
        console.error('Todas as tentativas falharam');
        throw error;
      }
    }
  }
  
  throw new Error('Erro fatal no gateway de pagamento após várias tentativas');
};

export async function createEmisPayment(data: EmisPaymentRequest): Promise<EmisPaymentResponse> {
  console.log('Iniciando pagamento EMIS com referência:', data.reference);
  
  try {
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
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      },
      cache: 'no-store',
      credentials: 'omit'
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
