import dotenv from 'dotenv'
import mongoose from 'mongoose'
import connectDB from './config/db'
import User from './models/User'
import Product from './models/Product'
import Order from './models/Order'

dotenv.config()

async function seed() {
  await connectDB()

  console.log('🌱 Seeding database...')

  await User.deleteMany({})
  await Product.deleteMany({})
  await Order.deleteMany({})

  const user = await User.create({
    name: 'Akshitha Gowda',
    email: 'akshitha@example.com',
    password: 'password123',
    role: 'USER',
  })

  await User.create({
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'ADMIN',
  })

  console.log('✅ Users created')

  await Product.insertMany([
    {
      name: 'Premium NPK Fertilizer',
      price: 799,
      description: 'Balanced NPK fertilizer for stronger roots and better yield.',
      category: 'Fertilizers',
      image:
        'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1200&q=80',
      stock: 40,
    },
    {
      name: 'Organic Vermicompost',
      price: 499,
      description: 'Organic compost to improve soil fertility and crop health.',
      category: 'Organic Products',
      image:
        'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1200&q=80',
      stock: 60,
    },
    {
      name: 'Hybrid Tomato Seeds',
      price: 199,
      description: 'High germination tomato seeds for better crop productivity.',
      category: 'Seeds',
      image:
        'https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=1200&q=80',
      stock: 120,
    },
  ])

  console.log('✅ Products created')

  await Order.create({
    userId: user._id,
    status: 'SHIPPED',
    total: 998,
    items: [
      {
        productName: 'Premium NPK Fertilizer',
        price: 799,
        quantity: 1,
      },
      {
        productName: 'Hybrid Tomato Seeds',
        price: 199,
        quantity: 1,
      },
    ],
  })

  console.log('✅ Orders created')
  console.log('🎉 Database seeded successfully!')

  await mongoose.disconnect()
}

seed().catch((error) => {
  console.error('❌ Seed failed:')
  console.error(error)
  process.exit(1)
})