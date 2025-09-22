import { Metadata } from 'next';

import { ProductFilters } from '@/components/products/product-filters';
import { ProductGrid } from '@/components/products/product-grid';
import { ProductSearch } from '@/components/products/product-search';

export const metadata: Metadata = {
  title: 'Products - Modern E-commerce Store',
  description:
    'Browse our complete collection of products with advanced search and filtering options.',
};

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-4">All Products</h1>
        <p className="text-muted-foreground">
          Discover our complete collection of high-quality products
        </p>
      </div>

      <div className="mb-6">
        <ProductSearch />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <ProductFilters />
        </aside>

        <main className="lg:col-span-3">
          <ProductGrid />
        </main>
      </div>
    </div>
  );
}
