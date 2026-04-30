<script setup lang="ts">
definePageMeta({
    middleware: "auth",
});

const { data: teams, error } = await useFetch("/api/form");
</script>

<template>
    <main>
        <IconLogo width="200" height="200" />

        <h1 class="text-center">
            {{ $t("pages.admin.title") }}
        </h1>

        <p class="max-w-2xl text-justify">
            {{ $t("pages.admin.description") }}
        </p>

        <ul v-if="!error" class="grid w-full grid-rows-1 gap-6">
            <li v-for="(team, index) in teams" :key="index" class="grid gap-3">
                <h2 class="text-crimson">
                    {{ team.name }}
                </h2>
                <ul>
                    <li>
                        <p><strong>Adres e-mail:</strong> {{ team.email }}</p>
                    </li>
                    <li>
                        <p>
                            <strong>Numer telefonu:</strong>
                            {{ team.phone || "N/A" }}
                        </p>
                    </li>
                    <li>
                        <p>
                            <strong>Kategoria rozgrywek:</strong>
                            {{ team.category || "N/A" }}
                        </p>
                    </li>
                </ul>

                <ul
                    class="col-span-1 grid grid-cols-1 gap-2 sm:col-span-2 sm:grid-cols-2"
                >
                    <div
                        v-for="(player, index) in team.players"
                        :key="index"
                        class="border-mid rounded border p-3"
                    >
                        <p>
                            <strong>Imię i nazwisko:</strong>
                            {{ player.firstName || "—" }}
                            {{ player.lastame || "—" }}
                        </p>
                        <p>
                            <strong>Wiek:</strong>
                            {{ player.age || "N/A" }}
                        </p>
                    </div>
                </ul>
            </li>
        </ul>
    </main>
</template>
