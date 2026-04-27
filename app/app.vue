<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>

<style>
.page-enter-active,
.page-leave-active {
    transition:
        opacity 500ms ease-in-out,
        transform 750ms;
}

.page-enter-active {
    transition-delay: 250ms;
}

.page-enter-from,
.page-leave-to {
    opacity: 0;
}

.page-enter-from {
    transform: translateY(-2rem);
}
</style>
