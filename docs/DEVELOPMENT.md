# 🚀 Development Guide

## 📋 Prerequisites

### Required Software

- **Node.js** v18.17.0 or later
- **pnpm** v8.0.0 or later (recommended package manager)
- **Git** for version control
- **VS Code** (recommended) with extensions:
  - TypeScript and JavaScript Language Features
  - Tailwind CSS IntelliSense
  - ESLint
  - Prettier
  - Convex Extension

## 🛠️ Development Setup

### 1. Quick Setup

```bash
# Clone and install
git clone <repository-url>
cd ecommerce-mvp
pnpm install

# Setup environment
cp .env.example .env.local
# Edit .env.local with your API keys
```

### 2. Environment Configuration

```env
# Convex Database
CONVEX_DEPLOYMENT=your-deployment-name
NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud

# JWT Authentication
JWT_SECRET=your-super-secure-jwt-secret-key-minimum-256-bits

# Midtrans Payment Gateway
MIDTRANS_SERVER_KEY=your-midtrans-server-key
MIDTRANS_CLIENT_KEY=your-midtrans-client-key
MIDTRANS_IS_PRODUCTION=false

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Database & Services Setup

```bash
# Deploy Convex schema
npx convex deploy

# Seed sample data
npm run seed

# Start development servers
pnpm dev  # Starts both Convex and Next.js
```

## 🏗️ Architecture Overview

### Modern Tech Stack

- **Frontend**: Next.js 14.1.0 with App Router, TypeScript 5.9.2, Tailwind CSS
- **Backend**: Convex real-time database with comprehensive schema
- **Authentication**: Custom JWT implementation with bcrypt password hashing
- **Payments**: Midtrans gateway with full Indonesian payment methods
- **UI**: Radix UI components with accessibility and theme support
- **Build**: Turbo v2.0.0 monorepo with optimized development workflow
- **Deployment**: Vercel-ready with production environment configuration

### Project Structure

```
ecommerce-mvp/
├── apps/
│   └── web/                 # Next.js 14.1.0 application
│       ├── app/             # App Router pages
│       │   ├── api/         # API routes (auth, payment)
│       │   ├── products/    # Product catalog pages
│       │   └── providers/   # React context providers
│       ├── components/      # React components
│       │   ├── layout/      # Header, Footer components
│       │   ├── products/    # Product-related components
│       │   └── sections/    # Homepage sections
│       ├── lib/             # Utilities (auth, payments)
│       └── middleware.ts    # Auth middleware
├── packages/
│   ├── ui/                  # Shared Radix UI components
│   ├── database/            # TypeScript types & schemas
│   └── config/              # Shared configuration
├── convex/                  # Convex backend functions
│   ├── schema.ts           # Database schema (8 tables)
│   ├── products.ts         # Product CRUD operations
│   ├── users.ts            # User management & auth
│   ├── cart.ts             # Shopping cart functions
│   └── seed.ts             # Sample data seeding
└── docs/                   # Documentation
```

## 🔄 Development Workflow

### Daily Development

```bash
# Start all development services
pnpm dev              # Convex + Next.js in parallel

# Individual services
pnpm dev:web          # Next.js only
pnpm dev:convex       # Convex only

# Database operations
npm run seed          # Add sample data
npm run db:clear      # Clear all data
npx convex dashboard  # Open database dashboard
```

### Code Quality & Building

```bash
# Quality checks
pnpm lint             # ESLint all packages
pnpm type-check       # TypeScript compilation
pnpm format           # Prettier formatting check

# Auto-fix issues
pnpm lint:fix         # Fix ESLint issues
pnpm format:write     # Apply Prettier formatting

