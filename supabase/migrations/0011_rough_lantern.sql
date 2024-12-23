/*
  # Zoo System Improvements

  1. Changes
    - Add name_set flag to track if zoo name has been customized
    - Add constraints for zoo name
    - Add indexes for better performance
    - Update zoo creation trigger

  2. Security
    - Maintain existing RLS policies
    - Add validation for zoo names
*/

-- Add name_set flag to zoos
ALTER TABLE zoos
ADD COLUMN IF NOT EXISTS name_set boolean DEFAULT false;

-- Add constraints for zoo name
ALTER TABLE zoos
ADD CONSTRAINT zoo_name_length CHECK (char_length(name) BETWEEN 3 AND 50),
ADD CONSTRAINT zoo_name_format CHECK (name ~ '^[a-zA-Z0-9\s'']+$');

-- Improve zoo creation trigger
CREATE OR REPLACE FUNCTION handle_new_user_zoo()
RETURNS trigger AS $$
BEGIN
  INSERT INTO zoos (
    user_id,
    name,
    name_set,
    votes
  )
  VALUES (
    NEW.id,
    NEW.username || '''s Zoo',
    false,
    0
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS zoos_votes_idx ON zoos (votes DESC);
CREATE INDEX IF NOT EXISTS zoos_user_id_idx ON zoos (user_id);

-- Update existing zoos to have name_set = false
UPDATE zoos SET name_set = false WHERE name_set IS NULL;
