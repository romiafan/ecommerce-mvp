import { mutation } from './_generated/server';

/**
 * Seed data for the E-commerce MVP
 * This file contains all the seed data for categories and products
 * Run `npx convex dev --once --run convex/seed.ts:seedAll` to populate the database
 */

// Category seed data
const SEED_CATEGORIES = [
  {
    name: 'Electronics',
    slug: 'electronics',
    description: 'Latest electronic gadgets and devices',
    imageUrl:
      'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400',
    isActive: true,
  },
  {
    name: 'Clothing',
    slug: 'clothing',
    description: 'Fashion and apparel for all occasions',
    imageUrl:
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400',
    isActive: true,
  },
  {
    name: 'Home & Garden',
    slug: 'home-garden',
    description: 'Everything for your home and garden',
    imageUrl:
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
    isActive: true,
  },
  {
    name: 'Sports & Fitness',
    slug: 'sports-fitness',
    description: 'Equipment and gear for active lifestyle',
    imageUrl:
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
    isActive: true,
  },
];

// Product seed data factory
const createProductSeedData = (
  electronics: any,
  clothing: any,
  homeGarden: any
) => [
  // Electronics
  {
    name: 'Wireless Bluetooth Headphones',
    description:
      'Premium noise-cancelling wireless headphones with 30-hour battery life and crystal-clear audio quality.',
    shortDescription: 'Premium noise-cancelling wireless headphones',
    price: 199.99,
    compareAtPrice: 249.99,
    sku: 'WBH-001',
    inventory: 50,
    categoryId: electronics._id,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400',
      'https://images.unsplash.com/photo-1545127398-14699f92334b?w=400',
    ],
    tags: ['electronics', 'audio', 'wireless', 'bluetooth'],
    isActive: true,
    isFeatured: true,
    weight: 0.3,
    dimensions: { length: 20, width: 18, height: 8 },
  },
  {
    name: 'Smart Home Security Camera',
    description:
      '1080p HD wireless security camera with night vision, motion detection, and mobile app control.',
    shortDescription: '1080p HD wireless security camera',
    price: 89.99,
    compareAtPrice: 129.99,
    sku: 'SHC-001',
    inventory: 75,
    categoryId: electronics._id,
    images: [
      'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400',
      'https://images.unsplash.com/photo-1544098485-6b5e8b8e6f6b?w=400',
    ],
    tags: ['electronics', 'security', 'smart-home', 'camera'],
    isActive: true,
    isFeatured: true,
    weight: 0.5,
    dimensions: { length: 10, width: 10, height: 12 },
  },
  {
    name: 'Portable Power Bank 20000mAh',
    description:
      'High-capacity portable charger with fast charging and multiple USB ports for all your devices.',
    shortDescription: 'High-capacity portable charger',
    price: 39.99,
    sku: 'PPB-001',
    inventory: 100,
    categoryId: electronics._id,
    images: [
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400',
      'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400',
    ],
    tags: ['electronics', 'portable', 'charger', 'usb'],
    isActive: true,
    isFeatured: false,
    weight: 0.4,
    dimensions: { length: 15, width: 7, height: 2 },
  },
  {
    name: 'Smartphone 128GB',
    description:
      'Latest flagship smartphone with 128GB storage, triple camera system, and all-day battery life.',
    shortDescription: 'Latest flagship smartphone 128GB',
    price: 699.99,
    compareAtPrice: 799.99,
    sku: 'SP-001',
    inventory: 30,
    categoryId: electronics._id,
    images: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
      'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400',
    ],
    tags: ['electronics', 'smartphone', 'mobile', 'camera'],
    isActive: true,
    isFeatured: true,
    weight: 0.2,
    dimensions: { length: 15, width: 7, height: 1 },
    variants: [
      { id: 'color', name: 'Color', value: 'Black', price: 699.99 },
      { id: 'color-blue', name: 'Color', value: 'Blue', price: 699.99 },
    ],
  },

  // Clothing
  {
    name: 'Classic Cotton T-Shirt',
    description:
      'Comfortable 100% organic cotton t-shirt in various colors. Perfect for casual wear.',
    shortDescription: '100% organic cotton t-shirt',
    price: 24.99,
    compareAtPrice: 34.99,
    sku: 'CCT-001',
    inventory: 200,
    categoryId: clothing._id,
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
      'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=400',
      'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=400',
    ],
    tags: ['clothing', 'cotton', 'casual', 'organic'],
    isActive: true,
    isFeatured: true,
    weight: 0.2,
    variants: [
      { id: 'size-s', name: 'Size', value: 'S' },
      { id: 'size-m', name: 'Size', value: 'M' },
      { id: 'size-l', name: 'Size', value: 'L' },
    ],
  },
  {
    name: 'Denim Jeans - Slim Fit',
    description:
      'Premium denim jeans with a modern slim fit. Durable construction with stretch for comfort.',
    shortDescription: 'Premium slim fit denim jeans',
    price: 79.99,
    compareAtPrice: 99.99,
    sku: 'DJ-001',
    inventory: 150,
    categoryId: clothing._id,
    images: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400',
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400',
    ],
    tags: ['clothing', 'denim', 'jeans', 'slim-fit'],
    isActive: true,
    isFeatured: true,
    weight: 0.6,
    variants: [
      { id: 'waist-32', name: 'Waist', value: '32' },
      { id: 'waist-34', name: 'Waist', value: '34' },
    ],
  },
  {
    name: 'Winter Wool Sweater',
    description:
      'Cozy wool sweater perfect for cold weather. Soft, warm, and stylish.',
    shortDescription: 'Cozy wool sweater for winter',
    price: 89.99,
    sku: 'WWS-001',
    inventory: 80,
    categoryId: clothing._id,
    images: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400',
      'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400',
    ],
    tags: ['clothing', 'sweater', 'wool', 'winter'],
    isActive: true,
    isFeatured: false,
    weight: 0.4,
  },

  // Home & Garden
  {
    name: 'Ceramic Plant Pot Set',
    description:
      'Beautiful set of 3 ceramic plant pots with drainage holes. Perfect for indoor plants.',
    shortDescription: 'Set of 3 ceramic plant pots',
    price: 34.99,
    sku: 'CPP-001',
    inventory: 80,
    categoryId: homeGarden._id,
    images: [
      'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400',
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400',
    ],
    tags: ['home', 'garden', 'planters', 'ceramic'],
    isActive: true,
    isFeatured: false,
    weight: 1.2,
    dimensions: { length: 15, width: 15, height: 18 },
  },
  {
    name: 'LED Desk Lamp with USB Charging',
    description:
      'Modern LED desk lamp with adjustable brightness, color temperature, and built-in USB charging port.',
    shortDescription: 'Modern LED desk lamp with USB charging',
    price: 59.99,
    sku: 'LDL-001',
    inventory: 60,
    categoryId: homeGarden._id,
    images: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400',
    ],
    tags: ['home', 'lighting', 'led', 'desk', 'usb'],
    isActive: true,
    isFeatured: true,
    weight: 0.8,
    dimensions: { length: 20, width: 20, height: 45 },
  },
  {
    name: 'Coffee Maker - 12 Cup',
    description:
      'Programmable coffee maker with thermal carafe. Brews perfect coffee every time.',
    shortDescription: 'Programmable 12-cup coffee maker',
    price: 149.99,
    compareAtPrice: 199.99,
    sku: 'CM-001',
    inventory: 40,
    categoryId: homeGarden._id,
    images: [
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400',
      'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400',
    ],
    tags: ['home', 'kitchen', 'coffee', 'appliance'],
    isActive: true,
    isFeatured: true,
    weight: 2.5,
    dimensions: { length: 25, width: 20, height: 35 },
  },
];

