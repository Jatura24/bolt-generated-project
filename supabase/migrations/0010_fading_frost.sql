/*
  # Zoo Voting System

  1. Changes
    - Add last_voted_at column to track voting times
    - Create zoo_votes table for vote tracking
    - Add proper indexes and constraints
    - Set up RLS policies

  2. Security
    - Enable RLS on new tables
    - Add policies for vote management
*/

-- Add last_voted_at column to track voting
ALTER TABLE zoos
ADD COLUMN IF NOT EXISTS last_voted_at timestamptz;

-- Create votes table for better tracking
CREATE TABLE zoo_votes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  zoo_id uuid REFERENCES zoos(id) NOT NULL,
  voter_id uuid REFERENCES profiles(id) NOT NULL,
  voted_at timestamptz DEFAULT now(),
  vote_date date DEFAULT CURRENT_DATE
);

-- Add unique constraint for one vote per zoo per user per day
ALTER TABLE zoo_votes
ADD CONSTRAINT unique_daily_vote UNIQUE (zoo_id, voter_id, vote_date);

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
CREATE INDEX zoo_votes_voter_date_idx ON zoo_votes (voter_id, vote_date);
CREATE INDEX zoo_votes_zoo_date_idx ON zoo_votes (zoo_id, vote_date);

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
