export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Add CORS headers for cross-origin requests
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  try {
    const { prompt, negativePrompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    console.log('Generating image with prompt:', prompt.substring(0, 100) + '...');
    
    // Use the correct, working endpoint for flux-pro/v1.1-ultra
    const response = await fetch("https://fal.run/fal-ai/flux-pro/v1.1-ultra", {
      method: "POST",
      headers: {
        'Authorization': `Key ${process.env.FinalAlith}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt,
        safety_tolerance: "2",
        output_format: "jpeg",
        aspect_ratio: "1:1", // For square images (similar to 1024x1024)
        enable_safety_checker: true,
        num_images: 1
      })
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Fal.ai API error response:', errorText);
      throw new Error(`API responded with status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Extract the image URL from the response
    const imageUrl = data.images?.[0]?.url || data.image?.url || data.output?.[0] || data.image_url;
    
    if (!imageUrl) {
      console.error('No image URL found in response:', JSON.stringify(data).substring(0, 200));
      throw new Error('No image URL found in API response');
    }
    
    // Return the image URL in a consistent format
    return res.status(200).json({ image_url: imageUrl });
    
  } catch (error) {
    console.error('Error generating image:', error);
    
    // Simple fallback with placeholder
    const fallbackImageUrl = `https://placehold.co/1024x1024/3a1c71,d76d77/white?text=AI+Agent+Corruption`;
    
    return res.status(200).json({
      image_url: fallbackImageUrl,
      isFallback: true,
      error: error.message
    });
  }
}
