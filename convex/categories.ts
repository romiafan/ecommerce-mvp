import { v } from 'convex/values';

import { mutation, query } from './_generated/server';

// Get all categories
export const getCategories = query({
  args: {},
  handler: async ctx => {
    return await ctx.db
      .query('categories')
      .withIndex('by_active', q => q.eq('isActive', true))
      .collect();
  },
});

// Get category by slug
export const getCategoryBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('categories')
      .withIndex('by_slug', q => q.eq('slug', args.slug))
      .unique();
  },
});

// Create category (admin only)
export const createCategory = mutation({
  args: {
    name: v.string(),
    description: v.optional(v.string()),
    slug: v.string(),
    imageUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // TODO: Add admin role check
    return await ctx.db.insert('categories', {
      name: args.name,
      description: args.description,
      slug: args.slug,
      imageUrl: args.imageUrl,
      isActive: true,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

// Update category (admin only)
export const updateCategory = mutation({
  args: {
    id: v.id('categories'),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    slug: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    isActive: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    // TODO: Add admin role check
    const { id, ...updates } = args;
    return await ctx.db.patch(id, {
      ...updates,
      updatedAt: Date.now(),
    });
  },
});

// Delete category (admin only)
export const deleteCategory = mutation({
  args: { id: v.id('categories') },
  handler: async (ctx, args) => {
    // TODO: Add admin role check
    // Check if category has products
    const products = await ctx.db
      .query('products')
      .withIndex('by_category', q => q.eq('categoryId', args.id))
      .collect();

    if (products.length > 0) {
      throw new Error('Cannot delete category with existing products');
    }

    return await ctx.db.delete(args.id);
  },
});
