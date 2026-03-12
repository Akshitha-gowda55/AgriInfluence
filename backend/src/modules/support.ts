import { Router, Request, Response } from 'express'

const router = Router()

router.get('/', (_req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    message: 'Support route working',
  })
})

export default router