# Building
pnpm build            # Build all packages
pnpm build:web        # Build web app only
pnpm build:packages   # Build packages only
```

## 🔐 Authentication Development

### JWT System Overview

Our custom JWT implementation replaces Clerk with:

- **bcrypt** password hashing for security
- **JWT tokens** for session management
- **HTTP-only cookies** for secure token storage
- **Server-side verification** utilities

### Auth API Endpoints

```typescript
// Available auth routes in apps/web/app/api/auth/
POST / api / auth / register; // User registration
POST / api / auth / login; // User login
POST / api / auth / logout; // User logout
GET / api / auth / me; // Get current user
```

### Development Testing

```bash
# Test user registration
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","name":"Test User"}'

# Test user login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Auth Utilities

```typescript
// Server-side auth utilities in apps/web/lib/auth.ts
import { getCurrentUser, verifyToken } from '@/lib/auth';

// Verify JWT token
const user = await verifyToken(token);

// Get current user from request
const currentUser = await getCurrentUser(request);
```

## 💳 Payment Integration Development

### Midtrans Setup

- **Server Key**: Backend transaction processing
- **Client Key**: Frontend payment UI SDK
- **Webhook**: Real-time payment status updates
- **Custom Types**: Full TypeScript support included

### Payment API Endpoints

```typescript
// Payment routes in apps/web/app/api/payment/
POST / api / payment / create; // Create payment transaction
POST / api / payment / webhook; // Handle Midtrans notifications
```

### Testing Payments

```bash
# Use sandbox mode for testing
MIDTRANS_IS_PRODUCTION=false

# Test with Midtrans test card numbers
# 4811 1111 1111 1114 (Visa)
# 5211 1111 1111 1117 (Mastercard)
```

### Webhook Development

```bash
# Test webhooks locally with ngrok
ngrok http 3000

# Configure webhook URL in Midtrans dashboard
https://your-ngrok-url.ngrok.io/api/payment/webhook
```

## 🗄️ Database Development

### Convex Schema

Our database includes 8 comprehensive tables:

- **users** - JWT authentication with bcrypt
- **products** - Full catalog with variants & images
- **categories** - Product categories with hierarchy
- **orders** - Complete order management
- **cartItems** - Real-time shopping cart
- **reviews** - Product reviews (schema ready)
- **wishlists** - User wishlists (schema ready)
- **analytics** - Business metrics (schema ready)

### Database Operations

```bash
# Schema management
npx convex deploy         # Deploy schema changes
npx convex dashboard      # View data in dashboard

# Data management
npm run seed             # Add sample data (10 products, 4 categories)
npm run db:clear         # Clear all data

# Function development
npx convex logs          # View function logs
npx convex dev           # Development server with hot reload
```

### Creating New Database Functions

```typescript
// Example: convex/products.ts
import { v } from 'convex/values';

import { mutation, query } from './_generated/server';

export const create = mutation({
  args: {
    name: v.string(),
    price: v.number(),
    // ... other fields
  },
  handler: async (ctx, args) => {
    // Implementation
  },
});
```

## 🎨 UI Development

### Design System

- **Base**: Tailwind CSS with custom theme and CSS variables
- **Components**: Radix UI primitives for accessibility
- **Icons**: Lucide React for consistent iconography
- **Fonts**: Optimized system fonts with proper fallbacks
- **Theme**: Dark/light mode ready with theme provider

### Component Development

```bash
# Add new UI component to shared package
cd packages/ui/src/components
# Create component with proper TypeScript exports

# Use in web app
import { Button, Card, Input } from '@ecommerce/ui'
```

### Styling Guidelines

- Use Tailwind utility classes for consistency
- Follow mobile-first responsive design approach
- Maintain 4px spacing grid system
- Use CSS variables for theme values
- Implement proper dark mode support

## 📦 Package Management

### Monorepo Structure

```bash
# Add dependencies to specific packages
pnpm --filter web add <package>        # Add to web app
pnpm --filter ui add <package>         # Add to UI package
pnpm --filter database add <package>   # Add to database package

# Add dev dependencies
pnpm --filter web add -D <package>

# Add to workspace root
pnpm add -w <package>
```

