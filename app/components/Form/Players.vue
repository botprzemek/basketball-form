<script setup lang="ts">
import { z } from "zod";

const { step, players, isStepValid } = useForm();

const playerSchema = z.object({
    firstName: z.string().min(3, "Za krótkie imię"),
    lastName: z.string().min(3, "Za krótkie nazwisko"),
    age: z.number({ invalid_type_error: "Podaj wiek" }).min(10).max(99),
});

const playersSchema = z.array(playerSchema);

const errors = ref<Array<Partial<Record<keyof PlayerPayload, string[]>>>>([]);
const touched = ref<Set<string>>(new Set());

watch(
    () => players.value,
    (newValue) => {
        const result = playersSchema.safeParse(newValue);

        if (result.success) {
            errors.value = [];
            isStepValid.value = true;
            return;
        }

        isStepValid.value = false;

        const formattedErrors = [];
        result.error.issues.forEach((issue) => {
            const index = issue.path[0] as number;
            const field = issue.path[1] as string;

            if (!formattedErrors[index]) formattedErrors[index] = {};
            if (!formattedErrors[index][field])
                formattedErrors[index][field] = [];

            formattedErrors[index][field].push(issue.message);
        });
        errors.value = formattedErrors;

        // Logika "touched" dla każdego pola w tablicy
        newValue.forEach((player, index) => {
            (Object.keys(player) as Array<keyof PlayerPayload>).forEach(
                (key) => {
                    if (player[key]) touched.value.add(`${index}-${key}`);
                },
            );
        });
    },
    { deep: true, immediate: true },
);

const hasError = (index: number, field: keyof PlayerPayload) => {
    return (
        touched.value.has(`${index}-${field}`) &&
        errors.value[index]?.[field] !== undefined
    );
};
</script>

<template>
    <section class="flex w-full flex-col">
        <h2 class="text-center font-bold">
            <span>{{ step }}/3</span>
            {{ $t(`pages.index.content.players.title`) }}
        </h2>

        <fieldset
            v-for="(player, index) in players"
            :key="index"
            class="grid w-full grid-flow-row gap-3 pt-4 pb-6"
        >
            <label :for="`player-${index}`">
                {{ $t(`components.input.player.label`) }}
                {{
                    index !== players.length - 1
                        ? index + 1
                        : $t(`pages.index.content.players.bench`)
                }}
            </label>

            <!-- Imię -->
            <div class="relative w-full">
                <InputBase
                    v-model="player.firstName"
                    autocomplete="given-name"
                    name="given-name"
                    :id="`player-${index}`"
                    :placeholder="$t(`components.input.player.firstName`)"
                />
                <Transition name="icon-fade">
                    <div
                        v-if="hasError(index, 'firstName')"
                        class="text-crimson pointer-events-none absolute inset-y-0 right-1 flex items-center"
                    >
                        <IconError class="size-8" />
                    </div>
                </Transition>
            </div>

            <!-- Nazwisko -->
            <div class="relative w-full">
                <InputBase
                    v-model="player.lastName"
                    autocomplete="family-name"
                    name="family-name"
                    :placeholder="$t(`components.input.player.lastName`)"
                />
                <Transition name="icon-fade">
                    <div
                        v-if="hasError(index, 'lastName')"
                        class="text-crimson pointer-events-none absolute inset-y-0 right-1 flex items-center"
                    >
                        <IconError class="size-8" />
                    </div>
                </Transition>
            </div>

            <!-- Wiek -->
            <div class="relative w-full">
                <InputNumber
                    v-model.number="player.age"
                    autocomplete="age"
                    name="age"
                    :placeholder="$t(`components.input.player.age`)"
                    :min="10"
                    :max="99"
                />
                <Transition name="icon-fade">
                    <div
                        v-if="hasError(index, 'age')"
                        class="text-crimson pointer-events-none absolute inset-y-0 right-1 flex items-center"
                    >
                        <IconError class="size-8" />
                    </div>
                </Transition>
            </div>
        </fieldset>
    </section>
</template>
