'use client'

import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'

export default function PayPalButtonSafe({ 
  total, 
  items, 
  onSuccess, 
  onError, 
  customerInfo,
  disabled = false 
}) {
  const [isConfigured, setIsConfigured] = useState(false)
  const [PayPalComponent, setPayPalComponent] = useState(null)

  useEffect(() => {
    // Check if PayPal is properly configured
    const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID
    
    if (!clientId || clientId === 'your_paypal_client_id_here') {
      setIsConfigured(false)
      return
    }

    // Dynamically import PayPal components only when configured
    const loadPayPal = async () => {
      try {
        const { PayPalScriptProvider, PayPalButtons } = await import('@paypal/react-paypal-js')
        
        const PayPalComponentInner = () => {
          const initialOptions = {
            'client-id': clientId,
            'enable-funding': 'venmo',
            'disable-funding': '',
            currency: 'USD',
            environment: process.env.NEXT_PUBLIC_PAYPAL_ENVIRONMENT || 'sandbox',
            components: 'buttons',
            locale: 'en_US'
          }

          const createOrder = (data, actions) => {
            if (!total || total <= 0) {
              toast.error('Invalid order total')
              return Promise.reject('Invalid total')
            }

            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    currency_code: 'USD',
                    value: total.toFixed(2),
                    breakdown: {
                      item_total: {
                        currency_code: 'USD',
                        value: total.toFixed(2)
                      }
                    }
                  },
                  items: items.map(item => ({
                    name: item.product.name,
                    unit_amount: {
                      currency_code: 'USD',
                      value: item.product.price.toFixed(2)
                    },
                    quantity: item.quantity.toString(),
                    description: `Digital ebook: ${item.product.name}`,
                    category: 'DIGITAL_GOODS'
                  })),
                  description: 'Digital Baby Care Ebooks',
                  custom_id: `order_${Date.now()}`
                }
              ],
              application_context: {
                shipping_preference: 'NO_SHIPPING',
                user_action: 'PAY_NOW',
                brand_name: 'Baby Care Guides',
                locale: 'en-US',
                landing_page: 'BILLING'
              }
            })
          }

          const onApprove = async (data, actions) => {
            try {
              const order = await actions.order.capture()
              
              if (order.status === 'COMPLETED') {
                const paymentDetails = {
                  paymentId: order.id,
                  payerId: order.payer.payer_id,
                  paymentMethod: 'paypal',
                  paymentStatus: 'completed',
                  amount: order.purchase_units[0].amount.value,
                  currency: order.purchase_units[0].amount.currency_code,
                  payerEmail: order.payer.email_address,
                  payerName: `${order.payer.name.given_name} ${order.payer.name.surname}`,
                  transactionId: order.purchase_units[0].payments.captures[0].id,
                  captureId: order.purchase_units[0].payments.captures[0].id
                }

                await onSuccess(paymentDetails)
              } else {
                throw new Error(`Payment not completed. Status: ${order.status}`)
              }
            } catch (error) {
              console.error('PayPal payment error:', error)
              toast.error('Payment processing failed. Please try again.')
              onError(error)
            }
          }

          const onErrorHandler = (error) => {
            console.error('PayPal button error:', error)
            toast.error('PayPal payment failed. Please try again.')
            onError(error)
          }

          const onCancel = (data) => {
            toast.info('Payment was cancelled')
            console.log('PayPal payment cancelled:', data)
          }

          return (
            <PayPalScriptProvider options={initialOptions}>
              <div className="relative">
                <PayPalButtons
                  createOrder={createOrder}
                  onApprove={onApprove}
                  onError={onErrorHandler}
                  onCancel={onCancel}
                  disabled={disabled}
                  style={{
                    layout: 'vertical',
                    color: 'gold',
                    shape: 'rect',
                    label: 'paypal',
                    tagline: false,
                    height: 45
                  }}
                  forceReRender={[total, items, customerInfo, disabled]}
                />
                
                {disabled && (
                  <div className="absolute inset-0 bg-gray-100 bg-opacity-75 rounded-lg flex items-center justify-center">
                    <span className="text-gray-500 text-sm">Complete previous steps to enable PayPal</span>
                  </div>
                )}
              </div>
            </PayPalScriptProvider>
          )
        }

        setPayPalComponent(() => PayPalComponentInner)
        setIsConfigured(true)
        
      } catch (error) {
        console.error('Failed to load PayPal:', error)
        setIsConfigured(false)
      }
    }

    loadPayPal()
  }, [])

  if (!isConfigured) {
    return (
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-yellow-800 text-sm font-medium mb-2">
          PayPal Setup Required
        </p>
        <p className="text-yellow-700 text-sm">
          To enable PayPal payments, please add your PayPal credentials to the environment variables:
        </p>
        <ul className="text-yellow-700 text-xs mt-2 list-disc list-inside">
          <li>NEXT_PUBLIC_PAYPAL_CLIENT_ID</li>
          <li>PAYPAL_CLIENT_SECRET</li>
        </ul>
        <p className="text-yellow-700 text-xs mt-2">
          Get credentials from: <span className="font-mono">https://developer.paypal.com</span>
        </p>
      </div>
    )
  }

  if (!PayPalComponent) {
    return (
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-blue-800 text-sm">Loading PayPal...</p>
      </div>
    )
  }

  return (
    <div className="w-full">
      <PayPalComponent />
    </div>
  )
}