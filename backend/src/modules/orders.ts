import { Router, Response } from 'express'
import { authMiddleware, AuthRequest } from '../middleware/auth'

const router = Router()

router.get('/', authMiddleware, (_req: AuthRequest, res: Response) => {
  return res.status(200).json({
    success: true,
    orders: [],
  })
})

router.post('/', authMiddleware, (req: AuthRequest, res: Response) => {
  return res.status(201).json({
    success: true,
    message: 'Order created successfully',
    order: req.body,
  })
})

export default router