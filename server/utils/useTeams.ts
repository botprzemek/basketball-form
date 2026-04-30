import postgres, { TransactionSql, Sql } from "postgres";

const { databaseUrl } = useRuntimeConfig();

const sql = postgres(databaseUrl, {
    onnotice: () => {},
});

const migration = async (tx: TransactionSql) => {
    const categories = [
        { id: 1, name: "AMATEUR" },
        { id: 2, name: "PRO" },
    ];

    await tx`
        DROP SCHEMA IF EXISTS basketball CASCADE
    `;

    await tx`
        CREATE SCHEMA IF NOT EXISTS basketball
    `;

    await tx`
        CREATE TABLE IF NOT EXISTS basketball.categories (
            id INT PRIMARY KEY,
            name TEXT NOT NULL
        )
    `;

    await tx`
        INSERT INTO basketball.categories ${tx(categories)}
        ON CONFLICT (id) DO NOTHING
    `;

    await tx`
        CREATE TABLE IF NOT EXISTS basketball.teams (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            name TEXT NOT NULL,
            category_id INT REFERENCES basketball.categories(id),
            email TEXT,
            phone TEXT,
            created_at TIMESTAMPTZ DEFAULT now(),
            verified_at TIMESTAMPTZ DEFAULT NULL
        )
    `;

    await tx`
        CREATE TABLE IF NOT EXISTS basketball.players (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            team_id UUID REFERENCES basketball.teams(id) ON DELETE SET NULL,
            first_name TEXT NOT NULL,
            last_name TEXT NOT NULL,
            age INT,
            created_at TIMESTAMPTZ DEFAULT now()
        )
    `;
};

void sql.begin(migration);

const mapTeamToRow = (team: Team) =>
    ({
        name: team.name,
        category_id: team.category,
        email: team.email,
        phone: team.phone,
    }) satisfies Omit<TeamRow, "id" | "created_at">;

const mapPlayerToRow = (team_id: string) => (player: Player) =>
    ({
        team_id,
        first_name: player.firstName,
        last_name: player.lastName,
        age: player.age,
    }) satisfies Omit<PlayerRow, "id" | "created_at">;

const mapRowToPlayer = (player: PlayerRow) =>
    ({
        firstName: player.first_name,
        lastName: player.last_name,
        age: Number(player.age),
    }) satisfies Player;

const mapRowToTeam = (team: TeamRow, players: Array<PlayerRow>) =>
    ({
        id: team.id,
        name: team.name,
        category: Number(team.category_id),
        email: team.email,
        phone: team.phone,
        players: players.map(mapRowToPlayer),
        createdAt: team.created_at,
        verifiedAt: team.verified_at,
    }) satisfies TeamDetailed;

const insertTeam =
    (team: Omit<TeamRow, "id" | "created_at">) =>
    async (tx: TransactionSql) => {
        const [row] = await tx`
        INSERT INTO basketball.teams ${tx(team)}
        RETURNING id
    `;

        if (!row) {
            return null;
        }

        return row.id;
    };

const insertPlayers =
    (players: Array<Omit<PlayerRow, "id" | "team_id" | "created_at">>) =>
    async (tx: TransactionSql) => {
        await tx`
            INSERT INTO basketball.players ${tx(players)}
        `;
    };

const selectTeams = (sql: Sql) =>
    sql<Array<TeamRow>>`
        SELECT
            id,
            category_id,
            name,
            email,
            phone,
            created_at,
            verified_at
        FROM basketball.teams 
        ORDER BY created_at DESC
    `;

const selectPlayers = (sql: Sql) =>
    sql<Array<PlayerRow>>`
        SELECT
            id,
            team_id,
            first_name,
            last_name,
            age,
            created_at
        FROM basketball.players 
        ORDER BY created_at DESC
    `;

const createTeam = (team: Team) => (sql: Sql) =>
    sql.begin(async (tx: TransactionSql) => {
        if (team.players.length > 3) {
            return;
        }

        const teamRow = mapTeamToRow(team);

        const teamId = await insertTeam(teamRow)(tx);
        if (!teamId) {
            return;
        }

        const playerRows = team.players.map(mapPlayerToRow(teamId));

        await insertPlayers(playerRows)(tx);
    });

const verifyTeam = (id: string) => (sql: Sql) =>
    sql`
        UPDATE basketball.teams
        SET verified_at = now()
        WHERE id = ${sql(id)}
    `;

export default () => {
    const register = async (team: Team) => {
        await createTeam(team)(sql);
    };

    const verify = async (teamId: string) => {
        verifyTeam(teamId);
    };

    const get = async () => {
        const teams = await selectTeams(sql);
        const players = await selectPlayers(sql);

        const playersMap = new Map<string, PlayerRow[]>();
        for (const player of players) {
            if (!playersMap.has(player.team_id)) {
                playersMap.set(player.team_id, []);
            }

            playersMap.get(player.team_id)!.push(player);
        }

        return teams.map((team) => {
            const players = playersMap.get(team.id) || [];
            return mapRowToTeam(team, players);
        });
    };

    return {
        register,
        verify,
        get,
    };
};
