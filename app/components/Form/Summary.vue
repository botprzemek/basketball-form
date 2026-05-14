<script setup lang="ts">
const { Step, step, accepted, category, team, players, set } = useForm();
const { regulationsUrl } = useRuntimeConfig().public;
</script>

<template>
    <section>
        <h2 class="text-center">
            <span>{{ step }}/3</span>
            {{ $t(`pages.index.content.summary.title`) }}
        </h2>

        <i18n-t
            tag="p"
            keypath="pages.index.content.summary.description"
            scope="global"
            class="py-3 text-justify"
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
            <template v-slot:instagram>
                <TextLink
                    external
                    target="_blank"
                    to="https://www.instagram.com/knury.knurow"
                >
                    {{ $t(`pages.index.content.summary.instagram`) }}
                </TextLink>
            </template>
        </i18n-t>

        <h3 class="text-left">
            {{ $t(`pages.index.content.summary.subtitle.team`) }}
        </h3>
        <ul class="w-full">
            <li>
                <p class="flex justify-between">
                    1.1.
                    {{ $t(`components.input.team.name`) }}
                    <span
                        @click="set(Step.TEAM)"
                        class="text-crimson underline hover:cursor-pointer"
                    >
                        {{
                            !team.name
                                ? $t(`components.input.fill`)
                                : `${team.name.substring(0, 7)}...`
                        }}
                    </span>
                </p>
            </li>
            <li>
                <p class="flex justify-between">
                    1.2.
                    {{ $t(`components.select.category.default`) }}
                    <span
                        @click="set(Step.TEAM)"
                        class="text-crimson underline hover:cursor-pointer"
                    >
                        {{
                            !category
                                ? $t(`components.input.fill`)
                                : `${$t(`components.select.category.${category.name}`).substring(0, 7)}...`
                        }}
                    </span>
                </p>
            </li>
            <li>
                <p class="flex justify-between">
                    1.3.
                    {{ $t(`components.input.team.email`) }}
                    <span
                        @click="set(Step.TEAM)"
                        class="text-crimson underline hover:cursor-pointer"
                    >
                        {{
                            !team.email
                                ? $t(`components.input.fill`)
                                : `${team.email.substring(0, 7)}...`
                        }}
                    </span>
                </p>
            </li>
            <li>
                <p class="flex justify-between">
                    1.4.
                    {{ $t(`components.input.team.phone`) }}
                    <span
                        @click="set(Step.TEAM)"
                        class="text-crimson underline hover:cursor-pointer"
                    >
                        {{
                            !team.phone
                                ? $t(`components.input.fill`)
                                : `${team.phone.substring(0, 7)}...`
                        }}
                    </span>
                </p>
            </li>
        </ul>

        <h3 class="text-left">
            {{ $t(`pages.index.content.summary.subtitle.players`) }}
        </h3>
        <ul class="w-full">
            <li
                v-for="(player, number) in players"
                :key="number"
                class="flex justify-between"
            >
                <template
                    v-if="
                        number === 3 &&
                        !player.firstName &&
                        !player.lastName &&
                        !player.age
                    "
                >
                    2.4. {{ $t(`pages.index.content.summary.bench`) }}
                    <span
                        class="text-crimson underline hover:cursor-pointer"
                        @click="set(Step.PLAYERS)"
                    >
                        {{ $t(`components.input.add`) }}
                    </span>
                </template>

                <template v-else>
                    2.{{ number + 1 }}.
                    {{ $t(`components.input.player.firstName`) }},
                    {{ $t(`components.input.player.lastName`) }},
                    {{ $t(`components.input.player.age`) }}
                    <span
                        class="text-crimson underline hover:cursor-pointer"
                        @click="set(Step.PLAYERS)"
                    >
                        {{ `${player.firstName?.substring(0, 7)}...` }}
                    </span>
                </template>
            </li>
        </ul>

        <fieldset class="flex w-full flex-col items-end justify-end gap-2">
            <TextLink
                @click="accepted = true"
                :to="regulationsUrl"
                target="_blank"
                external
                class="flex w-full items-center justify-end gap-2 hover:cursor-pointer"
            >
                <input
                    v-model="accepted"
                    type="checkbox"
                    name="accept"
                    disabled
                    required
                    class="accent-crimson"
                />
                <i18n-t
                    tag="span"
                    keypath="components.input.submit"
                    scope="global"
                    class="text-right text-sm"
                >
                    <template #regulations>
                        {{
                            $t(`pages.index.content.start.regulations`)
                                .split(" ", 1)
                                .at(0)
                        }}
                    </template>
                </i18n-t>
            </TextLink>
        </fieldset>
    </section>
</template>
