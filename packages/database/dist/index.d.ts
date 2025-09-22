interface User {
  _id: string;
  _creationTime: number;
  email: string;
  name: string;
  hashedPassword: string;
  role: 'user' | 'admin';
  createdAt: number;
  updatedAt: number;
}
interface Category {
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
interface ProductVariant {
  id: string;
  name: string;
  value: string;
  price?: number;
  inventory?: number;
}
interface ProductDimensions {
  length: number;
  width: number;
  height: number;
}
interface Product {
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
interface CartItemVariant {
  id: string;
  name: string;
  value: string;
}
interface CartItem {
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
interface CartItemWithProduct extends CartItem {
  product: Product;
}
interface Address {
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
interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  quantity: number;
  price: number;
  variant?: CartItemVariant;
}
interface Order {
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
interface Review {
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
interface Wishlist {
  _id: string;
  _creationTime: number;
  userId: string;
  productId: string;
  createdAt: number;
}
interface NewsletterSubscription {
  _id: string;
  _creationTime: number;
  email: string;
  isActive: boolean;
  source?: string;
  createdAt: number;
  updatedAt: number;
}
interface AnalyticsEvent {
  _id: string;
  _creationTime: number;
  userId?: string;
  sessionId: string;
  event: string;
  properties?: Record<string, any>;
  timestamp: number;
}
interface CartSummary {
  totalItems: number;
  totalPrice: number;
  itemCount: number;
}
interface ProductFilters {
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
interface PaginationParams {
  page: number;
  limit: number;
}
interface PaginatedResponse<T> {
  data: T[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
interface NewsletterFormData {
  email: string;
}
interface ReviewFormData {
  rating: number;
  title: string;
  comment: string;
}
interface CheckoutFormData {
  email: string;
  shippingAddress: Address;
  billingAddress?: Address;
  paymentMethod: string;
  saveInfo: boolean;
}
interface SeoData {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: string;
  keywords?: string[];
}
interface AppError {
  code: string;
  message: string;
  details?: any;
}
interface LoadingState {
  isLoading: boolean;
  error?: AppError;
}
interface AsyncState<T> extends LoadingState {
  data?: T;
}

export type {
  Address,
  AnalyticsEvent,
  ApiResponse,
  AppError,
  AsyncState,
  CartItem,
  CartItemVariant,
  CartItemWithProduct,
  CartSummary,
  Category,
  CheckoutFormData,
  ContactFormData,
  LoadingState,
  NewsletterFormData,
  NewsletterSubscription,
  Order,
  OrderItem,
  PaginatedResponse,
  PaginationParams,
  Product,
  ProductDimensions,
  ProductFilters,
  ProductVariant,
  Review,
  ReviewFormData,
  SeoData,
  User,
  Wishlist,
};
