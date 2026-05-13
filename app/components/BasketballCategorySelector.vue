<script setup lang="ts">
const { category } = useForm();
const { categories } = useCategories();
</script>

<template>
    <div class="flex flex-col gap-2">
        <select
            id="category-select"
            v-model="category"
            class="border-mid focus:border-crimson focus:text-crimson h-12 w-full appearance-none border bg-transparent px-4 py-2 outline-none"
        >
            <option :value="null" disabled class="bg-white text-black">
                {{ $t(`components.select.category.default`) }}
            </option>

            <option
                v-for="category in categories"
                :key="category.id"
                :value="category"
                class="bg-white text-black"
            >
                {{ $t(`components.select.category.${category.name}`) }} ({{
                    category.teamsCount
                }}
                / {{ category.teamsLimit }})
            </option>
        </select>
    </div>
</template>

<style scoped>
select {
    background-image: transparent;
    background-repeat: no-repeat;
    background-position: right 1rem center;
    background-size: 1em;
}

option {
    padding: 10px;
    background-color: white;
    color: black;
}
</style>
