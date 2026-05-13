export default defineEventHandler(async (event) => {
    if (!event.path.includes("/api")) {
        return;
    }

    if (import.meta.dev) {
        return;
    }

    const { token } = useRuntimeConfig();

    if (event.headers.get("Authorization") === `Bearer ${token}`) {
        return;
    }

    await sendRedirect(event, "/", 301);
});
