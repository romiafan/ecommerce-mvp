# 🚀 Deployment Guide – Vercel

## Prerequisites

### 1. Accounts Required

- **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
- **Convex Account**: Sign up at [convex.dev](https://convex.dev)
- **Midtrans Account**: Sign up at [midtrans.com](https://midtrans.com) (for payments)
- **GitHub Account**: Repository already exists at `romiafan/ecommerce-mvp`

### 2. Local Setup

```bash
# Install Vercel CLI (already done)
npm install -g vercel

# Login to Vercel
vercel login
```

## 🗄️ Database Deployment (Convex)

### Step 1: Deploy Convex Database

```bash
# Navigate to project root
cd /path/to/ecommerce-mvp

# Deploy Convex to production
npx convex deploy --prod

# Copy the production URL (you'll need this for environment variables)
# Example: https://your-deployment.convex.cloud
```

### Step 2: Seed Production Database

```bash
# Seed the production database with sample data
npx convex run --prod convex/seed.ts:seedAll
```

## 🌐 Frontend Deployment (Vercel)

### Step 1: Connect Repository to Vercel

#### Option A: Using Vercel CLI

```bash
# Navigate to project root
cd /path/to/ecommerce-mvp

# Deploy to Vercel
vercel

# Follow the prompts:
# - Link to existing project: No
# - Project name: ecommerce-mvp
# - Directory: ./apps/web
# - Override settings: No
```

#### Option B: Using Vercel Dashboard

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import `romiafan/ecommerce-mvp` from GitHub
4. Configure project settings:
   - **Framework**: Next.js
   - **Root Directory**: `apps/web`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

### Step 2: Configure Environment Variables

Add these environment variables in Vercel Dashboard:

#### Required Variables

```bash
# Convex Database
CONVEX_DEPLOYMENT=your-prod-deployment-name
NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud

# JWT Authentication
JWT_SECRET=your-super-secure-jwt-secret-key-32chars

# Midtrans Payment Gateway
MIDTRANS_SERVER_KEY=your-midtrans-server-key
NEXT_PUBLIC_MIDTRANS_CLIENT_KEY=your-midtrans-client-key
MIDTRANS_IS_PRODUCTION=true

# App Configuration
NEXT_PUBLIC_APP_URL=https://your-vercel-app.vercel.app
NODE_ENV=production
```

#### How to Add Environment Variables in Vercel

1. Go to your project dashboard on Vercel
2. Click the "Settings" tab
3. Click "Environment Variables"
4. Add each variable:
   - **Name**: Variable name (e.g., `CONVEX_DEPLOYMENT`)
   - **Value**: Variable value
   - **Environment**: Production, Preview, Development (select as needed)

### Step 3: Deploy to Production

```bash
# Deploy to production
vercel --prod

# Or trigger deployment by pushing to main branch
git push origin main
```

## ⚙️ Project Configuration

### Monorepo Configuration

The project is configured for Vercel monorepo deployment:

- **Root Directory**: `apps/web`
  - Vercel will build only the web application
  - Shared packages are automatically included during build

**Build Settings**:

```json
{
  "buildCommand": "cd apps/web && npm run build",
  "outputDirectory": "apps/web/.next",
  "installCommand": "npm install"
}
```

### Domain Configuration

1. **Default Domain**: `your-project.vercel.app`
2. **Custom Domain** (optional):
   - Go to Project Settings > Domains
   - Add your custom domain
   - Configure DNS records as instructed

## 🔧 Environment-Specific Setup

### Development Environment

```bash
# Local development with production database
CONVEX_DEPLOYMENT=your-prod-deployment
NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud
JWT_SECRET=your-local-jwt-secret
MIDTRANS_IS_PRODUCTION=false
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Preview Environment

- Automatically created for pull requests
- Uses same environment variables as production
- Test new features before merging

### Production Environment

- Deployed from `main` branch
- Uses production Convex database
- Production Midtrans settings enabled

## 🚨 Important Security Notes

### Environment Variables Security

- **Never commit** `.env.local` or production secrets
- **Use Vercel's Environment Variables** for all sensitive data
- **Rotate secrets regularly** for production

### JWT Secret

```bash
# Generate a secure JWT secret (32+ characters)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Midtrans Configuration

- **Production Mode**: Set `MIDTRANS_IS_PRODUCTION=true`
- **Server Key**: Use production server key from Midtrans dashboard
- **Client Key**: Use production client key from Midtrans dashboard

## 📋 Deployment Checklist

### Pre-Deployment

- [ ] Convex database deployed to production
- [ ] Sample data seeded in production database
- [ ] All environment variables configured in Vercel
- [ ] JWT secret generated and set
- [ ] Midtrans production keys configured
- [ ] Domain configured (if using custom domain)

### Post-Deployment

- [ ] Verify homepage loads correctly
- [ ] Test product catalog functionality
- [ ] Test user registration/login
- [ ] Test shopping cart operations
- [ ] Test payment flow (with test cards)
- [ ] Check API endpoints respond correctly
- [ ] Verify mobile responsiveness

## 🔍 Monitoring & Debugging

### Vercel Logs

```bash
# View deployment logs
vercel logs

# View function logs
vercel logs --follow
```

### Convex Dashboard

- Monitor database operations: [dashboard.convex.dev](https://dashboard.convex.dev)
- View function execution logs
- Monitor performance metrics

### Common Issues & Solutions

#### Build Failures

```bash
# Check build logs in Vercel dashboard
# Common fixes:
# 1. Ensure all dependencies are in package.json
# 2. Check TypeScript compilation errors
# 3. Verify environment variables are set
```

#### Database Connection Issues

```bash
# Verify Convex deployment URL
# Check environment variables in Vercel
# Ensure Convex deployment is active
```

#### Payment Issues

```bash
# Verify Midtrans configuration
# Check server/client key validity
# Ensure webhook URL is configured in Midtrans
```

## 🚀 Continuous Deployment

### Automatic Deployments

- **Main Branch**: Automatically deploys to production
- **Pull Requests**: Creates preview deployments
- **Feature Branches**: Can be manually deployed for testing

### Manual Deployments

```bash
# Deploy specific branch
vercel --prod

# Deploy with specific alias
vercel --prod --alias your-custom-domain.com
```

## 📈 Performance Optimization

### Vercel Configuration

- **Edge Functions**: API routes run at edge locations
- **Static Generation**: Product pages can be statically generated
- **Image Optimization**: Automatic image optimization enabled
- **CDN**: Global CDN for fast content delivery

### Caching Strategy

- **Static Assets**: Cached at CDN level
- **API Responses**: Configure appropriate cache headers
- **Database Queries**: Convex provides optimized real-time queries

## 🔄 Updates & Maintenance

### Deploying Updates

```bash
# 1. Make changes locally
# 2. Test thoroughly
git add .
git commit -m "feat: your feature description"
git push origin main

# Vercel automatically deploys on push to main
```

### Database Migrations

```bash
# Update schema
# Deploy new schema to Convex
npx convex deploy --prod

# Run any necessary data migrations
```

### Environment Updates

1. Update environment variables in Vercel dashboard
2. Redeploy to apply changes:

   ```bash
   vercel --prod
   ```

---

## 🎯 Quick Start Deployment

For immediate deployment, run these commands:

```bash
# 1. Deploy Convex
npx convex deploy --prod

# 2. Seed database
npx convex run --prod convex/seed.ts:seedAll

# 3. Deploy to Vercel
vercel login
vercel --prod

# 4. Configure environment variables in Vercel dashboard
# 5. Redeploy after setting environment variables
vercel --prod
```

Your e-commerce MVP will be live and ready for customers! 🎉

## 📞 Support Resources

- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Convex Documentation**: [docs.convex.dev](https://docs.convex.dev)
- **Next.js Deployment**: [nextjs.org/docs/deployment](https://nextjs.org/docs/deployment)
- **Midtrans Documentation**: [docs.midtrans.com](https://docs.midtrans.com)
