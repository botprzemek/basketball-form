export const useTeams = () => {
    const { token } = useRuntimeConfig();

    const create = async (category: Category, team: TeamPayload) => {
        const result = await $fetch<Team>(`/api/teams`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            method: "POST",
            body: {
                ...team,
                categoryId: category.id,
            },
        });

        return result;
    };

    return {
        create,
    };
};
