// app/api/chatkit/session/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    const workflowId = process.env.OPENAI_WORKFLOW_ID;

    if (!apiKey) {
      console.error('OPENAI_API_KEY not configured');
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    if (!workflowId) {
      console.error('OPENAI_WORKFLOW_ID not configured');
      return NextResponse.json(
        { error: 'OpenAI workflow ID not configured' },
        { status: 500 }
      );
    }

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
        // Optional: Add user identification
        // user: request.headers.get('x-user-id') || 'anonymous',
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API error:', response.status, errorData);
      return NextResponse.json(
        { 
          error: 'Failed to create ChatKit session',
          details: errorData 
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('ChatKit session created successfully');

    return NextResponse.json({
      client_secret: data.client_secret,
    });
  } catch (error: any) {
    console.error('ChatKit session creation error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to create ChatKit session',
        details: error.message 
      },
      { status: 500 }
    );
  }
}