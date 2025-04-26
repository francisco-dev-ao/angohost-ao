
import { z } from "zod";

export const checkoutFormSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(9, 'Telefone deve ter pelo menos 9 dígitos'),
  nif: z.string().min(9, 'NIF deve ter 9 dígitos'),
  billingAddress: z.string().min(5, 'Endereço deve ter pelo menos 5 caracteres'),
  city: z.string().min(2, 'Cidade é obrigatória'),
  paymentMethod: z.enum(['credit-card', 'bank-transfer', 'emis'])
});

export type CheckoutFormData = z.infer<typeof checkoutFormSchema>;
