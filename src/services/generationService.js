import { generateNarrative } from '../api/anthropic';
import { generateImage } from '../api/fal';
import { buildNarrativePrompt, buildImagePrompt, buildNegativePrompt } from '../utils/promptBuilder';
import { storeCreation } from '../utils/sessionManager';
import missions from '../data/missions';
import attacks from '../data/attacks';

/**
 * Generates only the narrative for the selected options
 * @param {string} missionId - The ID of the selected mission
 * @param {Array} attackIds - Array of selected attack IDs
 * @returns {Promise<Object>} The generated narrative and prompt
 */
export const generateNarrativeOnly = async (missionId, attackIds) => {
  try {
    const narrativePrompt = buildNarrativePrompt(missionId, attackIds);
    const narrative = await generateNarrative(missionId, attackIds);
    return { narrative, narrativePrompt };
  } catch (error) {
    console.error('Error generating narrative:', error);
    throw new Error(`Failed to generate narrative: ${error.message}`);
  }
};

/**
 * Generates only the image for the selected options
 * @param {string} missionId - The ID of the selected mission
 * @param {Array} attackIds - Array of selected attack IDs
 * @returns {Promise<Object>} The generated image data
 */
export const generateImageOnly = async (missionId, attackIds) => {
  try {
    // Get the mission to find the agent type
    const mission = missions.find(m => m.id === missionId);
    if (!mission) {
      throw new Error(`Mission not found: ${missionId}`);
    }
    
    const imagePrompt = buildImagePrompt(missionId, attackIds);
    const negativePrompt = buildNegativePrompt();
    
    console.log('Generating image with prompt:', imagePrompt.substring(0, 100) + '...');
    
    // Use the simplified image generation function
    const result = await generateImage(imagePrompt, negativePrompt);
    
    if (result.success) {
      console.log('Successfully generated image:', result.imageUrl.substring(0, 100) + '...');
      return { 
        imageUrl: result.imageUrl, 
        imagePrompt,
        isFallback: result.isFallback || false
      };
    } else {
      console.warn('Image generation failed, using fallback image');
      
      // Use a themed placeholder based on the mission and attacks
      const missionName = encodeURIComponent(mission?.name || 'AI Agent');
      const attackNames = attackIds.map(id => {
        const attack = attacks[id];
        return attack ? attack.name : '';
      }).filter(Boolean).join(',');
      
      // Use a placeholder image service with the mission and attack names
      const fallbackImageUrl = `https://placehold.co/1024x1024/3a1c71,d76d77/white?text=AI+Agent:+${missionName}%0A${attackNames}`;
      
      return { 
        imageUrl: fallbackImageUrl, 
        imagePrompt,
        isFallback: true 
      };
    }
  } catch (error) {
    console.error('Error in image generation process:', error);
    
    // Final fallback - generic placeholder
    return { 
      imageUrl: 'https://placehold.co/1024x1024/3a1c71,d76d77/white?text=AI+Agent+Corruption', 
      imagePrompt: 'Fallback image',
      isFallback: true 
    };
  }
};

/**
 * Finalizes the content generation by storing it
 * @param {string} missionId - The ID of the selected mission
 * @param {Array} attackIds - Array of selected attack IDs
 * @param {string} narrative - The generated narrative
 * @param {string} imageUrl - The URL of the generated image
 * @param {string} narrativePrompt - The prompt used for narrative generation
 * @param {string} imagePrompt - The prompt used for image generation
 * @returns {Object} The complete content with ID
 */
export const finalizeContent = (missionId, attackIds, narrative, imageUrl, narrativePrompt, imagePrompt) => {
  // Create the content object
  const content = {
    missionId,
    attackIds,
    narrative,
    imageUrl,
    imagePrompt,
    narrativePrompt
  };
  
  // Store the creation
  const creationId = storeCreation(content);
  
  // Return the content with ID
  return {
    ...content,
    id: creationId
  };
};
