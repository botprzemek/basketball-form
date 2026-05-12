import { defineRelations } from "drizzle-orm";
import { drizzle } from "drizzle-orm/cockroach";
import {
    uuid,
    cockroachSchema,
    text,
    timestamp,
    int2,
} from "drizzle-orm/cockroach-core";

const { databaseUrl } = useRuntimeConfig();

export const database = drizzle(databaseUrl);

export const schema = cockroachSchema("basketball");

export const categories = schema.table("categories", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
});

export const teams = schema.table("teams", {
    id: uuid("id").primaryKey().defaultRandom(),
    categoryId: uuid("category_id").references(() => categories.id),
    name: text("name").notNull().unique(),
    email: text("email").notNull(),
    phone: text("phone").notNull(),
    city: text("city").notNull(),
});

export const players = schema.table("players", {
    id: uuid("id").primaryKey().defaultRandom(),
    teamId: uuid("team_id").references(() => teams.id, { onDelete: "cascade" }),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
});

export const tournaments = schema.table("tournaments", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
});

export const groups = schema.table("groups", {
    id: uuid("id").primaryKey().defaultRandom(),
    tournamentId: uuid("tournament_id").references(() => tournaments.id, {
        onDelete: "cascade",
    }),
    name: text("name").notNull(),
});

export const groupTeams = schema.table("group_teams", {
    groupId: uuid("group_id").references(() => groups.id, {
        onDelete: "cascade",
    }),
    teamId: uuid("team_id").references(() => teams.id),
});

export const officials = schema.table("officials", {
    id: uuid("id").primaryKey().defaultRandom(),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
});

export const matches = schema.table("matches", {
    id: uuid("id").primaryKey().defaultRandom(),
    parentMatchId: uuid("parent_match_id").references((): any => matches.id),
    groupId: uuid("group_id").references(() => groups.id, {
        onDelete: "cascade",
    }),
    homeTeamId: uuid("home_team_id").references(() => teams.id),
    awayTeamId: uuid("away_team_id").references(() => teams.id),
    refereeId: uuid("referee_id").references(() => officials.id),
    scheduledAt: timestamp("scheduled_at", { withTimezone: true }),
    status: text("status").default("scheduled"),
    homeScore: int2("home_score").default(0),
    awayScore: int2("away_score").default(0),
    winningTeamId: uuid("winning_team_id").references(() => teams.id),
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

export const relations = defineRelations(
    { matches, matchEvents, groups, players, teams },
    (r) => ({
        matches: {
            homeTeam: r.one.teams({
                from: r.matches.homeTeamId,
                to: r.teams.id,
            }),
            awayTeam: r.one.teams({
                from: r.matches.awayTeamId,
                to: r.teams.id,
            }),
            group: r.one.groups({
                from: r.matches.groupId,
                to: r.groups.id,
            }),
            events: r.many.matchEvents({
                from: r.matches.id,
                to: r.matchEvents.matchId,
            }),
            parentMatch: r.one.matches({
                from: r.matches.parentMatchId,
                to: r.matches.id,
                alias: "next_round_match",
            }),
        },

        teams: {
            players: r.many.players({
                from: r.teams.id,
                to: r.players.teamId,
            }),
            homeMatches: r.many.matches({
                from: r.teams.id,
                to: r.matches.homeTeamId,
            }),
            awayMatches: r.many.matches({
                from: r.teams.id,
                to: r.matches.awayTeamId,
            }),
        },

        players: {
            team: r.one.teams({
                from: r.players.teamId,
                to: r.teams.id,
                optional: false,
            }),
            events: r.many.matchEvents({
                from: r.players.id,
                to: r.matchEvents.playerId,
            }),
        },

        matchEvents: {
            match: r.one.matches({
                from: r.matchEvents.matchId,
                to: r.matches.id,
                optional: false,
            }),
            player: r.one.players({
                from: r.matchEvents.playerId,
                to: r.players.id,
            }),
            team: r.one.teams({
                from: r.matchEvents.teamId,
                to: r.teams.id,
            }),
        },
    }),
);
