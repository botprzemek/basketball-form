export default defineEventHandler(async () => {
    const results = database.query.categoryLimits.findMany();

    return results;
});
