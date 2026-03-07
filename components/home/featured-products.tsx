<<<<<<< HEAD
'use client';

import { useEffect, useState } from 'react';
=======
>>>>>>> 87c8fd1ed26d8dcc83b75fccf942731460390ca8
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product-card';
<<<<<<< HEAD

const API_URL = "http://localhost:5000/api";

export function FeaturedProducts() {

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/products`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data.slice(0, 4));
        } else {
          setProducts([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);
=======
import { products } from '@/lib/data';

export function FeaturedProducts() {
  const featuredProducts = products.slice(0, 4);
>>>>>>> 87c8fd1ed26d8dcc83b75fccf942731460390ca8

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
<<<<<<< HEAD

=======
>>>>>>> 87c8fd1ed26d8dcc83b75fccf942731460390ca8
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-primary">
              Shop Our Collection
            </p>
            <h2 className="mt-2 font-serif text-3xl font-bold text-foreground sm:text-4xl">
              Featured Products
            </h2>
            <p className="mt-2 text-muted-foreground max-w-xl">
              Discover our best-selling fertilizers, pesticides, and seeds trusted by farmers nationwide.
            </p>
          </div>
<<<<<<< HEAD

=======
>>>>>>> 87c8fd1ed26d8dcc83b75fccf942731460390ca8
          <Button variant="outline" asChild>
            <Link href="/products">
              View All Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

<<<<<<< HEAD
        {/* Loading */}
        {loading && (
          <p className="text-center text-muted-foreground">Loading products...</p>
        )}

        {/* Product Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={{ ...product, id: product._id }}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
=======
        {/* Product Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Category Links */}
        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            {
              name: 'Fertilizers',
              description: 'Boost your soil health',
              href: '/products?category=fertilizer',
              image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop',
            },
            {
              name: 'Pesticides',
              description: 'Protect your crops',
              href: '/products?category=pesticide',
              image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&h=400&fit=crop',
            },
            {
              name: 'Seeds',
              description: 'Premium quality seeds',
              href: '/products?category=seeds',
              image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&h=400&fit=crop',
            },
          ].map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="group relative overflow-hidden rounded-lg"
            >
              <div className="aspect-[16/10] relative">
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-foreground/50 transition-opacity group-hover:bg-foreground/60" />
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <h3 className="text-xl font-semibold text-primary-foreground">
                    {category.name}
                  </h3>
                  <p className="mt-1 text-sm text-primary-foreground/80">
                    {category.description}
                  </p>
                  <span className="mt-2 inline-flex items-center text-sm font-medium text-primary">
                    Shop Now
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
>>>>>>> 87c8fd1ed26d8dcc83b75fccf942731460390ca8