/**
 * Clear all data from the database (development only)
 * WARNING: This will delete all data in the database
 */
export const clearAll = mutation({
  handler: async ctx => {
    const tables = [
      'products',
      'categories',
      'users',
      'orders',
      'cartItems',
      'reviews',
      'wishlists',
      'analytics',
    ];

    for (const table of tables) {
      try {
        const items = await ctx.db.query(table as any).collect();
        for (const item of items) {
          await ctx.db.delete(item._id);
        }
      } catch (error) {
        // Table might not exist, continue
        console.log(`Table ${table} might not exist, skipping...`);
      }
    }

    return { success: true, message: 'All data cleared' };
  },
});

/**
 * Seed all data - categories and products
 * This is the main function to populate the database with initial data
 */
export const seedAll = mutation({
  args: {},
  handler: async ctx => {
    const currentTime = Date.now();

    // Clear existing data first
    const existingProducts = await ctx.db.query('products').collect();
    const existingCategories = await ctx.db.query('categories').collect();

    for (const product of existingProducts) {
      await ctx.db.delete(product._id);
    }

    for (const category of existingCategories) {
      await ctx.db.delete(category._id);
    }

    // Insert categories with timestamps
    const createdCategories = [];
    for (const categoryData of SEED_CATEGORIES) {
      const category = {
        ...categoryData,
        createdAt: currentTime,
        updatedAt: currentTime,
      };
      const categoryId = await ctx.db.insert('categories', category);
      createdCategories.push({ ...category, _id: categoryId });
    }

    // Find category references
    const electronics = createdCategories.find(c => c.name === 'Electronics')!;
    const clothing = createdCategories.find(c => c.name === 'Clothing')!;
    const homeGarden = createdCategories.find(c => c.name === 'Home & Garden')!;

    // Insert products with timestamps
    const products = createProductSeedData(electronics, clothing, homeGarden);
    let productCount = 0;

    for (const productData of products) {
      const product = {
        ...productData,
        createdAt: currentTime,
        updatedAt: currentTime,
      };
      await ctx.db.insert('products', product);
      productCount++;
    }

    return {
      success: true,
      message: 'All seed data created successfully',
      categories: createdCategories.length,
      products: productCount,
    };
  },
});
