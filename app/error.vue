<script setup lang="ts">
import type { NuxtError } from "#app";

const { error } = defineProps({
    error: Object as () => NuxtError,
});

const page = `${error?.status || 500}`;
</script>

<template>
    <NuxtLayout>
        <main>
            <IconLogo width="200" height="200" />
            <h1 v-if="error" class="text-center">
                {{ $t(`pages.${page}.title`) }}
            </h1>

            <i18n-t
                tag="p"
                :keypath="`pages.${page}.description`"
                scope="global"
                class="text-justify"
            >
                <template #messenger>
                    <TextLink
                        external
                        target="_blank"
                        to="https://www.facebook.com/knury.knurow"
                    >
                        {{ $t(`pages.index.content.summary.messenger`) }}
                    </TextLink>
                </template>
                <template #instagram>
                    <TextLink
                        external
                        target="_blank"
                        to="https://www.instagram.com/knury.knurow"
                    >
                        {{ $t(`pages.index.content.summary.instagram`) }}
                    </TextLink>
                </template>
            </i18n-t>

            <ButtonLink to="index">
                {{ $t(`components.button.back`) }}
            </ButtonLink>
        </main>
    </NuxtLayout>
</template>