### Managing Dependencies

```bash
# Install all dependencies
pnpm install

# Update dependencies
pnpm update

# Check for outdated packages
pnpm outdated

# Clean all node_modules and rebuild
pnpm clean && pnpm install
```

## 🧪 Testing & Quality Assurance

### Code Quality Checks

```bash
# Comprehensive quality check
pnpm lint && pnpm type-check && pnpm format

# Individual checks
pnpm lint              # ESLint for code quality
pnpm type-check        # TypeScript compilation
pnpm format            # Prettier formatting

# Auto-fix issues
pnpm lint:fix          # Fix ESLint issues
pnpm format:write      # Apply Prettier formatting
```

### Build Verification

```bash
# Verify production build
pnpm build

# Analyze bundle size
pnpm analyze

# Check for build issues
pnpm build:web && echo "✅ Web app builds successfully"
```

## 🚀 Deployment

### Development Deployment

```bash
# Deploy Convex to development
npx convex deploy --dev

# Deploy to Vercel preview
vercel
```

### Production Deployment

```bash
# Deploy Convex to production
npx convex deploy --prod

# Deploy to Vercel production
vercel --prod
```

### Environment Variables for Production

```env
# Production Convex
CONVEX_DEPLOYMENT=your-prod-deployment
NEXT_PUBLIC_CONVEX_URL=https://your-prod-deployment.convex.cloud

# Production JWT (use strong secret)
JWT_SECRET=your-production-jwt-secret-minimum-256-bits

# Production Midtrans
MIDTRANS_SERVER_KEY=your-production-server-key
MIDTRANS_CLIENT_KEY=your-production-client-key
MIDTRANS_IS_PRODUCTION=true

# Production URL
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

## 🐛 Debugging & Troubleshooting

### Common Issues & Solutions

#### 1. Convex Connection Issues

```bash
# Check environment variables
echo $CONVEX_DEPLOYMENT
echo $NEXT_PUBLIC_CONVEX_URL

# Restart Convex dev server
npx convex dev

# Clear Convex cache
rm -rf .convex
npx convex dev
```

#### 2. TypeScript Errors

```bash
# Check for type issues
pnpm type-check

# Restart TypeScript service in VS Code
# Cmd+Shift+P -> "TypeScript: Restart TS Server"

# Regenerate Convex types
npx convex dev
```

#### 3. Authentication Issues

```bash
# Verify JWT secret is set
echo $JWT_SECRET

# Test auth endpoints
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123","name":"Test"}'
```

#### 4. Payment Integration Issues

```bash
# Check Midtrans configuration
echo $MIDTRANS_SERVER_KEY
echo $MIDTRANS_CLIENT_KEY
echo $MIDTRANS_IS_PRODUCTION

# Test payment creation endpoint
curl -X POST http://localhost:3000/api/payment/create \
  -H "Content-Type: application/json" \
  -d '{"orderId":"test-123","amount":10000,"customerDetails":{}}'
```

#### 5. Build Failures

```bash
# Clean and rebuild everything
pnpm clean
pnpm install
pnpm build

# Check specific package builds
pnpm --filter web build
pnpm --filter ui build
```

### Development Tools

- **Convex Dashboard**: Real-time database monitoring and function logs
- **Next.js DevTools**: Performance analysis and debugging
- **React DevTools**: Component inspection and state debugging
- **VS Code Debugger**: Breakpoint debugging for full-stack development

## 📊 Performance Monitoring

### Development Performance

```bash
# Analyze bundle size
pnpm build
pnpm analyze

# Check TypeScript compilation speed
time pnpm type-check

