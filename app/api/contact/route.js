import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Here you would typically:
    // 1. Save to database
    // 2. Send email notification
    // 3. Send confirmation email to user

    // For now, we'll just log and return success
    console.log('Contact form submission:', { name, email, subject, message })

    // Optional: Save to a contact_messages table if you create one
    // const { data, error } = await supabase
    //   .from('contact_messages')
    //   .insert([{ name, email, subject, message }])

    return NextResponse.json({ success: true, message: 'Message sent successfully' })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}