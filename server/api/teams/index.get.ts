export default defineEventHandler(async () => {
    const results = await database._query.teams.findMany({
        with: {
            category: true,
            players: true,
        },
    });

    return results;
});
