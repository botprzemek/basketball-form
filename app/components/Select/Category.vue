<script setup lang="ts">
const { Category, data } = useForm();
</script>

<template>
    <aside class="border-mid placeholder:text-mid h-12 w-full border px-4 py-2">
        <select
            v-model="data.category"
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
