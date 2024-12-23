/*
  # Fix authentication setup

  1. Changes
    - Add unique constraint for username
    - Add insert policy for profiles
    - Add insert policy for tokens
    - Update handle_new_user function with better error handling
*/

-- Add unique constraint for username
ALTER TABLE profiles
  DROP CONSTRAINT IF EXISTS username_unique,
  ADD CONSTRAINT username_unique UNIQUE (username);

-- Add insert policies
CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert their own tokens"
  ON tokens FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Improve handle_new_user function
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
DECLARE
  username_val text;
  avatar_val text;
BEGIN
  -- Get values from metadata with validation
  username_val := COALESCE(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1));
  avatar_val := COALESCE(new.raw_user_meta_data->>'avatar_emoji', '😊');

  -- Validate username format
  IF NOT (username_val ~* '^[a-zA-Z0-9_]{3,20}$') THEN
    RAISE EXCEPTION 'Invalid username format';
  END IF;

  -- Insert profile
  INSERT INTO profiles (id, username, avatar_emoji)
  VALUES (new.id, username_val, avatar_val);

  -- Insert initial tokens
  INSERT INTO tokens (user_id, balance)
  VALUES (new.id, 1000);

  RETURN new;
EXCEPTION
  WHEN unique_violation THEN
    RAISE EXCEPTION 'Username already taken';
  WHEN OTHERS THEN
    RAISE EXCEPTION 'Error creating user profile: %', SQLERRM;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
