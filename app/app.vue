<script setup lang="ts">
useHead({
    link: [
        {
            rel: "icon",
            type: "image/png",
            href: "/favicon.png",
        },
    ],
});

useSeoMeta({
    ogImage: "og-image.jpg",
});

const { category, team, players } = useForm();
</script>

<template>
    <NuxtPage />
    <aside class="bg-crimson fixed bottom-0 mt-24 min-h-24 w-full text-white">
        Debug<br />
        Category: {{ category }}<br />
        Team: {{ team }}<br />
        Players: {{ players }}
    </aside>
</template>
