import { NextResponse } from 'next/server'

const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET
const PAYPAL_BASE_URL = process.env.NEXT_PUBLIC_PAYPAL_ENVIRONMENT === 'production' 
  ? 'https://api-m.paypal.com' 
  : 'https://api-m.sandbox.paypal.com'

// Get PayPal access token
async function getPayPalAccessToken() {
  try {
    const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString('base64')
    
    const response = await fetch(`${PAYPAL_BASE_URL}/v1/oauth2/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${auth}`
      },
      body: 'grant_type=client_credentials'
    })

    if (!response.ok) {
      throw new Error('Failed to get PayPal access token')
    }

    const data = await response.json()
    return data.access_token
  } catch (error) {
    console.error('PayPal access token error:', error)
    throw error
  }
}

// Verify PayPal payment
export async function POST(request) {
  try {
    const { orderId, captureId } = await request.json()

    if (!orderId || !captureId) {
      return NextResponse.json(
        { error: 'Missing required payment details' },
        { status: 400 }
      )
    }

    // Get access token
    const accessToken = await getPayPalAccessToken()

    // Verify the capture
    const response = await fetch(
      `${PAYPAL_BASE_URL}/v2/payments/captures/${captureId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
          'PayPal-Request-Id': `verify-${captureId}-${Date.now()}`
        }
      }
    )

    if (!response.ok) {
      throw new Error('Failed to verify PayPal payment')
    }

    const captureDetails = await response.json()

    // Verify the capture is completed
    if (captureDetails.status !== 'COMPLETED') {
      return NextResponse.json(
        { error: 'Payment not completed', status: captureDetails.status },
        { status: 400 }
      )
    }

    return NextResponse.json({
      verified: true,
      captureDetails,
      amount: captureDetails.amount.value,
      currency: captureDetails.amount.currency_code,
      status: captureDetails.status,
      captureId: captureDetails.id,
      createTime: captureDetails.create_time
    })

  } catch (error) {
    console.error('PayPal verification error:', error)
    return NextResponse.json(
      { error: 'Payment verification failed', details: error.message },
      { status: 500 }
    )
  }
}

// Handle PayPal webhook events (optional - for production)
export async function PUT(request) {
  try {
    const webhookEvent = await request.json()
    
    // Log webhook event for debugging
    console.log('PayPal Webhook Event:', webhookEvent.event_type, webhookEvent.id)

    // Handle different webhook events
    switch (webhookEvent.event_type) {
      case 'PAYMENT.CAPTURE.COMPLETED':
        // Handle successful payment
        console.log('Payment captured:', webhookEvent.resource.id)
        break
      
      case 'PAYMENT.CAPTURE.DENIED':
        // Handle denied payment
        console.log('Payment denied:', webhookEvent.resource.id)
        break
      
      case 'PAYMENT.CAPTURE.REFUNDED':
        // Handle refund
        console.log('Payment refunded:', webhookEvent.resource.id)
        break
      
      default:
        console.log('Unhandled webhook event:', webhookEvent.event_type)
    }

    return NextResponse.json({ received: true })

  } catch (error) {
    console.error('PayPal webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}