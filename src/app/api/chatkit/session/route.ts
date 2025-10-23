import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const workflowId = process.env.NEXT_PUBLIC_CHATKIT_WORKFLOW_ID;
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    if (!workflowId) {
      return NextResponse.json(
        { error: 'ChatKit Workflow ID not configured' },
        { status: 500 }
      );
    }

    // Create a session with OpenAI
    const response = await fetch(
      `https://api.openai.com/v1/realtime/sessions`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-realtime-preview-2024-12-17',
          voice: 'alloy',
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to create session with OpenAI' },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    return NextResponse.json({
      client_secret: data.client_secret.value,
    });
  } catch (error) {
    console.error('Session creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}