import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request) {
  try {
    console.log('Newsletter API called')
    const { email } = await request.json()
    console.log('Email received:', email)

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      )
    }

    // Check if email already exists
    console.log('Checking if email exists...')
    const { data: existing, error: checkError } = await supabase
      .from('newsletter_subscribers')
      .select('email')
      .eq('email', email)
      .single()

    console.log('Existing check result:', { existing, checkError })

    if (existing) {
      console.log('Email already exists')
      return NextResponse.json(
        { message: 'You are already subscribed!' },
        { status: 200 }
      )
    }

    // Add new subscriber
    console.log('Adding new subscriber...')
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .insert([
        { 
          email,
          subscribed_at: new Date().toISOString(),
          is_active: true,
          source: 'website'
        }
      ])
      .select()
      .single()

    console.log('Insert result:', { data, error })

    if (error) {
      console.error('Insert error:', error)
      throw error
    }

    console.log('Successfully subscribed:', email)
    return NextResponse.json(
      { 
        success: true,
        message: 'Successfully subscribed to newsletter!',
        data 
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { error: `Failed to subscribe: ${error.message}` },
      { status: 500 }
    )
  }
}