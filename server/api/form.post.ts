export default defineEventHandler(async (event) => {
    const body = await readBody<FormPayload>(event);

    await database.transaction(async (tx) => {
        const [team] = await tx
            .insert(teams)
            .values([
                {
                    ...body.team,
                    categoryId: body.category.id,
                },
            ])
            .returning();

        if (!team) {
            throw createError({
                statusCode: 400,
            });
        }

        await tx
            .insert(players)
            .values(
                body.players.map((player) => ({
                    ...player,
                    teamId: team.id,
                })),
            )
            .returning();
    });
});
