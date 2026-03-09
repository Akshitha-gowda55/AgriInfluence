import express from 'express'
import { authMiddleware } from '../middleware/auth'
import { adminMiddleware } from '../middleware/admin'

import { Router } from 'express'

const router = Router()

router.get('/dashboard', authMiddleware, adminMiddleware, (_req, res) => {
  return res.json({
    success: true,
    data: {
      totalUsers: 120,
      totalOrders: 54,
      totalProducts: 8,
      totalRevenue: 12540,
      pendingSupportTickets: 6,
    },
  })
})

router.get('/stats', authMiddleware, adminMiddleware, (_req, res) => {
  return res.json({
    success: true,
    stats: {
      ordersToday: 12,
      newUsersToday: 5,
      lowStockProducts: 3,
      deliveredOrders: 31,
    },
  })
})

router.post('/action', authMiddleware, adminMiddleware, (req, res) => {
  const { action, targetId } = req.body

  if (!action) {
    return res.status(400).json({
      success: false,
      message: 'Admin action is required',
    })
  }

  return res.json({
    success: true,
    message: `Admin action "${action}" executed successfully`,
    targetId: targetId || null,
  })
})
router.get('/', (_req, res) => {
  res.json({
    success: true,
    message: 'Admin route working',
  })
})


export default router