import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const apiKey = process.env.TAVUS_API_KEY

    if (!apiKey) {
      return NextResponse.json(
        { error: 'TAVUS_API_KEY not configured. Please add it to .env.local' },
        { status: 500 }
      )
    }

    // Create conversation with Tavus API
    const response = await fetch('https://tavusapi.com/v2/conversations', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        replica_id: 'r9d30b0e55ac', // Luna
        persona_id: 'pd43ffef', // Technical Co Pilot
        conversation_name: 'ShowPilot Demo',
        properties: {
          enable_recording: false,
          participant_left_timeout: 60,
          participant_absent_timeout: 120,
          max_call_duration: 3600,
        },
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Tavus API error:', errorText)
      return NextResponse.json(
        { error: 'Failed to create conversation', details: errorText },
        { status: response.status }
      )
    }

    const data = await response.json()

    // Return the conversation URL to the client
    return NextResponse.json({
      conversationUrl: data.conversation_url,
      conversationId: data.conversation_id,
      status: data.status,
    })

  } catch (error) {
    console.error('Conversation creation error:', error)
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
