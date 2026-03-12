import express from 'express'

const router = express.Router()

type SupportRequest = {
  id: string
  name: string
  email: string
  message: string
  date: string
}

const supportRequests: SupportRequest[] = []

router.get('/', (_req, res) => {
  res.json({
    success: true,
    requests: supportRequests,
  })
})

router.post('/', (req, res) => {
  const { name, email, message } = req.body

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: 'Name, email and message are required',
    })
  }

  const newRequest: SupportRequest = {
    id: Date.now().toString(),
    name,
    email,
    message,
    date: new Date().toISOString(),
  }

  supportRequests.push(newRequest)

  res.status(201).json({
    success: true,
    message: 'Support request submitted',
    request: newRequest,
  })
})

export default router