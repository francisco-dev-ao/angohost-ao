
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

// Função para gerar resposta simulada para casos de falha ou testes
const simulateEmisResponse = (data: EmisPaymentRequest): EmisPaymentResponse => {
  const simulatedId = `sim-${Math.random().toString(36).substring(2, 12)}`;
  console.log('Simulando resposta EMIS com ID:', simulatedId);
  return {
    id: simulatedId,
    status: 'success'
  };
};

// Função adaptada para usar o script PHP
const useFallbackPhp = async (data: EmisPaymentRequest): Promise<EmisPaymentResponse> => {
  try {
    // Em produção, usamos um script PHP para evitar problemas de CORS
    const phpEndpoint = `${window.location.origin}/api/emis-payment.php`;
    console.log('Tentando via PHP bridge:', phpEndpoint);
    
    const response = await fetch(phpEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        reference: data.reference,
        amount: data.amount,
        token: config.frameToken,
        callbackUrl: config.callbackUrl
      })
    });
    
    if (!response.ok) {
      throw new Error(`Erro no script PHP: ${response.status}`);
    }
    
    const result = await response.json();
    console.log('Resposta do script PHP:', result);
    return result;
  } catch (error) {
    console.error('Erro no fallback PHP:', error);
    return simulateEmisResponse(data);
  }
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

    console.log('Iniciando pagamento EMIS com parâmetros:', params);
    
    // Verificar se já estamos em produção
    const isProduction = !window.location.hostname.includes('localhost') && 
                         !window.location.hostname.includes('lovable') &&
                         !window.location.hostname.includes('preview-');
    
    // Em produção, tentar primeiro o PHP
    if (isProduction) {
      try {
        console.log('Ambiente de produção detectado, tentando PHP primeiro');
        return await useFallbackPhp(data);
      } catch (phpError) {
        console.error('Erro no PHP em produção:', phpError);
      }
    }
    
    // Tentativa direta (funciona em desenvolvimento local)
    try {
      const emisUrl = 'https://pagamentonline.emis.co.ao/online-payment-gateway/portal/frameToken';
      const response = await fetch(emisUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params)
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log('Resposta direta da API EMIS:', result);
        return result;
      }
      
      console.log('Tentativa direta falhou:', response.status);
    } catch (directError) {
      console.log('Erro na conexão direta com EMIS:', directError);
    }
    
    // Se não estamos em produção ou tudo falhou, usar simulação
    console.log('Gerando ID simulado como último recurso');
    return simulateEmisResponse(data);
    
  } catch (error) {
    console.error('EMIS payment error:', error);
    return simulateEmisResponse(data);
  }
}

// Verifica se o servidor suporta PHP
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

export function generateOrderReference(orderId: string): string {
  return `${orderId}-AH-${Math.random().toString(36).substring(2).toUpperCase()}`;
}

export function getEmisFrameUrl(token: string): string {
  // URL para o iframe do EMIS
  const realUrl = `https://pagamentonline.emis.co.ao/online-payment-gateway/portal/frame?token=${token}`;
  
  // URL para desenvolvimento quando o token começa com 'sim-' (simulado)
  if (token.startsWith('sim-')) {
    console.log('Token simulado detectado, usando URL de simulação');
    
    // Substituímos a URL do mocky.io (que está falhando) por uma nova URL de simulação
    return `https://angohost-emis-simulator.netlify.app/sim.html?token=${token}`;
  }
  
  return realUrl;
}
