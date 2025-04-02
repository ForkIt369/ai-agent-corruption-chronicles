import { v4 as uuidv4 } from 'uuid';

/**
 * Gets the current session ID from localStorage or creates a new one
 * @returns {string} The session ID
 */
export const getOrCreateSessionId = () => {
  // Check if we're in a browser environment
  if (typeof window === 'undefined') {
    return null;
  }

  // Check for existing session ID in localStorage
  let sessionId = localStorage.getItem('sessionId');
  
  if (!sessionId) {
    // Create new session ID
    sessionId = uuidv4();
    localStorage.setItem('sessionId', sessionId);
  }
  
  return sessionId;
};

/**
 * Stores a creation in localStorage
 * @param {Object} creation - The creation to store
 * @returns {string} The ID of the stored creation
 */
export const storeCreation = (creation) => {
  if (typeof window === 'undefined') {
    return null;
  }

  // Get existing creations or initialize empty array
  const creationsJson = localStorage.getItem('creations');
  const creations = creationsJson ? JSON.parse(creationsJson) : [];
  
  // Add new creation with ID and timestamp
  const newCreation = {
    ...creation,
    id: uuidv4(),
    timestamp: new Date().toISOString()
  };
  
  // Add to beginning of array (most recent first)
  creations.unshift(newCreation);
  
  // Store back in localStorage (limit to 10 most recent)
  localStorage.setItem('creations', JSON.stringify(creations.slice(0, 10)));
  
  return newCreation.id;
};

/**
 * Gets all stored creations from localStorage
 * @returns {Array} Array of stored creations
 */
export const getCreations = () => {
  if (typeof window === 'undefined') {
    return [];
  }

  const creationsJson = localStorage.getItem('creations');
  return creationsJson ? JSON.parse(creationsJson) : [];
};

/**
 * Gets a specific creation by ID
 * @param {string} id - The ID of the creation to retrieve
 * @returns {Object|null} The creation or null if not found
 */
export const getCreationById = (id) => {
  if (typeof window === 'undefined') {
    return null;
  }

  const creations = getCreations();
  return creations.find(creation => creation.id === id) || null;
};
