DROP DATABASE IF EXISTS "dev" CASCADE;

CREATE DATABASE IF NOT EXISTS "dev";

USE "dev";

DROP SCHEMA IF EXISTS "basketball" CASCADE;

CREATE SCHEMA IF NOT EXISTS "basketball";

CREATE TABLE IF NOT EXISTS "basketball"."categories" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    teams_limit INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE IF NOT EXISTS "basketball"."teams" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID REFERENCES "basketball"."categories"("id"),
    name TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    city TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE
);

CREATE VIEW IF NOT EXISTS "basketball"."category_limits" AS
SELECT 
    c."id" AS "id",
    c."name" AS "name",
    c."teams_limit" AS "teams_limit",
    COUNT(t."id") AS "teams_count",
    (c."teams_limit" - COUNT(t."id")) AS "teams_remaining",
    (COUNT(t."id") >= c."teams_limit") AS "is_full",
    c."created_at" AS "created_at",
    c."updated_at" AS "updated_at"
FROM "basketball"."categories" c, "basketball"."teams" t
WHERE c."id" = t."category_id"
GROUP BY c."id", c."name", c."teams_limit";

CREATE TABLE IF NOT EXISTS "basketball"."players" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    team_id UUID REFERENCES "basketball"."teams"("id"),
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    age INT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE IF NOT EXISTS "basketball"."tournaments" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE IF NOT EXISTS "basketball"."groups" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tournament_id UUID REFERENCES "basketball"."tournaments"("id") ON DELETE CASCADE,
    name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE IF NOT EXISTS "basketball"."group_teams" (
    group_id UUID REFERENCES "basketball"."groups"("id") ON DELETE CASCADE,
    team_id UUID REFERENCES "basketball"."teams"("id")
);

CREATE TABLE IF NOT EXISTS "basketball"."officials" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE IF NOT EXISTS "basketball"."matches" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    parent_match_id UUID REFERENCES "basketball"."matches"("id"),
    group_id UUID REFERENCES "basketball"."groups"(id) ON DELETE CASCADE,
    home_team_id UUID REFERENCES "basketball"."teams"("id"),
    away_team_id UUID REFERENCES "basketball"."teams"("id"),
    winning_team_id UUID REFERENCES "basketball"."teams"("id"),
    referee_id UUID REFERENCES "basketball"."officials"("id"),
    status TEXT DEFAULT 'scheduled',
    home_score INT DEFAULT 0,
    away_score INT DEFAULT 0,
    scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
    started_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE,
    CHECK ("home_team_id" != "away_team_id")
);

CREATE TABLE IF NOT EXISTS "basketball"."match_events" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    match_id UUID REFERENCES "basketball"."matches"("id") ON DELETE CASCADE,
    team_id UUID REFERENCES "basketball"."teams"("id"),
    player_id UUID REFERENCES "basketball"."players"("id"),
    clock_time INTERVAL NOT NULL,
    event_type TEXT NOT NULL,
    score_after_event TEXT
);

CREATE OR REPLACE FUNCTION check_category_limit()
RETURNS TRIGGER AS $$
DECLARE
    current_count INT;
    max_count INT;
BEGIN
    SELECT "teams_limit" INTO max_count FROM "basketball"."categories" WHERE id = (NEW).category_id;
    
    SELECT COUNT(*) INTO current_count FROM "basketball"."teams" WHERE category_id = (NEW).category_id;

    IF current_count >= max_count THEN
        RAISE EXCEPTION 'check_category_limit(%)', max_count;
    END IF;

    RETURN (NEW);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_check_category_limit
BEFORE INSERT ON "basketball"."teams"
FOR EACH ROW
EXECUTE FUNCTION check_category_limit();

INSERT INTO "basketball"."categories" ("name", "teams_limit") VALUES 
    ('Amator', 16), 
    ('Pro', 16)
ON CONFLICT DO NOTHING;

INSERT INTO "basketball"."teams" ("category_id", "name", "email", "phone", "city") VALUES 
    ((SELECT id FROM "basketball"."categories" WHERE name = 'Amator' LIMIT 1), 'Warsaw Sharks', 'office@sharks.pl', '+48 111 222 333', 'Warszawa'),
    ((SELECT id FROM "basketball"."categories" WHERE name = 'Amator' LIMIT 1), 'Cracow Bulls', 'contact@bulls.pl', '+48 444 555 666', 'Kraków'),
    ((SELECT id FROM "basketball"."categories" WHERE name = 'Amator' LIMIT 1), 'Gdańsk Dolphins', 'info@dolphins.pl', '+48 777 888 999', 'Gdańsk'),
    ((SELECT id FROM "basketball"."categories" WHERE name = 'Amator' LIMIT 1), 'Wrocław Wolves', 'team@wolves.pl', '+48 123 456 789', 'Wrocław')
