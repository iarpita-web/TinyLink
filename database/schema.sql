-- Database Schema for TinyLink
-- This file documents the database structure

-- Links table stores all shortened URLs
CREATE TABLE IF NOT EXISTS links (
  id SERIAL PRIMARY KEY,
  code VARCHAR(8) UNIQUE NOT NULL,
  target_url TEXT NOT NULL,
  click_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_clicked_at TIMESTAMP
);

-- Index for faster lookups by code
CREATE INDEX IF NOT EXISTS idx_links_code ON links(code);

-- Example queries:
-- SELECT * FROM links ORDER BY created_at DESC;
-- SELECT * FROM links WHERE code = 'abc123';
-- UPDATE links SET click_count = click_count + 1 WHERE code = 'abc123';

