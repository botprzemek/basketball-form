import { defineRelations } from "drizzle-orm";
import {
    integer,
    pgSchema,
    primaryKey,
    text,
    timestamp,
    uuid,
} from "drizzle-orm/pg-core";

const schema = pgSchema("basketball");

export const states = schema.table("states", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull().unique(),
});

export const districts = schema.table("districts", {
    id: uuid("id").defaultRandom().primaryKey(),
    stateId: uuid("state_id")
        .notNull()
        .references(() => states.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
});

export const cities = schema.table("cities", {
    id: uuid("id").defaultRandom().primaryKey(),
    districtId: uuid("district_id")
        .notNull()
        .references(() => districts.id, { onDelete: "cascade" }),
    territorialId: text("territorial_id").notNull().unique(),
    name: text("name").notNull(),
    area: integer("area"),
    population: integer("population"),
});

export const categories = schema.table("categories", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    teamsLimit: integer("teams_limit").notNull().default(0),
    createdAt: timestamp("created_at", { withTimezone: true })
        .notNull()
        .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
        () => new Date(),
    ),
});

export const teams = schema.table("teams", {
    id: uuid("id").primaryKey().defaultRandom(),
    categoryId: uuid("category_id").references(() => categories.id),
    name: text("name").notNull(),
    email: text("email").notNull(),
    phone: text("phone").notNull(),
    city: text("city").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
        .notNull()
        .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
        () => new Date(),
    ),
});

export const players = schema.table("players", {
    id: uuid("id").primaryKey().defaultRandom(),
    teamId: uuid("team_id").references(() => teams.id, { onDelete: "cascade" }),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    age: integer("age").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
        .notNull()
        .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
        () => new Date(),
    ),
});

export const tournaments = schema.table("tournaments", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
        .notNull()
        .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
        () => new Date(),
    ),
});

export const groups = schema.table("groups", {
    id: uuid("id").primaryKey().defaultRandom(),
    tournamentId: uuid("tournament_id").references(() => tournaments.id, {
        onDelete: "cascade",
    }),
    name: text("name").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
        .notNull()
        .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
        () => new Date(),
    ),
});

export const groupTeams = schema.table(
    "group_teams",
    {
        groupId: uuid("group_id").references(() => groups.id, {
            onDelete: "cascade",
        }),
        teamId: uuid("team_id").references(() => teams.id),
    },
    (table) => [primaryKey({ columns: [table.groupId, table.teamId] })],
);

export const referees = schema.table("referees", {
    id: uuid("id").primaryKey().defaultRandom(),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
        .notNull()
        .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
        () => new Date(),
    ),
});

export const matches = schema.table("matches", {
    id: uuid("id").primaryKey().defaultRandom(),
    parentMatchId: uuid("parent_match_id").references((): any => matches.id),
    groupId: uuid("group_id").references(() => groups.id, {
        onDelete: "cascade",
    }),
    homeTeamId: uuid("home_team_id").references(() => teams.id),
    awayTeamId: uuid("away_team_id").references(() => teams.id),
    winningTeamId: uuid("winning_team_id").references(() => teams.id),
    refereeId: uuid("referee_id").references(() => officials.id),
    status: text("status").default("scheduled"),
    homeScore: integer("home_score").default(0),
    awayScore: integer("away_score").default(0),
    scheduledAt: timestamp("scheduled_at", { withTimezone: true }),
    startedAt: timestamp("started_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true })
        .notNull()
        .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
        () => new Date(),
    ),
});

export const matchEvents = schema.table("match_events", {
    id: uuid("id").primaryKey().defaultRandom(),
    matchId: uuid("match_id").references(() => matches.id, {
        onDelete: "cascade",
    }),
    teamId: uuid("team_id").references(() => teams.id),
    playerId: uuid("player_id").references(() => players.id),
    clockTime: text("clock_time").notNull(),
    eventType: text("event_type").notNull(),
    scoreAfterEvent: text("score_after_event"),
});

export const categoryLimits = schema
    .view("category_limits", {
        id: uuid("id").primaryKey().defaultRandom(),
        name: text("name").notNull().unique(),
        teamsLimit: integer("teams_limit").notNull().default(0),
        teamsCount: integer("teams_count").notNull().default(0),
        teamsRemaining: integer("teams_remaining").notNull().default(0),
        isFull: text("is_full"),
        createdAt: timestamp("created_at", { withTimezone: true })
            .notNull()
            .defaultNow(),
        updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
            () => new Date(),
        ),
    })
    .existing();

export const relations = defineRelations(
    {
        categories,
        teams,
        players,
        tournaments,
        groups,
        groupTeams,
        referees,
        matches,
        matchEvents,
        categoryLimits,
    },
    (r) => ({
        categories: {
            teams: r.many.teams(),
        },

        teams: {
            category: r.one.categories({
                from: r.teams.categoryId,
                to: r.categories.id,
            }),
            players: r.many.players(),
            homeMatches: r.many.matches({ alias: "home_matches" }),
            awayMatches: r.many.matches({ alias: "away_matches" }),
            groupTeams: r.many.groupTeams(),
        },

        players: {
            team: r.one.teams({
                from: r.players.teamId,
                to: r.teams.id,
            }),
        },

        tournaments: {
            groups: r.many.groups(),
        },

        groups: {
            tournament: r.one.tournaments({
                from: r.groups.tournamentId,
                to: r.tournaments.id,
            }),
            matches: r.many.matches(),
            groupTeams: r.many.groupTeams(),
        },

        groupTeams: {
            group: r.one.groups({
                from: r.groupTeams.groupId,
                to: r.groups.id,
            }),
            team: r.one.teams({
                from: r.groupTeams.teamId,
                to: r.teams.id,
            }),
        },

        matches: {
            group: r.one.groups({
                from: r.matches.groupId,
                to: r.groups.id,
            }),
            homeTeam: r.one.teams({
                from: r.matches.homeTeamId,
                to: r.teams.id,
                alias: "home_matches",
            }),
            awayTeam: r.one.teams({
                from: r.matches.awayTeamId,
                to: r.teams.id,
                alias: "away_matches",
            }),
            parentMatch: r.one.matches({
                from: r.matches.parentMatchId,
                to: r.matches.id,
                alias: "next_round",
            }),
            referee: r.one.referees({
                from: r.matches.refereeId,
                to: r.referees.id,
            }),
            events: r.many.matchEvents(),
        },

        matchEvents: {
            match: r.one.matches({
                from: r.matchEvents.matchId,
                to: r.matches.id,
            }),
            team: r.one.teams({
                from: r.matchEvents.teamId,
                to: r.teams.id,
            }),
            player: r.one.players({
                from: r.matchEvents.playerId,
                to: r.players.id,
            }),
        },
    }),
);
