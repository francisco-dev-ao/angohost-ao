
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

    const response = await fetch('https://pagamentonline.emis.co.ao/online-payment-gateway/portal/frameToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    });

    if (!response.ok) {
      throw new Error('Falha ao gerar token de pagamento');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('EMIS payment error:', error);
    return {
      error: 'Falha ao conectar com o serviço de pagamento'
    };
  }
}

export function generateOrderReference(orderId: string): string {
  return `${orderId}-AH-${Math.random().toString(36).substring(2).toUpperCase()}`;
}

interface EmisFrameProps {
  token: string;
}

export function getEmisFrameUrl(token: string): string {
  return `https://pagamentonline.emis.co.ao/online-payment-gateway/portal/frame?token=${token}`;
}
