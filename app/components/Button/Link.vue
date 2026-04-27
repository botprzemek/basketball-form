<script setup lang="ts">
const { to, external, target } = defineProps<{
    to: string;
    external?: boolean;
    target?: "_blank";
}>();
const path = external ? to : useLocalePath()(to);
</script>
<template>
    <NuxtLinkLocale
        :to="path"
        :external="external"
        :target="target"
        rel="noreferrer"
        class="w-full"
    >
        <ButtonBase type="button">
            <slot />
        </ButtonBase>
    </NuxtLinkLocale>
</template>
