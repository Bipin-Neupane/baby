'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/hooks/useCart'
import { useAuth } from '@/hooks/useAuth'
import { calculateCartTotal, generateOrderNumber } from '@/lib/utils'
import { supabase } from '@/lib/supabase'
import { CreditCard, Truck, Shield, ChevronRight } from 'lucide-react'
import toast from 'react-hot-toast'
import { getEbookIconAndColor } from '@/lib/ebookUtils'
import PayPalButton from '@/components/payment/PayPalButtonSafe'
import StripePayment from '@/components/payment/StripePayment'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, clearCart } = useCart()
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState('card') // 'card' or 'paypal'
  
  const [formData, setFormData] = useState({
    // Customer Info
    email: user?.email || '',
    name: '',
    phone: '',
    
    // Shipping Address
    shippingStreet: '',
    shippingCity: '',
    shippingState: '',
    shippingZip: '',
    shippingCountry: 'United States',
    
    // Billing Address
    sameAsShipping: true,
    billingStreet: '',
    billingCity: '',
    billingState: '',
    billingZip: '',
    billingCountry: 'United States',
    
    // Additional
    notes: ''
  })

  const { subtotal, shipping, tax, total } = calculateCartTotal(items)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  // Fixed email validation function
  const validateEmail = (email) => {
    // More permissive email regex that handles most valid emails
    const emailRegex = /^[a-zA-Z0-9][a-zA-Z0-9._-]*@[a-zA-Z0-9][a-zA-Z0-9.-]*\.[a-zA-Z]{2,}$/
    
    // Basic validation - just check for @ and .
    // This is more permissive and handles edge cases better
    if (!email || email.length < 3) return false
    if (!email.includes('@')) return false
    
    const parts = email.split('@')
    if (parts.length !== 2) return false
    
    const [localPart, domain] = parts
    if (!localPart || !domain) return false
    
    // Check domain has at least one dot
    if (!domain.includes('.')) return false
    
    // Check domain doesn't start or end with dot
    if (domain.startsWith('.') || domain.endsWith('.')) return false
    
    return true
  }

  const validateStep = (stepNumber) => {
    switch (stepNumber) {
      case 1:
        if (!formData.email || !formData.name || !formData.phone) {
          toast.error('Please fill in all customer information')
          return false
        }
        if (!validateEmail(formData.email)) {
          toast.error('Please enter a valid email address')
          return false
        }
        return true
      
      case 2:
        if (!formData.shippingStreet || !formData.shippingCity || 
            !formData.shippingState || !formData.shippingZip) {
          toast.error('Please fill in all shipping address fields')
          return false
        }
        if (!formData.sameAsShipping) {
          if (!formData.billingStreet || !formData.billingCity || 
              !formData.billingState || !formData.billingZip) {
            toast.error('Please fill in all billing address fields')
            return false
          }
        }
        return true
      
      case 3:
        // Stripe validation is handled by the Stripe Elements component
        // PayPal validation is handled by the PayPal component
        return true
      
      default:
        return true
    }
  }

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1)
    }
  }

  const prevStep = () => {
    setStep(step - 1)
  }

  const handlePayPalSuccess = async (paymentDetails) => {
    setLoading(true)
    
    try {
      // Verify payment with PayPal API
      const verifyResponse = await fetch('/api/paypal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId: paymentDetails.paymentId,
          captureId: paymentDetails.captureId
        })
      })

      if (!verifyResponse.ok) {
        throw new Error('Payment verification failed')
      }

      const verificationResult = await verifyResponse.json()

      if (!verificationResult.verified) {
        throw new Error('Payment could not be verified')
      }

      const orderData = {
        order_number: generateOrderNumber(),
        customer_email: formData.email,
        customer_name: formData.name,
        customer_phone: formData.phone,
        shipping_address: {
          street: formData.shippingStreet,
          city: formData.shippingCity,
          state: formData.shippingState,
          zip: formData.shippingZip,
          country: formData.shippingCountry
        },
        billing_address: formData.sameAsShipping ? null : {
          street: formData.billingStreet,
          city: formData.billingCity,
          state: formData.billingState,
          zip: formData.billingZip,
          country: formData.billingCountry
        },
        items: items.map(item => ({
          product_id: item.product.id,
          product_name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          total: item.product.price * item.quantity
        })),
        subtotal,
        shipping_cost: shipping,
        tax,
        total,
        status: 'completed',
        payment_method: 'paypal',
        payment_status: 'paid',
        payment_details: {
          paypal_payment_id: paymentDetails.paymentId,
          paypal_payer_id: paymentDetails.payerId,
          paypal_transaction_id: paymentDetails.transactionId,
          paypal_capture_id: paymentDetails.captureId,
          payer_email: paymentDetails.payerEmail,
          payer_name: paymentDetails.payerName
        },
        notes: formData.notes
      }

      const { data, error } = await supabase
        .from('orders')
        .insert([orderData])
        .select()
        .single()

      if (error) throw error

      clearCart()
      toast.success('PayPal payment completed successfully!')
      router.push(`/orders/${data.id}/confirmation`)
      
    } catch (error) {
      console.error('Error processing PayPal payment:', error)
      toast.error('Failed to process PayPal payment. Please contact support.')
    } finally {
      setLoading(false)
    }
  }

  const handlePayPalError = (error) => {
    console.error('PayPal payment error:', error)
    toast.error('PayPal payment failed. Please try again.')
    setLoading(false)
  }

  const handleStripeSuccess = async (paymentDetails) => {
    setLoading(true)
    
    try {
      const orderData = {
        order_number: generateOrderNumber(),
        customer_email: formData.email,
        customer_name: formData.name,
        customer_phone: formData.phone,
        shipping_address: {
          street: formData.shippingStreet,
          city: formData.shippingCity,
          state: formData.shippingState,
          zip: formData.shippingZip,
          country: formData.shippingCountry
        },
        billing_address: formData.sameAsShipping ? null : {
          street: formData.billingStreet,
          city: formData.billingCity,
          state: formData.billingState,
          zip: formData.billingZip,
          country: formData.billingCountry
        },
        items: items.map(item => ({
          product_id: item.product.id,
          product_name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          total: item.product.price * item.quantity
        })),
        subtotal,
        shipping_cost: shipping,
        tax,
        total,
        status: 'completed',
        payment_method: 'stripe',
        payment_status: 'paid',
        payment_details: {
          stripe_payment_id: paymentDetails.paymentId,
          stripe_payment_method_id: paymentDetails.paymentMethodId,
          stripe_transaction_id: paymentDetails.transactionId,
          receipt_url: paymentDetails.receiptUrl,
          amount: paymentDetails.amount,
          currency: paymentDetails.currency
        },
        notes: formData.notes
      }

      const { data, error } = await supabase
        .from('orders')
        .insert([orderData])
        .select()
        .single()

      if (error) throw error

      clearCart()
      toast.success('Credit card payment completed successfully!')
      router.push(`/orders/${data.id}/confirmation`)
      
    } catch (error) {
      console.error('Error processing Stripe payment:', error)
      toast.error('Failed to process credit card payment. Please contact support.')
    } finally {
      setLoading(false)
    }
  }

  const handleStripeError = (error) => {
    console.error('Stripe payment error:', error)
    toast.error('Credit card payment failed. Please try again.')
    setLoading(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateStep(3)) return
    
    setLoading(true)

    try {
      const orderData = {
        order_number: generateOrderNumber(),
        customer_email: formData.email,
        customer_name: formData.name,
        customer_phone: formData.phone,
        shipping_address: {
          street: formData.shippingStreet,
          city: formData.shippingCity,
          state: formData.shippingState,
          zip: formData.shippingZip,
          country: formData.shippingCountry
        },
        billing_address: formData.sameAsShipping ? null : {
          street: formData.billingStreet,
          city: formData.billingCity,
          state: formData.billingState,
          zip: formData.billingZip,
          country: formData.billingCountry
        },
        items: items.map(item => ({
          product_id: item.product.id,
          product_name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          total: item.product.price * item.quantity
        })),
        subtotal,
        shipping_cost: shipping,
        tax,
        total,
        status: 'pending',
        payment_method: 'credit_card',
        payment_status: 'paid',
        notes: formData.notes
      }

      const { data, error } = await supabase
        .from('orders')
        .insert([orderData])
        .select()
        .single()

      if (error) throw error

      clearCart()
      toast.success('Order placed successfully!')
      router.push(`/orders/${data.id}/confirmation`)
    } catch (error) {
      console.error('Error placing order:', error)
      toast.error('Failed to place order. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
        <p className="text-gray-600 mb-8">Add some items to your cart before checkout</p>
        <a href="/products" className="btn-primary">Continue Shopping</a>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
        
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full text-sm sm:text-base ${
              step >= 1 ? 'bg-purple-600 text-white' : 'bg-gray-300 text-gray-600'
            }`}>
              1
            </div>
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            <div className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full text-sm sm:text-base ${
              step >= 2 ? 'bg-purple-600 text-white' : 'bg-gray-300 text-gray-600'
            }`}>
              2
            </div>
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            <div className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full text-sm sm:text-base ${
              step >= 3 ? 'bg-purple-600 text-white' : 'bg-gray-300 text-gray-600'
            }`}>
              3
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="order-2 lg:order-1 lg:col-span-2">
            <form onSubmit={handleSubmit}>
              {/* Step 1: Customer Information */}
              {step === 1 && (
                <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm">
                  <h2 className="text-xl font-semibold mb-6">Customer Information</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="input"
                        placeholder="you@example.com"
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="input"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="input"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end">
                    <button
                      type="button"
                      onClick={nextStep}
                      className="btn-primary w-full sm:w-auto"
                    >
                      Continue to Shipping
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Shipping & Billing - Same as before */}
              {step === 2 && (
                <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm">
                  <h2 className="text-xl font-semibold mb-6">Shipping Address</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Street Address
                      </label>
                      <input
                        type="text"
                        name="shippingStreet"
                        value={formData.shippingStreet}
                        onChange={handleChange}
                        required
                        className="input"
                        placeholder="123 Main Street"
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          City
                        </label>
                        <input
                          type="text"
                          name="shippingCity"
                          value={formData.shippingCity}
                          onChange={handleChange}
                          required
                          className="input"
                          placeholder="New York"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          State
                        </label>
                        <input
                          type="text"
                          name="shippingState"
                          value={formData.shippingState}
                          onChange={handleChange}
                          required
                          className="input"
                          placeholder="NY"
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          ZIP Code
                        </label>
                        <input
                          type="text"
                          name="shippingZip"
                          value={formData.shippingZip}
                          onChange={handleChange}
                          required
                          className="input"
                          placeholder="10001"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Country
                        </label>
                        <select
                          name="shippingCountry"
                          value={formData.shippingCountry}
                          onChange={handleChange}
                          className="input"
                        >
                          <option>United States</option>
                          <option>Canada</option>
                          <option>Mexico</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="sameAsShipping"
                          checked={formData.sameAsShipping}
                          onChange={handleChange}
                          className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          Billing address same as shipping
                        </span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex flex-col sm:flex-row justify-between gap-3 sm:gap-0">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="btn-secondary w-full sm:w-auto order-2 sm:order-1"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      className="btn-primary w-full sm:w-auto order-1 sm:order-2"
                    >
                      Continue to Payment
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Payment - Same as before */}
              {step === 3 && (
                <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm">
                  <h2 className="text-xl font-semibold mb-6">Payment Information</h2>
                  
                  {/* Payment Method Selection */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Choose Payment Method
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('card')}
                        className={`p-4 border-2 rounded-lg flex items-center justify-center transition-all text-sm sm:text-base ${
                          paymentMethod === 'card' 
                            ? 'border-purple-500 bg-purple-50 text-purple-700' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                        Credit Card
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('paypal')}
                        className={`p-4 border-2 rounded-lg flex items-center justify-center transition-all text-sm sm:text-base ${
                          paymentMethod === 'paypal' 
                            ? 'border-blue-500 bg-blue-50 text-blue-700' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h8.418c2.508 0 4.718.382 5.718 1.801.999 1.419.999 3.192.999 4.615 0 3.646-2.426 6.126-6.034 6.126H10.27l-1.205 7.795a.641.641 0 0 1-.633.74H7.076z"/>
                        </svg>
                        PayPal
                      </button>
                    </div>
                  </div>

                  {/* Stripe Credit Card Payment */}
                  {paymentMethod === 'card' && (
                    <div className="mb-6">
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                        <p className="text-blue-800 text-sm mb-2">
                          <strong>Pay with Credit Card</strong>
                        </p>
                        <p className="text-blue-700 text-sm">
                          Secure payment processing powered by Stripe. Your card information is encrypted and secure.
                        </p>
                      </div>
                      
                      <StripePayment
                        total={total}
                        items={items}
                        customerInfo={formData}
                        onSuccess={handleStripeSuccess}
                        onError={handleStripeError}
                        disabled={step !== 3 || loading}
                      />
                    </div>
                  )}

                  {/* PayPal Payment */}
                  {paymentMethod === 'paypal' && (
                    <div className="mb-6">
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                        <p className="text-blue-800 text-sm mb-2">
                          <strong>Pay with PayPal</strong>
                        </p>
                        <p className="text-blue-700 text-sm">
                          You'll be redirected to PayPal to complete your payment securely. 
                          No need to enter credit card details here.
                        </p>
                      </div>
                      
                      <PayPalButton
                        total={total}
                        items={items}
                        customerInfo={formData}
                        onSuccess={handlePayPalSuccess}
                        onError={handlePayPalError}
                        disabled={step !== 3 || loading}
                      />
                    </div>
                  )}
                  
                  {/* Order Notes */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Order Notes (Optional)
                    </label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      rows="3"
                      className="input"
                      placeholder="Special instructions for your order..."
                    />
                  </div>
                  
                  <div className="flex items-center justify-center space-x-6 py-4 border-t border-gray-200">
                    <div className="flex items-center text-sm text-gray-600">
                      <Shield className="w-4 h-4 mr-1 text-green-600" />
                      SSL Secured
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <CreditCard className="w-4 h-4 mr-1 text-blue-600" />
                      PCI Compliant
                    </div>
                  </div>
                  
                  <div className="mt-6 flex flex-col sm:flex-row justify-between gap-3 sm:gap-0">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="btn-secondary w-full sm:w-auto order-2 sm:order-1"
                    >
                      Back
                    </button>
                    
                    <div className="order-1 sm:order-2 text-center">
                      {paymentMethod === 'paypal' && (
                        <div className="text-sm text-gray-600">
                          Complete payment with PayPal above
                        </div>
                      )}
                      
                      {paymentMethod === 'card' && (
                        <div className="text-sm text-gray-600">
                          Complete payment with credit card above
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="order-1 lg:order-2 lg:col-span-1">
            <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm lg:sticky lg:top-4">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {items.map((item) => {
                  const { icon: IconComponent, color } = getEbookIconAndColor(item.product.id)
                  return (
                    <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0">
                        <div className={`w-12 h-12 bg-gradient-to-r ${color} rounded-lg flex items-center justify-center shadow-sm`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 text-sm truncate">{item.product.name}</p>
                        <p className="text-gray-600 text-xs">Qty: {item.quantity} • Digital Download</p>
                      </div>
                      <div className="text-gray-900 font-medium text-sm">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  )
                })}
              </div>
              
              <div className="space-y-2 py-4 border-t border-gray-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-green-600 font-medium">FREE</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span className="text-green-600 font-medium">$0.00</span>
                </div>
              </div>
              
              <div className="py-4 border-t border-gray-200">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <div className="flex items-start text-green-800">
                  <Truck className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-sm font-medium leading-relaxed">🎉 Always free shipping & no taxes on all orders!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}