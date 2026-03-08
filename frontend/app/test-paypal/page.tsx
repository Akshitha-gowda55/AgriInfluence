'use client'

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"

export default function TestPayPal() {
  return (
    <PayPalScriptProvider
      options={{
        "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "",
        currency: "USD",
      }}
    >
      <PayPalButtons
        style={{ layout: "vertical", color: "blue", shape: "rect", label: "paypal" }}
        createOrder={(data, actions) => {
          if (!actions.order) throw new Error("PayPal actions not available")
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: "10.00", // payment amount
                },
              },
            ],
          })
        }}
        onApprove={async (data, actions) => {
          if (!actions.order) throw new Error("PayPal actions not available")
          const details = await actions.order.capture()
          alert(`Transaction completed by ${details.payer.name?.given_name || "user"}!`)
          console.log(details)
        }}
        onError={(err) => {
          console.error("PayPal Checkout Error:", err)
          alert("Payment failed. Check console for details.")
        }}
      />
    </PayPalScriptProvider>
  )
}