<template>
    <section class="flex flex-col items-center">
        <IconLogo width="200" height="200" />
        <h2 class="text-center">
            {{ $t(`pages.index.content.sent.title`) }}
        </h2>
        <i18n-t
            tag="p"
            keypath="pages.index.content.sent.description"
            scope="global"
            class="gap-3 text-justify"
        >
            <template #additional_info>
                <TextImportant>
                    {{ $t(`pages.index.content.sent.additional_info`) }}
                </TextImportant>
            </template>
            <template #about>
                <TextLink to="/o-turnieju">
                    {{ $t(`pages.index.content.start.about`) }}
                </TextLink>
            </template>
        </i18n-t>
    </section>
</template>
