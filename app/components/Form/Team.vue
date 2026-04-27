<script setup lang="ts">
const { stage, data, errors } = useStageManager();
</script>

<template>
    <h2 class="text-center">
        <span>{{ stage }}/3</span>
        {{ $t(`pages.index.content.team.title`) }}
    </h2>

    <i18n-t
        tag="p"
        keypath="pages.index.content.team.description"
        scope="global"
        class="text-justify"
    >
        <template v-slot:br>
            <br />
            <br />
        </template>
        <template v-slot:amateur>
            <TextImportant>
                {{ $t(`components.select.category.1`) }}
            </TextImportant>
        </template>
        <template v-slot:pro>
            <TextImportant>
                {{ $t(`components.select.category.2`) }}
            </TextImportant>
        </template>
    </i18n-t>

    <fieldset class="flex w-full flex-col gap-3">
        <InputBase
            v-model="data.team.name"
            :placeholder="$t(`components.input.team.name`)"
            autocomplete="username"
            name="username"
            type="text"
        />
        <TextImportant v-if="errors.team.name" class="text-sm">
            {{ $t(`requirements.field`) }}
        </TextImportant>

        <SelectCategory />
        <TextImportant v-if="errors.team.category" class="text-sm">
            {{ $t(`requirements.category`) }}
        </TextImportant>

        <InputBase
            v-model="data.team.email"
            :placeholder="$t(`components.input.team.email`)"
            autocomplete="email"
            name="email"
            type="email"
        />
        <TextImportant v-if="errors.team.email" class="text-sm">
            {{ $t(`requirements.email`) }}
        </TextImportant>

        <InputBase
            v-model="data.team.phone"
            :placeholder="$t(`components.input.team.phone`)"
            autocomplete="tel"
            name="tel"
            type="tel"
        />
        <TextImportant v-if="errors.team.phone" class="text-sm">
            {{ $t(`requirements.phone`) }}
        </TextImportant>
    </fieldset>
</template>
