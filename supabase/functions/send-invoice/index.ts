
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { Resend } from 'npm:resend@2.0.0'

const resend = new Resend(Deno.env.get('RESEND_API_KEY'));

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { customerEmail, invoiceNumber, amount, dueDate, items } = await req.json()

    const { data, error } = await resend.emails.send({
      from: 'Sistema <noreply@seu-dominio.com>',
      to: customerEmail,
      subject: `Fatura #${invoiceNumber}`,
      html: `
        <h1>Fatura #${invoiceNumber}</h1>
        <p>Valor total: ${amount.toLocaleString('pt-AO')} Kz</p>
        <p>Data de vencimento: ${new Date(dueDate).toLocaleDateString('pt-AO')}</p>
        <h2>Itens:</h2>
        <ul>
          ${items.map((item: any) => `
            <li>${item.product_name} - ${item.price.toLocaleString('pt-AO')} Kz</li>
          `).join('')}
        </ul>
      `
    });

    return new Response(
      JSON.stringify({ success: true }),
      {
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
        status: 200,
      },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
        status: 500,
      },
    )
  }
})
