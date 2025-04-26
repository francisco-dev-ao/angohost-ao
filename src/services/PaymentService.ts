
/**
 * Payment Service
 * 
 * This is a simulation service for the client side in development.
 * For production, this should be replaced with actual server-side endpoints.
 */

// In production, this would be your server endpoint
const PAYMENT_API_URL = '/api/payment';

// Production frame token that would be stored securely on the server
const FRAME_TOKEN = 'a53787fd-b49e-4469-a6ab-fa6acf19db48';
const GPO_API_URL = 'https://pagamentonline.emis.co.ao/online-payment-gateway/portal/frameToken';
const GPO_CSS_URL = 'https://pagamentonline.emis.co.ao/gpoconfig/qr_code_mobile_v2.css';

// Type definitions
export interface PaymentRequestData {
  reference: string;
  amount: number;
  callbackUrl: string;
}

export interface PaymentResponse {
  success: boolean;
  message: string;
  data?: {
    token?: string;
    errorCode?: string;
  };
}

/**
 * Request a payment token for EMIS GPO
 * 
 * In production, this would be a call to your backend, which would then make
 * the secure request to the EMIS API. This implementation simulates that flow.
 */
export const requestPaymentToken = async (data: PaymentRequestData): Promise<PaymentResponse> => {
  // Log the request for debugging
  console.info('Payment request initiated:', data);

  try {
    // PRODUCTION WARNING:
    // In production, this code would NOT be in the frontend!
    // It would be on your secure backend to protect your EMIS frame token.

    // DEVELOPMENT SIMULATION:
    // This code simulates what your backend would do when receiving the request
    // from your frontend application.
    
    // In development, we'll simulate a successful response
    const token = `demo-${Math.random().toString(36).substring(2,12)}-${Date.now()}`;
    console.info('Generated demo payment token:', token);
    
    // Log what would be sent to EMIS in production
    console.info('In production, would send to EMIS API:', {
      reference: data.reference,
      amount: data.amount,
      token: FRAME_TOKEN,
      mobile: 'PAYMENT',
      card: 'AUTHORIZATION',
      cssUrl: GPO_CSS_URL,
      callbackUrl: data.callbackUrl
    });
    
    return {
      success: true,
      message: 'Token de pagamento gerado com sucesso',
      data: {
        token: token
      }
    };
  } catch (error) {
    console.error('Error requesting payment token:', error);
    return {
      success: false,
      message: 'Erro ao gerar token de pagamento',
      data: {
        errorCode: 'INTERNAL_ERROR'
      }
    };
  }
};

/**
 * Verify payment status
 * In production, this would check the actual payment status
 */
export const verifyPaymentStatus = async (reference: string): Promise<boolean> => {
  // In production, this would verify with your backend if payment was confirmed
  // For demo purposes, we'll simulate a successful payment
  return true;
};

/**
 * Process a payment callback from EMIS
 * This would typically be handled by your backend
 */
export const processPaymentCallback = (callbackData: any): void => {
  console.info('Payment message received:', callbackData);
  // In production, your backend would update the order status in your database
};

/**
 * Simulate a payment callback for testing
 * This would not exist in production
 */
export const simulatePaymentSuccess = (reference: string): string => {
  const transactionId = `tx-${Math.random().toString(36).substring(2,10)}-${Date.now()}`;
  console.info('Payment simulation completed:', transactionId);
  return transactionId;
};
