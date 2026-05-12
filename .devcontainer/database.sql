DROP DATABASE IF EXISTS basketball;

CREATE DATABASE IF NOT EXISTS basketball;

USE basketball;

DROP SCHEMA IF EXISTS basketball;

CREATE SCHEMA IF NOT EXISTS basketball;

CREATE TABLE IF NOT EXISTS basketball.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS basketball.teams (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID REFERENCES basketball.categories(id),
    name TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    city TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS basketball.players (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    team_id UUID REFERENCES basketball.teams(id) ON DELETE CASCADE,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    age INT
);

CREATE TABLE IF NOT EXISTS basketball.tournaments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS basketball.groups (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tournament_id UUID REFERENCES basketball.tournaments(id) ON DELETE CASCADE,
    name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS basketball.group_teams (
    group_id UUID REFERENCES basketball.groups(id) ON DELETE CASCADE,
    team_id UUID REFERENCES basketball.teams(id)
);

CREATE TABLE IF NOT EXISTS basketball.officials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS basketball.matches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    parent_match_id UUID REFERENCES basketball.matches(id),
    group_id UUID REFERENCES basketball.groups(id) ON DELETE CASCADE,
    home_team_id UUID REFERENCES basketball.teams(id),
    away_team_id UUID REFERENCES basketball.teams(id),
    referee_id UUID REFERENCES basketball.officials(id),
    scheduled_at TIMESTAMPTZ,
    status TEXT DEFAULT 'scheduled',
    home_score INT DEFAULT 0,
    away_score INT DEFAULT 0,
    winning_team_id UUID REFERENCES basketball.teams(id),
    CHECK (home_team_id != away_team_id)
);

CREATE TABLE IF NOT EXISTS basketball.match_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    match_id UUID REFERENCES basketball.matches(id) ON DELETE CASCADE,
    team_id UUID REFERENCES basketball.teams(id),
    player_id UUID REFERENCES basketball.players(id),
    clock_time INTERVAL NOT NULL,
    event_type TEXT NOT NULL,
    score_after_event TEXT
);