/*
  # Add Zoo Table and Features

  1. New Tables
    - `zoos`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `name` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      - `votes` (integer)

  2. Changes
    - Add foreign key to zoo_items table
    - Add RLS policies for zoo table
*/

-- Create zoos table
CREATE TABLE zoos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles NOT NULL UNIQUE,
  name text NOT NULL,
  votes integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Add foreign key to zoo_items
ALTER TABLE zoo_items
  DROP CONSTRAINT IF EXISTS zoo_items_user_id_fkey,
  ADD CONSTRAINT zoo_items_user_id_fkey
  FOREIGN KEY (user_id)
  REFERENCES zoos(user_id)
  ON DELETE CASCADE;

-- Enable RLS
ALTER TABLE zoos ENABLE ROW LEVEL SECURITY;

-- Policies for zoos table
CREATE POLICY "Users can read any zoo"
  ON zoos FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create their own zoo"
  ON zoos FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own zoo"
  ON zoos FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Function to handle new user zoo creation
CREATE OR REPLACE FUNCTION handle_new_user_zoo()
RETURNS trigger AS $$
BEGIN
  INSERT INTO zoos (user_id, name)
  VALUES (NEW.id, NEW.username || '''s Zoo');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user zoo creation
CREATE TRIGGER on_profile_created
  AFTER INSERT ON profiles
  FOR EACH ROW EXECUTE PROCEDURE handle_new_user_zoo();
