import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, "id");

    if (!id) {
        return;
    }

    const body = await readBody(event);

    const [result] = await database
        .update(teams)
        .set(body)
        .where(eq(teams.id, id))
        .returning();

    return result;
});
