/**
 * Utility for generating images using the Fal.ai API
 * @param {string} prompt - The prompt for image generation
 * @param {string} negativePrompt - Optional negative prompt
 * @returns {Promise<Object>} Result object with success status and image URL or error
 */
export async function generateImage(prompt, negativePrompt = "") {
  try {
    const res = await fetch('/api/generate-image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, negativePrompt }),
    });

    const data = await res.json();

    if (!res.ok || !data.image_url) {
      throw new Error(data.error || 'Image generation failed');
    }

    return {
      success: true,
      imageUrl: data.image_url,
      isFallback: data.isFallback || false
    };
  } catch (err) {
    console.error('Fal Image Error:', err);
    return {
      success: false,
      error: err.message || 'Unknown error occurred',
      isFallback: true,
      imageUrl: 'https://placehold.co/1024x1024/3a1c71,d76d77/white?text=AI+Agent+Corruption'
    };
  }
}
