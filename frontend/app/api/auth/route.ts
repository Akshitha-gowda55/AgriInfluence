import { NextResponse } from 'next/server'

type User = {
  id: string
  name: string
  email: string
  password: string
  role: 'customer' | 'admin'
}

const users: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@agrinfluence.com',
    password: 'admin123',
    role: 'admin',
  },
]

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { action, name, email, password } = body

    if (action === 'signup') {
      if (!name || !email || !password) {
        return NextResponse.json(
          {
            success: false,
            message: 'Name, email, and password are required',
          },
          { status: 400 }
        )
      }

      const existingUser = users.find((user) => user.email === email)

      if (existingUser) {
        return NextResponse.json(
          {
            success: false,
            message: 'User already exists',
          },
          { status: 409 }
        )
      }

      const newUser: User = {
        id: Date.now().toString(),
        name,
        email,
        password,
        role: 'customer',
      }

      users.push(newUser)

      return NextResponse.json({
        success: true,
        message: 'Signup successful',
        token: `mock-token-${newUser.id}`,
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
        },
      })
    }

    if (action === 'login') {
      if (!email || !password) {
        return NextResponse.json(
          {
            success: false,
            message: 'Email and password are required',
          },
          { status: 400 }
        )
      }

      const user = users.find(
        (u) => u.email === email && u.password === password
      )

      if (!user) {
        return NextResponse.json(
          {
            success: false,
            message: 'Invalid email or password',
          },
          { status: 401 }
        )
      }

      return NextResponse.json({
        success: true,
        message: 'Login successful',
        token: `mock-token-${user.id}`,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      })
    }

    return NextResponse.json(
      {
        success: false,
        message: 'Invalid action',
      },
      { status: 400 }
    )
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Something went wrong',
      },
      { status: 500 }
    )
  }
}