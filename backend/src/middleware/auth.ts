import { Request, Response, NextFunction } from 'express'

export interface AuthRequest extends Request {
  user?: {
    id?: string
    email?: string
    role?: string
  }
}

export const authMiddleware = (
  req: AuthRequest,
  _res: Response,
  next: NextFunction
) => {
  req.user = {
    id: '1',
    email: 'admin@agrinfluence.com',
    role: 'admin',
  }

  next()
}