import type { RouterOptions } from "@nuxt/schema";

export default {
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        }

        if (to.fullPath !== from.fullPath) {
            return {
                left: 0,
                top: 0,
                behavior: "smooth",
            };
        }

        if (!to.hash) {
            return {
                left: 0,
                top: 0,
                behavior: "smooth",
            };
        }

        const element = document.querySelector(to.hash);
        const top =
            element && element instanceof HTMLElement
                ? element.offsetTop - 30
                : 0;

        return {
            left: 0,
            top,
            behavior: "smooth",
        };
    },
} satisfies RouterOptions;
