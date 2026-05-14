export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const [result] = await database.insert(teams).values(body).returning();

    return result;
});
