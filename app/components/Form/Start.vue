<template>
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
        <template v-slot:regulations>
            <TextLink to="/files/regulations.pdf" target="_blank" external>
                {{ $t(`pages.index.content.start.regulations`) }}
            </TextLink>
        </template>
        <template v-slot:about>
            <TextLink to="about">
                {{ $t(`pages.index.content.start.about`) }}
            </TextLink>
        </template>
    </i18n-t>
</template>
