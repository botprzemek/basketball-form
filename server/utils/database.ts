import { relations } from "drizzle-orm/_relations";
import { drizzle } from "drizzle-orm/cockroach";
import {
    uuid,
    cockroachSchema,
    text,
    timestamp,
    int2,
} from "drizzle-orm/cockroach-core";

const schema = cockroachSchema("basketball");

export const categories = schema.table("categories", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    teams_limit: int2("teams_limit").notNull().default(0),
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
    name: text("name").notNull().unique(),
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

export const categoryLimits = schema
    .view("category_limits", {
        id: uuid("id").primaryKey().defaultRandom(),
        name: text("name").notNull().unique(),
        teamsLimit: int2("team_limit").notNull().default(0),
        teamsCount: int2("teams_count").notNull().default(0),
        teamsRemaining: int2("teams_remaining").notNull().default(0),
        createdAt: timestamp("created_at", { withTimezone: true })
            .notNull()
            .defaultNow(),
        updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
            () => new Date(),
        ),
    })
    .existing();

export const players = schema.table("players", {
    id: uuid("id").primaryKey().defaultRandom(),
    teamId: uuid("team_id").references(() => teams.id, { onDelete: "cascade" }),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
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
    homeScore: int2("home_score").default(0),
    awayScore: int2("away_score").default(0),
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

export const categoriesRelations = relations(categories, ({ many }) => ({
    teams: many(teams),
}));

export const teamsRelations = relations(teams, ({ one, many }) => ({
    category: one(categories, {
        fields: [teams.categoryId],
        references: [categories.id],
    }),
    players: many(players),
    homeMatches: many(matches, { relationName: "homeTeam" }),
    awayMatches: many(matches, { relationName: "awayTeam" }),
    matchEvents: many(matchEvents),
}));

export const playersRelations = relations(players, ({ one, many }) => ({
    team: one(teams, {
        fields: [players.teamId],
        references: [teams.id],
    }),
    events: many(matchEvents),
}));

export const matchesRelations = relations(matches, ({ one, many }) => ({
    homeTeam: one(teams, {
        fields: [matches.homeTeamId],
        references: [teams.id],
        relationName: "homeTeam",
    }),
    awayTeam: one(teams, {
        fields: [matches.awayTeamId],
        references: [teams.id],
        relationName: "awayTeam",
    }),
    group: one(groups, {
        fields: [matches.groupId],
        references: [groups.id],
    }),
    events: many(matchEvents),
    parentMatch: one(matches, {
        fields: [matches.parentMatchId],
        references: [matches.id],
        relationName: "next_round_match",
    }),
}));

export const matchEventsRelations = relations(matchEvents, ({ one }) => ({
    match: one(matches, {
        fields: [matchEvents.matchId],
        references: [matches.id],
    }),
    player: one(players, {
        fields: [matchEvents.playerId],
        references: [players.id],
    }),
    team: one(teams, {
        fields: [matchEvents.teamId],
        references: [teams.id],
    }),
}));

const { databaseUrl } = useRuntimeConfig();

const config = {
    schema: {
        // categories,
        // teams,
        // players,
        // tournaments,
        // groups,
        // groupTeams,
        // officials,
        // matches,
        // matchEvents,

        // categoriesRelations,
        // teamsRelations,
        // playersRelations,
        // matchesRelations,

        categoryLimits,
    },
};

export const database = drizzle(databaseUrl, config);
