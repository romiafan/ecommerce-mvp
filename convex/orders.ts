import { v } from 'convex/values';

import { mutation, query } from './_generated/server';

// Get user's orders
export const getUserOrders = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const orders = await ctx.db
      .query('orders')
      .withIndex('by_user', q => q.eq('userId', args.userId))
      .order('desc')
      .collect();

    return orders;
  },
});

// Get single order by ID
export const getOrder = query({
  args: { orderId: v.id('orders') },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.orderId);
  },
});

// Create new order
export const createOrder = mutation({
  args: {
    userId: v.string(),
    orderNumber: v.string(),
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
  },
  handler: async (ctx, args) => {
    const order = await ctx.db.insert('orders', {
      ...args,
      status: 'pending' as const,
      trackingNumber: undefined,
      notes: undefined,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return order;
  },
});

// Update order status
export const updateOrderStatus = mutation({
  args: {
    orderId: v.id('orders'),
    status: v.union(
      v.literal('pending'),
      v.literal('confirmed'),
      v.literal('processing'),
      v.literal('shipped'),
      v.literal('delivered'),
      v.literal('cancelled'),
      v.literal('refunded')
    ),
    trackingNumber: v.optional(v.string()),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { orderId, ...updates } = args;

    return await ctx.db.patch(orderId, {
      ...updates,
      updatedAt: Date.now(),
    });
  },
});

// Get order by order number
export const getOrderByNumber = query({
  args: { orderNumber: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('orders')
      .withIndex('by_order_number', q => q.eq('orderNumber', args.orderNumber))
      .first();
  },
});

// Admin: Get all orders
export const getAllOrders = query({
  args: {
    limit: v.optional(v.number()),
    status: v.optional(
      v.union(
        v.literal('pending'),
        v.literal('confirmed'),
        v.literal('processing'),
        v.literal('shipped'),
        v.literal('delivered'),
        v.literal('cancelled'),
        v.literal('refunded')
      )
    ),
  },
  handler: async (ctx, args) => {
    // TODO: Add admin role check
    let orders;

    if (args.status) {
      orders = await ctx.db
        .query('orders')
        .withIndex('by_status', q => q.eq('status', args.status!))
        .order('desc')
        .collect();
    } else {
      orders = await ctx.db.query('orders').order('desc').collect();
    }

    if (args.limit) {
      orders = orders.slice(0, args.limit);
    }

    return orders;
  },
});
