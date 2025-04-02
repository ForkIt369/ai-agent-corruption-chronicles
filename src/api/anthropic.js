import axios from 'axios';

export async function generateNarrative(mission, attacks) {
  try {
    const response = await axios.post('/api/generate-narrative', {
      mission,
      attacks
    });
    
    return response.data.narrative;
  } catch (error) {
    console.error('Error generating narrative:', error);
    throw new Error('Failed to generate narrative');
  }
}
