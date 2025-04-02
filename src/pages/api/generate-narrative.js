import axios from 'axios';
import { buildNarrativePrompt } from '../../utils/promptBuilder';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { mission, attacks } = req.body;

    if (!mission || !attacks || !Array.isArray(attacks)) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    // Create the prompt using the promptBuilder utility
    const prompt = buildNarrativePrompt(mission, attacks);
    
    // Make the request to Anthropic API
    const response = await axios.post('https://api.anthropic.com/v1/messages', {
      model: "claude-3-opus-20240229",
      max_tokens: 500,
      temperature: 0.8,
      messages: [{ role: "user", content: prompt }]
    }, {
      headers: {
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json'
      }
    });

    // Log the generated narrative for debugging
    console.log("Generated narrative:", response.data.content[0].text);
    
    // Return the generated narrative
    return res.status(200).json({ narrative: response.data.content[0].text });
  } catch (error) {
    console.error('Error generating narrative:', error);
    return res.status(500).json({ 
      error: 'Failed to generate narrative', 
      details: error.message 
    });
  }
}
