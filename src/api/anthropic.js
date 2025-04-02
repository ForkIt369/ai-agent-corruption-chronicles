import axios from 'axios';

export async function generateNarrative(mission, attacks) {
  const prompt = `Create a humorous summary for AI agent "${mission}" corrupted by these attacks: ${attacks.join(", ")}. Emphasize comedic absurdity related to Web3/crypto.`;
  
  const response = await axios.post('https://api.anthropic.com/v1/messages', {
    model: "claude-3-opus-20240229",
    max_tokens: 150,
    temperature: 0.8,
    messages: [{ role: "user", content: prompt }]
  }, {
    headers: {
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json'
    }
  });

  return response.data.content[0].text;
}

