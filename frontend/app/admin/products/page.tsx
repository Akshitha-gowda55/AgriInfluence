'use client'

import { useState } from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Product } from '@/lib/types'
import { products as initialProducts } from '@/lib/data'
import { Trash2, Plus } from 'lucide-react'

export default function AdminProductsPage() {
  const [products, setProducts] = useState(initialProducts)

  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: '',
  })

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price) return

    const product: Product = {
  id: Date.now().toString(),
  name: newProduct.name,
  price: parseFloat(newProduct.price),
  category: newProduct.category || 'fertilizer',
  description: 'New product',
  usage: 'Use as directed',
  image: 'https://via.placeholder.com/300',
  rating: 0,
  reviews: 0,
  inStock: true,
}

    setProducts([...products, product])
    setNewProduct({ name: '', price: '', category: '' })
  }

  const handleDelete = (id: string) => {
    setProducts(products.filter((p) => p.id !== id))
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 py-10">

          <h1 className="text-3xl font-bold mb-8">
            Manage Products
          </h1>

          {/* Add Product */}
          <div className="rounded-lg border bg-white p-6 mb-8">
            <h2 className="font-semibold mb-4 flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add New Product
            </h2>

            <div className="grid gap-4 md:grid-cols-3">
              <Input
                placeholder="Product name"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
              />

              <Input
                placeholder="Price"
                type="number"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
              />

              <Input
                placeholder="Category"
                value={newProduct.category}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, category: e.target.value })
                }
              />
            </div>

            <Button
              className="mt-4"
              onClick={handleAddProduct}
            >
              Add Product
            </Button>
          </div>

          {/* Products Table */}
          <div className="rounded-lg border bg-white p-6">

            <h2 className="font-semibold mb-4">
              All Products
            </h2>

            <div className="space-y-4">

              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between border-b pb-3"
                >
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground">
                      ₹{product.price} • {product.category}
                    </p>
                  </div>

                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(product.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              ))}

            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}