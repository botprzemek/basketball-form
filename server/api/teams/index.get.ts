export default defineEventHandler(async () => {
    const results = await database.select().from(teams);

    return results;
});
