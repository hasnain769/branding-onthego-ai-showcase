import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    console.log('=== ChatKit Session Creation Start ===');
    console.log('Environment:', process.env.NODE_ENV);
    
    // 1. Get the userId from the client's request body
    // This part is new
    const body = await request.json();
    const userId = body.userId;

    // 2. Add a check for the userId
    // This part is new
    if (!userId) {
      console.error('❌ Missing userId in request body');
      return NextResponse.json(
        { error: 'Missing userId in request body' },
        { status: 400 } 
      );
    }
    console.log('Requesting session for user:', userId);

    
    const apiKey = process.env.OPENAI_API_KEY;
    const workflowId = process.env.OPENAI_WORKFLOW_ID;

    if (!apiKey) {
      console.error('❌ OPENAI_API_KEY not configured');
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    if (!workflowId) {
      console.error('❌ OPENAI_WORKFLOW_ID not configured');
      return NextResponse.json(
        { error: 'OpenAI workflow ID not configured' },
        { status: 500 }
      );
    }

    console.log('✅ Environment variables validated');
    console.log('Creating ChatKit session with workflow:', workflowId);

    // Create a ChatKit session using the OpenAI API
    const response = await fetch('https://api.openai.com/v1/chatkit/sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'OpenAI-Beta': 'chatkit_beta=v1',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        workflow: {
          id: workflowId,
        },
        // ===================================================
        //
        // 3. THIS IS THE CRITICAL FIX
        // You must add the user ID here.
        //
        user: userId,
        //
        // ===================================================
      }),
    });

    console.log('OpenAI API response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ OpenAI API error:', response.status);
      console.error('Error body:', errorText);
      
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch (e) {
        errorData = { message: errorText };
      }

      return NextResponse.json(
        { 
          error: 'Failed to create ChatKit session',
          status: response.status,
          details: errorData 
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('✅ ChatKit session created successfully');
    console.log('Client secret present:', !!data.client_secret);

    return NextResponse.json({
      client_secret: data.client_secret,
    });
  } catch (error: any) {
    console.error('❌ ChatKit session creation error:', error);
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    
    return NextResponse.json(
      { 
        error: 'Failed to create ChatKit session',
        details: error.message,
        type: error.name 
      },
      { status: 500 }
    );
  }
}