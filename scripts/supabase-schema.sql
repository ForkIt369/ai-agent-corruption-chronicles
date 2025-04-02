-- Supabase SQL Schema for AI Agent Corruption Chronicles
-- Run this in the Supabase SQL Editor when ready to implement database persistence

-- Users/Sessions table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Creations table to store generated narratives and images
CREATE TABLE creations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) NOT NULL,
  agent_type TEXT NOT NULL,
  mission_id TEXT NOT NULL,
  attacks TEXT[] NOT NULL,
  narrative TEXT NOT NULL,
  image_url TEXT NOT NULL,
  narrative_prompt TEXT,
  image_prompt TEXT,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX creations_user_id_idx ON creations(user_id);
CREATE INDEX creations_timestamp_idx ON creations(timestamp DESC);

-- Row Level Security (RLS) policies
-- These policies ensure that users can only access their own data

-- Enable RLS on tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE creations ENABLE ROW LEVEL SECURITY;

-- Create policies for the users table
CREATE POLICY "Users can view their own data" 
  ON users FOR SELECT 
  USING (auth.uid() = id);

-- Create policies for the creations table
CREATE POLICY "Users can view their own creations" 
  ON creations FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own creations" 
  ON creations FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create a function to get or create a user session
CREATE OR REPLACE FUNCTION get_or_create_user_session(p_session_id TEXT)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_user_id UUID;
BEGIN
  -- Check if user with this session exists
  SELECT id INTO v_user_id
  FROM users
  WHERE session_id = p_session_id;
  
  -- If not found, create new user
  IF v_user_id IS NULL THEN
    INSERT INTO users (session_id)
    VALUES (p_session_id)
    RETURNING id INTO v_user_id;
  END IF;
  
  RETURN v_user_id;
END;
$$;

-- Comments for future reference
COMMENT ON TABLE users IS 'Stores user sessions for the AI Agent Corruption Chronicles app';
COMMENT ON TABLE creations IS 'Stores generated narratives and images created by users';
COMMENT ON FUNCTION get_or_create_user_session IS 'Gets an existing user by session ID or creates a new one';
