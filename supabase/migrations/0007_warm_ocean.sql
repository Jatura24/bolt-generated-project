/*
  # Create quiz questions system
  
  1. New Tables
    - `questions`
      - `id` (uuid, primary key)
      - `text` (text, the question text)
      - `options` (text[], the possible answers)
      - `correct_answer` (integer, index of correct option)
      - `category` (text, question category)
      - `difficulty` (integer, 1-3 for easy/medium/hard)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on questions table
    - Add policy for authenticated users to read questions
*/

CREATE TABLE IF NOT EXISTS questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  text text NOT NULL,
  options text[] NOT NULL,
  correct_answer integer NOT NULL,
  category text NOT NULL,
  difficulty integer NOT NULL CHECK (difficulty BETWEEN 1 AND 3),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;

-- Add read-only policy for authenticated users
CREATE POLICY "Anyone can read questions"
  ON questions
  FOR SELECT
  TO authenticated
  USING (true);

-- Insert some sample questions
INSERT INTO questions (text, options, correct_answer, category, difficulty) VALUES
('What is the capital of France?', ARRAY['London', 'Berlin', 'Paris', 'Madrid'], 2, 'geography', 1),
('Which planet is known as the Red Planet?', ARRAY['Venus', 'Mars', 'Jupiter', 'Saturn'], 1, 'science', 1),
('What is the largest mammal in the world?', ARRAY['African Elephant', 'Blue Whale', 'Giraffe', 'Hippopotamus'], 1, 'animals', 1),
('Who painted the Mona Lisa?', ARRAY['Vincent van Gogh', 'Pablo Picasso', 'Leonardo da Vinci', 'Michelangelo'], 2, 'art', 2),
('What is the chemical symbol for gold?', ARRAY['Ag', 'Fe', 'Au', 'Cu'], 2, 'science', 2);
