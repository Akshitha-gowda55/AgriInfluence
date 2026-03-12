import { Router, Request, Response } from 'express'

const router = Router()

router.post('/login', (_req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    token: 'demo-token',
    user: {
      id: '1',
      name: 'Admin User',
      email: 'admin@agrinfluence.com',
      role: 'admin',
    },
  })
})

router.post('/signup', (_req: Request, res: Response) => {
  return res.status(201).json({
    success: true,
    message: 'Signup successful',
  })
})

export default router