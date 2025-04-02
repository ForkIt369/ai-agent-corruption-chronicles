/**
 * API endpoint to check the health of the Fal.ai connection
 * 
 * This endpoint tests the connection to Fal.ai by making a simple request
 * to each of the available endpoints. It helps diagnose API key issues
 * and endpoint availability.
 */

export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Add CORS headers for cross-origin requests
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  // Define available endpoints
  const ENDPOINTS = {
    ULTRA: "https://fal.run/fal-ai/flux-pro/v1.1-ultra",
    FAST: "https://fal.run/fal-ai/fast-sdxl", // Keep as fallback
    FLUX: "https://fal.run/fal-ai/flux"       // Additional fallback option
  };
  
  // Simple test prompt
  const TEST_PROMPT = "A simple test image of a blue cube";
  
  // API key from environment variables
  const API_KEY = process.env.FinalAlith;
  
  // Check if API key is set
  if (!API_KEY) {
    return res.status(500).json({
      status: 'error',
      message: 'FinalAlith is not set in environment variables',
      endpoints: {}
    });
  }
  
  // Test results
  const results = {};
  let overallStatus = 'ok';
  
  // Test each endpoint
  for (const [name, url] of Object.entries(ENDPOINTS)) {
    try {
      console.log(`Testing ${name} endpoint: ${url}`);
      
      const startTime = Date.now();
      
      // Make a minimal request to test the endpoint
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
                width: 256,  // Very small size for faster testing
                height: 256,
                num_inference_steps: 5  // Minimal steps for faster testing
              }
        )
      });
      
      const endTime = Date.now();
      const duration = (endTime - startTime) / 1000;
      
      if (!response.ok) {
        const errorText = await response.text();
        results[name] = {
          status: 'error',
          statusCode: response.status,
          message: errorText,
          duration
        };
        overallStatus = 'partial';
      } else {
        // Successfully connected to the endpoint
        results[name] = {
          status: 'ok',
          statusCode: response.status,
          duration
        };
      }
    } catch (error) {
      results[name] = {
        status: 'error',
        message: error.message
      };
      overallStatus = 'partial';
    }
  }
  
  // If all endpoints failed, set overall status to error
  if (Object.values(results).every(r => r.status === 'error')) {
    overallStatus = 'error';
  }
  
  // Return the results
  return res.status(200).json({
    status: overallStatus,
    message: overallStatus === 'ok' 
      ? 'All Fal.ai endpoints are working correctly' 
      : (overallStatus === 'partial' 
          ? 'Some Fal.ai endpoints are working' 
          : 'All Fal.ai endpoints failed'),
    apiKeyStatus: API_KEY ? 'configured' : 'missing',
    apiKeyPrefix: API_KEY ? `${API_KEY.substring(0, 4)}...` : null,
    endpoints: results
  });
}
