<script setup lang="ts" async>
const stages = [
    resolveComponent("FormStart"),
    resolveComponent("FormTeam"),
    resolveComponent("FormPlayers"),
    resolveComponent("FormSummary"),
    resolveComponent("FormSent"),
];
const { stage, next } = useStageManager();
const currentStage = computed(() => stages.at(stage.value ?? 0));
</script>

<template>
    <main>
        <form
            @submit.prevent="next()"
            class="flex w-full flex-col items-center justify-stretch gap-3"
        >
            <component :is="currentStage" />
            <FormControls />
        </form>
    </main>
</template>
