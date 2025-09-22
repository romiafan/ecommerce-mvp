'use client';

import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@ecommerce/ui';
import { useQuery } from 'convex/react';

import { api } from '@/convex/_generated/api';

export function FeaturedProducts() {
  const products = useQuery(api.products.getFeaturedProducts, { limit: 6 });

  if (!products) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">
              Featured Products
            </h2>
            <p className="text-muted-foreground mt-4">
              Discover our most popular items
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-gray-200 animate-pulse rounded-lg aspect-square"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">
            Featured Products
          </h2>
          <p className="text-muted-foreground mt-4">
            Discover our most popular items
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <div key={product._id} className="group">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4 relative">
                <Image
                  src={product.images[0] || '/placeholder-product.jpg'}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="space-y-2">
                <h3 className="font-medium line-clamp-2">{product.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {product.shortDescription || product.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="space-x-2">
                    <span className="font-bold text-lg">${product.price}</span>
                    {product.compareAtPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        ${product.compareAtPrice}
                      </span>
                    )}
                  </div>

                  <Link href={`/products/${product._id}`}>
                    <Button size="sm">View Details</Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/products">
            <Button variant="outline" size="lg">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
