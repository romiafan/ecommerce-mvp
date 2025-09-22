import { Metadata } from 'next';

import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { FeaturedProducts } from '@/components/sections/featured-products';
import { Features } from '@/components/sections/features';
import { Hero } from '@/components/sections/hero';
import { Newsletter } from '@/components/sections/newsletter';

export const metadata: Metadata = {
  title: 'Modern E-commerce Store',
  description:
    'Discover amazing products at unbeatable prices. Fast shipping, easy returns, and excellent customer service.',
};

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <FeaturedProducts />
        <Features />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
