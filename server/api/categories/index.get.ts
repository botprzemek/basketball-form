export default defineEventHandler(async () => {
    const results = await database._query.categoryLimits.findMany({
        with: {},
    });

    return results;
});
