'use client';

import { useState } from 'react';

import { Button, Input } from '@ecommerce/ui';
import { CheckCircle, Mail } from 'lucide-react';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
      setEmail('');
    }, 1500);
  };

  if (isSubscribed) {
    return (
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <CheckCircle className="h-16 w-16 mx-auto mb-6 text-green-400" />
            <h2 className="text-3xl font-bold mb-4">Thank You!</h2>
            <p className="text-lg opacity-90">
              You&apos;ve successfully subscribed to our newsletter. Get ready
              for exclusive deals and updates!
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <Mail className="h-16 w-16 mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl font-bold mb-4">Stay in the Loop</h2>
          <p className="text-lg opacity-90 mb-8">
            Subscribe to our newsletter and be the first to know about new
            products, exclusive deals, and special offers.
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
          >
            <div className="flex-1">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                required
                className="bg-white text-gray-900"
                disabled={isLoading}
              />
            </div>
            <Button
              type="submit"
              variant="secondary"
              disabled={isLoading || !email}
              className="sm:w-auto w-full"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  Subscribing...
                </div>
              ) : (
                'Subscribe'
              )}
            </Button>
          </form>

          <p className="text-sm opacity-70 mt-4">
            By subscribing, you agree to our{' '}
            <a href="/privacy" className="underline hover:opacity-100">
              Privacy Policy
            </a>
            . Unsubscribe at any time.
          </p>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-2xl font-bold mb-2">50K+</div>
              <div className="text-sm opacity-80">Happy Subscribers</div>
            </div>
            <div>
              <div className="text-2xl font-bold mb-2">Weekly</div>
              <div className="text-sm opacity-80">Newsletter Updates</div>
            </div>
            <div>
              <div className="text-2xl font-bold mb-2">Exclusive</div>
              <div className="text-sm opacity-80">Subscriber Deals</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
