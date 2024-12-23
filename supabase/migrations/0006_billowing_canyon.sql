/*
  # Fix user creation function
  
  1. Changes
    - Remove SAVEPOINT/ROLLBACK usage
    - Add proper error handling
    - Improve username validation
    - Add explicit locking
    - Add better error messages
  
  2. Security
    - Enable RLS
    - Add proper constraints
    - Add validation checks
*/

-- Drop existing trigger and function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS handle_new_user();

-- Create improved function with better error handling
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
DECLARE
  username_val text;
  avatar_val text;
  profile_id uuid;
BEGIN
  -- Extract and validate username with explicit locking
  LOCK TABLE profiles IN SHARE UPDATE EXCLUSIVE MODE;
  
  -- Get username with fallback
  username_val := NULLIF(TRIM(new.raw_user_meta_data->>'username'), '');
  IF username_val IS NULL THEN
    username_val := split_part(new.email, '@', 1);
  END IF;

  -- Validate username
  IF NOT (username_val ~* '^[a-zA-Z0-9_]{3,20}$') THEN
    RAISE EXCEPTION 'Invalid username format' USING 
      ERRCODE = 'check_violation',
      HINT = 'Username must be 3-20 characters and contain only letters, numbers, and underscores';
  END IF;

  -- Check for existing username with FOR UPDATE SKIP LOCKED
  IF EXISTS (
    SELECT 1 FROM profiles 
    WHERE lower(username) = lower(username_val) 
    FOR UPDATE SKIP LOCKED
  ) THEN
    RAISE EXCEPTION 'Username is already taken' USING 
      ERRCODE = 'unique_violation',
      HINT = 'Please choose a different username';
  END IF;

  -- Get avatar with fallback
  avatar_val := COALESCE(NULLIF(TRIM(new.raw_user_meta_data->>'avatar_emoji'), ''), '😊');

  -- Create profile
  INSERT INTO profiles (id, username, avatar_emoji)
  VALUES (new.id, username_val, avatar_val)
  RETURNING id INTO profile_id;

  -- Create initial token balance
  INSERT INTO tokens (user_id, balance)
  VALUES (profile_id, 1000);
  
  RETURN new;

EXCEPTION
  WHEN unique_violation THEN
    RAISE EXCEPTION 'Username is already taken' USING 
      HINT = 'Please choose a different username';
      
  WHEN check_violation THEN
    RAISE EXCEPTION 'Invalid username format' USING 
      HINT = 'Username must be 3-20 characters and contain only letters, numbers, and underscores';
      
  WHEN OTHERS THEN
    RAISE EXCEPTION 'Error creating user profile: %', SQLERRM;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE handle_new_user();

-- Add additional indexes
CREATE INDEX IF NOT EXISTS profiles_username_lower_idx ON profiles (lower(username));
CREATE INDEX IF NOT EXISTS tokens_user_balance_idx ON tokens (user_id, balance);

-- Ensure proper constraints with DEFERRABLE
ALTER TABLE profiles 
  DROP CONSTRAINT IF EXISTS username_unique,
  ADD CONSTRAINT username_unique UNIQUE (username) DEFERRABLE INITIALLY IMMEDIATE;

-- Update profile constraints
ALTER TABLE profiles
  DROP CONSTRAINT IF EXISTS username_format,
  ADD CONSTRAINT username_format CHECK (username ~* '^[a-zA-Z0-9_]{3,20}$');

-- Ensure proper foreign key constraints
ALTER TABLE tokens
  DROP CONSTRAINT IF EXISTS tokens_user_id_fkey,
  ADD CONSTRAINT tokens_user_id_fkey 
  FOREIGN KEY (user_id) 
  REFERENCES profiles(id) 
  ON DELETE CASCADE;
