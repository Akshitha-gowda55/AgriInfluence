import express from 'express'

const router = express.Router()

type Product = {
  id: string
  name: string
  category: string
  price: number
  originalPrice?: number
  description: string
  usage: string
  image: string
  rating: number
  reviews: number
  inStock: boolean
  badge?: string
}

const products: Product[] = [
  {
    id: '1',
    name: 'OrganicGrow Pro NPK',
    category: 'fertilizer',
    price: 45.99,
    originalPrice: 59.99,
    description:
      'Premium organic NPK fertilizer with balanced nutrients for all crops.',
    usage: 'Apply 2-3 kg per 100 sq meters.',
    image:
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop',
    rating: 4.8,
    reviews: 234,
    inStock: true,
    badge: 'Best Seller',
  },
  {
    id: '2',
    name: 'BioShield Pesticide',
    category: 'pesticide',
    price: 32.5,
    description:
      'Eco-friendly broad-spectrum pesticide that protects crops from common pests.',
    usage: 'Dilute 10ml per liter of water and spray evenly.',
    image:
      'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=400&fit=crop',
    rating: 4.6,
    reviews: 189,
    inStock: true,
  },
]

router.get('/', (_req, res) => {
  res.json({
    success: true,
    products,
  })
})

router.get('/:id', (req, res) => {
  const product = products.find((p) => p.id === req.params.id)

  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found',
    })
  }

  return res.json({
    success: true,
    product,
  })
})

router.post('/', (req, res) => {
  const { name, category, price, description, usage, image } = req.body

  if (!name || !category || !price) {
    return res.status(400).json({
      success: false,
      message: 'Name, category, and price are required',
    })
  }

  const newProduct: Product = {
    id: Date.now().toString(),
    name,
    category,
    price: Number(price),
    description: description || 'New product description',
    usage: usage || 'Use as directed',
    image: image || 'https://via.placeholder.com/400',
    rating: 0,
    reviews: 0,
    inStock: true,
  }

  products.push(newProduct)

  return res.status(201).json({
    success: true,
    message: 'Product created successfully',
    product: newProduct,
  })
})

router.put('/:id', (req, res) => {
  const product = products.find((p) => p.id === req.params.id)

  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found',
    })
  }

  const {
    name,
    category,
    price,
    description,
    usage,
    image,
    inStock,
    badge,
    originalPrice,
  } = req.body

  if (name !== undefined) product.name = name
  if (category !== undefined) product.category = category
  if (price !== undefined) product.price = Number(price)
  if (description !== undefined) product.description = description
  if (usage !== undefined) product.usage = usage
  if (image !== undefined) product.image = image
  if (inStock !== undefined) product.inStock = Boolean(inStock)
  if (badge !== undefined) product.badge = badge
  if (originalPrice !== undefined) product.originalPrice = Number(originalPrice)

  return res.json({
    success: true,
    message: 'Product updated successfully',
    product,
  })
})

router.delete('/:id', (req, res) => {
  const index = products.findIndex((p) => p.id === req.params.id)

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: 'Product not found',
    })
  }

  const deletedProduct = products.splice(index, 1)[0]

  return res.json({
    success: true,
    message: 'Product deleted successfully',
    product: deletedProduct,
  })
})

export default router