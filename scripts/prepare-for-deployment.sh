#!/bin/bash

# Prepare for Deployment Script
# This script runs the pre-deployment checks and generates the Vercel environment variables

echo "🚀 Preparing for deployment to Vercel..."
echo ""

# Run pre-deployment checks
echo "🔍 Running pre-deployment checks..."
npm run pre-deploy

# Check if pre-deployment checks were successful
if [ $? -ne 0 ]; then
  echo "❌ Pre-deployment checks failed. Please fix the issues before deploying."
  exit 1
fi

echo ""
echo "✅ Pre-deployment checks passed!"
echo ""

# Generate Vercel environment variables
echo "🔑 Generating Vercel environment variables..."
npm run vercel-env

echo ""
echo "🚀 Deployment preparation complete!"
echo ""
echo "Next steps:"
echo "1. Push your changes to GitHub"
echo "2. Import your repository in Vercel"
echo "3. Configure environment variables in Vercel"
echo "4. Deploy your application"
echo "5. Connect your domain (corruptchronicles.com) to your Vercel deployment"
echo ""
echo "For detailed instructions, see docs/deployment-guide.md"
echo ""
