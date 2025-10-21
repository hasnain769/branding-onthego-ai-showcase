import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, phone } = await req.json();
    console.log('Scheduling call for:', { name, phone });

    // Validate input
    if (!phone || !name) {
      return new Response(
        JSON.stringify({ error: 'Name and phone number are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const AWAZ_API_KEY = Deno.env.get('AWAZ_API_KEY');
    if (!AWAZ_API_KEY) {
      console.error('AWAZ_API_KEY not configured');
      return new Response(
        JSON.stringify({ error: 'API configuration error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Calculate datetime +2 minutes from now
    const callTime = new Date();
    callTime.setMinutes(callTime.getMinutes() + 2);
    const datetime = callTime.toISOString();

    console.log('Calling Awaz API at:', datetime);

    // Call Awaz API
    const response = await fetch('https://api.awaz.ai/v1/calls', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${AWAZ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        agent: "65ff9abe3fdcbe533d3be143",
        name,
        phone,
        from: "661d7fb88bcadcf1d86fd8b0",
        datetime,
      }),
    });

    console.log('Awaz API response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Awaz API error:', errorText);
      return new Response(
        JSON.stringify({ error: 'Failed to schedule call' }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    console.log('Call scheduled successfully:', data);

    return new Response(
      JSON.stringify({ success: true, data }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error scheduling call:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});