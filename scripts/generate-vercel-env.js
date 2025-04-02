#!/usr/bin/env node

/**
 * Generate Vercel Environment Variables Script
 * 
 * This script reads the .env.local file and generates a list of environment variables
 * that need to be set in Vercel. It outputs the variables in a format that can be
 * easily copied and pasted into the Vercel dashboard.
 */

const fs = require('fs');
const path = require('path');

console.log('\n🔍 Generating Vercel Environment Variables for AI Agent Corruption Chronicles\n');

// Check if .env.local exists
const envPath = path.join(process.cwd(), '.env.local');
const envExists = fs.existsSync(envPath);

if (!envExists) {
  console.log('❌ .env.local file not found');
  console.log('   Create a .env.local file with your environment variables first.');
  process.exit(1);
}

// Read .env.local file
const envContent = fs.readFileSync(envPath, 'utf8');
const envLines = envContent.split('\n');

// Parse environment variables
const envVars = [];
envLines.forEach(line => {
  // Skip empty lines and comments
  if (!line || line.startsWith('#')) {
    return;
  }
  
  // Extract variable name and value
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    const [, name, value] = match;
    envVars.push({ name: name.trim(), value: value.trim() });
  }
});

if (envVars.length === 0) {
  console.log('❌ No environment variables found in .env.local');
  process.exit(1);
}

// Generate output
console.log('📋 Environment Variables for Vercel:\n');
console.log('Name                       | Value');
console.log('---------------------------|--------------------------------------------------');
envVars.forEach(({ name, value }) => {
  // Mask sensitive values
  const maskedValue = name.includes('KEY') || name.includes('SECRET') || name.includes('TOKEN')
    ? value.substring(0, 4) + '...' + value.substring(value.length - 4)
    : value;
  
  console.log(`${name.padEnd(26)} | ${maskedValue}`);
});

// Generate instructions
console.log('\n📝 Instructions:');
console.log('1. Log into your Vercel account');
console.log('2. Navigate to your project settings');
console.log('3. Go to the "Environment Variables" section');
console.log('4. Add each of the above variables');
console.log('5. Make sure to set them for all environments (Production, Preview, Development)');

// Generate JSON format
console.log('\n📦 JSON Format (for Vercel CLI or API):\n');
const jsonOutput = {};
envVars.forEach(({ name, value }) => {
  jsonOutput[name] = value;
});
console.log(JSON.stringify(jsonOutput, null, 2));

// Add Supabase variables
console.log('\n🔄 Additional Variables for Supabase Integration (Future Use):\n');
console.log('NEXT_PUBLIC_SUPABASE_URL=https://ucltqlluxgaqojasrqhl.supabase.co');
console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVjbHRxbGx1eGdhcW9qYXNycWhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1OTM4MzAsImV4cCI6MjA1OTE2OTgzMH0.11QtjY5Z3MpqHgVenqTiUUnqAzgdyBJ-i3gNuKa6Sws');
console.log('SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVjbHRxbGx1eGdhcW9qYXNycWhsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MzU5MzgzMCwiZXhwIjoyMDU5MTY5ODMwfQ.xkLlu6pgRMiRe4nicOvITSdyIUfFetOJkbFtBIDRwVA');

console.log('\n✨ Environment variables generation completed\n');
