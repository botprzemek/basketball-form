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

const { categories } = useCategories();
</script>

<template>
    <!-- <NuxtPage /> -->
    <div>
        {{ categories }}
    </div>
</template>
