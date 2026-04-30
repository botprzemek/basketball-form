<script setup lang="ts">
const model = defineModel({ required: true });
const { placeholder, pattern, min, max } = defineProps<{
    placeholder: string;
    pattern?: string;
    min?: number;
    max?: number;
}>();
</script>

<template>
    <input
        v-model="model"
        :placeholder="placeholder"
        :pattern="pattern"
        :min="min"
        :max="max"
        type="number"
        required
        class="border-mid placeholder:text-mid focus:border-crimson focus:text-crimson focus:placeholder:text-crimson h-12 w-full border bg-transparent px-4 py-2 outline-none"
    />
</template>
