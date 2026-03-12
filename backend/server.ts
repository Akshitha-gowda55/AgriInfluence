import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db'

dotenv.config()

const app = express()

// Middleware
app.use(express.json())

// Connect Database
connectDB()

// Test route
app.get('/', (req, res) => {
  res.send('🚀 AgriInfluence API running')
})

// Example API route
app.get('/api/products', (req, res) => {
  res.json({
    message: 'Products API working',
  })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`)
})