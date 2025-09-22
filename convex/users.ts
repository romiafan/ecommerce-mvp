import { v } from 'convex/values';

import { mutation, query } from './_generated/server';

// Create user with JWT authentication
export const createUser = mutation({
  args: {
    email: v.string(),
    name: v.string(),
    hashedPassword: v.string(),
  },
  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query('users')
      .withIndex('by_email', q => q.eq('email', args.email))
      .unique();

    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Create new user
    return await ctx.db.insert('users', {
      email: args.email,
      name: args.name,
      hashedPassword: args.hashedPassword,
      role: 'user',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

// Get user by email
export const getUserByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('users')
      .withIndex('by_email', q => q.eq('email', args.email))
      .unique();
  },
});

// Get user by ID
export const getUserById = query({
  args: { userId: v.id('users') },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.userId);
  },
});

// Update user role (admin only)
export const updateUserRole = mutation({
  args: {
    userId: v.id('users'),
    role: v.union(v.literal('user'), v.literal('admin')),
  },
  handler: async (ctx, args) => {
    // TODO: Add admin role check
    return await ctx.db.patch(args.userId, {
      role: args.role,
      updatedAt: Date.now(),
    });
  },
});

// Update user profile
export const updateUserProfile = mutation({
  args: {
    userId: v.id('users'),
    name: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const updateData: any = {
      updatedAt: Date.now(),
    };

    if (args.name !== undefined) {
      updateData.name = args.name;
    }

    return await ctx.db.patch(args.userId, updateData);
  },
});

// Delete user
export const deleteUser = mutation({
  args: { userId: v.id('users') },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);

    if (!user) {
      throw new Error('User not found');
    }

    // Delete user's cart items
    const cartItems = await ctx.db
      .query('cartItems')
      .withIndex('by_user', q => q.eq('userId', args.userId))
      .collect();

    for (const item of cartItems) {
      await ctx.db.delete(item._id);
    }

    // Delete user's wishlist items
    const wishlistItems = await ctx.db
      .query('wishlists')
      .withIndex('by_user', q => q.eq('userId', args.userId))
      .collect();

    for (const item of wishlistItems) {
      await ctx.db.delete(item._id);
    }

    // Delete the user
    return await ctx.db.delete(user._id);
  },
});
