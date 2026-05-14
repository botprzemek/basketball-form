<script setup lang="ts">
import { z } from "zod";

const { step, team, isStepValid } = useForm();

const teamSchema = z.object<Record<keyof TeamPayload, any>>({
    name: z.string().min(3, "Za krótka nazwa"),
    email: z.email("Niepoprawny format email"),
    phone: z
        .string()
        .min(9, "Min. 9 cyfr")
        .regex(/^[0-9+ ]+$/, "Tylko cyfry"),
    city: z.string().min(2, "Podaj miasto"),
});

const errors = ref<Partial<Record<keyof TeamPayload, string>>>({});
const touched = ref<Set<keyof TeamPayload>>(new Set());

const initial = teamSchema.safeParse(team.value);

if (initial.success) {
    errors.value = {};
    isStepValid.value = true;
}

watch(
    () => team.value,
    (newValue) => {
        const result = teamSchema.safeParse(newValue);

        console.log(result.success);

        if (result.success) {
            errors.value = {};
            isStepValid.value = true;

            return;
        }

        errors.value = result.error.flatten().fieldErrors;
        isStepValid.value = false;

        (Object.keys(newValue) as Array<keyof TeamPayload>).forEach((key) => {
            if (newValue[key]) touched.value.add(key);
        });
    },
    { deep: true },
);

const hasError = (field: keyof TeamPayload) => {
    return touched.value.has(field) && errors.value[field] !== undefined;
};
</script>

<template>
    <section class="flex w-full flex-col gap-3">
        <h2 class="text-center font-bold">
            {{ step }}/3
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
            <div class="relative w-full">
                <InputBase
                    v-model="team.name"
                    :placeholder="$t(`components.input.team.name`)"
                    name="username"
                    type="text"
                />
                <Transition name="icon-fade">
                    <div
                        v-if="hasError('name')"
                        class="text-crimson pointer-events-none absolute inset-y-0 right-1 flex items-center"
                    >
                        <IconError class="size-10" />
                    </div>
                </Transition>
            </div>

            <BasketballCategorySelector />

            <div class="relative w-full">
                <InputBase
                    v-model="team.email"
                    :placeholder="$t(`components.input.team.email`)"
                    name="email"
                    type="email"
                />
                <Transition name="icon-fade">
                    <div
                        v-if="hasError('email')"
                        class="text-crimson pointer-events-none absolute inset-y-0 right-1 flex items-center"
                    >
                        <IconError class="size-10" />
                    </div>
                </Transition>
            </div>

            <div class="relative w-full">
                <InputBase
                    v-model="team.phone"
                    :placeholder="$t(`components.input.team.phone`)"
                    name="tel"
                    type="tel"
                />
                <Transition name="icon-fade">
                    <div
                        v-if="hasError('phone')"
                        class="text-crimson pointer-events-none absolute inset-y-0 right-1 flex items-center"
                    >
                        <IconError class="size-10" />
                    </div>
                </Transition>
            </div>

            <div class="relative w-full">
                <InputBase
                    v-model="team.city"
                    :placeholder="$t(`components.input.team.city`)"
                    name="city"
                    type="text"
                />
                <Transition name="icon-fade">
                    <div
                        v-if="hasError('city')"
                        class="text-crimson pointer-events-none absolute inset-y-0 right-1 flex items-center"
                    >
                        <IconError class="size-10" />
                    </div>
                </Transition>
            </div>
        </fieldset>
    </section>
</template>
