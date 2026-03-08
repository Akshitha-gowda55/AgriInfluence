'use client'

import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'

export default function TestPayPal() {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? ''

  return (
    <PayPalScriptProvider
      options={{
        clientId,
        currency: 'USD',
        intent: 'capture',
      }}
    >
      <PayPalButtons
        style={{ layout: 'vertical', color: 'blue', shape: 'rect', label: 'paypal' }}
        createOrder={(data, actions) => {
          if (!actions.order) throw new Error('PayPal actions not available')

          return actions.order.create({
            intent: 'CAPTURE',
            purchase_units: [
              {
                amount: {
                  currency_code: 'USD',
                  value: '10.00',
                },
              },
            ],
          })
        }}
        onApprove={async (data, actions) => {
          if (!actions.order) throw new Error('PayPal actions not available')

          const details = await actions.order.capture()
          alert(
            `Transaction completed by ${details?.payer?.name?.given_name || 'user'}!`
          )
          console.log(details)
        }}
        onError={(err) => {
          console.error('PayPal Checkout Error:', err)
          alert('Payment failed. Check console for details.')
        }}
      />
    </PayPalScriptProvider>
  )
}