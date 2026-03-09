import { Request, Response, NextFunction } from 'express'

interface AdminRequest extends Request {
  user?: {
    id?: string
    email?: string
    role?: string
  }
}

export function adminMiddleware(
  req: AdminRequest,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      })
    }

    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: Admin access only',
      })
    }

    next()
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Admin authorization failed',
    })
  }
}