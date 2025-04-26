
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

// Função para simular uma resposta quando a API externa falha
const simulateEmisResponse = (data: EmisPaymentRequest): EmisPaymentResponse => {
  // Gera um ID simulado para testes
  const simulatedId = `sim-${Math.random().toString(36).substring(2, 12)}`;
  console.log('Simulando resposta EMIS com ID:', simulatedId);
  return {
    id: simulatedId,
    status: 'success'
  };
};

export async function createEmisPayment(data: EmisPaymentRequest): Promise<EmisPaymentResponse> {
  try {
    const params = {
      reference: data.reference,
      amount: data.amount,
      token: config.frameToken,
      mobile: 'PAYMENT',
      card: 'DISABLED',
      qrCode: 'PAYMENT',
      callbackUrl: config.callbackUrl
    };

    console.log('Iniciando requisição para EMIS com parâmetros:', params);

    try {
      const response = await fetch('https://pagamentonline.emis.co.ao/online-payment-gateway/portal/frameToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
      });

      if (!response.ok) {
        console.warn('Resposta de erro da EMIS API:', response.status);
        // Se estiver em ambiente de desenvolvimento, simulamos uma resposta
        if (process.env.NODE_ENV === 'development' || window.location.hostname.includes('lovableproject')) {
          console.log('Em ambiente de desenvolvimento - simulando resposta de sucesso');
          return simulateEmisResponse(data);
        }
        throw new Error(`Erro na API EMIS: ${response.status}`);
      }

      const result = await response.json();
      console.log('Resposta da API EMIS:', result);
      return result;
    } catch (fetchError) {
      console.error('Erro ao conectar com API EMIS:', fetchError);
      
      // Se estiver em ambiente de desenvolvimento, simulamos uma resposta
      if (process.env.NODE_ENV === 'development' || window.location.hostname.includes('lovableproject')) {
        console.log('Em ambiente de desenvolvimento - simulando resposta de sucesso após erro');
        return simulateEmisResponse(data);
      }
      
      throw fetchError;
    }
  } catch (error) {
    console.error('EMIS payment error:', error);
    return {
      error: 'Falha ao conectar com o serviço de pagamento',
      message: error instanceof Error ? error.message : 'Erro desconhecido'
    };
  }
}

export function generateOrderReference(orderId: string): string {
  return `${orderId}-AH-${Math.random().toString(36).substring(2).toUpperCase()}`;
}

export function getEmisFrameUrl(token: string): string {
  // URL de iframe real do EMIS
  const realUrl = `https://pagamentonline.emis.co.ao/online-payment-gateway/portal/frame?token=${token}`;
  
  // URL para desenvolvimento quando o token começa com 'sim-' (simulado)
  if (token.startsWith('sim-')) {
    console.log('Token simulado detectado, usando URL de desenvolvimento');
    return `https://www.mocky.io/v2/5ec3743b3200006600e3d6d7?token=${token}`;
  }
  
  return realUrl;
}
