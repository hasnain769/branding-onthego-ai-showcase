 // app/api/chatkit/session/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Log environment check
    console.log('=== ChatKit Session Creation Start ===');
    console.log('Environment:', process.env.NODE_ENV);
    
    // 1. Get the userId from the client's request body
    const body = await request.json();
    const userId = body.userId;

    if (!userId) {
      console.error('❌ Missing userId in request body');
      return NextResponse.json(
        { error: 'Missing userId in request body' },
        { status: 400 } // This is a true 400 error
      );
    }
    console.log('Requesting session for user:', userId);
    
    const apiKey = process.env.OPENAI_API_KEY;
    const workflowId = process.env.OPENAI_WORKFLOW_ID;

    // ... (your existing env var checks are good)
    if (!apiKey) { /* ... */ }
    if (!workflowId) { /* ... */ }

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
        // 2. Add the user object to the OpenAI API call
        user: {
          id: userId,
        },
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