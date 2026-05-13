export default defineEventHandler(async () => {
    const results = await database.query.teams.findMany();

    return results;
});
