<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";

const { category } = useForm();
const { categories } = useCategories();

const open = ref<boolean>(false);
const target = ref(null);

onClickOutside(target, () => (open.value = false));

const selectCategory = (value: Category) => {
    if (value.isFull) {
        return;
    }

    category.value = value;
    open.value = false;
};
</script>
<template>
    <div ref="target" class="relative w-full">
        <div
            class="border-mid relative z-10 flex h-12 w-full cursor-pointer items-center justify-between border bg-transparent px-4 py-3"
            :class="{
                'border-x-crimson border-t-crimson border-b-transparent': open,
            }"
            @click="open = !open"
        >
            <span v-if="category" class="font-medium">
                {{ $t(`components.select.category.${category.name}`) }}
                ({{ category.teamsCount }}/{{ category.teamsLimit }})
            </span>
            <span v-else :class="{ 'text-crimson': open, 'text-mid': !open }">
                {{ $t(`components.select.category.default`) }}
            </span>

            <svg
                class="h-4 w-4 transition-transform duration-300"
                :class="{ 'rotate-180': open }"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                />
            </svg>
        </div>

        <div class="absolute top-full left-0 z-50 w-full overflow-hidden">
            <Transition name="drawer">
                <div
                    v-if="open"
                    class="border-mid bg-dark border-x-crimson border-b-crimson border border-t-transparent shadow-xl"
                >
                    <div
                        v-for="cat in categories"
                        :key="cat.id"
                        class="group flex cursor-pointer flex-col px-4 py-3"
                        :class="{
                            'cursor-not-allowed opacity-50': cat.isFull,
                            'text-crimson': category?.id === cat.id,
                        }"
                        @click="selectCategory(cat)"
                    >
                        <div class="flex justify-between tracking-tight">
                            <span class="group-hover:text-crimson uppercase">
                                {{
                                    $t(`components.select.category.${cat.name}`)
                                }}
                            </span>
                            <span :class="{ 'text-white': !cat.isFull }">
                                {{ cat.teamsCount }}/{{ cat.teamsLimit }}
                                {{ $t("components.select.slots") }}
                            </span>
                        </div>

                        <span
                            v-if="cat.isFull"
                            class="text-crimson text-[10px] font-black uppercase"
                        >
                            {{ $t("components.select.category.full") }}
                        </span>
                    </div>
                </div>
            </Transition>
        </div>
    </div>
</template>
