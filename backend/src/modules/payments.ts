import express from 'express'
import Razorpay from 'razorpay'
import crypto from 'crypto'
import { authMiddleware } from '../middleware/auth'

const router = express.Router()

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || '',
  key_secret: process.env.RAZORPAY_KEY_SECRET || '',
})

router.post('/create-order', authMiddleware, async (req, res) => {
  try {
    const { amount, currency = 'INR', receipt } = req.body

    if (!amount || typeof amount !== 'number') {
      return res.status(400).json({
        success: false,
        message: 'Valid amount is required',
      })
    }

    const options = {
      amount: Math.round(amount),
      currency,
      receipt: receipt || `receipt_${Date.now()}`,
    }

    const order = await razorpay.orders.create(options)

    return res.status(201).json({
      success: true,
      order,
    })
  } catch (error) {
    console.error('Razorpay create-order error:', error)

    return res.status(500).json({
      success: false,
      message: 'Failed to create Razorpay order',
    })
  }
})

router.post('/verify', authMiddleware, (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: 'Payment verification fields are required',
      })
    }

    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '')
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex')

    const isValid = generatedSignature === razorpay_signature

    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: 'Invalid payment signature',
      })
    }

    return res.json({
      success: true,
      message: 'Payment verified successfully',
    })
  } catch (error) {
    console.error('Razorpay verify error:', error)

    return res.status(500).json({
      success: false,
      message: 'Payment verification failed',
    })
  }
})

export default router