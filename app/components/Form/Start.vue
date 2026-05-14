<script setup lang="ts">
const { accepted } = useForm();
const { regulationsUrl } = useRuntimeConfig().public;
</script>

<template>
    <section class="flex flex-col items-center">
        <IconLogo width="200" height="200" />
        <h1 class="text-center">
            {{ $t(`pages.index.content.start.title`) }}
        </h1>

        <i18n-t
            tag="p"
            keypath="pages.index.content.start.description"
            scope="global"
            class="text-justify"
        >
            <template #regulations>
                <TextLink
                    @click="accepted = true"
                    :to="regulationsUrl"
                    target="_blank"
                    external
                    class="hover:cursor-pointer"
                >
                    {{ $t(`pages.index.content.start.regulations`) }}
                </TextLink>
            </template>
            <template #about>
                <TextLink to="about">
                    {{ $t(`pages.index.content.start.about`) }}
                </TextLink>
            </template>
        </i18n-t>
    </section>
</template>
