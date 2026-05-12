import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
    compatibilityDate: "2025-07-15",
    devtools: {
        enabled: true,
        timeline: {
            enabled: true,
        },
    },

    modules: ["@nuxtjs/seo", "@nuxtjs/i18n", "@nuxt/fonts"],

    runtimeConfig: {
        databaseUrl: "",
        token: "",
        public: {
            author: "notbyte.com",
            name: "3X3",
            url: "https://3x3.notbyte.com/",
        },
    },

    app: {
        rootTag: "body",
        rootAttrs: {
            id: "basketball-root",
        },
        teleportTag: "aside",
        teleportAttrs: {
            id: "basketball-teleports",
        },
        pageTransition: {
            name: "page",
            mode: "out-in",
        },
    },

    css: ["./app/assets/css/main.css"],
    vite: {
        plugins: [tailwindcss()],
    },

    ogImage: { enabled: false },

    site: { indexable: false },

    i18n: {
        baseUrl: process.env.NUXT_PUBLIC_URL,
        customRoutes: "page",
        defaultLocale: "pl",
        strategy: "prefix_except_default",
        detectBrowserLanguage: {
            useCookie: true,
            cookieKey: "basketball-lang",
            redirectOn: "root",
        },
        locales: [
            {
                code: "pl",
                name: "Polski",
                language: "pl-PL",
                file: "pl-PL.json",
            },
        ],
    },
});
