<script setup lang="ts">
const { Step, data, submit } = useForm();
const components = {
    [Step.START]: resolveComponent("FormStart"),
    [Step.TEAM]: resolveComponent("FormTeam"),
    [Step.PLAYERS]: resolveComponent("FormPlayers"),
    [Step.SUMMARY]: resolveComponent("FormSummary"),
    [Step.SENT]: resolveComponent("FormSent"),
} as const;

const currentStep = computed(() => components[data.value.step ?? Step.START]);
</script>

<template>
    <main>
        <form
            @submit.prevent="submit"
            class="flex w-full flex-col items-center justify-stretch gap-3"
        >
            <component :is="currentStep" :key="data.step" />

            <FormControls />
        </form>
    </main>
</template>
