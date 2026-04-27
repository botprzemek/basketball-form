<script setup lang="ts">
const model = defineModel({ required: true });
const {
    autocomplete = "off",
    name,
    placeholder,
    type = "text",
} = defineProps<{
    autocomplete?: string;
    name: string;
    placeholder: string;
    type?: "checkbox" | "email" | "number" | "tel" | "text";
}>();
</script>

<template>
    <input
        v-model="model"
        :autocomplete="autocomplete"
        :name="name"
        :placeholder="placeholder"
        :type="type"
        required
        class="h-12 w-full rounded-lg border border-mid bg-transparent px-4 py-2 outline-none placeholder:text-mid focus:border-crimson focus:text-crimson focus:placeholder:text-crimson"
    />
</template>
