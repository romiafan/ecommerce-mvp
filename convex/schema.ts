import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  // Users table for storing user information with JWT authentication
  users: defineTable({
    email: v.string(),
    name: v.string(),
    hashedPassword: v.string(),
    role: v.union(v.literal('user'), v.literal('admin')),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index('by_email', ['email'])
    .index('by_role', ['role']),

  // Categories table
  categories: defineTable({
    name: v.string(),
    description: v.optional(v.string()),
    slug: v.string(),
    imageUrl: v.optional(v.string()),
    isActive: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index('by_slug', ['slug'])
    .index('by_active', ['isActive']),

  // Products table
  products: defineTable({
    name: v.string(),
    description: v.string(),
    shortDescription: v.optional(v.string()),
    price: v.number(),
    compareAtPrice: v.optional(v.number()),
    images: v.array(v.string()),
    categoryId: v.id('categories'),
    inventory: v.number(),
    sku: v.optional(v.string()),
    weight: v.optional(v.number()),
    dimensions: v.optional(
      v.object({
        length: v.number(),
        width: v.number(),
        height: v.number(),
      })
    ),
    variants: v.optional(
      v.array(
        v.object({
          id: v.string(),
          name: v.string(),
          value: v.string(),
          price: v.optional(v.number()),
          inventory: v.optional(v.number()),
        })
      )
    ),
    tags: v.optional(v.array(v.string())),
    isActive: v.boolean(),
    isFeatured: v.boolean(),
    seoTitle: v.optional(v.string()),
    seoDescription: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index('by_category', ['categoryId'])
    .index('by_active', ['isActive'])
    .index('by_featured', ['isFeatured', 'isActive'])
    .index('by_sku', ['sku'])
    .searchIndex('search_products', {
      searchField: 'name',
      filterFields: ['categoryId', 'isActive', 'isFeatured'],
    }),

  // Cart items table
  cartItems: defineTable({
    userId: v.string(), // User ID from JWT token
    productId: v.id('products'),
    quantity: v.number(),
    variant: v.optional(
      v.object({
        id: v.string(),
        name: v.string(),
        value: v.string(),
      })
    ),
    priceAtTime: v.number(), // Price when added to cart
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index('by_user', ['userId'])
    .index('by_user_product', ['userId', 'productId']),

  // Orders table
  orders: defineTable({
    userId: v.string(), // User ID from JWT token
    orderNumber: v.string(),
    status: v.union(
      v.literal('pending'),
      v.literal('confirmed'),
      v.literal('processing'),
      v.literal('shipped'),
      v.literal('delivered'),
      v.literal('cancelled'),
      v.literal('refunded')
    ),
    items: v.array(
      v.object({
        productId: v.id('products'),
        productName: v.string(),
        productImage: v.string(),
        quantity: v.number(),
        price: v.number(),
        variant: v.optional(
          v.object({
            id: v.string(),
            name: v.string(),
            value: v.string(),
          })
        ),
      })
    ),
    subtotal: v.number(),
    tax: v.number(),
    shipping: v.number(),
    total: v.number(),
    currency: v.string(),
    shippingAddress: v.object({
      firstName: v.string(),
      lastName: v.string(),
      address1: v.string(),
      address2: v.optional(v.string()),
      city: v.string(),
      state: v.string(),
      postalCode: v.string(),
      country: v.string(),
      phone: v.optional(v.string()),
    }),
    billingAddress: v.optional(
      v.object({
        firstName: v.string(),
        lastName: v.string(),
        address1: v.string(),
        address2: v.optional(v.string()),
        city: v.string(),
        state: v.string(),
        postalCode: v.string(),
        country: v.string(),
        phone: v.optional(v.string()),
      })
    ),
    paymentMethod: v.optional(v.string()),
    paymentIntentId: v.optional(v.string()),
    trackingNumber: v.optional(v.string()),
    notes: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index('by_user', ['userId'])
    .index('by_order_number', ['orderNumber'])
    .index('by_status', ['status']),

  // Product reviews table
  reviews: defineTable({
    productId: v.id('products'),
    userId: v.string(), // User ID from JWT token
    userName: v.string(),
    rating: v.number(), // 1-5 stars
    title: v.string(),
    comment: v.string(),
    isVerifiedPurchase: v.boolean(),
    isApproved: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index('by_product', ['productId'])
    .index('by_user', ['userId'])
    .index('by_approved', ['isApproved']),

  // Wishlists table
  wishlists: defineTable({
    userId: v.string(), // User ID from JWT token
    productId: v.id('products'),
    createdAt: v.number(),
  })
    .index('by_user', ['userId'])
    .index('by_user_product', ['userId', 'productId']),

  // Newsletter subscriptions
  newsletterSubscriptions: defineTable({
    email: v.string(),
    isActive: v.boolean(),
    source: v.optional(v.string()), // 'footer', 'popup', 'checkout', etc.
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index('by_email', ['email'])
    .index('by_active', ['isActive']),

  // Analytics events
  analyticsEvents: defineTable({
    userId: v.optional(v.string()),
    sessionId: v.string(),
    event: v.string(),
    properties: v.optional(v.object({})),
    timestamp: v.number(),
  })
    .index('by_user', ['userId'])
    .index('by_session', ['sessionId'])
    .index('by_event', ['event']),
});
