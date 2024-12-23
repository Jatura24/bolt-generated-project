/*
  # Update Zoo System

  1. Changes
    - Add unique constraint for user's zoo
    - Add votes tracking
    - Add last_voted_at timestamp for vote limiting
    - Add proper indexes for performance

  2. Security
    - Update RLS policies for voting
*/

-- Add last_voted_at column to track voting
ALTER TABLE zoos
ADD COLUMN last_voted_at timestamptz;

-- Create votes table for better tracking
CREATE TABLE zoo_votes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  zoo_id uuid REFERENCES zoos(id) NOT NULL,
  voter_id uuid REFERENCES profiles(id) NOT NULL,
  voted_at timestamptz DEFAULT now(),
  UNIQUE(zoo_id, voter_id, DATE(voted_at))
);

-- Enable RLS
ALTER TABLE zoo_votes ENABLE ROW LEVEL SECURITY;

-- Policies for votes
CREATE POLICY "Users can read any votes"
  ON zoo_votes FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert their own votes"
  ON zoo_votes FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = voter_id);

-- Add indexes for performance
CREATE INDEX zoo_votes_voter_date_idx ON zoo_votes (voter_id, DATE(voted_at));
CREATE INDEX zoo_votes_zoo_date_idx ON zoo_votes (zoo_id, DATE(voted_at));

-- Function to update zoo votes count
CREATE OR REPLACE FUNCTION update_zoo_votes()
RETURNS trigger AS $$
BEGIN
  UPDATE zoos
  SET 
    votes = votes + 1,
    last_voted_at = NEW.voted_at
  WHERE id = NEW.zoo_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for vote counting
CREATE TRIGGER on_zoo_vote
  AFTER INSERT ON zoo_votes
  FOR EACH ROW EXECUTE PROCEDURE update_zoo_votes();
