-- Schema for ai-nonprofit-governance-platform
-- Run this in Supabase SQL Editor: Project > SQL Editor > New Query

CREATE TABLE IF NOT EXISTS records (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  content text,
  status text DEFAULT 'draft' CHECK (status IN ('draft','active','archived')),
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE records ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view own" ON records FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own" ON records FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own" ON records FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users delete own" ON records FOR DELETE USING (auth.uid() = user_id);

CREATE INDEX ON records (user_id);
CREATE INDEX ON records (created_at DESC);
CREATE INDEX ON records (status);

ALTER PUBLICATION supabase_realtime ADD TABLE records;
