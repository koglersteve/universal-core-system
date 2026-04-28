-- db/schema.sql

CREATE TABLE lafflab_jokes (
  id TEXT PRIMARY KEY,
  text TEXT NOT NULL,
  category_id TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE lafflab_categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE lafflab_favorites (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  joke_id TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE lafflab_history (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  joke_id TEXT NOT NULL,
  seen_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE lafflab_reactions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  joke_id TEXT NOT NULL,
  reaction TEXT NOT NULL, -- "lol", "meh", "too_real", etc.
  mood_before TEXT,
  mood_after TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE lafflab_cross_app_links (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  joke_id TEXT NOT NULL,
  target_app TEXT NOT NULL, -- "moodcheck", "idlyily", "mememydog", etc.
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
