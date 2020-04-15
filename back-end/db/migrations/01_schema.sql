DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS quests CASCADE;
DROP TABLE IF EXISTS badges CASCADE;
DROP TABLE IF EXISTS achievements CASCADE;
DROP TABLE IF EXISTS classes CASCADE;
DROP TABLE IF EXISTS assigned_badges CASCADE;
DROP TABLE IF EXISTS unlocked_achievements CASCADE;
DROP TABLE IF EXISTS class_progress CASCADE;


CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  username VARCHAR(255) NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  avatar VARCHAR(255) DEFAULT NULL, 
  adventurer BOOLEAN NOT NULL
);

CREATE TABLE classes (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  avatar VARCHAR(255) NOT NULL
);

CREATE TABLE quests (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT FALSE,
  latitude FLOAT NOT NULL,
  longitude FLOAT NOT NULL,
  class_id INTEGER REFERENCES classes(id),
  villager_id INTEGER REFERENCES users(id),
  adventurer_id INTEGER REFERENCES users(id) DEFAULT NULL,
  experience_points INTEGER NOT NULL DEFAULT 100
);

CREATE TABLE badges (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  image VARCHAR(255) NOT NULL,
  requirement VARCHAR(255) NOT NULL,
  int_requirement INTEGER NOT NULL,
  criteria_type VARCHAR(255) NOT NULL,
  class_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE achievements (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  image VARCHAR(255) NOT NULL,
  requirement VARCHAR(255) NOT NULL
);


CREATE TABLE assigned_badges (
  badge_id INTEGER REFERENCES badges(id) ON DELETE CASCADE,
  adventurer_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE unlocked_achievements (
  achievement_id INTEGER REFERENCES achievements(id) ON DELETE CASCADE,
  adventurer_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE class_progress (
  class_id INTEGER REFERENCES classes(id) ON DELETE CASCADE,
  adventurer_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  level INTEGER DEFAULT 1,
  experience INTEGER DEFAULT 0,
  quest_count INTEGER DEFAULT 0
);