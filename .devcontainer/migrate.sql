DROP DATABASE IF EXISTS "dev" CASCADE;

CREATE DATABASE IF NOT EXISTS "dev";

USE "dev";

DROP SCHEMA IF EXISTS basketball CASCADE;

CREATE SCHEMA IF NOT EXISTS basketball;

CREATE TABLE basketball.states (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    INDEX (name)
);

CREATE TABLE basketball.districts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    state_id UUID NOT NULL REFERENCES basketball.states(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    CONSTRAINT unique_district_in_state UNIQUE (state_id, name),
    INDEX (name)
);

CREATE TABLE basketball.cities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    district_id UUID NOT NULL REFERENCES basketball.districts(id) ON DELETE CASCADE,
    territorial_id VARCHAR(20) NOT NULL UNIQUE,
    name VARCHAR(150) NOT NULL,
    area DECIMAL(10, 2),
    population INT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    INDEX (territorial_id, name)
);

CREATE TABLE IF NOT EXISTS basketball.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    teams_limit INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE IF NOT EXISTS basketball.teams (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID REFERENCES basketball.categories(id),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    city TEXT NOT NULL,
    verified_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE IF NOT EXISTS basketball.players (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    team_id UUID REFERENCES basketball.teams(id),
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    age INT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE IF NOT EXISTS basketball.tournaments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE IF NOT EXISTS basketball.groups (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tournament_id UUID REFERENCES basketball.tournaments(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE IF NOT EXISTS basketball.group_teams (
    group_id UUID REFERENCES basketball.groups(id) ON DELETE CASCADE,
    team_id UUID REFERENCES basketball.teams(id),
    PRIMARY KEY (group_id, team_id)
);

CREATE TABLE IF NOT EXISTS basketball.referees (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE IF NOT EXISTS basketball.matches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    parent_match_id UUID REFERENCES basketball.matches(id),
    group_id UUID REFERENCES basketball.groups(id) ON DELETE CASCADE,
    home_team_id UUID REFERENCES basketball.teams(id),
    away_team_id UUID REFERENCES basketball.teams(id),
    referee_id UUID REFERENCES basketball.referees(id),
    status TEXT DEFAULT 'scheduled',
    home_score INT DEFAULT 0,
    away_score INT DEFAULT 0,
    scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
    started_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE,
    CHECK ("home_team_id" != "away_team_id"),
    CHECK (status IN ('scheduled', 'live', 'finished', 'cancelled'))
);

CREATE TABLE IF NOT EXISTS basketball.match_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    match_id UUID REFERENCES basketball.matches(id) ON DELETE CASCADE,
    team_id UUID REFERENCES basketball.teams(id),
    player_id UUID REFERENCES basketball.players(id),
    clock_time INTERVAL NOT NULL,
    event_type TEXT NOT NULL
);

CREATE VIEW IF NOT EXISTS basketball.category_limits AS
SELECT 
    c.id AS "id",
    c.name AS "name",
    c.teams_limit AS "teams_limit",
    COUNT(t.id) AS "teams_count",
    (c.teams_limit - COUNT(t."id")) AS "teams_remaining",
    (COUNT(t."id") >= c.teams_limit) AS "is_full",
    c.created_at AS "created_at",
    c.updated_at AS "updated_at"
FROM basketball.categories c
LEFT JOIN basketball.teams t
ON c.id = t.category_id
GROUP BY c.id, c.name, c.teams_limit, c.created_at, c.updated_at;

CREATE OR REPLACE FUNCTION check_category_limit()
RETURNS TRIGGER AS $$
DECLARE
    current_count INT;
    max_count INT;
BEGIN
    SELECT teams_limit INTO max_count FROM basketball.categories WHERE id = (NEW).category_id;
    
    SELECT COUNT(*) INTO current_count FROM basketball.teams WHERE category_id = (NEW).category_id;

    IF current_count >= max_count THEN
        RAISE EXCEPTION 'check_category_limit(%)', max_count;
    END IF;

    RETURN (NEW);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_check_category_limit
BEFORE INSERT ON basketball.teams
FOR EACH ROW
EXECUTE FUNCTION check_category_limit();