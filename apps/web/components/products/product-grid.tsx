'use client';

import React from 'react';
import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@ecommerce/ui';
import { useQuery } from 'convex/react';
import { Heart, ShoppingCart } from 'lucide-react';

import { api } from '@/convex/_generated/api';

interface ProductGridProps {
  categoryId?: string;
  searchQuery?: string;
  sortBy?: 'name' | 'price' | 'rating' | 'newest';
}

export function ProductGrid({
  categoryId,
  searchQuery,
  sortBy = 'newest',
}: ProductGridProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Get all products first, then handle pagination client-side
  // Note: For production, you'd want server-side pagination
  const allProducts = useQuery(api.products.getProducts, {
    categoryId: categoryId as any, // Type assertion for now
    search: searchQuery,
    limit: undefined, // Get all products for now
  });

  // Handle client-side sorting and pagination
  const products = React.useMemo(() => {
    if (!allProducts) return null;

    const sorted = [...allProducts];

    // Apply sorting
    switch (sortBy) {
      case 'name':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'price':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'rating':
        // Rating not implemented yet, fallback to newest
        sorted.sort((a, b) => b.createdAt - a.createdAt);
        break;
      case 'newest':
      default:
        sorted.sort((a, b) => b.createdAt - a.createdAt);
        break;
    }

    // Apply pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sorted.slice(startIndex, startIndex + itemsPerPage);
  }, [allProducts, sortBy, currentPage, itemsPerPage]);

  const totalProducts = allProducts?.length || 0;
  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  if (!products) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="bg-gray-200 animate-pulse rounded-lg aspect-square"
          />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium mb-2">No products found</h3>
        <p className="text-muted-foreground">
          Try adjusting your search or filters
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {products.length} products
        </p>

        <select
          className="border border-gray-300 rounded-md px-3 py-1 text-sm"
          defaultValue={sortBy}
          onChange={e => {
            // Handle sort change - would need to lift state up in real app
            console.log('Sort by:', e.target.value);
          }}
        >
          <option value="newest">Newest First</option>
          <option value="name">Name A-Z</option>
          <option value="price">Price: Low to High</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <div
            key={product._id}
            className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="aspect-square bg-gray-100 rounded-t-lg overflow-hidden relative">
              <Image
                src={product.images[0] || '/placeholder-product.jpg'}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />

              <div className="absolute top-3 right-3 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50">
                  <Heart className="h-4 w-4" />
                </button>
              </div>

              {product.compareAtPrice && (
                <div className="absolute top-3 left-3">
                  <span className="bg-red-500 text-white px-2 py-1 text-xs rounded-md">
                    Sale
                  </span>
                </div>
              )}
            </div>

            <div className="p-4 space-y-3">
              <div>
                <h3 className="font-medium line-clamp-2 mb-1">
                  <Link
                    href={`/products/${product._id}`}
                    className="hover:text-primary transition-colors"
                  >
                    {product.name}
                  </Link>
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {product.shortDescription || product.description}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-x-2">
                  <span className="font-bold text-lg">${product.price}</span>
                  {product.compareAtPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      ${product.compareAtPrice}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  <span className="text-sm text-muted-foreground">
                    Stock: {product.inventory}
                  </span>
                </div>
              </div>

              <Button
                className="w-full"
                size="sm"
                onClick={() => {
                  // Add to cart functionality - would connect to Convex mutation
                  console.log('Add to cart:', product._id);
                }}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </Button>

            <span className="px-3 py-1 text-sm">
              Page {currentPage} of {totalPages}
            </span>

            <Button
              variant="outline"
              size="sm"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
