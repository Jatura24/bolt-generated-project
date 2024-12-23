/*
  # Fix auth trigger and add email domain

  1. Changes
    - Update handle_new_user trigger to handle email domains properly
    - Add validation for username format
    - Add default avatar emoji if none provided
*/

-- Drop existing trigger and function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS handle_new_user();

-- Create improved function
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  -- Insert profile with validation
  INSERT INTO profiles (
    id,
    username,
    avatar_emoji
  )
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1)),
    COALESCE(new.raw_user_meta_data->>'avatar_emoji', '😊')
  );

  -- Create initial token balance
  INSERT INTO tokens (user_id, balance)
  VALUES (new.id, 1000);

  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE handle_new_user();

-- Add constraint for username format
ALTER TABLE profiles
  ADD CONSTRAINT username_format 
  CHECK (username ~* '^[a-zA-Z0-9_]{3,20}$');
