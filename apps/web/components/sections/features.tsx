import { Button } from '@ecommerce/ui';
import { Check, Headphones, Shield, Star, Truck, Zap } from 'lucide-react';

export function Features() {
  const features = [
    {
      icon: <Zap className="h-8 w-8" />,
      title: 'Lightning Fast',
      description:
        'Optimized for speed with modern web technologies and CDN delivery worldwide.',
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Secure & Safe',
      description:
        'Bank-level security with encrypted payments and secure checkout process.',
    },
    {
      icon: <Truck className="h-8 w-8" />,
      title: 'Fast Shipping',
      description:
        'Free worldwide shipping on orders over $100. Express delivery available.',
    },
    {
      icon: <Headphones className="h-8 w-8" />,
      title: '24/7 Support',
      description:
        'Round-the-clock customer support via chat, email, and phone.',
    },
    {
      icon: <Star className="h-8 w-8" />,
      title: 'Quality Guaranteed',
      description:
        '100% satisfaction guarantee with easy returns and exchanges.',
    },
    {
      icon: <Check className="h-8 w-8" />,
      title: 'Easy Returns',
      description:
        'Hassle-free returns within 30 days of purchase. No questions asked.',
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">Why Choose Us</h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            We&apos;re committed to providing the best shopping experience with
            unmatched service and quality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-primary mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-2xl p-8 shadow-sm">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">
              Join Over 10,000+ Happy Customers
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Don&apos;t just take our word for it. See what our customers have
              to say about their experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="flex justify-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                &quot;Amazing quality and fast delivery. Highly
                recommended!&quot;
              </p>
              <p className="font-medium mt-2">Sarah Johnson</p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                &quot;Best customer service I&apos;ve ever experienced. Thank
                you!&quot;
              </p>
              <p className="font-medium mt-2">Michael Chen</p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                &quot;Great products at competitive prices. Will shop
                again!&quot;
              </p>
              <p className="font-medium mt-2">Emma Davis</p>
            </div>
          </div>

          <div className="text-center mt-8">
            <Button size="lg">Start Shopping Today</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
