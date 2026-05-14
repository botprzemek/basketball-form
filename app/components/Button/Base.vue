<template>
    <button
        class="bg-crimson hover:bg-crimson/95 disabled:bg-crimson/80 grid h-12 w-full place-content-center px-6 py-3 text-center hover:cursor-pointer disabled:cursor-not-allowed"
    >
        <span class="font-bold text-white">
            <slot />
        </span>
    </button>
</template>
