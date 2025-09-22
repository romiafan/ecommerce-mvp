#!/bin/bash

# Modern E-commerce MVP Setup Script
# This script helps you get started quickly with the e-commerce template

set -e

echo "🛒 Setting up Modern E-commerce MVP..."
echo "=================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first:"
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    echo "   Please upgrade Node.js from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Install pnpm if not present
if ! command -v pnpm &> /dev/null; then
    echo "📦 Installing pnpm..."
    npm install -g pnpm
fi

echo "✅ pnpm $(pnpm -v) ready"

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install

# Create environment file if it doesn't exist
if [ ! -f ".env.local" ]; then
    echo "⚙️ Creating environment file..."
    cp .env.example .env.local
    echo "📝 Please edit .env.local with your API keys:"
    echo "   - Convex: https://convex.dev"
    echo "   - Clerk: https://clerk.com"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit .env.local with your API keys"
echo "2. Run 'pnpm convex dev' to set up your database"
echo "3. Run 'pnpm dev' to start the development server"
echo ""
echo "📚 For detailed instructions, see README.md"
echo ""
echo "🚀 Happy coding!"