
import { type NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { name, phone } = await request.json()

  // Here you would typically trigger a call scheduling service
  // For now, we'll just log the data and return a success response
  console.log(`Scheduling call for ${name} at ${phone}`)

  return NextResponse.json({ success: true })
}
