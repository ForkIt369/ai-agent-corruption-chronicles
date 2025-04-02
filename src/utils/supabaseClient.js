import { createClient } from '@supabase/supabase-js';

// Supabase client setup
// These environment variables will be set in Vercel
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * This file is prepared for future implementation of Supabase integration.
 * Currently, the app uses localStorage for data persistence.
 * 
 * When ready to implement Supabase:
 * 1. Ensure environment variables are set in Vercel
 * 2. Update sessionManager.js to use these Supabase functions
 * 3. Create necessary database tables in Supabase
 */

/**
 * Example function to get or create a user session
 * @returns {Promise<{id: string, session_id: string}>}
 */
export async function getOrCreateUserSession(sessionId) {
  // Check if user with this session exists
  const { data: existingUser } = await supabase
    .from('users')
    .select('*')
    .eq('session_id', sessionId)
    .single();

  if (existingUser) {
    return existingUser;
  }

  // Create new user with this session
  const { data: newUser, error } = await supabase
    .from('users')
    .insert([{ session_id: sessionId }])
    .select()
    .single();

  if (error) {
    console.error('Error creating user:', error);
    throw error;
  }

  return newUser;
}

/**
 * Example function to store a creation in Supabase
 * @param {Object} creation - The creation to store
 * @param {string} userId - The user ID
 * @returns {Promise<{id: string}>} - The ID of the stored creation
 */
export async function storeCreationInSupabase(creation, userId) {
  const { data, error } = await supabase
    .from('creations')
    .insert([{
      user_id: userId,
      agent_type: creation.agentType,
      mission_id: creation.mission,
      attacks: creation.attacks,
      narrative: creation.narrative,
      image_url: creation.imageUrl,
      narrative_prompt: creation.narrativePrompt,
      image_prompt: creation.imagePrompt
    }])
    .select()
    .single();

  if (error) {
    console.error('Error storing creation:', error);
    throw error;
  }

  return data;
}

/**
 * Example function to get all creations for a user
 * @param {string} userId - The user ID
 * @returns {Promise<Array>} - Array of creations
 */
export async function getUserCreations(userId) {
  const { data, error } = await supabase
    .from('creations')
    .select('*')
    .eq('user_id', userId)
    .order('timestamp', { ascending: false });

  if (error) {
    console.error('Error fetching creations:', error);
    throw error;
  }

  return data || [];
}

/**
 * Example function to get a specific creation by ID
 * @param {string} creationId - The creation ID
 * @returns {Promise<Object|null>} - The creation or null if not found
 */
export async function getCreationById(creationId) {
  const { data, error } = await supabase
    .from('creations')
    .select('*')
    .eq('id', creationId)
    .single();

  if (error) {
    console.error('Error fetching creation:', error);
    return null;
  }

  return data;
}
