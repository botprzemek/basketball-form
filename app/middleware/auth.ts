export default defineNuxtRouteMiddleware((_route, { query: { token } }) => {
    if (!import.meta.server) {
        return;
    }

    if (!import.meta.dev) {
        return;
    }

    if (token === useRuntimeConfig().token) {
        return;
    }

    return navigateTo("/", { redirectCode: 301 });
});
