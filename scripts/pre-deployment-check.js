#!/usr/bin/env node

/**
 * Pre-Deployment Check Script
 * 
 * This script checks if the environment is properly set up for deployment to Vercel.
 * It verifies:
 * - Required environment variables
 * - Next.js configuration
 * - Build process
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('\n🔍 Running pre-deployment checks for AI Agent Corruption Chronicles...\n');

// Check if .env.local exists
const envPath = path.join(process.cwd(), '.env.local');
const envExists = fs.existsSync(envPath);

console.log(`📋 Environment Variables Check:`);
if (envExists) {
  console.log('✅ .env.local file exists');
  
  // Read .env.local file
  const envContent = fs.readFileSync(envPath, 'utf8');
  
  // Check for required environment variables
  const requiredVars = ['ANTHROPIC_API_KEY', 'FinalAlith'];
  const missingVars = [];
  
  requiredVars.forEach(varName => {
    if (!envContent.includes(`${varName}=`)) {
      missingVars.push(varName);
    }
  });
  
  if (missingVars.length === 0) {
    console.log('✅ All required environment variables are present in .env.local');
  } else {
    console.log(`❌ Missing environment variables in .env.local: ${missingVars.join(', ')}`);
    console.log('   These variables need to be set in Vercel environment variables.');
  }
} else {
  console.log('❌ .env.local file not found');
  console.log('   Make sure to set the following environment variables in Vercel:');
  console.log('   - ANTHROPIC_API_KEY');
  console.log('   - FinalAlith');
}

// Check next.config.js
console.log('\n📋 Next.js Configuration Check:');
const nextConfigPath = path.join(process.cwd(), 'next.config.js');
if (fs.existsSync(nextConfigPath)) {
  console.log('✅ next.config.js file exists');
  
  // Read next.config.js file
  const nextConfigContent = fs.readFileSync(nextConfigPath, 'utf8');
  
  // Check for security headers
  if (nextConfigContent.includes('Access-Control-Allow-Origin') && 
      nextConfigContent.includes('Content-Security-Policy') && 
      nextConfigContent.includes('X-Frame-Options')) {
    console.log('✅ Security headers are configured in next.config.js');
  } else {
    console.log('❌ Security headers are not properly configured in next.config.js');
  }
  
  // Check for image domains
  if (nextConfigContent.includes('gateway.fal.ai')) {
    console.log('✅ Fal.ai image domain is configured in next.config.js');
  } else {
    console.log('❌ Fal.ai image domain is not configured in next.config.js');
  }
} else {
  console.log('❌ next.config.js file not found');
}

// Check package.json
console.log('\n📋 Package.json Check:');
const packageJsonPath = path.join(process.cwd(), 'package.json');
if (fs.existsSync(packageJsonPath)) {
  console.log('✅ package.json file exists');
  
  // Read package.json file
  const packageJson = require(packageJsonPath);
  
  // Check for required scripts
  const requiredScripts = ['build', 'start'];
  const missingScripts = [];
  
  requiredScripts.forEach(script => {
    if (!packageJson.scripts || !packageJson.scripts[script]) {
      missingScripts.push(script);
    }
  });
  
  if (missingScripts.length === 0) {
    console.log('✅ All required scripts are present in package.json');
  } else {
    console.log(`❌ Missing scripts in package.json: ${missingScripts.join(', ')}`);
  }
  
  // Check for required dependencies
  const requiredDeps = ['next', 'react', 'react-dom'];
  const missingDeps = [];
  
  requiredDeps.forEach(dep => {
    if (!packageJson.dependencies || !packageJson.dependencies[dep]) {
      missingDeps.push(dep);
    }
  });
  
  if (missingDeps.length === 0) {
    console.log('✅ All required dependencies are present in package.json');
  } else {
    console.log(`❌ Missing dependencies in package.json: ${missingDeps.join(', ')}`);
  }
} else {
  console.log('❌ package.json file not found');
}

// Try to build the project
console.log('\n📋 Build Check:');
try {
  console.log('🔄 Running a test build (this may take a moment)...');
  execSync('npm run build', { stdio: 'ignore' });
  console.log('✅ Build successful');
} catch (error) {
  console.log('❌ Build failed');
  console.log('   Run "npm run build" to see detailed error messages');
}

// Summary
console.log('\n📋 Deployment Readiness Summary:');
console.log('1. Make sure all environment variables are set in Vercel');
console.log('2. Ensure security headers are properly configured');
console.log('3. Verify that the build process completes successfully');
console.log('4. Follow the deployment guide in docs/deployment-guide.md');

console.log('\n✨ Pre-deployment check completed\n');
