'use client'

import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import toast from 'react-hot-toast'

export default function PayPalButton({ 
  total, 
  items, 
  onSuccess, 
  onError, 
  customerInfo,
  disabled = false 
}) {
  const initialOptions = {
    'client-id': process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
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
          custom_id: `order_${Date.now()}`,
          shipping: {
            name: {
              full_name: customerInfo?.name || 'Customer'
            },
            address: {
              address_line_1: customerInfo?.shippingStreet || 'Digital Delivery',
              admin_area_2: customerInfo?.shippingCity || 'N/A',
              admin_area_1: customerInfo?.shippingState || 'N/A',
              postal_code: customerInfo?.shippingZip || '00000',
              country_code: 'US'
            }
          }
        }
      ],
      application_context: {
        shipping_preference: 'NO_SHIPPING', // Digital goods don't need shipping
        user_action: 'PAY_NOW',
        brand_name: 'Baby Care Guides',
        locale: 'en-US',
        landing_page: 'BILLING',
        return_url: `${window.location.origin}/orders/success`,
        cancel_url: `${window.location.origin}/checkout`
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

  if (!process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID) {
    return (
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-yellow-800 text-sm">
          PayPal is not configured. Please set up your PayPal credentials.
        </p>
      </div>
    )
  }

  return (
    <div className="w-full">
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
    </div>
  )
}