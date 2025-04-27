
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
const MAX_RETRIES = 3;
const RETRY_DELAY = 2000; // 2 segundos
const REQUEST_TIMEOUT = 20000; // 20 segundos

// Função para realizar o pagamento via PHP bridge com retentativas
const useFallbackPhp = async (data: EmisPaymentRequest): Promise<EmisPaymentResponse> => {
  let retries = 0;
  
  while (retries <= MAX_RETRIES) {
    try {
      const phpEndpoint = `${window.location.origin}/api/emis-payment.php`;
      console.log(`Tentativa ${retries + 1}: Iniciando pagamento via PHP bridge:`, phpEndpoint);
      console.log('Dados enviados para o PHP:', {
        reference: data.reference, // Garantir que a referência esteja presente
        amount: data.amount,
        token: config.frameToken,
        callbackUrl: config.callbackUrl
      });
      
      // Criar uma promessa com timeout
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('Tempo limite esgotado')), REQUEST_TIMEOUT);
      });
      
      // Adicionar um timestamp para evitar cache
      const timestamp = new Date().getTime();
      const fetchUrl = `${phpEndpoint}?t=${timestamp}`;
      
      // Garantir que a referência esteja definida e não vazia
      if (!data.reference || data.reference.trim() === '') {
        throw new Error('Referência de pedido inválida ou vazia');
      }
      
      // Objeto de dados para enviar, garantindo que todos os campos obrigatórios estejam presentes
      const paymentData = {
        reference: data.reference.trim(),  // Garantir que não há espaços extras
        amount: data.amount,
        token: config.frameToken,
        callbackUrl: config.callbackUrl,
        mobile: 'PAYMENT',
        card: 'DISABLED',
        qrCode: 'PAYMENT'
      };
      
      console.log('Enviando dados para o PHP:', JSON.stringify(paymentData));
      
      // Fazer a requisição com fetch
      const fetchPromise = fetch(fetchUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        },
        body: JSON.stringify(paymentData)
      });
      
      // Aguardar a primeira promessa a resolver (fetch ou timeout)
      const response = await Promise.race([fetchPromise, timeoutPromise]);
      
      if (!response.ok) {
        const statusText = response.statusText;
        let errorText = 'Sem detalhes do erro';
        
        try {
          errorText = await response.text();
        } catch (e) {
          console.error('Não foi possível ler o texto da resposta de erro:', e);
        }
        
        throw new Error(`Erro no script PHP: ${response.status} ${statusText}. ${errorText}`);
      }
      
      let result;
      try {
        result = await response.json();
      } catch (e) {
        console.error('Erro ao processar JSON da resposta:', e);
        throw new Error('Resposta inválida do servidor de pagamento');
      }
      
      console.log('Resposta do EMIS via PHP:', result);
      return result;
    } catch (error) {
      console.error(`Tentativa ${retries + 1} falhou:`, error);
      
      retries++;
      
      if (retries <= MAX_RETRIES) {
        console.log(`Aguardando ${RETRY_DELAY * retries}ms antes da próxima tentativa...`);
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * retries));
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
  
  // Validar dados antes de enviar
  if (!data.reference || data.reference.trim() === '') {
    console.error('Erro: Referência de pedido vazia ou inválida');
    throw new Error('A referência do pedido é obrigatória');
  }
  
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
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      },
      cache: 'no-store',
      credentials: 'omit'
    });
    
    // Verificar se a resposta é válida
    if (!response.ok) {
      console.log('PHP não disponível, status:', response.status);
      return false;
    }
    
    try {
      const data = await response.json();
      console.log('PHP disponível, versão:', data.php_version);
      return true;
    } catch (e) {
      console.error('Erro ao processar resposta JSON do PHP check:', e);
      return false;
    }
    
  } catch (error) {
    console.log('PHP não disponível:', error);
    return false;
  }
}
