import { Router, Request, Response } from 'express'

const router = Router()

router.get('/', (_req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    products: [
      {
        id: '1',
        name: 'Organic Fertilizer',
        price: 499,
      },
      {
        id: '2',
        name: 'Bio Pesticide',
        price: 299,
      },
    ],
  })
})

export default router