'use client';

import { ReactNode } from 'react';

import { ConvexProvider, ConvexReactClient } from 'convex/react';

// Debug: Log the environment variable
console.log('NEXT_PUBLIC_CONVEX_URL:', process.env.NEXT_PUBLIC_CONVEX_URL);

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

if (!convexUrl) {
  throw new Error(
    'Missing NEXT_PUBLIC_CONVEX_URL environment variable.\n' +
      'Please run `convex dev` to get your deployment URL and add it to your .env.local file.\n' +
      'Example: NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud'
  );
}

const convex = new ConvexReactClient(convexUrl);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
