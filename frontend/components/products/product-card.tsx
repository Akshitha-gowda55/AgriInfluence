import Image from 'next/image'
import { Product } from '@/types'

type ProductCardProps = {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.images?.[0] || '/placeholder.png'

  return (
    <div className="rounded-xl border p-4 shadow-sm transition hover:shadow-md">
      <div className="relative h-40 w-full overflow-hidden rounded-md">
        <Image
          src={imageUrl}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>

      <h3 className="mt-3 text-lg font-semibold">{product.name}</h3>
      <p className="text-sm text-gray-500">{product.category}</p>
      <p className="mt-2 font-bold text-green-600">₹{product.price}</p>
    </div>
  )
}