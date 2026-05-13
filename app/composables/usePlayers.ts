export const usePlayers = () => {
    const { token } = useRuntimeConfig();

    const create = async (team: Team, players: Array<PlayerPayload>) => {
        await $fetch(`/api/teams/${team.id}/players`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            method: "POST",
            body: players,
        });
    };

    return {
        create,
    };
};
