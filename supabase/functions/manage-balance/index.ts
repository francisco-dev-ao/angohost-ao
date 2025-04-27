
import { serve } from "https://deno.land/std@0.195.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Create Supabase client with service role 
  const supabaseAdmin = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } }
  );

  // Create Supabase client with anon role for auth
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? ""
  );

  try {
    // Get auth user
    const authHeader = req.headers.get("Authorization")!;
    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabase.auth.getUser(token);
    
    if (userError || !userData.user) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    const user = userData.user;
    
    // Get request data
    const { action, amount } = await req.json();
    
    // Get customer from user
    const { data: customer, error: customerError } = await supabaseAdmin
      .from("customers")
      .select("id, account_balance")
      .eq("user_id", user.id)
      .single();
    
    if (customerError) {
      return new Response(
        JSON.stringify({ error: "Customer not found", details: customerError }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    let newBalance = customer.account_balance || 0;
    
    // Process requested action
    switch (action) {
      case "add":
        // Add funds to account balance
        newBalance += amount;
        break;
      case "deduct":
        // Deduct from account balance
        if (newBalance < amount) {
          return new Response(
            JSON.stringify({ error: "Insufficient funds" }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        newBalance -= amount;
        break;
      case "get":
        // Just return current balance
        return new Response(
          JSON.stringify({ balance: newBalance }),
          { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      default:
        return new Response(
          JSON.stringify({ error: "Invalid action" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
    }
    
    // Update customer balance
    const { error: updateError } = await supabaseAdmin
      .from("customers")
      .update({ account_balance: newBalance })
      .eq("id", customer.id);
    
    if (updateError) {
      return new Response(
        JSON.stringify({ error: "Failed to update balance", details: updateError }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    // Create a transaction record
    if (action !== "get") {
      await supabaseAdmin.from("account_transactions").insert({
        customer_id: customer.id,
        amount: action === "add" ? amount : -amount,
        description: action === "add" ? "Adição de fundos" : "Dedução de fundos",
        previous_balance: customer.account_balance || 0,
        current_balance: newBalance
      });
    }
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        balance: newBalance,
        action: action 
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
    
  } catch (error) {
    console.error("Error:", error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
