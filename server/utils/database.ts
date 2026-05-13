import { drizzle } from "drizzle-orm/postgres-js";

const { databaseUrl } = useRuntimeConfig();

export const database = drizzle(databaseUrl, {
    relations,
});
