<template>
    <IconLogo width="200" height="200" />
    <h2 class="text-center">
        {{ $t(`pages.index.content.sent.title`) }}
    </h2>
    <i18n-t
        tag="p"
        keypath="pages.index.content.sent.description"
        scope="global"
        class="text-justify"
    >
        <template v-slot:additional_info>
            <TextImportant>
                {{ $t(`pages.index.content.sent.additional_info`) }}
            </TextImportant>
        </template>
        <template v-slot:about>
            <TextLink to="/o-turnieju">
                {{ $t(`pages.index.content.start.about`) }}
            </TextLink>
        </template>
    </i18n-t>
</template>
