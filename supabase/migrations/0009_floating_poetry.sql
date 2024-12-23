/*
  # Add Owned Items Table

  1. New Tables
    - `owned_items`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `item_type` (text)
      - `purchased_at` (timestamp)

  2. Security
    - Enable RLS
    - Add policies for owned items
*/

-- Create owned items table
CREATE TABLE owned_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles NOT NULL,
  item_type text NOT NULL,
  purchased_at timestamptz DEFAULT now(),
  UNIQUE(user_id, item_type)
);

-- Enable RLS
ALTER TABLE owned_items ENABLE ROW LEVEL SECURITY;

-- Policies for owned items
CREATE POLICY "Users can read own items"
  ON owned_items FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own items"
  ON owned_items FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);
