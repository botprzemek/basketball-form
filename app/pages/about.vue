<script setup lang="ts">
defineI18nRoute({
    paths: {
        pl: "/o-turnieju",
    },
});
</script>

<template>
    <main>
        <IconLogo width="200" height="200" />

        <h1 class="text-center">
            {{ $t(`pages.about.title`) }}
        </h1>

        <SectionAbout />

        <i18n-t
            tag="p"
            keypath="pages.about.description"
            scope="global"
            class="text-justify"
        >
            <template v-slot:hour>
                <TextImportant>
                    {{ $t(`pages.about.content.hour`) }}
                </TextImportant>
            </template>
            <template v-slot:eventname>
                <TextImportant>
                    {{ $t(`pages.about.content.event`) }}
                </TextImportant>
            </template>
            <template v-slot:address>
                <TextImportant>
                    {{ $t(`pages.about.content.address`) }}
                </TextImportant>
            </template>
        </i18n-t>

        <h3 class="text-left" id="p1">
            {{ $t(`pages.about.content.p1.title`) }}
        </h3>
        <i18n-t
            tag="p"
            keypath="pages.about.content.p1.content"
            scope="global"
            class="max-w-2xl text-justify"
        >
            <template v-slot:hour>
                <TextImportant>{{
                    $t(`pages.about.content.p1.hour`)
                }}</TextImportant>
            </template>
        </i18n-t>

        <h3 class="text-left" id="p2">
            {{ $t("pages.about.content.p2.title") }}
        </h3>
        <ul class="w-full list-inside list-disc">
            <li>
                <i18n-t
                    keypath="pages.about.content.p2.list.item1.description"
                    tag="span"
                    scope="global"
                >
                    <template #label>
                        <TextImportant>{{
                            $t("pages.about.content.p2.list.item1.label")
                        }}</TextImportant
                        ><br />
                    </template>
                </i18n-t>
            </li>
            <li>
                <i18n-t
                    keypath="pages.about.content.p2.list.item2.description"
                    tag="span"
                    scope="global"
                >
                    <template #label>
                        <TextImportant>{{
                            $t("pages.about.content.p2.list.item2.label")
                        }}</TextImportant
                        ><br />
                    </template>
                </i18n-t>
            </li>
            <li>
                <i18n-t
                    keypath="pages.about.content.p2.list.item3.description"
                    tag="span"
                    scope="global"
                >
                    <template #label>
                        <TextImportant>{{
                            $t("pages.about.content.p2.list.item3.label")
                        }}</TextImportant
                        ><br />
                    </template>
                </i18n-t>
            </li>
        </ul>

        <h3 class="text-left" id="p3">
            {{ $t(`pages.about.content.p3.title`) }}
        </h3>
        <i18n-t
            tag="p"
            keypath="pages.about.content.p3.content"
            scope="global"
            class="max-w-2xl text-justify"
        >
            <template #organization>
                <TextImportant>{{
                    $t(`pages.about.content.p3.organization`)
                }}</TextImportant>
            </template>
        </i18n-t>

        <h3 id="p4">
            {{ $t(`pages.about.content.p4.title`) }}
        </h3>
        <i18n-t
            tag="p"
            keypath="pages.about.content.p4.beforeList"
            scope="global"
            class="max-w-2xl text-justify"
        >
            <template #zone>
                <TextImportant>{{
                    $t(`pages.about.content.p4.zone`)
                }}</TextImportant>
            </template>
            <template #donation>
                <TextImportant>{{
                    $t(`pages.about.content.p4.donation`)
                }}</TextImportant>
            </template>
        </i18n-t>

        <ul class="w-full list-inside list-disc text-justify">
            <li>{{ $t(`pages.about.content.p4.list.item1`) }}</li>
            <li>{{ $t(`pages.about.content.p4.list.item2`) }}</li>
            <li>{{ $t(`pages.about.content.p4.list.item3`) }}</li>
            <li>{{ $t(`pages.about.content.p4.list.item4`) }}</li>
        </ul>

        <i18n-t
            tag="p"
            keypath="pages.about.content.p4.afterList"
            scope="global"
            class="max-w-2xl text-justify"
        >
            <template #goal>
                <TextImportant>{{
                    $t(`pages.about.content.p4.goal`)
                }}</TextImportant>
            </template>
        </i18n-t>

        <h3 class="text-left" id="p5">
            {{ $t(`pages.about.content.p5.title`) }}
        </h3>
        <i18n-t
            tag="p"
            keypath="pages.about.content.p5.content"
            scope="global"
            class="max-w-2xl text-justify"
        >
            <template #zone>
                <TextImportant>{{
                    $t(`pages.about.content.p5.zone`)
                }}</TextImportant>
            </template>
        </i18n-t>

        <h3 class="text-left" id="p6">
            {{ $t(`pages.about.content.p6.title`) }}
        </h3>
        <i18n-t
            tag="p"
            keypath="pages.about.content.p6.content"
            scope="global"
            class="max-w-2xl text-justify"
        >
            <template #group>
                <TextImportant>{{
                    $t(`pages.about.content.p6.group`)
                }}</TextImportant>
            </template>
        </i18n-t>

        <h3 class="text-left" id="p7">
            {{ $t(`pages.about.content.p7.title`) }}
        </h3>
        <i18n-t
            tag="p"
            keypath="pages.about.content.p7.content"
            scope="global"
            class="max-w-2xl text-justify"
        >
            <template #prizes>
                <TextImportant>{{
                    $t(`pages.about.content.p7.prizes`)
                }}</TextImportant>
            </template>
        </i18n-t>

        <h3 class="text-left" id="p8">
            {{ $t(`pages.about.content.p8.title`) }}
        </h3>
        <i18n-t
            tag="p"
            keypath="pages.about.content.p8.content"
            scope="global"
            class="max-w-2xl text-justify"
        >
            <template #water>
                <TextImportant>{{
                    $t(`pages.about.content.p8.water`)
                }}</TextImportant>
            </template>
        </i18n-t>

        <i18n-t
            tag="p"
            keypath="pages.about.content.p9.content"
            scope="global"
            class="max-w-2xl text-justify"
        >
            <template #photo>
                <TextImportant>{{
                    $t(`pages.about.content.p9.photo`)
                }}</TextImportant>
            </template>
        </i18n-t>

        <h3 class="text-left" id="p10">
            {{ $t(`pages.about.content.p10.title`) }}
        </h3>
        <i18n-t
            tag="p"
            keypath="pages.about.content.p10.content"
            scope="global"
            class="max-w-2xl text-justify"
        >
            <template #hour>
                <TextImportant>{{
                    $t(`pages.about.content.p10.hour`)
                }}</TextImportant>
            </template>
        </i18n-t>

        <i18n-t
            tag="p"
            keypath="pages.about.content.p11.content"
            scope="global"
            class="max-w-2xl text-justify"
        >
            <template #eventname>
                <TextImportant>{{
                    $t(`pages.about.content.p11.eventname`)
                }}</TextImportant>
            </template>
        </i18n-t>
    </main>
</template>
