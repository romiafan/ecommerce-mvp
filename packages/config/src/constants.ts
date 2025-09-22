// Configuration constants
export const APP_CONFIG = {
  name: 'E-commerce MVP',
  description:
    'Modern e-commerce platform built with Next.js, Convex, and JWT authentication',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  version: '1.0.0',
} as const;

// API endpoints
export const API_ENDPOINTS = {
  auth: {
    signin: '/api/auth/signin',
    signup: '/api/auth/signup',
    signout: '/api/auth/signout',
  },
  webhooks: {
    stripe: '/api/webhooks/stripe',
    midtrans: '/api/webhooks/midtrans',
  },
} as const;

// Route paths
export const ROUTES = {
  home: '/',
  products: '/products',
  product: (id: string) => `/products/${id}`,
  cart: '/cart',
  checkout: '/checkout',
  dashboard: '/dashboard',
  admin: '/admin',
  auth: {
    signin: '/auth/signin',
    signup: '/auth/signup',
  },
} as const;

// Pagination defaults
export const PAGINATION = {
  defaultPageSize: 12,
  maxPageSize: 100,
  pageSizeOptions: [12, 24, 48, 96],
} as const;

// Product settings
export const PRODUCT_CONFIG = {
  maxImages: 10,
  maxVariants: 20,
  maxTagsPerProduct: 10,
  maxReviewsPerPage: 20,
  defaultCurrency: 'USD',
  currencySymbol: '$',
} as const;

// Cart settings
export const CART_CONFIG = {
  maxQuantityPerItem: 99,
  maxItemsInCart: 100,
  sessionDuration: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
} as const;

// Order settings
export const ORDER_CONFIG = {
  statuses: [
    'pending',
    'confirmed',
    'processing',
    'shipped',
    'delivered',
    'cancelled',
    'refunded',
  ],
  defaultTaxRate: 0.08, // 8%
  defaultShippingRate: 10.0,
  freeShippingThreshold: 100.0,
} as const;

// UI constants
export const UI_CONFIG = {
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  animations: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
    },
    easing: {
      default: 'cubic-bezier(0.4, 0, 0.2, 1)',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
  toast: {
    duration: 4000,
    position: 'bottom-right' as const,
  },
} as const;

// Feature flags
export const FEATURES = {
  enableReviews: true,
  enableWishlist: true,
  enableNewsletter: true,
  enableAnalytics: true,
  enableSEO: true,
  enablePWA: false,
  enablePayments: true,
  enableSubscriptions: false,
} as const;

// SEO defaults
export const SEO_CONFIG = {
  defaultTitle: 'E-commerce MVP - Modern Online Store',
  defaultDescription:
    'Discover amazing products at unbeatable prices. Fast shipping, easy returns, and excellent customer service.',
  defaultImage: '/images/og-image.jpg',
  titleTemplate: '%s | E-commerce MVP',
  keywords: [
    'ecommerce',
    'online store',
    'shopping',
    'products',
    'retail',
    'marketplace',
  ],
} as const;

// Error messages
export const ERROR_MESSAGES = {
  generic: 'Something went wrong. Please try again.',
  network: 'Network error. Please check your connection.',
  unauthorized: 'You are not authorized to perform this action.',
  notFound: 'The requested resource was not found.',
  validation: 'Please check your input and try again.',
  inventory: 'Sorry, this item is out of stock.',
  cart: {
    addFailed: 'Failed to add item to cart. Please try again.',
    updateFailed: 'Failed to update cart. Please try again.',
    removeFailed: 'Failed to remove item from cart. Please try again.',
    emptyCart: 'Your cart is empty.',
  },
  checkout: {
    failed: 'Checkout failed. Please try again.',
    paymentFailed: 'Payment failed. Please try again.',
    addressRequired: 'Shipping address is required.',
  },
  auth: {
    signInFailed: 'Sign in failed. Please check your credentials.',
    signUpFailed: 'Sign up failed. Please try again.',
    unauthorized: 'Please sign in to continue.',
  },
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  cart: {
    added: 'Item added to cart successfully!',
    updated: 'Cart updated successfully!',
    removed: 'Item removed from cart.',
    cleared: 'Cart cleared successfully.',
  },
  checkout: {
    success: 'Order placed successfully!',
    paymentSuccess: 'Payment processed successfully!',
  },
  auth: {
    signInSuccess: 'Welcome back!',
    signUpSuccess: 'Account created successfully!',
    signOutSuccess: 'Signed out successfully.',
  },
  general: {
    saved: 'Changes saved successfully!',
    deleted: 'Item deleted successfully.',
    updated: 'Item updated successfully.',
  },
} as const;

// Form validation rules
export const VALIDATION = {
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Please enter a valid email address.',
  },
  password: {
    minLength: 8,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    message:
      'Password must be at least 8 characters with uppercase, lowercase, number, and special character.',
  },
  phone: {
    pattern: /^\+?[\d\s\-()]{10,}$/,
    message: 'Please enter a valid phone number.',
  },
  postalCode: {
    us: /^\d{5}(-\d{4})?$/,
    ca: /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/,
    message: 'Please enter a valid postal code.',
  },
} as const;

// Social media links
export const SOCIAL_LINKS = {
  twitter: 'https://twitter.com/ecommercemvp',
  facebook: 'https://facebook.com/ecommercemvp',
  instagram: 'https://instagram.com/ecommercemvp',
  linkedin: 'https://linkedin.com/company/ecommercemvp',
  youtube: 'https://youtube.com/c/ecommercemvp',
} as const;

// Contact information
export const CONTACT_INFO = {
  email: 'hello@ecommercemvp.com',
  phone: '+1 (555) 123-4567',
  address: {
    street: '123 Commerce St',
    city: 'San Francisco',
    state: 'CA',
    postalCode: '94102',
    country: 'United States',
  },
  hours: {
    weekdays: '9:00 AM - 6:00 PM PST',
    weekends: '10:00 AM - 4:00 PM PST',
  },
} as const;

export default {
  APP_CONFIG,
  API_ENDPOINTS,
  ROUTES,
  PAGINATION,
  PRODUCT_CONFIG,
  CART_CONFIG,
  ORDER_CONFIG,
  UI_CONFIG,
  FEATURES,
  SEO_CONFIG,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  VALIDATION,
  SOCIAL_LINKS,
  CONTACT_INFO,
};
