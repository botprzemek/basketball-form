<script setup lang="ts">
const { Stage, stage, previous, next, reset } = useStageManager();
</script>

<template>
    <aside class="grid w-full grid-cols-2 gap-3">
        <template v-if="stage === Stage.START">
            <ButtonBase @click="next" type="button" class="col-span-2">
                {{ $t(`components.button.start`) }}
            </ButtonBase>
        </template>
        <template v-if="Stage.START < stage && stage < Stage.SENT">
            <ButtonBase @click="previous" type="button">
                {{ $t(`components.button.previous`) }}
            </ButtonBase>
        </template>
        <template v-if="Stage.START < stage && stage < Stage.SUMMARY">
            <ButtonBase @click="next" type="button">
                {{ $t(`components.button.next`) }}
            </ButtonBase>
        </template>
        <template v-if="stage === Stage.SUMMARY">
            <ButtonBase>
                {{ $t(`components.button.submit`) }}
            </ButtonBase>
        </template>
        <template v-if="stage === Stage.SENT">
            <ButtonBase @click="reset" class="col-span-2">
                {{ $t(`components.button.back`) }}
            </ButtonBase>
        </template>
    </aside>
</template>
