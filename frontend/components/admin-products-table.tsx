'use client'

import { useState } from 'react'
import { Product } from '@/types'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'

interface AdminProductsTableProps {
  products: Product[]
}

export function AdminProductsTable({ products }: AdminProductsTableProps) {
  const [productList, setProductList] = useState<Product[]>(products)

  const deleteProduct = (id: string) => {
    const updatedProducts = productList.filter((p) => p.id !== id)
    setProductList(updatedProducts)
  }

  return (
    <div className="rounded-lg border bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b bg-muted/50">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Product</th>
              <th className="px-4 py-3 text-left font-medium">Category</th>
              <th className="px-4 py-3 text-left font-medium">Price</th>
              <th className="px-4 py-3 text-left font-medium">Stock</th>
              <th className="px-4 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>

          <tbody>
            {productList.map((product) => (
              <tr key={product.id} className="border-b">
                <td className="px-4 py-3 font-medium">
                  {product.name}
                </td>

                <td className="px-4 py-3 capitalize">
                  {product.category}
                </td>

                <td className="px-4 py-3">
                  ₹{product.price.toFixed(2)}
                </td>

                <td className="px-4 py-3">
                  {product.inStock ? (
                    <span className="text-green-600">In Stock</span>
                  ) : (
                    <span className="text-red-600">Out of Stock</span>
                  )}
                </td>

                <td className="px-4 py-3 text-right">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteProduct(product.id)}
                  >
                    <Trash2 className="mr-1 h-4 w-4" />
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {productList.length === 0 && (
          <div className="p-6 text-center text-muted-foreground">
            No products available.
          </div>
        )}
      </div>
    </div>
  )
}