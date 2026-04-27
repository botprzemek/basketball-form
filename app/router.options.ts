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

        if (to.hash) {
            const el = document.querySelector(to.hash) as HTMLElement;

            return {
                left: 0,
                top: (el?.offsetTop ?? 0) - 30,
                behavior: "smooth",
            };
        }
    },
} satisfies RouterOptions;
