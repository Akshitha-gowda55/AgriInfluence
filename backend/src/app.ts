import express, { Request, Response } from 'express'
import cors from 'cors'

import authRoutes from './modules/auth'
import productRoutes from './modules/products'
import orderRoutes from './modules/orders'
import paymentRoutes from './modules/payments'
import reviewRoutes from './modules/reviews'
import adminRoutes from './modules/admin'

const app = express()

app.use(
  cors({
    origin: '*',
    credentials: true,
  })
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'AgriInfluence backend running',
  })
})

app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/payments', paymentRoutes)
app.use('/api/reviews', reviewRoutes)
app.use('/api/admin', adminRoutes)

export default app