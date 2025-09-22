import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';

import { Toaster } from 'sonner';

import './globals.css';
import { ConvexClientProvider } from './providers/convex-provider';
import { ThemeProvider } from './providers/theme-provider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-heading',
});

export const metadata: Metadata = {
  title: {
    default: 'E-commerce MVP - Modern Online Store',
    template: '%s | E-commerce MVP',
  },
  description:
    'Discover amazing products at unbeatable prices. Fast shipping, easy returns, and excellent customer service.',
  keywords: ['ecommerce', 'online store', 'shopping', 'products', 'retail'],
  authors: [{ name: 'E-commerce MVP Team' }],
  creator: 'E-commerce MVP',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_APP_URL,
    title: 'E-commerce MVP - Modern Online Store',
    description: 'Discover amazing products at unbeatable prices.',
    siteName: 'E-commerce MVP',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'E-commerce MVP',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'E-commerce MVP - Modern Online Store',
    description: 'Discover amazing products at unbeatable prices.',
    images: ['/images/og-image.jpg'],
    creator: '@ecommercemvp',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <ConvexClientProvider>
            {children}
            <Toaster position="bottom-right" richColors closeButton />
          </ConvexClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
