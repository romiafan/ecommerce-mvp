import { v } from 'convex/values';

import { mutation, query } from './_generated/server';

// Get cart items for a user
export const getCartItems = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const cartItems = await ctx.db
      .query('cartItems')
      .withIndex('by_user', q => q.eq('userId', args.userId))
      .collect();

    // Get product details for each cart item
    const itemsWithProducts = await Promise.all(
      cartItems.map(async item => {
        const product = await ctx.db.get(item.productId);
        return {
          ...item,
          product,
        };
      })
    );

    return itemsWithProducts;
  },
});

// Add item to cart
export const addToCart = mutation({
  args: {
    userId: v.string(),
    productId: v.id('products'),
    quantity: v.number(),
    variant: v.optional(
      v.object({
        id: v.string(),
        name: v.string(),
        value: v.string(),
      })
    ),
  },
  handler: async (ctx, args) => {
    // Get product to check inventory and price
    const product = await ctx.db.get(args.productId);
    if (!product) {
      throw new Error('Product not found');
    }

    if (!product.isActive) {
      throw new Error('Product is not available');
    }

    // Check inventory
    if (product.inventory < args.quantity) {
      throw new Error('Not enough inventory');
    }

    // Check if item already exists in cart
    const existingItem = await ctx.db
      .query('cartItems')
      .withIndex('by_user_product', q =>
        q.eq('userId', args.userId).eq('productId', args.productId)
      )
      .filter(q => {
        if (!args.variant) {
          return q.eq(q.field('variant'), undefined);
        }
        return q.eq(q.field('variant.id'), args.variant.id);
      })
      .unique();

    if (existingItem) {
      // Update quantity
      const newQuantity = existingItem.quantity + args.quantity;
      if (product.inventory < newQuantity) {
        throw new Error('Not enough inventory');
      }

      return await ctx.db.patch(existingItem._id, {
        quantity: newQuantity,
        updatedAt: Date.now(),
      });
    }

    // Create new cart item
    return await ctx.db.insert('cartItems', {
      userId: args.userId,
      productId: args.productId,
      quantity: args.quantity,
      variant: args.variant,
      priceAtTime: product.price,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

// Update cart item quantity
export const updateCartItem = mutation({
  args: {
    itemId: v.id('cartItems'),
    quantity: v.number(),
  },
  handler: async (ctx, args) => {
    if (args.quantity <= 0) {
      return await ctx.db.delete(args.itemId);
    }

    const cartItem = await ctx.db.get(args.itemId);
    if (!cartItem) {
      throw new Error('Cart item not found');
    }

    const product = await ctx.db.get(cartItem.productId);
    if (!product) {
      throw new Error('Product not found');
    }

    if (product.inventory < args.quantity) {
      throw new Error('Not enough inventory');
    }

    return await ctx.db.patch(args.itemId, {
      quantity: args.quantity,
      updatedAt: Date.now(),
    });
  },
});

// Remove item from cart
export const removeFromCart = mutation({
  args: { itemId: v.id('cartItems') },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args.itemId);
  },
});

// Clear user's cart
export const clearCart = mutation({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const cartItems = await ctx.db
      .query('cartItems')
      .withIndex('by_user', q => q.eq('userId', args.userId))
      .collect();

    for (const item of cartItems) {
      await ctx.db.delete(item._id);
    }

    return { success: true };
  },
});

// Get cart summary (total items and price)
export const getCartSummary = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const cartItems = await ctx.db
      .query('cartItems')
      .withIndex('by_user', q => q.eq('userId', args.userId))
      .collect();

    let totalItems = 0;
    let totalPrice = 0;

    for (const item of cartItems) {
      totalItems += item.quantity;
      totalPrice += item.priceAtTime * item.quantity;
    }

    return {
      totalItems,
      totalPrice,
      itemCount: cartItems.length,
    };
  },
});
