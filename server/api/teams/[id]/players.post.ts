export default defineEventHandler(async (event) => {
    const teamId = getRouterParam(event, "id");

    if (!teamId) {
        return;
    }

    const body = await readBody<Array<PlayerPayload>>(event);

    const results = await database
        .insert(players)
        .values(
            body.map((player) => ({
                ...player,
                teamId,
            })),
        )
        .returning();

    return results;
});
