import { NextResponse } from 'next/server'

type User = {
  id: string
  name: string
  email: string
  role: 'customer' | 'admin'
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
    name: 'Akshitha',
    email: 'akshitha@example.com',
    role: 'customer',
  },
]

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      users,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch users',
      },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, role } = body

    if (!name || !email) {
      return NextResponse.json(
        {
          success: false,
          message: 'Name and email are required',
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
      role: role === 'admin' ? 'admin' : 'customer',
    }

    users.push(newUser)

    return NextResponse.json(
      {
        success: true,
        message: 'User created successfully',
        user: newUser,
      },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to create user',
      },
      { status: 500 }
    )
  }
}