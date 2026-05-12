import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, "id");

    if (!id) {
        return;
    }

    const result = await database
        .delete(teams)
        .where(eq(teams.id, id))
        .returning();

    return result;
});
