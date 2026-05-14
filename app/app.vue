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
</script>

<template>
    <NuxtPage />
</template>
