var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if ((from && typeof from === 'object') || typeof from === 'function') {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, {
          get: () => from[key],
          enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable,
        });
  }
  return to;
};
var __toCommonJS = mod =>
  __copyProps(__defProp({}, '__esModule', { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  API_ENDPOINTS: () => API_ENDPOINTS,
  APP_CONFIG: () => APP_CONFIG,
  CART_CONFIG: () => CART_CONFIG,
  CONTACT_INFO: () => CONTACT_INFO,
  ERROR_MESSAGES: () => ERROR_MESSAGES,
  FEATURES: () => FEATURES,
  ORDER_CONFIG: () => ORDER_CONFIG,
  PAGINATION: () => PAGINATION,
  PRODUCT_CONFIG: () => PRODUCT_CONFIG,
  ROUTES: () => ROUTES,
  SEO_CONFIG: () => SEO_CONFIG,
  SOCIAL_LINKS: () => SOCIAL_LINKS,
  SUCCESS_MESSAGES: () => SUCCESS_MESSAGES,
  UI_CONFIG: () => UI_CONFIG,
  VALIDATION: () => VALIDATION,
  getConfig: () => getConfig,
  isDevelopment: () => isDevelopment,
  isProduction: () => isProduction,
  isTest: () => isTest,
});
module.exports = __toCommonJS(index_exports);

// src/constants.ts
var APP_CONFIG = {
  name: 'E-commerce MVP',
  description:
    'Modern e-commerce platform built with Next.js, Convex, and JWT authentication',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  version: '1.0.0',
};
var API_ENDPOINTS = {
  auth: {
    signin: '/api/auth/signin',
    signup: '/api/auth/signup',
    signout: '/api/auth/signout',
  },
  webhooks: {
    stripe: '/api/webhooks/stripe',
    midtrans: '/api/webhooks/midtrans',
  },
};
var ROUTES = {
  home: '/',
  products: '/products',
  product: id => `/products/${id}`,
  cart: '/cart',
  checkout: '/checkout',
  dashboard: '/dashboard',
  admin: '/admin',
  auth: {
    signin: '/auth/signin',
    signup: '/auth/signup',
  },
};
var PAGINATION = {
  defaultPageSize: 12,
  maxPageSize: 100,
  pageSizeOptions: [12, 24, 48, 96],
};
var PRODUCT_CONFIG = {
  maxImages: 10,
  maxVariants: 20,
  maxTagsPerProduct: 10,
  maxReviewsPerPage: 20,
  defaultCurrency: 'USD',
  currencySymbol: '$',
};
var CART_CONFIG = {
  maxQuantityPerItem: 99,
  maxItemsInCart: 100,
  sessionDuration: 30 * 24 * 60 * 60 * 1e3,
  // 30 days in milliseconds
};
var ORDER_CONFIG = {
  statuses: [
    'pending',
    'confirmed',
    'processing',
    'shipped',
    'delivered',
    'cancelled',
    'refunded',
  ],
  defaultTaxRate: 0.08,
  // 8%
  defaultShippingRate: 10,
  freeShippingThreshold: 100,
};
var UI_CONFIG = {
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
    duration: 4e3,
    position: 'bottom-right',
  },
};
var FEATURES = {
  enableReviews: true,
  enableWishlist: true,
  enableNewsletter: true,
  enableAnalytics: true,
  enableSEO: true,
  enablePWA: false,
  enablePayments: true,
  enableSubscriptions: false,
};
var SEO_CONFIG = {
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
};
var ERROR_MESSAGES = {
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
};
var SUCCESS_MESSAGES = {
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
};
var VALIDATION = {
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
    pattern: /^\+?[\d\s\-\(\)]{10,}$/,
    message: 'Please enter a valid phone number.',
  },
  postalCode: {
    us: /^\d{5}(-\d{4})?$/,
    ca: /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/,
    message: 'Please enter a valid postal code.',
  },
};
var SOCIAL_LINKS = {
  twitter: 'https://twitter.com/ecommercemvp',
  facebook: 'https://facebook.com/ecommercemvp',
  instagram: 'https://instagram.com/ecommercemvp',
  linkedin: 'https://linkedin.com/company/ecommercemvp',
  youtube: 'https://youtube.com/c/ecommercemvp',
};
var CONTACT_INFO = {
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
};

// src/index.ts
var getConfig = (key, defaultValue) => {
  var _a;
  if (typeof window !== 'undefined') {
    return ((_a = window.__ENV) == null ? void 0 : _a[key]) || defaultValue;
  } else {
    return process.env[key] || defaultValue;
  }
};
var isDevelopment = () => getConfig('NODE_ENV') === 'development';
var isProduction = () => getConfig('NODE_ENV') === 'production';
var isTest = () => getConfig('NODE_ENV') === 'test';
// Annotate the CommonJS export names for ESM import in node:
0 &&
  (module.exports = {
    API_ENDPOINTS,
    APP_CONFIG,
    CART_CONFIG,
    CONTACT_INFO,
    ERROR_MESSAGES,
    FEATURES,
    ORDER_CONFIG,
    PAGINATION,
    PRODUCT_CONFIG,
    ROUTES,
    SEO_CONFIG,
    SOCIAL_LINKS,
    SUCCESS_MESSAGES,
    UI_CONFIG,
    VALIDATION,
    getConfig,
    isDevelopment,
    isProduction,
    isTest,
  });
//# sourceMappingURL=index.js.map
