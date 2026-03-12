'use client'

import { useState } from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { products as initialProducts } from '@/lib/product'
import type { Product, ProductCategory } from '@/types'
import { Trash2, Plus } from 'lucide-react'

type NewProductForm = {
  name: string
  price: string
  category: string
}

const allowedCategories: ProductCategory[] = [
  'fertilizer',
  'pesticide',
  'seeds',
  'Fertilizers',
  'Pesticides',
  'Seeds',
  'Organic Products',
  'Crop Nutrients',
  'Herbicides',
]

function getValidCategory(category: string): ProductCategory {
  const trimmed = category.trim()

  if (allowedCategories.includes(trimmed as ProductCategory)) {
    return trimmed as ProductCategory
  }

  return 'fertilizer'
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts)

  const [newProduct, setNewProduct] = useState<NewProductForm>({
    name: '',
    price: '',
    category: '',
  })

  const handleAddProduct = () => {
    if (!newProduct.name.trim() || !newProduct.price.trim()) return

    const product: Product = {
      id: Date.now().toString(),
      name: newProduct.name.trim(),
      category: getValidCategory(newProduct.category),
      price: Number(newProduct.price),
      description: 'New product description',
      usage: 'Use as directed',
      image: 'https://via.placeholder.com/400x400?text=Product',
      rating: 0,
      reviews: 0,
      inStock: true,
    }

    setProducts((prev) => [...prev, product])

    setNewProduct({
      name: '',
      price: '',
      category: '',
    })
  }

  const handleDelete = (id: string) => {
    setProducts((prev) => prev.filter((product) => product.id !== id))
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <h1 className="mb-8 text-3xl font-bold">Manage Products</h1>

          <div className="mb-8 rounded-lg border bg-white p-6 shadow-sm">
            <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
              <Plus className="h-5 w-5" />
              Add New Product
            </h2>

            <div className="grid gap-4 md:grid-cols-3">
              <Input
                placeholder="Product name"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct((prev) => ({ ...prev, name: e.target.value }))
                }
              />

              <Input
                type="number"
                placeholder="Price"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct((prev) => ({ ...prev, price: e.target.value }))
                }
              />

              <Input
                placeholder="Category"
                value={newProduct.category}
                onChange={(e) =>
                  setNewProduct((prev) => ({
                    ...prev,
                    category: e.target.value,
                  }))
                }
              />
            </div>

            <p className="mt-3 text-xs text-muted-foreground">
              Use categories like fertilizer, pesticide, seeds, Fertilizers,
              Pesticides, Seeds, Organic Products, Crop Nutrients, Herbicides
            </p>

            <Button className="mt-4" onClick={handleAddProduct}>
              Add Product
            </Button>
          </div>

          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">All Products</h2>

            {products.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No products available.
              </p>
            ) : (
              <div className="space-y-4">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="flex flex-col gap-3 border-b pb-4 last:border-b-0 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">
                        ₹{product.price.toFixed(2)} • {product.category}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                      </p>
                    </div>

                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(product.id)}
                    >
                      <Trash2 className="mr-1 h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}