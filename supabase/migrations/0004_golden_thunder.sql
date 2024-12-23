/*
  # Fix user creation trigger

  1. Changes
    - Add transaction handling
    - Improve error handling
    - Add validation checks
    - Add debugging information
  
  2. Security
    - Maintain RLS policies
    - Keep security definer for proper permissions
*/

-- Drop existing trigger and function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS handle_new_user();

-- Create improved function with transaction handling
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
DECLARE
  username_val text;
  avatar_val text;
BEGIN
  -- Start transaction
  BEGIN
    -- Get and validate username
    username_val := NULLIF(TRIM(new.raw_user_meta_data->>'username'), '');
    IF username_val IS NULL THEN
      username_val := split_part(new.email, '@', 1);
    END IF;

    -- Validate username length
    IF length(username_val) < 3 OR length(username_val) > 20 THEN
      RAISE EXCEPTION 'Username must be between 3 and 20 characters' USING ERRCODE = 'check_violation';
    END IF;

    -- Validate username format
    IF NOT (username_val ~* '^[a-zA-Z0-9_]+$') THEN
      RAISE EXCEPTION 'Username can only contain letters, numbers, and underscores' USING ERRCODE = 'check_violation';
    END IF;

    -- Get and validate avatar
    avatar_val := NULLIF(TRIM(new.raw_user_meta_data->>'avatar_emoji'), '');
    IF avatar_val IS NULL THEN
      avatar_val := '😊';
    END IF;

    -- Insert profile
    INSERT INTO profiles (id, username, avatar_emoji)
    VALUES (new.id, username_val, avatar_val);

    -- Create initial token balance
    INSERT INTO tokens (user_id, balance)
    VALUES (new.id, 1000);

    -- If we get here, everything succeeded
    RETURN new;
  EXCEPTION
    WHEN unique_violation THEN
      RAISE EXCEPTION 'Username % is already taken', username_val USING ERRCODE = 'unique_violation';
    WHEN check_violation THEN
      RAISE EXCEPTION 'Invalid username format: %', SQLERRM USING ERRCODE = 'check_violation';
    WHEN OTHERS THEN
      -- Log the error details
      RAISE EXCEPTION 'Error creating user profile: % (Error code: %)', SQLERRM, SQLSTATE;
  END;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE handle_new_user();

-- Add index for username lookups
CREATE INDEX IF NOT EXISTS profiles_username_idx ON profiles (username);

-- Ensure proper constraints
ALTER TABLE profiles
  DROP CONSTRAINT IF EXISTS username_format,
  ADD CONSTRAINT username_format CHECK (username ~* '^[a-zA-Z0-9_]{3,20}$');

-- Update RLS policies
DROP POLICY IF EXISTS "Users can read own profile" ON profiles;
CREATE POLICY "Users can read own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);
