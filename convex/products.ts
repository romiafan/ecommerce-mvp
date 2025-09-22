import { v } from 'convex/values';

import { mutation, query } from './_generated/server';

// Get all products with optional filters
export const getProducts = query({
  args: {
    categoryId: v.optional(v.id('categories')),
    featured: v.optional(v.boolean()),
    limit: v.optional(v.number()),
    search: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let products;

    if (args.search) {
      products = await ctx.db
        .query('products')
        .withSearchIndex('search_products', q =>
          q.search('name', args.search!).eq('isActive', true)
        )
        .collect();
    } else {
      products = await ctx.db
        .query('products')
        .withIndex('by_active', q => q.eq('isActive', true))
        .collect();
    }

    // Apply filters
    if (args.categoryId) {
      products = products.filter(p => p.categoryId === args.categoryId);
    }

    if (args.featured !== undefined) {
      products = products.filter(p => p.isFeatured === args.featured);
    }

    // Sort by creation date (newest first)
    products.sort((a, b) => b.createdAt - a.createdAt);

    // Apply limit
    if (args.limit) {
      products = products.slice(0, args.limit);
    }

    return products;
  },
});

// Get single product by ID
export const getProduct = query({
  args: { id: v.id('products') },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Get featured products
export const getFeaturedProducts = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const products = await ctx.db
      .query('products')
      .withIndex('by_featured', q =>
        q.eq('isFeatured', true).eq('isActive', true)
      )
      .collect();

    const sorted = products.sort((a, b) => b.createdAt - a.createdAt);
    return args.limit ? sorted.slice(0, args.limit) : sorted;
  },
});

// Create product (admin only)
export const createProduct = mutation({
  args: {
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
    isFeatured: v.optional(v.boolean()),
    seoTitle: v.optional(v.string()),
    seoDescription: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // TODO: Add admin role check
    return await ctx.db.insert('products', {
      ...args,
      isActive: true,
      isFeatured: args.isFeatured || false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

// Update product (admin only)
export const updateProduct = mutation({
  args: {
    id: v.id('products'),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    shortDescription: v.optional(v.string()),
    price: v.optional(v.number()),
    compareAtPrice: v.optional(v.number()),
    images: v.optional(v.array(v.string())),
    categoryId: v.optional(v.id('categories')),
    inventory: v.optional(v.number()),
    sku: v.optional(v.string()),
    weight: v.optional(v.number()),
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
    isActive: v.optional(v.boolean()),
    isFeatured: v.optional(v.boolean()),
    seoTitle: v.optional(v.string()),
    seoDescription: v.optional(v.string()),
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

// Update product inventory
export const updateProductInventory = mutation({
  args: {
    id: v.id('products'),
    inventory: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args.id, {
      inventory: args.inventory,
      updatedAt: Date.now(),
    });
  },
});

// Delete product (admin only)
export const deleteProduct = mutation({
  args: { id: v.id('products') },
  handler: async (ctx, args) => {
    // TODO: Add admin role check
    return await ctx.db.delete(args.id);
  },
});
