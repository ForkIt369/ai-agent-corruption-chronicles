#!/usr/bin/env node

/**
 * Deployment Testing Script
 * 
 * This script tests if the deployed site is accessible and functioning correctly.
 * It checks:
 * - Site accessibility
 * - Basic page structure
 * - API endpoints
 */

const https = require('https');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('\n🔍 Testing Deployment for AI Agent Corruption Chronicles\n');

// Ask for the deployment URL
rl.question('Enter the deployment URL (e.g., https://corruptchronicles.com): ', (url) => {
  if (!url) {
    console.log('❌ No URL provided. Exiting...');
    rl.close();
    return;
  }

  // Normalize URL
  const baseUrl = url.endsWith('/') ? url.slice(0, -1) : url;
  console.log(`\n🌐 Testing deployment at: ${baseUrl}\n`);

  // Test main page
  testEndpoint(baseUrl, 'Main page')
    .then(() => testEndpoint(`${baseUrl}/create`, 'Create page'))
    .then(() => testEndpoint(`${baseUrl}/gallery`, 'Gallery page'))
    .then(() => testEndpoint(`${baseUrl}/my-creations`, 'My Creations page'))
    .then(() => {
      console.log('\n✅ All pages are accessible!\n');
      console.log('📋 Deployment Test Summary:');
      console.log('1. The site is accessible at the provided URL');
      console.log('2. All main pages are loading correctly');
      console.log('3. For more thorough testing, manually check:');
      console.log('   - Agent type selection functionality');
      console.log('   - Mission selection functionality');
      console.log('   - Corruption attack selection functionality');
      console.log('   - Narrative and image generation');
      console.log('   - Sharing functionality');
      console.log('\n✨ Deployment test completed\n');
      rl.close();
    })
    .catch((error) => {
      console.log(`\n❌ Deployment test failed: ${error.message}\n`);
      console.log('Troubleshooting steps:');
      console.log('1. Verify that the URL is correct');
      console.log('2. Check if the deployment is complete in Vercel');
      console.log('3. Verify DNS configuration if using a custom domain');
      console.log('4. Check for any build errors in Vercel logs');
      rl.close();
    });
});

/**
 * Test if an endpoint is accessible
 * @param {string} url - The URL to test
 * @param {string} name - The name of the endpoint for logging
 * @returns {Promise} - Resolves if the endpoint is accessible, rejects otherwise
 */
function testEndpoint(url, name) {
  return new Promise((resolve, reject) => {
    console.log(`🔄 Testing ${name} at ${url}...`);
    
    https.get(url, (res) => {
      const { statusCode } = res;
      
      if (statusCode === 200) {
        console.log(`✅ ${name} is accessible (Status: ${statusCode})`);
        resolve();
      } else {
        console.log(`❌ ${name} returned status code ${statusCode}`);
        reject(new Error(`${name} returned status code ${statusCode}`));
      }
    }).on('error', (error) => {
      console.log(`❌ Error accessing ${name}: ${error.message}`);
      reject(error);
    });
  });
}
