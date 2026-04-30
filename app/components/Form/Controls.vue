<script setup lang="ts">
const form = useForm();
</script>

<template>
    <aside class="grid w-full grid-cols-2 gap-3">
        <template v-if="form.isStarted.value">
            <ButtonBase @click="form.next" type="button" class="col-span-2">
                {{ $t("components.button.start") }}
            </ButtonBase>
        </template>

        <template v-if="form.canGoBack.value && !form.isSent.value">
            <ButtonBase @click="form.previous" type="button">
                {{ $t("components.button.previous") }}
            </ButtonBase>
        </template>

        <template
            v-if="
                form.canGoNext.value &&
                !form.isStarted.value &&
                !form.isSummarized.value
            "
        >
            <ButtonBase @click="form.next" type="button">
                {{ $t("components.button.next") }}
            </ButtonBase>
        </template>

        <template v-if="form.isSummarized.value">
            <ButtonBase type="submit" @submit.prevent>
                {{ $t("components.button.submit") }}
            </ButtonBase>
        </template>

        <template v-if="form.isSent.value">
            <ButtonBase @click="form.reset" type="button" class="col-span-2">
                {{ $t("components.button.back") }}
            </ButtonBase>
        </template>
    </aside>
</template>
