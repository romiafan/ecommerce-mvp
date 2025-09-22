// Database types (matching Convex schema)
export interface User {
  _id: string;
  _creationTime: number;
  email: string;
  name: string;
  hashedPassword: string;
  role: 'user' | 'admin';
  createdAt: number;
  updatedAt: number;
}

export interface Category {
  _id: string;
  _creationTime: number;
  name: string;
  description?: string;
  slug: string;
  imageUrl?: string;
  isActive: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface ProductVariant {
  id: string;
  name: string;
  value: string;
  price?: number;
  inventory?: number;
}

export interface ProductDimensions {
  length: number;
  width: number;
  height: number;
}

export interface Product {
  _id: string;
  _creationTime: number;
  name: string;
  description: string;
  shortDescription?: string;
  price: number;
  compareAtPrice?: number;
  images: string[];
  categoryId: string;
  inventory: number;
  sku?: string;
  weight?: number;
  dimensions?: ProductDimensions;
  variants?: ProductVariant[];
  tags?: string[];
  isActive: boolean;
  isFeatured: boolean;
  seoTitle?: string;
  seoDescription?: string;
  createdAt: number;
  updatedAt: number;
}

export interface CartItemVariant {
  id: string;
  name: string;
  value: string;
}

export interface CartItem {
  _id: string;
  _creationTime: number;
  userId: string;
  productId: string;
  quantity: number;
  variant?: CartItemVariant;
  priceAtTime: number;
  createdAt: number;
  updatedAt: number;
}

export interface CartItemWithProduct extends CartItem {
  product: Product;
}

export interface Address {
  firstName: string;
  lastName: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  quantity: number;
  price: number;
  variant?: CartItemVariant;
}

export interface Order {
  _id: string;
  _creationTime: number;
  userId: string;
  orderNumber: string;
  status:
    | 'pending'
    | 'confirmed'
    | 'processing'
    | 'shipped'
    | 'delivered'
    | 'cancelled'
    | 'refunded';
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  currency: string;
  shippingAddress: Address;
  billingAddress?: Address;
  paymentMethod?: string;
  paymentIntentId?: string;
  trackingNumber?: string;
  notes?: string;
  createdAt: number;
  updatedAt: number;
}

export interface Review {
  _id: string;
  _creationTime: number;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  isVerifiedPurchase: boolean;
  isApproved: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface Wishlist {
  _id: string;
  _creationTime: number;
  userId: string;
  productId: string;
  createdAt: number;
}

export interface NewsletterSubscription {
  _id: string;
  _creationTime: number;
  email: string;
  isActive: boolean;
  source?: string;
  createdAt: number;
  updatedAt: number;
}

export interface AnalyticsEvent {
  _id: string;
  _creationTime: number;
  userId?: string;
  sessionId: string;
  event: string;
  properties?: Record<string, unknown>;
  timestamp: number;
}

// Cart summary type
export interface CartSummary {
  totalItems: number;
  totalPrice: number;
  itemCount: number;
}

// Product filters
export interface ProductFilters {
  categoryId?: string;
  priceMin?: number;
  priceMax?: number;
  tags?: string[];
  featured?: boolean;
  search?: string;
  sortBy?:
    | 'newest'
    | 'oldest'
    | 'price-low'
    | 'price-high'
    | 'name-asc'
    | 'name-desc';
}

// Pagination
export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

// API Response types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Form types
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface NewsletterFormData {
  email: string;
}

export interface ReviewFormData {
  rating: number;
  title: string;
  comment: string;
}

export interface CheckoutFormData {
  email: string;
  shippingAddress: Address;
  billingAddress?: Address;
  paymentMethod: string;
  saveInfo: boolean;
}

// SEO
export interface SeoData {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: string;
  keywords?: string[];
}

// Error types
export interface AppError {
  code: string;
  message: string;
  details?: unknown;
}

// Loading states
export interface LoadingState {
  isLoading: boolean;
  error?: AppError;
}

export interface AsyncState<T> extends LoadingState {
  data?: T;
}

export default {};
