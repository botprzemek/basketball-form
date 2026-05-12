export default defineEventHandler(async (event) => {
    const teamId = getRouterParam(event, "id");

    if (!teamId) {
        return;
    }

    const body = await readBody(event);

    const [result] = await database
        .insert(players)
        .values({
            ...body,
            teamId,
        })
        .returning();

    return result;
});
