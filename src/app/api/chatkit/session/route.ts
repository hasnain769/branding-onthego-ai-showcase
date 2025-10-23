// app/api/chatkit/session/route.ts
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      console.error('OPENAI_API_KEY not configured');
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    const openai = new OpenAI({
      apiKey: apiKey,
    });

    console.log('Creating ChatKit session...');

    // Create a ChatKit session
    const session = await openai.chatkit.sessions.create({
      // Add any session configuration here if needed
    });

    console.log('ChatKit session created successfully');

    return NextResponse.json({
      client_secret: session.client_secret,
    });
  } catch (error: any) {
    console.error('ChatKit session creation error:', error);
    
    // Log more details about the error
    if (error.response) {
      console.error('Error response:', error.response.data);
    }
    
    return NextResponse.json(
      { 
        error: 'Failed to create ChatKit session',
        details: error.message 
      },
      { status: 500 }
    );
  }
}