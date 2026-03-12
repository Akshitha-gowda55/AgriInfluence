type EmailPayload = {
  to: string
  subject: string
  html?: string
  text?: string
}

export async function sendEmail(payload: EmailPayload) {
  try {
    console.log('Mock email sent:')
    console.log({
      to: payload.to,
      subject: payload.subject,
      html: payload.html,
      text: payload.text,
    })

    return {
      success: true,
      message: 'Email sent successfully',
    }
  } catch (error) {
    console.error('Email sending failed:', error)

    return {
      success: false,
      message: 'Failed to send email',
    }
  }
}

export async function sendOrderConfirmationEmail(
  email: string,
  orderId: string,
  total: number
) {
  return sendEmail({
    to: email,
    subject: `Order Confirmation - ${orderId}`,
    text: `Thank you for your order. Your order ${orderId} has been placed successfully. Total: ₹${total.toFixed(
      2
    )}`,
  })
}

export async function sendSupportAcknowledgementEmail(
  email: string,
  name: string
) {
  return sendEmail({
    to: email,
    subject: 'Support Request Received',
    text: `Hello ${name}, we have received your support request and will get back to you soon.`,
  })
}