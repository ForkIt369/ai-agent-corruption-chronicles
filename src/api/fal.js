import axios from 'axios';

export async function generateImage(prompt) {
  const response = await axios.post('https://gateway.fal.ai/v1/flux-pro/v1.1-ultra', {
    prompt,
    negative_prompt: 'male characters, extra text, realism, blurry, lowres, inconsistent',
    aspect_ratio: '16:9',
    width: 2048,
    height: 1152,
  }, {
    headers: { Authorization: `Key ${process.env.FALAI_API_KEY}` }
  });
  
  return response.data;
}

