'use client'

import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js'
import toast from 'react-hot-toast'

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

// Card Element styling
const cardElementOptions = {
  style: {
    base: {
      fontSize: '16px',
      color: '#424770',
      '::placeholder': {
        color: '#aab7c4',
      },
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      fontSmoothing: 'antialiased',
      padding: '12px',
    },
    invalid: {
      color: '#9e2146',
    },
  },
  hidePostalCode: false,
}

function StripeCheckoutForm({ 
  total, 
  items, 
  customerInfo, 
  onSuccess, 
  onError, 
  disabled = false 
}) {
  const stripe = useStripe()
  const elements = useElements()
  const [processing, setProcessing] = useState(false)
  const [cardError, setCardError] = useState(null)

  const handleCardChange = (event) => {
    if (event.error) {
      setCardError(event.error.message)
    } else {
      setCardError(null)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    if (disabled || processing) {
      return
    }

    setProcessing(true)
    setCardError(null)

    const cardElement = elements.getElement(CardElement)

    try {
      // Create payment intent
      const response = await fetch('/api/stripe/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: Math.round(total * 100), // Convert to cents
          currency: 'usd',
          items: items,
          customerInfo: customerInfo
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create payment intent')
      }

      const { clientSecret, paymentIntentId } = await response.json()

      // Confirm payment with Stripe
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: customerInfo?.name || 'Customer',
            email: customerInfo?.email || '',
            phone: customerInfo?.phone || '',
            address: {
              line1: customerInfo?.billingStreet || customerInfo?.shippingStreet || '',
              city: customerInfo?.billingCity || customerInfo?.shippingCity || '',
              state: customerInfo?.billingState || customerInfo?.shippingState || '',
              postal_code: customerInfo?.billingZip || customerInfo?.shippingZip || '',
              country: 'US',
            },
          },
        },
      })

      if (result.error) {
        setCardError(result.error.message)
        toast.error(result.error.message)
        onError(result.error)
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          const paymentDetails = {
            paymentId: result.paymentIntent.id,
            paymentMethod: 'stripe',
            paymentStatus: 'succeeded',
            amount: (result.paymentIntent.amount / 100).toFixed(2),
            currency: result.paymentIntent.currency.toUpperCase(),
            paymentMethodId: result.paymentIntent.payment_method,
            receiptUrl: result.paymentIntent.charges.data[0]?.receipt_url,
            transactionId: result.paymentIntent.charges.data[0]?.id
          }

          toast.success('Payment successful!')
          await onSuccess(paymentDetails)
        }
      }
    } catch (error) {
      console.error('Stripe payment error:', error)
      const errorMessage = error.message || 'Payment failed. Please try again.'
      setCardError(errorMessage)
      toast.error(errorMessage)
      onError(error)
    } finally {
      setProcessing(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Card Information
        </label>
        <div className="border border-gray-300 rounded-lg p-4 bg-white">
          <CardElement 
            options={cardElementOptions}
            onChange={handleCardChange}
          />
        </div>
        {cardError && (
          <div className="mt-2 text-sm text-red-600">
            {cardError}
          </div>
        )}
      </div>

      <div className="flex items-center justify-center space-x-4 py-3 border-t border-gray-200 mb-6">
        <div className="flex items-center text-sm text-gray-600">
          <svg className="w-4 h-4 mr-1 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          SSL Secured
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <svg className="w-4 h-4 mr-1 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
          Powered by Stripe
        </div>
      </div>

      <button
        type="submit"
        disabled={!stripe || processing || disabled}
        className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {processing ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Processing...
          </div>
        ) : (
          `Pay $${total.toFixed(2)} with Card`
        )}
      </button>
    </form>
  )
}

export default function StripePayment({ 
  total, 
  items, 
  customerInfo, 
  onSuccess, 
  onError, 
  disabled = false 
}) {
  if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY === 'your_stripe_publishable_key_here') {
    return (
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-yellow-800 text-sm font-medium mb-2">
          Stripe Setup Required
        </p>
        <p className="text-yellow-700 text-sm">
          To enable credit card payments, please add your Stripe credentials to the environment variables:
        </p>
        <ul className="text-yellow-700 text-xs mt-2 list-disc list-inside">
          <li>NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY</li>
          <li>STRIPE_SECRET_KEY</li>
        </ul>
        <p className="text-yellow-700 text-xs mt-2">
          Get credentials from: <span className="font-mono">https://dashboard.stripe.com/apikeys</span>
        </p>
      </div>
    )
  }

  return (
    <div className="w-full">
      <Elements stripe={stripePromise}>
        <StripeCheckoutForm
          total={total}
          items={items}
          customerInfo={customerInfo}
          onSuccess={onSuccess}
          onError={onError}
          disabled={disabled}
        />
      </Elements>
    </div>
  )
}