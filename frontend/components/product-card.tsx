import Image from 'next/image'
import Link from 'next/link'

type Product = {
  id: string | number
  name: string
  price: number
  image?: string
  category?: string
}

export function ProductCard({
  product,
}: {
  product: Product
}) {
  return (
    <div className="rounded-xl border bg-background p-4 shadow-sm">
      <div className="relative h-48 w-full overflow-hidden rounded-lg bg-gray-100">
        <Image
          src={product.image || '/placeholder.png'}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>

      <h3 className="mt-4 text-lg font-semibold">
        {product.name}
      </h3>

      {product.category && (
        <p className="text-sm text-muted-foreground">
          {product.category}
        </p>
      )}

      <p className="mt-2 font-bold">
        ₹{product.price}
      </p>

      <Link
        href={`/products/${product.id}`}
        className="mt-4 inline-block rounded-md border px-4 py-2 text-sm"
      >
        View Product
      </Link>
    </div>
  )
}