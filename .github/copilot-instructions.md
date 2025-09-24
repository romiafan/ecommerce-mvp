# E-commerce MVP - AI Agent Instructions

## Architecture Overview

This is a **Next.js 14 + Convex + JWT** e-commerce monorepo built for the Indonesian market. Key architectural decisions:

- **Monorepo Structure**: Turbo v2.0.0 with `apps/web/` (Next.js), `packages/` (shared), `convex/` (database)
- **Authentication**: Custom JWT implementation (replaced Clerk) with bcrypt password hashing
- **Database**: Convex real-time database with 8 tables and comprehensive relationships
- **Payments**: Midtrans integration for Indonesian payment methods (cards, bank transfers, e-wallets)
- **UI System**: Radix UI + Tailwind CSS in shared `packages/ui/` package

## Development Workflow

### Essential Commands

```bash
# Start entire stack - runs Next.js + Convex in parallel
pnpm dev

# Database operations (IMPORTANT: Convex functions are server-side)
pnpm seed              # Populate with sample products/categories
pnpm db:clear          # Clear all data (dev only)
pnpm convex:dev        # Convex backend only
pnpm convex:deploy     # Deploy to production

# Turbo-powered builds (respects dependency graph)
pnpm build             # Build all packages
pnpm build:web         # Build web app only
```

### Package Dependencies

- `packages/ui/` must be built before `apps/web/` (Turbo handles this)
- All packages use workspace protocol: `"@ecommerce/ui": "workspace:*"`
- Environment variables are shared but Next.js requires `NEXT_PUBLIC_` prefix for client-side

## Database & Backend Patterns

### Convex Function Organization

```typescript
// convex/products.ts - follows this pattern for all entities
export const getProducts = query({ ... });      // Read operations
export const createProduct = mutation({ ... }); // Write operations
export const updateProduct = mutation({ ... }); // Always include updatedAt
```

**Critical**: Convex functions run server-side. Use `ConvexHttpClient` in API routes, not client components.

### Schema Conventions

- All tables have `createdAt` and `updatedAt` timestamps
- User references use string `userId` (JWT token payload), not `Id<"users">`
- Products support variants array, categories have slugs, orders store full item snapshots
- Search is configured on products table: `searchIndex('search_products')`

### Authentication Flow

1. **Registration/Login**: `/api/auth/*` routes handle JWT creation/verification
2. **Tokens**: HTTP-only cookies for web, JWT payload contains `{userId, email, role}`
3. **Server Utilities**: Use `apps/web/lib/auth-server.ts` for protected API routes
4. **Client State**: Custom hooks in `apps/web/lib/auth.ts` handle login/logout

## Key File Locations

### Configuration

- `turbo.json` - Monorepo task definitions and caching
- `apps/web/next.config.js` - Next.js with image domains for Unsplash
- `convex/schema.ts` - Complete database schema with 8 tables

### Core Business Logic

- `convex/products.ts` - Product CRUD with search and filtering
- `convex/orders.ts` - Order management with payment status tracking
- `apps/web/lib/midtrans.ts` - Payment gateway integration
- `apps/web/app/api/payment/webhook/route.ts` - Payment status updates

### UI Components

- `packages/ui/src/components/` - Shared Button, Card, Input with CVA variants
- `apps/web/components/layout/header.tsx` - Auth state, cart count, mobile menu
- `apps/web/components/products/` - ProductGrid, filters, search components

## Project-Specific Patterns

### Component Conventions

- Use `'use client'` directive only when necessary (auth state, interactive components)
- Server Components by default, especially for product listings and static content
- Shared UI components use `class-variance-authority` for variant styling

### Data Fetching

```typescript
// ❌ Don't use Convex hooks in API routes
const products = useQuery(api.products.getProducts, {});

// ✅ Use ConvexHttpClient in API routes
const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
const products = await convex.query(api.products.getProducts, {});
```

### Payment Integration

- Midtrans requires server-side token creation, client-side popup handling
- Webhook verification is mandatory for production (signature validation)
- Order status updates happen via webhooks, not polling

### Environment Variables

```bash
# Required for development
NEXT_PUBLIC_CONVEX_URL=     # From `pnpm convex:dev`
JWT_SECRET=                 # Generate secure random string
MIDTRANS_SERVER_KEY=        # From Midtrans dashboard
NEXT_PUBLIC_MIDTRANS_CLIENT_KEY=  # For client-side Snap
```

## Testing & Debugging

### Database Seeding

The seed data includes 4 categories and 10 realistic products with Unsplash images:

```bash
npx convex dev --once --run convex/seed.ts:seedAll
```

### Payment Testing

- Use sandbox mode: `MIDTRANS_IS_PRODUCTION=false`
- Test cards and bank account numbers available in Midtrans docs
- Webhook testing requires ngrok or production deployment

### Common Issues

- **Convex deployment**: Run `npx convex deploy` before production builds
- **CORS errors**: Convex functions handle CORS automatically, API routes need manual setup
- **JWT verification**: Tokens expire after 7 days, handle graceful logout
- **Image optimization**: Next.js Image component requires domain allowlist in next.config.js

## Deployment Checklist

1. Deploy Convex: `npx convex deploy --prod`
2. Set production environment variables in Vercel
3. Update `MIDTRANS_IS_PRODUCTION=true` for live payments
4. Verify webhook endpoints are accessible (no localhost URLs)
5. Test complete order flow with real payment methods

This codebase prioritizes production readiness with comprehensive error handling, type safety, and real-world payment integration patterns.
