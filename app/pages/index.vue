<script setup lang="ts">
const { Step, step, submit } = useForm();
const components = {
    [Step.START]: resolveComponent("FormStart"),
    [Step.TEAM]: resolveComponent("FormTeam"),
    [Step.PLAYERS]: resolveComponent("FormPlayers"),
    [Step.SUMMARY]: resolveComponent("FormSummary"),
    [Step.SENT]: resolveComponent("FormSent"),
} as const;

const currentStep = computed(() => components[step.value ?? Step.START]);
</script>

<template>
    <main>
        <form
            @submit.prevent="submit"
            class="flex w-full flex-col items-center justify-stretch gap-3"
        >
            <Transition name="fade-slide" mode="out-in">
                <component :is="currentStep" :key="step" />
            </Transition>

            <FormControls />
        </form>
    </main>
</template>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
    transition: all 0.2s ease;
}

.fade-slide-enter-from {
    opacity: 0;
    transform: translateX(0.5rem);
}

.fade-slide-leave-to {
    opacity: 0;
    transform: translateX(-0.5rem);
}
</style>
