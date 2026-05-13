<script setup lang="ts">
const { step, team } = useForm();
</script>

<template>
    <section>
        <h2 class="text-center">
            <span>{{ step }}/3</span>
            {{ $t(`pages.index.content.team.title`) }}
        </h2>

        <i18n-t
            tag="p"
            keypath="pages.index.content.team.description"
            scope="global"
            class="py-2 text-justify"
        >
            <template #br>
                <br />
                <br />
            </template>
            <template #amateur1>
                <TextImportant>
                    {{ $t(`components.select.category.amateur`) }}
                </TextImportant>
            </template>
            <template #amateur2>
                <TextImportant>
                    {{ $t(`components.select.category.amateur`) }}
                </TextImportant>
            </template>
            <template #pro1>
                <TextImportant>
                    {{ $t(`components.select.category.pro`) }}
                </TextImportant>
            </template>
            <template #pro2>
                <TextImportant>
                    {{ $t(`components.select.category.pro`) }}
                </TextImportant>
            </template>
        </i18n-t>

        <fieldset class="flex w-full flex-col gap-3">
            <InputBase
                v-model="team.name"
                :placeholder="$t(`components.input.team.name`)"
                autocomplete="username"
                name="username"
                type="text"
            />
            <!-- <TextImportant v-if="errors.team.name" class="text-sm">
            {{ $t(`requirements.field`) }}
        </TextImportant> -->

            <BasketballCategorySelector />
            <!-- <TextImportant v-if="errors.team.category" class="text-sm">
            {{ $t(`requirements.category`) }}
        </TextImportant> -->

            <InputBase
                v-model="team.email"
                :placeholder="$t(`components.input.team.email`)"
                autocomplete="email"
                name="email"
                type="email"
            />
            <!-- <TextImportant v-if="errors.team.email" class="text-sm">
            {{ $t(`requirements.email`) }}
        </TextImportant> -->

            <InputBase
                v-model="team.phone"
                :placeholder="$t(`components.input.team.phone`)"
                autocomplete="tel"
                name="tel"
                type="tel"
            />
            <!-- <TextImportant v-if="errors.team.phone" class="text-sm">
            {{ $t(`requirements.phone`) }}
        </TextImportant> -->

            <InputBase
                v-model="team.city"
                :placeholder="$t(`components.input.team.city`)"
                autocomplete="city"
                name="city"
                type="text"
            />
            <!-- <TextImportant v-if="errors.team.phone" class="text-sm">
            {{ $t(`requirements.phone`) }}
        </TextImportant> -->
        </fieldset>
    </section>
</template>
