import { NextResponse } from 'next/server'
import Stripe from 'stripe'

// Initialize Stripe with secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
})

export async function POST(request) {
  try {
    const { amount, currency = 'usd', items, customerInfo } = await request.json()

    // Validate required parameters
    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount provided' },
        { status: 400 }
      )
    }

    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: 'Stripe secret key not configured' },
        { status: 500 }
      )
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount), // Amount should already be in cents
      currency: currency.toLowerCase(),
      metadata: {
        order_type: 'digital_goods',
        item_count: items?.length || 0,
        customer_email: customerInfo?.email || '',
        customer_name: customerInfo?.name || '',
      },
      description: `Baby Care Ebooks - ${items?.length || 0} item(s)`,
      receipt_email: customerInfo?.email || null,
      shipping: customerInfo ? {
        name: customerInfo.name || 'Customer',
        address: {
          line1: customerInfo.shippingStreet || '',
          city: customerInfo.shippingCity || '',
          state: customerInfo.shippingState || '',
          postal_code: customerInfo.shippingZip || '',
          country: 'US',
        },
      } : null,
      automatic_payment_methods: {
        enabled: true,
      },
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
    })

  } catch (error) {
    console.error('Stripe payment intent creation error:', error)

    // Handle specific Stripe errors
    if (error.type === 'StripeCardError') {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    if (error.type === 'StripeInvalidRequestError') {
      return NextResponse.json(
        { error: 'Invalid payment request' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Payment processing failed', details: error.message },
      { status: 500 }
    )
  }
}