export default () => {
    const config = useRuntimeConfig().public;
    const route = useRoute();
    const { t } = useI18n({ useScope: "global" });
    const page = () => route.name?.toString().split("___")[0];
    const name = () => t(`nuxtSiteConfig.name`);
    const url = () => config.url;
    const image = () => `/images/og-image.png`;
    const robots = () =>
        "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1";
    const description = (_page?: string) =>
        t(`pages.${_page || page()}.description`);
    const title = (_page?: string) => {
        const title = t(`pages.${_page || page()}.title`);

        return title ? `${title} · ${name()}` : `${name()}`;
    };
    const link = () =>
        [
            {
                href: "/icons/favicon.ico",
                type: "image/x-icon",
                rel: "icon",
            },
            {
                href: "/icons/favicon-32x32.png",
                type: "image/png",
                sizes: "32x32",
                rel: "icon",
            },
            {
                href: "/icons/favicon-16x16.png",
                type: "image/png",
                sizes: "16x16",
                rel: "icon",
            },
            {
                href: "/icons/apple-touch-icon.png",
                type: "image/png",
                sizes: "180x180",
                rel: "apple-touch-icon",
            },
        ] satisfies Array<Link>;
    const set = (_page?: string) => {
        useHeadSafe({
            link,
            charset: "utf-8",
            viewport: "width=device-width, initial-scale=1",
            meta: [
                {
                    name: "theme-color",
                    content: "currentColor",
                },
                {
                    // @ts-ignore
                    "http-equiv": "X-UA-Compatible",
                    content: "IE=edge,chrome=1",
                },
            ],
        });

        const _title = title(_page);
        const _description = description(_page);

        useSeoMeta({
            author: config.author,
            ogUrl: url,
            ogSiteName: name,
            title: _title,
            ogTitle: _title,
            twitterTitle: _title,
            titleTemplate: (titleChunk) =>
                titleChunk ? `${titleChunk}` : `${name()}`,
            description: _description,
            ogDescription: _description,
            twitterDescription: _description,
            ogImage: image(),
            twitterImage: image(),
            twitterCard: "summary",
            robots: robots(),
        });
    };

    return { description, image, link, name, robots, title, url, set };
};
