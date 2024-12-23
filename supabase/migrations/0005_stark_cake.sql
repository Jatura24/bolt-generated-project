-- Drop existing trigger and function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS handle_new_user();

-- Create improved function with better transaction and error handling
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
DECLARE
  username_val text;
  avatar_val text;
  profile_id uuid;
BEGIN
  -- Get and validate username with explicit locking
  LOCK TABLE profiles IN SHARE UPDATE EXCLUSIVE MODE;
  
  -- Extract and clean username
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

  -- Check for existing username with explicit locking
  IF EXISTS (SELECT 1 FROM profiles WHERE username = username_val FOR UPDATE) THEN
    RAISE EXCEPTION 'Username % is already taken', username_val USING ERRCODE = 'unique_violation';
  END IF;

  -- Get and validate avatar
  avatar_val := NULLIF(TRIM(new.raw_user_meta_data->>'avatar_emoji'), '');
  IF avatar_val IS NULL THEN
    avatar_val := '😊';
  END IF;

  -- Insert profile with RETURNING clause to ensure we have the ID
  INSERT INTO profiles (id, username, avatar_emoji)
  VALUES (new.id, username_val, avatar_val)
  RETURNING id INTO profile_id;

  -- Create initial token balance only if profile was created
  IF profile_id IS NOT NULL THEN
    INSERT INTO tokens (user_id, balance)
    VALUES (profile_id, 1000);
  ELSE
    RAISE EXCEPTION 'Failed to create profile' USING ERRCODE = 'integrity_constraint_violation';
  END IF;

  RETURN new;
EXCEPTION
  WHEN unique_violation THEN
    RAISE EXCEPTION 'Username % is already taken', username_val;
  WHEN check_violation THEN
    RAISE EXCEPTION 'Invalid username format: %', SQLERRM;
  WHEN integrity_constraint_violation THEN
    RAISE EXCEPTION 'Failed to create user profile: %', SQLERRM;
  WHEN OTHERS THEN
    -- Log error details and rollback
    RAISE EXCEPTION 'Unexpected error creating user profile: % (SQLSTATE: %)', SQLERRM, SQLSTATE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE handle_new_user();

-- Add additional indexes for performance
CREATE INDEX IF NOT EXISTS profiles_username_lower_idx ON profiles (lower(username));
CREATE INDEX IF NOT EXISTS tokens_user_balance_idx ON tokens (user_id, balance);

-- Ensure proper constraints
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS username_format;
ALTER TABLE profiles ADD CONSTRAINT username_format CHECK (username ~* '^[a-zA-Z0-9_]{3,20}$');
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS username_unique;
ALTER TABLE profiles ADD CONSTRAINT username_unique UNIQUE (username);

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
