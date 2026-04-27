<template>
    <NuxtLink v-for="i in 8" :key="i" :to="{ hash: `#p${i}` }">
        <div
            class="grid w-full min-w-0 grid-cols-5 gap-6 border-t border-t-crimson p-3"
        >
            <h3 class="col-span-2">
                {{ $t(`pages.about.content.p${i}.title`) }}
            </h3>
            <h4 class="col-start-3">
                <TextImportant>{{
                    $t(`pages.about.content.p${i}.hour`)
                }}</TextImportant>
            </h4>
            <div class="col-span-2 col-start-4">
                {{ $t(`pages.about.content.p${i}.descshort`) }}
            </div>
        </div>
    </NuxtLink>

    <NuxtLink :to="{ hash: '#p10' }">
        <div
            class="grid w-full min-w-0 grid-cols-5 gap-6 border-t border-t-crimson p-3"
        >
            <h3 class="col-span-2 min-w-0">
                {{ $t(`pages.about.content.p10.title`) }}
            </h3>
            <h4 class="col-start-3 min-w-0">
                <TextImportant>{{
                    $t(`pages.about.content.p10.hour`)
                }}</TextImportant>
            </h4>
            <div class="col-span-2 col-start-4 min-w-0">
                {{ $t(`pages.about.content.p10.descshort`) }}
            </div>
        </div>
    </NuxtLink>
</template>