ON CONFLICT (name) DO NOTHING;

INSERT INTO "basketball"."players" ("team_id", "first_name", "last_name", "age") VALUES 
    ((SELECT id FROM "basketball"."teams" WHERE name = 'Warsaw Sharks' LIMIT 1), 'Adam', 'Kowalski', 24),
    ((SELECT id FROM "basketball"."teams" WHERE name = 'Warsaw Sharks' LIMIT 1), 'Piotr', 'Nowak', 27),
    ((SELECT id FROM "basketball"."teams" WHERE name = 'Cracow Bulls' LIMIT 1), 'Michał', 'Zieliński', 22),
    ((SELECT id FROM "basketball"."teams" WHERE name = 'Cracow Bulls' LIMIT 1), 'Jan', 'Wiśniewski', 30)
ON CONFLICT DO NOTHING;

INSERT INTO "basketball"."tournaments" ("name") VALUES ('Knurowski Streetball 2026') ON CONFLICT DO NOTHING;

INSERT INTO "basketball"."groups" ("tournament_id", "name") VALUES 
    ((SELECT id FROM "basketball"."tournaments" WHERE name = 'Knurowski Streetball 2026' LIMIT 1), 'Grupa A'),
    ((SELECT id FROM "basketball"."tournaments" WHERE name = 'Knurowski Streetball 2026' LIMIT 1), 'Grupa B')
ON CONFLICT DO NOTHING;

INSERT INTO "basketball"."group_teams" ("group_id", "team_id") VALUES 
    ((SELECT id FROM "basketball"."groups" WHERE name = 'Grupa A' LIMIT 1), (SELECT id FROM "basketball"."teams" WHERE name = 'Warsaw Sharks' LIMIT 1)),
    ((SELECT id FROM "basketball"."groups" WHERE name = 'Grupa A' LIMIT 1), (SELECT id FROM "basketball"."teams" WHERE name = 'Cracow Bulls' LIMIT 1)),
    ((SELECT id FROM "basketball"."groups" WHERE name = 'Grupa B' LIMIT 1), (SELECT id FROM "basketball"."teams" WHERE name = 'Gdańsk Dolphins' LIMIT 1)),
    ((SELECT id FROM "basketball"."groups" WHERE name = 'Grupa B' LIMIT 1), (SELECT id FROM "basketball"."teams" WHERE name = 'Wrocław Wolves' LIMIT 1))
ON CONFLICT DO NOTHING;

INSERT INTO "basketball"."officials" ("first_name", "last_name") VALUES 
    ('Robert', 'Sędziowski'),
    ('Marek', 'Gwizdek')
ON CONFLICT DO NOTHING;

INSERT INTO "basketball"."matches" ("group_id", "home_team_id", "away_team_id", "winning_team_id", "referee_id", "status", "home_score", "away_score", "scheduled_at", "started_at") VALUES 
    (
        (SELECT id FROM "basketball"."groups" WHERE name = 'Grupa A' LIMIT 1),
        (SELECT id FROM "basketball"."teams" WHERE name = 'Warsaw Sharks' LIMIT 1),
        (SELECT id FROM "basketball"."teams" WHERE name = 'Cracow Bulls' LIMIT 1),
        (SELECT id FROM "basketball"."teams" WHERE name = 'Warsaw Sharks' LIMIT 1),
        (SELECT id FROM "basketball"."officials" WHERE last_name = 'Sędziowski' LIMIT 1),
        'finished',
        88,
        82,
        '2026-05-20 18:00:00+02',
        '2026-05-20 18:15:00+02'
    )
ON CONFLICT DO NOTHING;

INSERT INTO "basketball"."match_events" ("match_id", "team_id", "player_id", "clock_time", "event_type", "score_after_event") VALUES 
    (
        (SELECT id FROM "basketball"."matches" LIMIT 1),
        (SELECT id FROM "basketball"."teams" WHERE name = 'Warsaw Sharks' LIMIT 1),
        (SELECT id FROM "basketball"."players" WHERE last_name = 'Kowalski' LIMIT 1),
        '00:01:20',
        '3FGM',
        '3-0'
    ),
    (
        (SELECT id FROM "basketball"."matches" LIMIT 1),
        (SELECT id FROM "basketball"."teams" WHERE name = 'Cracow Bulls' LIMIT 1),
        (SELECT id FROM "basketball"."players" WHERE last_name = 'Wiśniewski' LIMIT 1),
        '00:02:15',
        'FOUL',
        '3-0'
    )
ON CONFLICT DO NOTHING;