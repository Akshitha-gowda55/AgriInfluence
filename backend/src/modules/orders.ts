import express from 'express'
import { authMiddleware } from '../middleware/auth'

const router = express.Router()

type OrderItem = {
  id: string
  name: string
  price: number
  quantity: number
}

type Order = {
  id: string
  userId?: string
  items: OrderItem[]
  total: number
  date: string
  status: string
}

interface AuthRequest extends express.Request {
  user?: {
    id?: string
    email?: string
    role?: string
  }
}

const orders: Order[] = []

router.get('/', authMiddleware, (req: AuthRequest, res) => {
  const userOrders =
    req.user?.role === 'admin'
      ? orders
      : orders.filter((order) => order.userId === req.user?.id)

  res.json({
    success: true,
    orders: userOrders,
  })
})

router.get('/:id', authMiddleware, (req: AuthRequest, res) => {
  const order = orders.find((o) => o.id === req.params.id)

  if (!order) {
    return res.status(404).json({
      success: false,
      message: 'Order not found',
    })
  }

  if (req.user?.role !== 'admin' && order.userId !== req.user?.id) {
    return res.status(403).json({
      success: false,
      message: 'Forbidden',
    })
  }

  return res.json({
    success: true,
    order,
  })
})

router.post('/', authMiddleware, (req: AuthRequest, res) => {
  const { items, total, status } = req.body

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Order items are required',
    })
  }

  if (typeof total !== 'number') {
    return res.status(400).json({
      success: false,
      message: 'Valid order total is required',
    })
  }

  const newOrder: Order = {
    id: `ORD-${Date.now()}`,
    userId: req.user?.id,
    items,
    total,
    date: new Date().toISOString(),
    status: status || 'Paid',
  }

  orders.push(newOrder)

  return res.status(201).json({
    success: true,
    message: 'Order created successfully',
    order: newOrder,
  })
})

router.put('/:id/status', authMiddleware, (req: AuthRequest, res) => {
  const order = orders.find((o) => o.id === req.params.id)

  if (!order) {
    return res.status(404).json({
      success: false,
      message: 'Order not found',
    })
  }

  if (req.user?.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Only admins can update order status',
    })
  }

  const { status } = req.body

  if (!status) {
    return res.status(400).json({
      success: false,
      message: 'Status is required',
    })
  }

  order.status = status

  return res.json({
    success: true,
    message: 'Order status updated successfully',
    order,
  })
})

export default router