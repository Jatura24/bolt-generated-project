/*
  # Fix Zoo Schema and Policies

  1. Changes
    - Drop existing policies before recreating
    - Add proper constraints and indexes
    - Improve trigger function
  
  2. Security
    - Enable RLS
    - Add proper policies with checks
*/

-- Drop existing policies first
DROP POLICY IF EXISTS "Users can read any zoo" ON zoos;
DROP POLICY IF EXISTS "Users can update own zoo" ON zoos;
DROP POLICY IF EXISTS "Users can read own items" ON owned_items;
DROP POLICY IF EXISTS "Users can insert own items" ON owned_items;
DROP POLICY IF EXISTS "Users can read any zoo items" ON zoo_items;
DROP POLICY IF EXISTS "Users can manage own zoo items" ON zoo_items;

-- Create tables if not exist
CREATE TABLE IF NOT EXISTS zoos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) NOT NULL UNIQUE,
  name text NOT NULL,
  name_set boolean DEFAULT false,
  votes integer DEFAULT 0,
  last_voted_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT zoo_name_length CHECK (char_length(name) BETWEEN 3 AND 50),
  CONSTRAINT zoo_name_format CHECK (name ~ '^[a-zA-Z0-9\s'']+$')
);

CREATE TABLE IF NOT EXISTS owned_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) NOT NULL,
  item_type text NOT NULL,
  purchased_at timestamptz DEFAULT now(),
  CONSTRAINT owned_items_unique UNIQUE (user_id, item_type)
);

CREATE TABLE IF NOT EXISTS zoo_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) NOT NULL,
  item_type text NOT NULL,
  x float NOT NULL,
  y float NOT NULL,
  rotation float DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE zoos ENABLE ROW LEVEL SECURITY;
ALTER TABLE owned_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE zoo_items ENABLE ROW LEVEL SECURITY;

-- Create new policies
CREATE POLICY "Users can read any zoo"
  ON zoos FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own zoo"
  ON zoos FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can read own items"
  ON owned_items FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own items"
  ON owned_items FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read any zoo items"
  ON zoo_items FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can manage own zoo items"
  ON zoo_items FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS zoos_votes_idx ON zoos (votes DESC);
CREATE INDEX IF NOT EXISTS zoos_user_id_idx ON zoos (user_id);
CREATE INDEX IF NOT EXISTS owned_items_user_idx ON owned_items (user_id);
CREATE INDEX IF NOT EXISTS zoo_items_user_idx ON zoo_items (user_id);

-- Drop existing trigger and function
DROP TRIGGER IF EXISTS on_profile_created ON profiles;
DROP FUNCTION IF EXISTS handle_new_user_zoo();

-- Create improved function
CREATE FUNCTION handle_new_user_zoo()
RETURNS trigger AS $$
BEGIN
  INSERT INTO zoos (user_id, name, name_set)
  VALUES (NEW.id, NEW.username || '''s Zoo', false)
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger
CREATE TRIGGER on_profile_created
  AFTER INSERT ON profiles
  FOR EACH ROW EXECUTE PROCEDURE handle_new_user_zoo();