# Monitor Convex function performance
npx convex logs
```

### Production Readiness Checklist

- [ ] All TypeScript errors resolved
- [ ] ESLint warnings addressed
- [ ] Build completes successfully
- [ ] Environment variables configured
- [ ] Authentication flow tested
- [ ] Payment integration verified
- [ ] Database schema deployed
- [ ] Performance metrics checked

## 🔄 Git Workflow

### Branch Strategy

```bash
# Feature development
git checkout -b feature/your-feature-name
git commit -m "feat: add your feature"
git push origin feature/your-feature-name

# Bug fixes
git checkout -b fix/issue-description
git commit -m "fix: resolve issue description"
```

### Commit Message Convention

```bash
feat: add new feature
fix: resolve bug issue
docs: update documentation
style: code formatting changes
refactor: code restructuring
test: add or update tests
chore: maintenance tasks
```

### Pre-commit Checklist

- [ ] Code linted (`pnpm lint`)
- [ ] Types checked (`pnpm type-check`)
- [ ] Code formatted (`pnpm format`)
- [ ] Build successful (`pnpm build`)
- [ ] Manual testing completed

## 📈 Advanced Development

### Adding New Features

#### 1. New Database Table

```typescript
// 1. Update convex/schema.ts
export const yourTable = defineTable({
  // fields
}).index('by_field', ['field']);

// 2. Create CRUD functions in convex/
export const create = mutation({
  /* ... */
});
export const list = query({
  /* ... */
});

// 3. Add TypeScript types in packages/database/
export interface YourTable {
  // interface definition
}
```

#### 2. New API Route

```typescript
// 1. Create route in apps/web/app/api/your-route/route.ts
import { NextRequest, NextResponse } from 'next/server';

// 2. Add authentication if needed
import { getCurrentUser } from '@/lib/auth';

export async function POST(request: NextRequest) {
  // Implementation
}

const user = await getCurrentUser(request);
```

#### 3. New UI Component

```typescript
// 3. Use in web app
import { YourComponent } from '@ecommerce/ui';

// 1. Create in packages/ui/src/components/
export interface YourComponentProps {
  // props definition
}

export function YourComponent({}: YourComponentProps) {
  // implementation
}

// 2. Export from packages/ui/src/index.ts
export { YourComponent } from './components/your-component';
```

## 🆘 Getting Help

### Documentation Resources

- **Convex**: [docs.convex.dev](https://docs.convex.dev) - Real-time database
- **Next.js**: [nextjs.org/docs](https://nextjs.org/docs) - Framework documentation
- **Tailwind**: [tailwindcss.com/docs](https://tailwindcss.com/docs) - Styling utilities
- **Radix UI**: [radix-ui.com](https://radix-ui.com) - UI primitives
- **Midtrans**: [docs.midtrans.com](https://docs.midtrans.com) - Payment gateway

### Quick Reference Commands

```bash
# Essential development commands
pnpm dev                    # Start development
pnpm build                  # Build for production
pnpm lint && pnpm type-check # Quality check
npm run seed               # Add sample data
npx convex dashboard       # View database
```

---

## ✅ Development Success Checklist

### Before Starting Development

- [ ] Node.js 18+ installed
- [ ] pnpm installed globally
- [ ] VS Code with recommended extensions
- [ ] Git configured
- [ ] Repository cloned and dependencies installed

### Environment Setup

- [ ] `.env.local` created and configured
- [ ] Convex deployment linked
- [ ] JWT secret generated and set
- [ ] Midtrans credentials configured (sandbox mode)
- [ ] Database seeded with sample data

### Development Ready

- [ ] `pnpm dev` starts successfully
- [ ] Convex functions accessible
- [ ] Next.js app loads at localhost:3000
- [ ] Authentication endpoints working
- [ ] Payment API endpoints responding
- [ ] Database dashboard accessible

### Code Quality

- [ ] ESLint configured and passing
- [ ] TypeScript strict mode enabled
- [ ] Prettier formatting applied
- [ ] Build process completing successfully
- [ ] No TypeScript errors or warnings

Happy coding! 🚀 Your modern e-commerce platform awaits!
