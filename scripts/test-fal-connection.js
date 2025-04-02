#!/usr/bin/env node

/**
 * Test script to verify Fal.ai connection and API key
 * 
 * Usage:
 *   node scripts/test-fal-connection.js
 * 
 * This script tests the connection to Fal.ai by making a simple request
 * to each of the available endpoints. It helps diagnose API key issues
 * and endpoint availability.
 */

// Load environment variables from .env.local
require('dotenv').config({ path: '.env.local' });

const API_KEY = process.env.FinalAlith;

// Define available endpoints
const ENDPOINTS = {
  ULTRA: "https://fal.run/fal-ai/flux-pro/v1.1-ultra",
  FAST: "https://fal.run/fal-ai/fast-sdxl", // Keep as fallback
  FLUX: "https://fal.run/fal-ai/flux"       // Additional fallback option
};

// Simple test prompt
const TEST_PROMPT = "A simple test image of a blue cube";

/**
 * Test a specific endpoint
 * @param {string} name - Endpoint name
 * @param {string} url - Endpoint URL
 */
async function testEndpoint(name, url) {
  console.log(`\n🧪 Testing ${name} endpoint: ${url}`);
  
  try {
    const startTime = Date.now();
    
    const response = await fetch(url, {
      method: "POST",
      headers: {
        'Authorization': `Key ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        // Use appropriate parameters based on the endpoint
        url.includes('flux-pro/v1.1-ultra') 
          ? {
              prompt: TEST_PROMPT,
              aspect_ratio: "1:1",
              output_format: "jpeg",
              safety_tolerance: "2",
              num_images: 1
            }
          : {
              prompt: TEST_PROMPT,
              width: 512,  // Smaller size for faster testing
              height: 512,
              num_inference_steps: 10  // Fewer steps for faster testing
            }
      )
    });
    
    const endTime = Date.now();
    const duration = (endTime - startTime) / 1000;
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ Error (${response.status}): ${errorText}`);
      return false;
    }
    
    const data = await response.json();
    console.log(`✅ Success! Response received in ${duration.toFixed(2)}s`);
    
    // Check for image URL in the response
    const imageUrl = data.images?.[0]?.url || 
                    data.image?.url || 
                    data.output?.[0] ||
                    data.image_url;
    
    if (imageUrl) {
      console.log(`🖼️  Image URL: ${imageUrl.substring(0, 100)}...`);
      return true;
    } else {
      console.warn("⚠️  No image URL found in response");
      console.log("Response data:", JSON.stringify(data).substring(0, 200) + "...");
      return false;
    }
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    return false;
  }
}

/**
 * Main function to run all tests
 */
async function runTests() {
  console.log("🔍 Fal.ai Connection Test");
  console.log("========================");
  
  // Check if API key is set
  if (!API_KEY) {
    console.error("❌ FinalAlith is not set in .env.local");
    process.exit(1);
  }
  
  console.log(`🔑 API Key: ${API_KEY.substring(0, 4)}...${API_KEY.substring(API_KEY.length - 4)}`);
  
  // Test each endpoint
  let successCount = 0;
  
  for (const [name, url] of Object.entries(ENDPOINTS)) {
    const success = await testEndpoint(name, url);
    if (success) successCount++;
  }
  
  // Summary
  console.log("\n📊 Test Summary");
  console.log("==============");
  console.log(`✅ ${successCount} of ${Object.keys(ENDPOINTS).length} endpoints working`);
  
  if (successCount === 0) {
    console.error("❌ All endpoints failed. Check your API key and network connection.");
    process.exit(1);
  } else if (successCount < Object.keys(ENDPOINTS).length) {
    console.warn("⚠️  Some endpoints failed. The application will use working endpoints as fallbacks.");
  } else {
    console.log("🎉 All endpoints are working correctly!");
  }
}

// Run the tests
runTests().catch(error => {
  console.error("Unhandled error:", error);
  process.exit(1);
});
