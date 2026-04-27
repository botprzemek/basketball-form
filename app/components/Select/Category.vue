<script setup lang="ts">
const { Category, data } = useStageManager();
</script>

<template>
    <aside
        class="h-12 w-full rounded-lg border border-mid px-4 py-2 placeholder:text-mid"
    >
        <select
            v-model="data.team.category"
            :placeholder="$t(`components.select.category.0`)"
            name="category"
            required
            class="h-full w-full bg-transparent outline-none"
        >
            <option disabled selected :value="Category.NOT_SELECTED">
                {{ $t(`components.select.category.0`) }}
            </option>
            <option :value="Category.AMATEUR">
                {{ $t(`components.select.category.1`) }}
            </option>
            <option :value="Category.PRO">
                {{ $t(`components.select.category.2`) }}
            </option>
        </select>
    </aside>
</template>
