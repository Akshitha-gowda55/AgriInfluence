import express, { Request, Response } from 'express'
import { authMiddleware } from '../middleware/auth'
import { adminMiddleware } from '../middleware/admin'

const router = express.Router()

type UserRole = 'customer' | 'admin'

type User = {
  id: string
  name: string
  email: string
  role: UserRole
}

type CreateUserBody = {
  name?: string
  email?: string
  role?: string
}

type UpdateUserBody = {
  name?: string
  email?: string
  role?: string
}

interface AuthRequest extends Request {
  user?: {
    id?: string
    email?: string
    role?: string
  }
}

const users: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@agrinfluence.com',
    role: 'admin',
  },
  {
    id: '2',
    name: 'Demo Customer',
    email: 'customer@agrinfluence.com',
    role: 'customer',
  },
]

router.get('/me', authMiddleware, (req: AuthRequest, res: Response) => {
  const user = users.find((u) => u.id === req.user?.id)

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found',
    })
  }

  return res.status(200).json({
    success: true,
    user,
  })
})

router.get('/', authMiddleware, adminMiddleware, (_req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    users,
  })
})

router.get('/:id', authMiddleware, adminMiddleware, (req: Request, res: Response) => {
  const user = users.find((u) => u.id === req.params.id)

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found',
    })
  }

  return res.status(200).json({
    success: true,
    user,
  })
})

router.post(
  '/',
  authMiddleware,
  adminMiddleware,
  (req: Request<{}, {}, CreateUserBody>, res: Response) => {
    const { name, email, role } = req.body

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Name and email are required',
      })
    }

    const existingUser = users.find((u) => u.email === email)

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'User already exists',
      })
    }

    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      role: role === 'admin' ? 'admin' : 'customer',
    }

    users.push(newUser)

    return res.status(201).json({
      success: true,
      message: 'User created successfully',
      user: newUser,
    })
  }
)

router.put(
  '/:id',
  authMiddleware,
  adminMiddleware,
  (req: Request<{ id: string }, {}, UpdateUserBody>, res: Response) => {
    const user = users.find((u) => u.id === req.params.id)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      })
    }

    const { name, email, role } = req.body

    if (name !== undefined) user.name = name
    if (email !== undefined) user.email = email
    if (role !== undefined) user.role = role === 'admin' ? 'admin' : 'customer'

    return res.status(200).json({
      success: true,
      message: 'User updated successfully',
      user,
    })
  }
)

router.delete('/:id', authMiddleware, adminMiddleware, (req: Request, res: Response) => {
  const index = users.findIndex((u) => u.id === req.params.id)

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: 'User not found',
    })
  }

  const deletedUser = users.splice(index, 1)[0]

  return res.status(200).json({
    success: true,
    message: 'User deleted successfully',
    user: deletedUser,
  })
})

export default router