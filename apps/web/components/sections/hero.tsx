import Link from 'next/link';

import { Button } from '@ecommerce/ui';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                Discover Amazing Products at{' '}
                <span className="text-primary">Unbeatable Prices</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Shop the latest trends with fast shipping, easy returns, and
                excellent customer service. Your satisfaction is our priority.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/products">
                <Button size="lg" className="w-full sm:w-auto">
                  Shop Now
                </Button>
              </Link>
              <Link href="/categories">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  Browse Categories
                </Button>
              </Link>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">10k+</div>
                <div className="text-sm text-muted-foreground">Products</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">50k+</div>
                <div className="text-sm text-muted-foreground">
                  Happy Customers
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">Support</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="h-32 w-32 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
                  <span className="text-4xl">🛍️</span>
                </div>
                <div className="text-lg font-medium">Your Store Image</div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 h-16 w-16 bg-primary/20 rounded-full animate-bounce" />
            <div className="absolute -bottom-4 -left-4 h-12 w-12 bg-secondary/20 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}
