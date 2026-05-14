export default defineEventHandler(async () => {
    const results = await database.query.teams.findMany({
        orderBy: {
            createdAt: "desc",
        },
        with: {
            category: true,
            players: true,
        },
    });

    return results;
});
